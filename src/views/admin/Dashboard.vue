<template>
   <div class="p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold text-red-700 mb-4">Admin Dashboard</h1>
    <p class="text-gray-600">
      Selamat datang di dashboard. Di sini kamu bisa melihat ringkasan ruangan dan reservasi.
    </p>
  </div>
  <div class="mt-6 space-y-6">
    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="p-4 bg-white rounded shadow">
        <p class="text-sm text-gray-500">Total Rooms</p>
        <p class="text-xl font-bold">{{ stats.rooms }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <p class="text-sm text-gray-500">Total Reservations</p>
        <p class="text-xl font-bold">{{ stats.reservations }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <p class="text-sm text-gray-500">Approved</p>
        <p class="text-xl font-bold text-green-600">{{ stats.approved }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow">
        <p class="text-sm text-gray-500">Rejected</p>
        <p class="text-xl font-bold text-red-600">{{ stats.rejected }}</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-white p-4 rounded shadow">
      <canvas id="reservationsChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { Chart, registerables } from "chart.js"
import api from "@/api/axios"

Chart.register(...registerables)

const stats = ref({
  rooms: 0,
  reservations: 0,
  approved: 0,
  rejected: 0,
  chart: { labels: [], data: [] }
})

onMounted(async () => {
  const { data } = await api.get("/dashboard/stats")
  stats.value = data

  const ctx = document.getElementById("reservationsChart")
  new Chart(ctx, {
    type: "line",
    data: {
      labels: stats.value.chart.labels,
      datasets: [
        {
          label: "Reservasi per Bulan",
          data: stats.value.chart.data,
          borderColor: "#16a34a",
          backgroundColor: "rgba(22, 163, 74, 0.2)",
          tension: 0.3,
        },
      ],
    },
  })
})
</script>
