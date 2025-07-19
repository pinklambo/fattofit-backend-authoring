import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Exercise } from '../types/models';

export const useExerciseStore = defineStore('exercise', () => {
  const exercises = ref<Exercise[]>([]);
  let unsubscribe: (() => void) | null = null;

  function setExercises(newExercises: Exercise[]) {
    exercises.value = newExercises;
  }

  function setUnsubscribe(fn: (() => void) | null) {
    unsubscribe = fn;
  }

  function clear() {
    exercises.value = [];
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  }

  return {
    exercises,
    setExercises,
    setUnsubscribe,
    clear,
  };
});
