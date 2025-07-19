<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Muscle Groups</h1>
    <div v-if="muscleGroupStore.groups.length === 0" class="text-gray-500">No muscle groups found.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="group in muscleGroupStore.groups" :key="group.id" class="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-200 cursor-pointer hover:bg-indigo-50"
        @click="openEditModal(group)">
        <div class="font-semibold text-lg">{{ group.label }}</div>
        <div class="text-gray-500 text-sm mt-1">Category ID: {{ group.categoryId }}</div>
        <div class="text-xs text-gray-400 mt-2">ID: {{ group.id }}</div>
        <div class="text-xs text-gray-400">Created: {{ formatDate(group.createdAt) }}</div>
        <div class="text-xs text-gray-400">Updated: {{ formatDate(group.updatedAt) }}</div>
      </div>
    </div>
    <MuscleGroupEditModal
      v-model="editModalOpen"
      :group="selectedGroup"
      @save="saveMuscleGroupEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMuscleGroupStore } from '../../stores/useMuscleGroupStore'
import MuscleGroupEditModal from '../../components/shared/MuscleGroupEditModal.vue'
import { app } from '../../firebase'
import { updateMuscleGroup } from '../../services/muscleGroupService'
import type { MuscleGroup } from '../../types/models'
import { formatDate } from '../../utils/date'

const muscleGroupStore = useMuscleGroupStore()
const editModalOpen = ref(false)
const selectedGroup = ref<MuscleGroup | null>(null)

function openEditModal(group: MuscleGroup) {
  selectedGroup.value = { ...group }
  editModalOpen.value = true
}

async function saveMuscleGroupEdit(updated: Partial<MuscleGroup>) {
  if (!selectedGroup.value?.id) return
  try {
    await updateMuscleGroup(app, selectedGroup.value.id, updated)
    // Optionally show a success message
  } catch (err) {
    // Optionally handle error
    console.error('Failed to update muscle group', err)
  }
}
</script>

<style scoped>
</style>