// app/api/submit-response.tsx
import { NextResponse } from 'next/server';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import type { DateResponse } from '../lib/types';

export async function POST(request: Request) {
  try {
    const data: DateResponse = await request.json();

    // Add timestamp if not present
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString();
    }

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'date-responses'), data);

    return NextResponse.json({ 
      success: true, 
      id: docRef.id 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error submitting response' },
      { status: 500 }
    );
  }
}