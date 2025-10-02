<template>
  <div class="p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold text-green-700 mb-4">Rooms</h1>
    <p class="text-gray-600">Halaman daftar ruangan (untuk karyawan).</p>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="room in rooms"
        :key="room.id"
        class="bg-white p-4 rounded shadow relative"
      >
        <!-- Status badge -->
        <span
          class="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded"
          :class="room.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
        >
          {{ room.is_active ? 'Aktif' : 'Tidak Aktif' }}
        </span>

        <!-- Nama -->
        <h2 class="font-bold text-lg">{{ room.name }}</h2>

        <!-- Kapasitas -->
        <p class="text-sm text-gray-500">Kapasitas: {{ room.kapasitas }}</p>

        <!-- Deskripsi -->
        <p class="text-sm text-gray-600 mt-2">{{ room.deskripsi }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "@/api/axios"

const rooms = ref([])

onMounted(async () => {
  const { data } = await api.get("/rooms")
  rooms.value = data.data
})
</script>
