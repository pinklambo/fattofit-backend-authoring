<script setup lang="ts">
import { useAuthStore } from '../stores/useAuthStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const user = computed(() => authStore.firebaseUser)
const role = computed(() => authStore.role)
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Profile</h1>
    <table class="min-w-[600px] bg-white border border-gray-200 rounded-lg">
      <tbody>
        <tr>
          <th class="text-left px-4 py-2 border-b font-medium text-gray-600">UID</th>
          <td class="px-4 py-2 border-b">{{ user?.uid }}</td>
        </tr>
        <tr>
          <th class="text-left px-4 py-2 border-b font-medium text-gray-600">Email</th>
          <td class="px-4 py-2 border-b">{{ user?.email }}</td>
        </tr>
        <tr>
          <th class="text-left px-4 py-2 border-b font-medium text-gray-600">Display Name</th>
          <td class="px-4 py-2 border-b">{{ user?.displayName }}</td>
        </tr>
        <tr>
          <th class="text-left px-4 py-2 border-b font-medium text-gray-600">Photo URL</th>
          <td class="px-4 py-2 border-b">
            <span v-if="user?.photoURL">
              <img :src="user.photoURL" alt="Avatar" class="h-10 w-10 rounded-full inline-block mr-2 align-middle" />
              <span class="align-middle">{{ user.photoURL }}</span>
            </span>
            <span v-else class="text-gray-400">—</span>
          </td>
        </tr>
        <tr>
          <th class="text-left px-4 py-2 border-b font-medium text-gray-600">Email Verified</th>
          <td class="px-4 py-2 border-b">{{ user?.emailVerified ? 'Yes' : 'No' }}</td>
        </tr>
        <tr>
          <th class="text-left px-4 py-2 border-b font-medium text-gray-600">Provider ID</th>
          <td class="px-4 py-2 border-b">{{ user?.providerId }}</td>
        </tr>
        <tr>
          <th class="text-left px-4 py-2 font-medium text-gray-600">Role</th>
          <td class="px-4 py-2">{{ role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>