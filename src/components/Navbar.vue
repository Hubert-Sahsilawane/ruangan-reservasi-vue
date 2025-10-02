<template>
  <header class="bg-white border-b px-6 py-3 grid grid-cols-3 items-center">
     <div>
          <h1 class="text-2xl font-bold text-red-700 mb-4">Reservasi Ruangan</h1>
    </div>
    <!-- Tengah (Search Bar) -->
    <div class="flex justify-center">
      <div class="flex w-full max-w-md">
        <input
          type="text"
          placeholder="Cari..."
          v-model="query"
          class="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          @click="onSearch(query)"
          class="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          🔍
        </button>
      </div>
    </div>

    <!-- Kanan (aksi) -->
    <div class="flex items-center justify-end gap-4">
      <button title="Notifikasi" class="p-2 rounded hover:bg-gray-100">🔔</button>
      <button @click="$router.push('/admin/profile')" title="Settings" class="p-2 rounded hover:bg-gray-100">⚙️</button>

      <div class="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded">
        <img :src="profile.avatar || 'https://i.pravatar.cc/40'" class="w-9 h-9 rounded-full" />
        <div class="text-sm">
          <div class="font-semibold">{{ profile.name || 'User' }}</div>
          <div class="text-xs text-gray-500">{{ profile.role || 'Role' }}</div>
        </div>
      </div>

      <button @click="logout" title="Logout" class="p-2 rounded hover:bg-gray-100">🟥</button>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue"
import router from '@/router'
import { auth } from '@/api/auth'

const query = ref('')
const profile = ref({ name: 'Admin', avatar: null, role: 'Admin' })

const onSearch = q => {
  console.log('search query', q)
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
