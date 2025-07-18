<script setup lang="ts">
  import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
  import { ref } from 'vue'
  
  const searchQuery = ref('')
  const handleSearch = () => {
    console.log(searchQuery.value)
  }
  
</script>

<template>
   <form class="grid flex-1 grid-cols-1 h-full" action="#" method="GET">
  <input type="search" name="search" aria-label="Search" class="col-start-1 row-start-1 block w-full h-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6" placeholder="Search" />
  <MagnifyingGlassIcon class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400" aria-hidden="true" />
</form>
</template>
