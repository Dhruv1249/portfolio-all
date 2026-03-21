import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

const DB_NAME = 'portfolio';
const COLLECTION_NAME = 'portfolio_data';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Fetch portfolio data from MongoDB
    const data = await collection.findOne({ _id: 'portfolio_main' });

    if (!data) {
      // If no data in DB, return success with empty state
      // (frontend will use static data from portfolio-data.ts as fallback)
      return NextResponse.json({ success: true, cached: false });
    }

    return NextResponse.json({ success: true, data, cached: true });
  } catch (error) {
    console.error('MongoDB portfolio data fetch error:', error);
    // Return success anyway so page loads - frontend has fallback static data
    return NextResponse.json({ success: true, cached: false });
  }
}
