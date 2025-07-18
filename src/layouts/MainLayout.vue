<script setup lang="ts">

import TopNav from '../components/shared/TopNav.vue'
import LeftNav from '../components/shared/LeftNav.vue'
</script>

<template>
  <div class="flex h-screen w-full">
    <LeftNav />
    <div class="flex flex-col flex-1 h-screen">
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
        <TopNav />
      </div>
      <main class="flex-1 w-full relative overflow-hidden">
        <router-view />
      </main>
    </div>
  </div>
</template>