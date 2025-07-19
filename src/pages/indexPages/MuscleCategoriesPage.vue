<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Muscle Categories</h1>
    <div v-if="muscleCategoryStore.categories.length === 0" class="text-gray-500">No categories found.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="cat in muscleCategoryStore.categories" :key="cat.id" class="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-200">
        <div class="text-3xl mb-2">
          <span v-if="cat.icon">{{ cat.icon }}</span>
        </div>
        <div class="font-semibold text-lg">{{ cat.label }}</div>
        <div class="text-gray-500 text-sm mt-1">Sort: {{ cat.sortOrder }}</div>
        <div class="text-xs text-gray-400 mt-2">ID: {{ cat.id }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMuscleCategoryStore } from '../../stores/useMuscleCategoryStore'
const muscleCategoryStore = useMuscleCategoryStore()
</script>

<style scoped>
</style>