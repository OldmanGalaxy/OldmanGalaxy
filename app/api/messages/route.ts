import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;

async function getMongoClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const client = await getMongoClient();
    const database = client.db('portfolio');
    const messages = database.collection('emails');

    const result = await messages.insertOne({
      from_name: body.from_name,
      email: body.email,
      message: body.message,
      timestamp: new Date(body.timestamp)
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save message' },
      { status: 500 }
    );
  }
}

process.on('SIGTERM', async () => {
  if (client) {
    await client.close();
    client = null;
  }
});