<script setup lang="ts">
import { BellIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div>
    <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
      <span class="sr-only">View notifications</span>
      <BellIcon class="size-6" aria-hidden="true" />
    </button>
  </div>
</template>
