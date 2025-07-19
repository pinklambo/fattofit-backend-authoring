<template>
  <div class="p-8">
    <h1 class="text-xl font-bold mb-4">Exercises</h1>

    <div v-if="exerciseStore.exercises.length === 0" class="mt-4 text-gray-500">
      No exercises found.
    </div>

    <div v-else class="mt-6 flex flex-wrap gap-4">
      <div v-for="exercise in exerciseStore.exercises" :key="exercise.id">
        <ExerciseCard :exercise="exercise" @click="openEditModal(exercise)" class="h-[120px] min-h-[120px]" />
      </div>
    </div>

    <ExerciseEditModal
      v-model="editModalOpen"
      :exercise="selectedExercise"
      @save="saveExerciseEdit"
    />
  </div>
</template>


<script setup lang="ts">
import ExerciseCard from '../../components/shared/ExerciseCard.vue';
import ExerciseEditModal from '../../components/shared/ExerciseEditModal.vue';
import { onMounted, onUnmounted, watch } from 'vue';
import { useAuthStore } from '../../stores/useAuthStore';
import { useExerciseStore } from '../../stores/useExerciseStore';
import { subscribeToExercises, updateExercise } from '../../services/exerciseService';
import { app } from '../../firebase';
import type { Exercise } from '../../types/models';

const authStore = useAuthStore();
const exerciseStore = useExerciseStore();

let unsubscribe: (() => void) | null = null;

// Modal state
import { ref } from 'vue';
const editModalOpen = ref(false);
const selectedExercise = ref<Exercise | null>(null);

function openEditModal(exercise: Exercise) {
  selectedExercise.value = { ...exercise };
  editModalOpen.value = true;
}

async function saveExerciseEdit(updated: Partial<Exercise>) {
  if (!selectedExercise.value?.id) return;
  try {
    await updateExercise(app, selectedExercise.value.id, updated);
    // Optionally show a success message
  } catch (err) {
    // Optionally handle error
    console.error('Failed to update exercise', err);
  }
}

function setupExerciseListener() {
  // Clean up previous listener if any
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  if (authStore.firebaseUser) {
    unsubscribe = subscribeToExercises(app, (exercises) => {
      exerciseStore.setExercises(exercises);
    });
    exerciseStore.setUnsubscribe(unsubscribe);
  } else {
    exerciseStore.clear();
  }
}

// Watch for login/logout
watch(
  () => authStore.firebaseUser,
  () => {
    setupExerciseListener();
  },
  { immediate: true }
);

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
    exerciseStore.setUnsubscribe(null);
  }
});
</script>

<style scoped>
</style>