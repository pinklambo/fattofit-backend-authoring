<script setup lang="ts">

import TopNav from '../components/shared/TopNav.vue'
import LeftNav from '../components/shared/LeftNav.vue'
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- LeftNav Sticky Sidebar -->
    <div class="sticky top-0 h-screen w-64 shrink-0  z-30 border-r border-gray-200">
      <LeftNav />
    </div>

    <!-- Right Content Area -->
    <div class="flex flex-col flex-1 h-screen overflow-auto">
      <!-- TopNav Sticky Header -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
        <TopNav />
      </div>

      <!-- Main content -->
      <main class="flex-1 w-full relative">
        <router-view />
      </main>
    </div>
  </div>
</template>

