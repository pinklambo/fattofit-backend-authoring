import { getFirestore, collection, onSnapshot, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import type { MuscleGroup } from '../types/models';

export function subscribeToMuscleGroups(app: FirebaseApp, callback: (change: { type: 'added' | 'modified' | 'removed'; doc: MuscleGroup }) => void): () => void {
  const db = getFirestore(app);
  const col = collection(db, 'fattofit_muscle_group');
  const unsubscribe = onSnapshot(col, (snapshot: QuerySnapshot<DocumentData>) => {
    snapshot.docChanges().forEach((change) => {
      const doc = { id: change.doc.id, ...change.doc.data() } as MuscleGroup;
      callback({ type: change.type, doc });
    });
  });
  return unsubscribe;
}
