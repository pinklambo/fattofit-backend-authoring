import type { FirebaseApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import type { QuerySnapshot, DocumentData } from 'firebase/firestore'
import type { MuscleCategory } from '../types/models'

export function subscribeToMuscleCategories(app: FirebaseApp, onChange: (change: { type: string, doc: MuscleCategory }) => void): () => void {
  const db = getFirestore(app)
  const col = collection(db, 'fattofit_muscle_category')
  const unsubscribe = onSnapshot(col, (snapshot: QuerySnapshot<DocumentData>) => {
    snapshot.docChanges().forEach((change: DocumentChange<DocumentData>) => {
      const doc = { id: change.doc.id, ...change.doc.data() } as MuscleCategory
      onChange({ type: change.type, doc })
    })
  })
  return unsubscribe
}

export async function updateMuscleCategory(app: FirebaseApp, categoryId: string, updates: Partial<MuscleCategory>): Promise<void> {
  const db = getFirestore(app)
  const categoryRef = doc(db, 'fattofit_muscle_category', categoryId)
  await updateDoc(categoryRef, updates)
}
