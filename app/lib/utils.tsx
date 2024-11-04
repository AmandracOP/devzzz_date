// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { DateResponse } from './types';

// Utility function for class name merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to fetch responses from Firestore
export async function getResponses(): Promise<DateResponse[]> {
  try {
    const q = query(
      collection(db, 'date-responses'),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const responses: DateResponse[] = [];
    
    querySnapshot.forEach((doc) => {
      responses.push(doc.data() as DateResponse);
    });
    
    return responses;
  } catch (error) {
    console.error('Error fetching responses:', error);
    return [];
  }
}

// Function to check for existing responses in Firestore
export async function checkForExistingResponse(): Promise<boolean> {
  try {
    const q = query(collection(db, 'date-responses'));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking for response:', error);
    return false;
  }
}
