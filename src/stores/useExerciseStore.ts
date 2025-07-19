import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Exercise } from '../types/models';

import { app } from '../firebase';
import { subscribeToExercises } from '../services/exerciseService';

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

  function subscribe() {
    if (unsubscribe) unsubscribe();
    unsubscribe = subscribeToExercises(app, (newExercises) => {
      exercises.value = newExercises;
    });
  }

  return {
    exercises,
    setExercises,
    setUnsubscribe,
    clear,
    subscribe,
  };
});
