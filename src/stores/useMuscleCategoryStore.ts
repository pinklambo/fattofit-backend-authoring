import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MuscleCategory } from '../types/models'

import { app } from '../firebase'
import { subscribeToMuscleCategories } from '../services/muscleCategoryService'

export const useMuscleCategoryStore = defineStore('muscleCategory', () => {
  const categories = ref<MuscleCategory[]>([])
  const loaded = ref(false)
  let unsubscribe: null | (() => void) = null

  function setCategories(newCategories: MuscleCategory[]) {
    categories.value = newCategories
    loaded.value = true
  }

  function addOrUpdateCategory(category: MuscleCategory) {
    const idx = categories.value.findIndex(c => c.id === category.id)
    if (idx !== -1) {
      categories.value[idx] = category
    } else {
      categories.value.push(category)
    }
  }

  function removeCategory(id: string) {
    categories.value = categories.value.filter(c => c.id !== id)
  }

  function clear() {
    categories.value = []
    loaded.value = false
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  function subscribe() {
    if (unsubscribe) unsubscribe()
    unsubscribe = subscribeToMuscleCategories(app, ({ type, doc }) => {
      if (type === 'added' || type === 'modified') {
        addOrUpdateCategory(doc)
      } else if (type === 'removed') {
        removeCategory(doc.id)
      }
    })
  }

  return { categories, loaded, setCategories, addOrUpdateCategory, removeCategory, clear, subscribe }
}, { persist: true })
// Pinia persisted state plugin must be registered in main.ts for caching to work.
