<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Muscle Groups</h1>
    <div v-if="muscleGroupStore.groups.length === 0" class="text-gray-500">No muscle groups found.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="group in muscleGroupStore.groups" :key="group.id" class="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-200">
        <div class="font-semibold text-lg">{{ group.label }}</div>
        <div class="text-gray-500 text-sm mt-1">Category ID: {{ group.categoryId }}</div>
        <div class="text-xs text-gray-400 mt-2">ID: {{ group.id }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMuscleGroupStore } from '../../stores/useMuscleGroupStore'
const muscleGroupStore = useMuscleGroupStore()
</script>

<style scoped>
</style>