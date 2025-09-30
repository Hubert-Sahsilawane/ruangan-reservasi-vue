<template>
  <div>
    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Total Rooms</h3>
        <p class="text-2xl font-bold text-green-600">{{ stats.rooms }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Total Reservations</h3>
        <p class="text-2xl font-bold text-green-600">{{ stats.reservations }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Approved</h3>
        <p class="text-2xl font-bold text-green-600">{{ stats.approved }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm text-gray-500">Rejected</h3>
        <p class="text-2xl font-bold text-green-600">{{ stats.rejected }}</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Reservations per Month</h2>
      <BarChart :chart-data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
import api from '@/api/axios'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Dummy wrapper supaya BarChart lebih rapih
const BarChart = {
  props: ['chartData'],
  components: { Bar },
  template: `<Bar :data="chartData" :options="{ responsive: true, plugins: { legend: { display: false } } }" />`
}

// Data untuk cards
const stats = ref({
  rooms: 0,
  reservations: 0,
  approved: 0,
  rejected: 0
})

// Data chart
const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Reservations',
    data: [],
    backgroundColor: 'rgba(34, 197, 94, 0.7)'
  }]
})

onMounted(async () => {
  try {
    const res = await api.get('/dashboard/stats')

    stats.value.rooms = res.data.rooms
    stats.value.reservations = res.data.reservations
    stats.value.approved = res.data.approved
    stats.value.rejected = res.data.rejected

    chartData.value.labels = res.data.chart.labels
    chartData.value.datasets[0].data = res.data.chart.data
  } catch (err) {
    console.error("Error loading dashboard stats:", err)
  }
})
</script>
