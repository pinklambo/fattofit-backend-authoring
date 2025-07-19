import { getFirestore, collection, onSnapshot, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import type { Exercise } from '../types/models';
import type { FirebaseApp } from 'firebase/app';

// This function sets up a real-time listener for the 'fattofit_exercise' collection.
// It accepts a callback to handle the array of Exercise objects as they update.
export function subscribeToExercises(app: FirebaseApp, callback: (exercises: Exercise[]) => void): () => void {
  const db = getFirestore(app);
  const exercisesCol = collection(db, 'fattofit_exercise');
  // Set up real-time subscription
  const unsubscribe = onSnapshot(exercisesCol, (snapshot: QuerySnapshot<DocumentData>) => {
    const exercises = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Exercise);
    callback(exercises);
  });
  return unsubscribe;
}

// Abstract Firestore update for a single exercise document
import { doc, updateDoc } from 'firebase/firestore';

export async function updateExercise(app: FirebaseApp, exerciseId: string, updates: Partial<Exercise>): Promise<void> {
  const db = getFirestore(app);
  const exerciseRef = doc(db, 'fattofit_exercise', exerciseId);
  await updateDoc(exerciseRef, updates);
}
