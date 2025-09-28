<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Reservations</h2>

    <table class="w-full bg-white shadow rounded">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">User</th>
          <th class="p-2">Room</th>
          <th class="p-2">Date</th>
          <th class="p-2">Time</th>
          <th class="p-2">Status</th>
          <th class="p-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in reservationsList" :key="r.id" class="border-t">
          <td class="p-2">{{ r.user?.name }}</td>
          <td class="p-2">{{ r.room?.name }}</td>
          <td class="p-2">{{ r.date }}</td>
          <td class="p-2">{{ r.start }} - {{ r.end }}</td>
          <td class="p-2">{{ r.status }}</td>
          <td class="p-2 text-right">
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
