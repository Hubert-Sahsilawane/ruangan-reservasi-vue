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
import { rooms } from '@/api/rooms'
import { reservations } from '@/api/reservations'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Dummy wrapper to make props clean
const BarChart = {
  props: ['chartData'],
  components: { Bar },
  template: `<Bar :data="chartData" :options="{ responsive: true, plugins: { legend: { display: false } } }" />`
}

const stats = ref({
  rooms: 0,
  reservations: 0,
  approved: 0,
  rejected: 0
})

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [{
    label: 'Reservations',
    data: [5, 10, 8, 15, 20, 12, 18],
    backgroundColor: 'rgba(34, 197, 94, 0.7)'
  }]
})

onMounted(async () => {
  try {
    const roomsRes = await rooms.all()
    stats.value.rooms = roomsRes.data.total || roomsRes.data.length || 0

    const reservationsRes = await reservations.all()
    stats.value.reservations = reservationsRes.data.total || reservationsRes.data.length || 0
    stats.value.approved = reservationsRes.data.data?.filter(r => r.status === 'approved').length || 0
    stats.value.rejected = reservationsRes.data.data?.filter(r => r.status === 'rejected').length || 0
  } catch (err) {
    console.error(err)
  }
})
</script>
