// app/api/submit-response/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const docRef = await addDoc(collection(db, 'date-responses'), {
      ...body,
      timestamp: new Date().toISOString()
    });

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