<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Reservations</h2>

    <table class="w-full bg-white shadow rounded text-left">
  <thead class="bg-gray-100">
    <tr>
      <th class="p-2">User</th>
      <th class="p-2">Room</th>
      <th class="p-2">Tanggal</th>
      <th class="p-2">Hari</th>
      <th class="p-2">Jam</th>
      <th class="p-2">Status</th>
      <th class="p-2">Reason</th>
      <th class="p-2 text-right">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="r in reservationsList" :key="r.id" class="border-t hover:bg-gray-50">
      <td class="p-2">{{ r.user?.name }}</td>
      <td class="p-2">{{ r.room?.name }}</td>
      <td class="p-2">{{ r.tanggal }}</td>
       <td class="p-2">{{ r.hari }}</td>
      <td class="p-2">{{ r.waktu_mulai }} - {{ r.waktu_selesai }}</td>
      <td class="p-2">
        <span v-if="r.status === 'approved'" class="text-green-600 font-semibold">Approved</span>
        <span v-else-if="r.status === 'rejected'" class="text-red-600 font-semibold">Rejected</span>
        <span v-else class="text-gray-600">Pending</span>
      </td>
      <td class="p-2">{{ r.reason || '-' }}</td>
      <td class="p-2 text-right space-x-1">
        <button @click="setStatus(r.id,'approved')" class="px-2 text-green-600">✔</button>
        <button @click="setStatus(r.id,'rejected')" class="px-2 text-red-600">✖</button>
        <button @click="remove(r.id)" class="px-2 text-gray-600">🗑</button>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { reservations } from '@/api/reservations'

const reservationsList = ref([])

const fetchData = async () => {
  const res = await reservations.all()
  reservationsList.value = res.data.data || res.data
}

async function setStatus(id, status) {
  await reservations.update(id, { status })
  fetchData()
}

async function remove(id) {
  if(confirm('Delete reservation?')) {
    await reservations.delete(id)
    fetchData()
  }
}

onMounted(fetchData)
</script>
