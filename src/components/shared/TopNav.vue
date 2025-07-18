<script setup lang="ts">
  import ProfileDropDown from '../shared/ProfileDropDown.vue'
  import NotificationIndicator from '../shared/NotificationIndicator.vue'
</script>

<template>
  <div class="flex items-center w-full px-4 py-2">
    <div class="flex items-center gap-x-4 ml-auto">
      <NotificationIndicator />
      <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />
      <ProfileDropDown />
    </div>
  </div>
</template>
