<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Muscle Categories</h1>
    <div v-if="muscleCategoryStore.categories.length === 0" class="text-gray-500">No categories found.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="cat in muscleCategoryStore.categories" :key="cat.id" class="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-200 cursor-pointer hover:bg-indigo-50 transition"
        @click="openEditModal(cat)">
        <div class="text-3xl mb-2">
          <span v-if="cat.icon">{{ cat.icon }}</span>
        </div>
        <div class="font-semibold text-lg">{{ cat.label }}</div>
        <div class="text-gray-500 text-sm mt-1">Sort: {{ cat.sortOrder }}</div>
        <div class="text-xs text-gray-400 mt-2">ID: {{ cat.id }}</div>
      </div>
      <MuscleCategoryEditModal
        v-model="editModalOpen"
        :category="selectedCategory"
        @save="saveCategoryEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMuscleCategoryStore } from '../../stores/useMuscleCategoryStore'
import MuscleCategoryEditModal from '../../components/shared/MuscleCategoryEditModal.vue'
import { app } from '../../firebase'
import { updateMuscleCategory } from '../../services/muscleCategoryService'
import type { MuscleCategory } from '../../types/models'

const muscleCategoryStore = useMuscleCategoryStore()
const editModalOpen = ref(false)
const selectedCategory = ref<MuscleCategory | null>(null)

function openEditModal(cat: MuscleCategory) {
  selectedCategory.value = cat
  editModalOpen.value = true
}

async function saveCategoryEdit(updated: Partial<MuscleCategory>) {
  if (!updated.id) return
  await updateMuscleCategory(app, updated.id, updated)
  editModalOpen.value = false
}
</script>

<style scoped>
</style>