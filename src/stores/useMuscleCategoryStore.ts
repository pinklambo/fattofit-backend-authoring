import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MuscleCategory } from '../types/models'

export const useMuscleCategoryStore = defineStore('muscleCategory', () => {
  const categories = ref<MuscleCategory[]>([])
  const loaded = ref(false)

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
  }

  return { categories, loaded, setCategories, addOrUpdateCategory, removeCategory, clear }
})
// Pinia persisted state plugin must be registered in main.ts for caching to work.
