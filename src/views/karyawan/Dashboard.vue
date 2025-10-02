<template>
   <div class="p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold text-blue-700 mb-4">Karyawan Dashboard</h1>
    <p class="text-gray-600">
      Selamat datang di dashboard karyawan. Di sini kamu bisa melihat ringkasan ruangan dan reservasi.
    </p>
  </div>
  <div class="mt-6 space-y-6">
    <!-- Stats -->
    <<div class="grid grid-cols-2 gap-4 mb-6">
  <div class="p-4 bg-white rounded shadow">
    <p class="text-sm text-gray-500">Total Rooms</p>
    <p class="text-xl font-bold">{{ stats.rooms }}</p>
  </div>
  <div class="p-4 bg-white rounded shadow">
    <p class="text-sm text-gray-500">Total Reservations</p>
    <p class="text-xl font-bold">{{ stats.reservations }}</p>
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
