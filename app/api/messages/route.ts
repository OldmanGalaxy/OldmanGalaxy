import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await client.connect();
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
  } finally {
    await client.close();
  }
}