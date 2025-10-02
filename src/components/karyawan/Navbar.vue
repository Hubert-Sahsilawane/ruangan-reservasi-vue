<template>
  <header class="bg-white border-b px-6 py-3 grid grid-cols-3 items-center">
    <!-- Kiri (Judul) -->
    <div> 
          <h1 class="text-2xl font-bold text-red-700 mb-4">Reservasi Ruangan</h1>
    </div>

    <!-- Tengah (Search Bar) -->
    <div class="flex justify-center">
      <SearchBar @search="onSearch" />
    </div>

    <!-- Kanan (aksi) -->
    <div class="flex items-center justify-end gap-4">
      <button title="Notifikasi" class="p-2 rounded hover:bg-gray-100">🔔</button>
      <button
        @click="$router.push('/karyawan/profile')"
        title="Settings"
        class="p-2 rounded hover:bg-gray-100"
      >
        ⚙️
      </button>

      <div class="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded">
        <img
          :src="profile.avatar || 'https://i.pravatar.cc/40'"
          class="w-9 h-9 rounded-full"
        />
        <div class="text-sm">
          <div class="font-semibold">{{ profile.name || 'user' }}</div>
          <div class="text-xs text-gray-500">{{ profile.role || 'Karyawan' }}</div>
        </div>
      </div>

      <button @click="logout" title="Logout" class="p-2 rounded hover:bg-gray-100">🟥</button>
    </div>
  </header>
</template>


<script setup>
import { ref, onMounted } from "vue"
import router from "@/router"
import SearchBar from "./SearchBar.vue"

const profile = ref({ name: "Karyawan", avatar: null, role: "Karyawan" })

onMounted(() => {
  const savedUser = localStorage.getItem("user")
  if (savedUser) {
    profile.value = JSON.parse(savedUser)
  }
})

const onSearch = (q) => {
  console.log("Search karyawan:", q)
}

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  router.push("/login")
}
</script>
