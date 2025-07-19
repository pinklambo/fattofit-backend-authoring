<script setup lang="ts">
import { Exercise } from '../../types/models';

interface Props {
  exercise: Exercise;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="w-[200px] bg-white rounded-lg shadow-md p-4 border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <div class="font-semibold text-sm text-gray-900">
      {{ exercise.name }}
    </div>
    <div class="text-gray-600 text-sm mt-1" v-if="exercise.description">
      {{ exercise.description }}
    </div>
    <div class="text-gray-600 text-sm mt-1" v-if="exercise.muscleGroups">
      {{ exercise.muscleGroups.join(', ') }}
    </div>
  </div>
</template>
