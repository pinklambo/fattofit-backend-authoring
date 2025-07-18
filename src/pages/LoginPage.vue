<template>
  <div class="flex h-screen w-full items-center justify-center min-h-screen bg-gray-50">
    <form @submit.prevent="onLogin" class="bg-white p-8 rounded shadow-md w-80">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Email</label>
        <input v-model="email" type="email" required class="w-full px-3 py-2 border rounded" />
      </div>
      <div class="mb-6">
        <label class="block mb-1 text-gray-700">Password</label>
        <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded" />
      </div>
      <button :disabled="authStore.loading" type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        <span v-if="authStore.loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
      <p v-if="authStore.error" class="text-red-500 mt-4">{{ authStore.error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'
import { useRouter } from 'vue-router'

const email = ref('god_1@fattofit.com')
const password = ref('Password123!')
const authStore = useAuthStore()
const router = useRouter()

authStore.bindAuthListener()

const onLogin = async () => {
  await authStore.login(email.value, password.value)
  if (authStore.firebaseUser && authStore.role) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
</style>