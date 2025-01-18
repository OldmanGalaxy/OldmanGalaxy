import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;

async function getMongoClient() {
  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await client.connect();
      console.log("Successfully connected to MongoDB.");
    }
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.from_name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const database = client.db('portfolio');
    const messages = database.collection('emails');

    const messageDoc = {
      from_name: body.from_name,
      email: body.email,
      message: body.message,
      timestamp: new Date(),
    };

    const result = await messages.insertOne(messageDoc);
    console.log('Message saved successfully:', result.insertedId);

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save message' },
      { status: 500 }
    );
  }
}

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing MongoDB connection');
  if (client) {
    await client.close();
    client = null;
  }
});