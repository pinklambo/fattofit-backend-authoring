<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/useAuthStore'
import { useRouter } from 'vue-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase'

const email = ref('diamondhands@pinklambo.io')
const password = ref('fatPassword123!')
const authStore = useAuthStore()
const router = useRouter()

const showResetModal = ref(false)
const resetEmail = ref('')
const resetSuccess = ref(false)
const resetError = ref('')

const handleReset = async () => {
  resetSuccess.value = false
  resetError.value = ''
  try {
    await sendPasswordResetEmail(auth, resetEmail.value)
    resetSuccess.value = true
  } catch (err: any) {
    const { mapFirebaseAuthError } = await import('../../utils/firebaseErrorMap')
    resetError.value = mapFirebaseAuthError(err)
  }
}

authStore.bindAuthListener()

const onLogin = async () => {
  await authStore.login(email.value, password.value)
  if (authStore.firebaseUser && authStore.role) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
    <div class="bg-white w-[520px] border border-gray-200 rounded-lg pb-16">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="onLogin">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="email" type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 border border-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500 p-0 m-0 border-none bg-transparent" style="padding:0;margin:0;border:none;background:transparent;" @click="showResetModal = true">Forgot password?</button>
            </div>
          </div>
          <div class="mt-2">
            <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button :disabled="authStore.loading" type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
          <p v-if="authStore.error" class="text-red-500 mt-2 text-sm text-center">&nbsp;{{ authStore.error }}</p>
      </form>

    </div>

    <transition name="fade">
      <div v-if="showResetModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="bg-white rounded-lg shadow-lg py-8 px-10 w-300 relative">
          <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600" @click="showResetModal = false">&times;</button>
          <h2 class="text-lg font-semibold mb-4">Reset Password</h2>
          <form @submit.prevent="handleReset">
            <label class="block mb-2 text-gray-700">Email</label>
            <input v-model="resetEmail" type="email" required class="w-full px-3 py-2 border rounded mb-4" placeholder="Enter your email" />
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Send Reset Email</button>
          </form>
          <p v-if="resetSuccess" class="text-green-600 mt-4">Password reset email sent!</p>
          <p v-if="resetError" class="text-red-500 mt-4">{{ resetError }}</p>
        </div>
      </div>
    </transition>
  </div> 
</div>
</template>
