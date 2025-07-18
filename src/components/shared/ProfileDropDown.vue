<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useAuthStore } from '../../stores/useAuthStore'
import { useRouter } from 'vue-router'
import { watch, computed } from 'vue'
import { minidenticon } from 'minidenticons'

const authStore = useAuthStore()
const router = useRouter()

const fallbackAvatar = computed(() => {
  const user = authStore.firebaseUser
  if (!user) return ''
  const seed = user.email || user.uid || 'user'
  // Force a dark background color (e.g. #222)
  const svg = minidenticon(seed, '#222')
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
})

watch(() => authStore.firebaseUser, (user) => {
  if (!user) {
    router.push('/login')
  }
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
   <!-- Profile dropdown -->
   <Menu as="div" class="relative">
      <MenuButton class="relative flex items-center">
        <span class="absolute -inset-1.5" />
        <span class="sr-only">Open user menu</span>
        <img
          v-if="authStore.firebaseUser && authStore.firebaseUser.photoURL"
          :src="authStore.firebaseUser.photoURL"
          class="size-8 rounded-full bg-gray-50"
          alt="Profile picture"
        />
        <img
          v-else-if="authStore.firebaseUser"
          :src="fallbackAvatar"
          class="size-8 rounded-full bg-gray-50"
          alt="Minidenticon avatar"
        />
        <span class="hidden lg:flex lg:items-center">
          <span class="ml-4 text-sm/6 font-semibold text-gray-900" aria-hidden="true">Tom Cook</span>
          <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
        </span>
      </MenuButton>
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
  <MenuItem v-slot="{ active }">
    <button
      class="block w-full text-left px-6 py-3 text-base text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
      @click="() => router.push('/profile')"
      type="button"
    >
      Your profile
    </button>
  </MenuItem>
  <MenuItem v-slot="{ active }">
    <button
      @click="handleLogout"
      class="block w-full text-left px-6 py-3 text-base text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
      type="button"
    >
      Sign out
    </button>
  </MenuItem>
</MenuItems>
      </transition>
    </Menu> 
</template>>
