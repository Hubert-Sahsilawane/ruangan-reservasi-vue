<template>
  <div class="p-6 bg-white rounded-xl shadow">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-green-700 mb-2">Fixed Schedules</h1>
    <p class="text-gray-600 mb-4">Halaman jadwal tetap untuk karyawan.</p>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-green-50">
          <tr>
            <th class="px-6 py-3 text-left font-semibold text-gray-700">Room</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-700">Hari</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-700">Waktu</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="f in fixed"
            :key="f.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-6 py-3">{{ f.room?.name }}</td>
            <td class="px-6 py-3 capitalize">{{ f.hari }}</td>
            <td class="px-6 py-3">
              {{ f.waktu_mulai.substring(0,5) }} - {{ f.waktu_selesai.substring(0,5) }}
            </td>
          </tr>
          <tr v-if="!fixed.length">
            <td colspan="3" class="px-6 py-6 text-center text-gray-500">
              Belum ada jadwal tetap.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "@/api/axios"

const fixed = ref([])

onMounted(async () => {
  const { data } = await api.get("/fixed-schedules")
  fixed.value = data.data
})
</script>
