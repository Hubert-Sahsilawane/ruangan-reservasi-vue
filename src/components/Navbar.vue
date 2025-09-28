<template>
  <header class="bg-white border-b px-6 py-3 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <SearchBar @search="onSearch" />
    </div>

    <div class="flex items-center gap-4">
      <button title="Notifikasi" class="p-2 rounded hover:bg-gray-100">🔔</button>
      <button @click="$router.push('/admin/profile')" title="Settings" class="p-2 rounded hover:bg-gray-100">⚙️</button>

      <div class="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded">
        <img :src="profile.avatar || 'https://i.pravatar.cc/40'" class="w-9 h-9 rounded-full" />
        <div class="text-sm">
          <div class="font-semibold">{{ profile.name || 'User' }}</div>
          <div class="text-xs text-gray-500">{{ profile.role || 'Role' }}</div>
        </div>
      </div>

      <button @click="logout" title="Logout" class="p-2 rounded hover:bg-gray-100">⤴️</button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue"
import SearchBar from '@/components/SearchBar.vue'
import { auth } from '@/api/auth'
import router from '@/router'

const profile = ref({ name: 'Admin', avatar: null, role: 'Admin' })

onMounted(async () => {
  try {
    const res = await auth.profile()
    profile.value = res.data
  } catch (e) {}
})

const onSearch = q => {
  console.log('search query', q)
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
