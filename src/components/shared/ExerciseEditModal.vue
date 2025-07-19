<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Exercise } from '../../types/models';

interface Props {
  modelValue: boolean;
  exercise: Exercise | null;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'save']);

const local = ref<Partial<Exercise>>({});

// For comma-separated array fields
const muscleGroupsString = ref('');
const equipmentString = ref('');
const repsPerSetString = ref('');
const weightPerSetString = ref('');

watch(() => props.exercise, (val) => {
  local.value = val ? { ...val } : {};
  muscleGroupsString.value = val?.muscleGroups?.join(', ') || '';
  equipmentString.value = val?.equipment?.join(', ') || '';
  repsPerSetString.value = val?.repsPerSet?.join(', ') || '';
  weightPerSetString.value = val?.weightPerSet?.join(', ') || '';
}, { immediate: true });

function updateMuscleGroups() {
  local.value.muscleGroups = muscleGroupsString.value.split(',').map(s => s.trim()).filter(Boolean);
}
function updateEquipment() {
  local.value.equipment = equipmentString.value.split(',').map(s => s.trim()).filter(Boolean);
}
function updateRepsPerSet() {
  local.value.repsPerSet = repsPerSetString.value.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
}
function updateWeightPerSet() {
  local.value.weightPerSet = weightPerSetString.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
}

const isOpen = computed(() => props.modelValue);

function close() {
  emit('update:modelValue', false);
}

function save() {
  if (props.exercise && local.value) {
    emit('save', { ...local.value });
    close();
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl p-0 relative overflow-y-auto max-h-[90vh]">
      <!-- Sticky Header -->
      <div class="sticky top-0 left-0 w-full bg-gray-100 z-10 border-b border-gray-200 px-6 pt-6 pb-3">
        <h2 class="text-lg font-semibold flex items-center gap-4">
          Edit Exercise
        </h2>
        <span v-if="local.exerciseId" class="text-xs font-mono py-1">ID: {{ local.exerciseId }}</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pt-2"> 
        <div  class="md:col-span-2 mt-4">
          <label class="block text-sm font-medium mb-1">Name</label>
          <input v-model="local.name" class="w-full border rounded px-3 py-2" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">Detail</label>
          <textarea v-model="local.detail" class="w-full border rounded px-3 py-2" rows="2"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Muscle Groups (comma separated)</label>
          <input v-model="muscleGroupsString" @input="updateMuscleGroups" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Equipment (comma separated)</label>
          <input v-model="equipmentString" @input="updateEquipment" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Image URL</label>
          <input v-model="local.imageUrl" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Video URL</label>
          <input v-model="local.videoUrl" class="w-full border rounded px-3 py-2" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">Coaching Notes</label>
          <textarea v-model="local.coachingNotes" class="w-full border rounded px-3 py-2" rows="2"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Type</label>
          <select v-model="local.type" class="w-full border rounded px-3 py-2">
            <option value="main">Main</option>
            <option value="warm-up">Warm-up</option>
            <option value="warm-down">Warm-down</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Default Sets</label>
          <input v-model.number="local.defaultSets" type="number" min="0" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Reps Per Set (comma separated)</label>
          <input v-model="repsPerSetString" @input="updateRepsPerSet" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Weight Per Set (comma separated)</label>
          <input v-model="weightPerSetString" @input="updateWeightPerSet" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Duration (seconds, for warm-up)</label>
          <input v-model.number="local.duration" type="number" min="0" class="w-full border rounded px-3 py-2" />
        </div>
      </div>
      <div class="h-20"></div> <!-- Spacer for sticky footer -->
      <div class="sticky bottom-0 left-0 w-full bg-gray-100 pt-4 pb-4 flex justify-end gap-2 border-t border-gray-200" style="margin-left: -24px; margin-right: -24px; padding-left: 24px; padding-right: 24px;">
        <button @click="close" class="px-4 py-2 rounded bg-gray-200">Cancel</button>
        <button @click="save" class="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
      </div>
    </div>
  </div>
</template>
