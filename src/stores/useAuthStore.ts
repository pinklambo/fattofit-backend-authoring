import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, app, db } from '../firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { subscribeToMuscleCategories } from '../services/muscleCategoryService'
import { useMuscleCategoryStore } from './useMuscleCategoryStore'
import { useExerciseStore } from './useExerciseStore'
import { useMuscleGroupStore } from './useMuscleGroupStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    firebaseUser: null as User | null,
    role: null as string | null,
    loading: false,
    error: null as string | null,
    muscleCategoryUnsubscribe: null as null | (() => void),
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.firebaseUser = userCredential.user
        await this.fetchUserRole()
        const muscleCategoryStore = useMuscleCategoryStore()
        muscleCategoryStore.subscribe()
        const exerciseStore = useExerciseStore()
        exerciseStore.subscribe()
        const muscleGroupStore = useMuscleGroupStore()
        muscleGroupStore.subscribe()
      } catch (err: any) {
        // Map error to friendly message
        const { mapFirebaseAuthError } = await import('../utils/firebaseErrorMap')
        this.error = mapFirebaseAuthError(err)
        this.firebaseUser = null
        this.role = null
      } finally {
        this.loading = false
      }
    },
    async logout() {
      await signOut(auth)
      this.firebaseUser = null
      this.role = null
      this.clearStores()
      // Unsubscribe from muscle categories
      if (this.muscleCategoryUnsubscribe) {
        this.muscleCategoryUnsubscribe()
        this.muscleCategoryUnsubscribe = null
      }
      this.loading = false
      this.error = null
      console.log('Logout complete, state cleared')
    },
    bindAuthListener() {
      onAuthStateChanged(auth, async (user) => {
        this.firebaseUser = user
        if (user) {
          await this.fetchUserRole()
        } else {
          this.role = null
        }
      })
    },
    async fetchUserRole() {
      if (!this.firebaseUser) {
        this.role = null
        return
      }
      const userDoc = await getDoc(doc(db, 'fattofit_users', this.firebaseUser.uid))
      if (userDoc.exists()) {
        this.role = userDoc.data().role
      } else {
        this.role = null
      }
    },
  },
  persist: true,
})
