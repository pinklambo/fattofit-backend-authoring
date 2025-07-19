<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-0 relative overflow-y-auto max-h-[90vh]">
      <!-- Sticky Header -->
      <div class="sticky top-0 left-0 w-full bg-gray-100 z-10 border-b border-gray-200 px-6 pt-6 pb-3">
        <h2 class="text-lg font-semibold flex items-center gap-4">
          Edit Muscle Group
        </h2>
        <span v-if="local.id" class="text-xs font-mono py-1">ID: {{ local.id }}</span>
      </div>
      <div class="grid grid-cols-1 gap-4 px-6 pt-4">
        <div>
          <label class="block text-sm font-medium mb-1">Label</label>
          <input v-model="local.label" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Category ID</label>
          <input v-model="local.categoryId" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Created At</label>
          <div class="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600">
            {{ formatDate(local.createdAt) }}
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Updated At</label>
          <div class="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600">
            {{ formatDate(local.updatedAt) }}
          </div>
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

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { MuscleGroup } from '../../types/models';
import { formatDate } from '../../utils/date';

interface Props {
  modelValue: boolean;
  group: MuscleGroup | null;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'save']);

const local = ref<Partial<MuscleGroup>>({});

watch(() => props.group, (val) => {
  local.value = val ? { ...val } : {};
}, { immediate: true });

const isOpen = computed(() => props.modelValue);

function close() {
  emit('update:modelValue', false);
}

function save() {
  if (props.group && local.value) {
    emit('save', { ...local.value });
    close();
  }
}
</script>

<style scoped>
</style>
