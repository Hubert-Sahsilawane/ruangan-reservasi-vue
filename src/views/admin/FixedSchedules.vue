<template>
  <div>
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-semibold">Fixed Schedules</h2>
      <button @click="openForm()" class="bg-green-600 text-white px-4 py-2 rounded">+ Add</button>
    </div>

    <table class="w-full bg-white shadow rounded">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">Room</th>
          <th class="p-2">Day</th>
          <th class="p-2">Time</th>
          <th class="p-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in schedules" :key="s.id" class="border-t">
          <td class="p-2">{{ s.room?.name }}</td>
          <td class="p-2">{{ s.day }}</td>
          <td class="p-2">{{ s.start }} - {{ s.end }}</td>
          <td class="p-2 text-right">
            <button @click="openForm(s)" class="px-2 text-blue-600">✏️</button>
            <button @click="remove(s.id)" class="px-2 text-red-600">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded w-96">
        <h3 class="text-lg mb-4">{{ form.id ? 'Edit Schedule' : 'Add Schedule' }}</h3>
        <select v-model="form.room_id" class="w-full border p-2 mb-2">
          <option v-for="r in rooms" :key="r.id" :value="r.id">{{ r.name }}</option>
        </select>
        <input v-model="form.day" placeholder="Day" class="w-full border p-2 mb-2"/>
        <input v-model="form.start" placeholder="Start" class="w-full border p-2 mb-2"/>
        <input v-model="form.end" placeholder="End" class="w-full border p-2 mb-2"/>
        <div class="flex justify-end gap-2 mt-4">
          <button @click="showForm=false">Cancel</button>
          <button @click="save" class="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { fixedSchedules } from '@/api/fixedSchedules'
import { rooms } from '@/api/rooms'

const schedules = ref([])
const roomsList = ref([])
const showForm = ref(false)
const form = ref({ id:null, room_id:null, day:'', start:'', end:'' })

async function fetchData() {
  const res = await fixedSchedules.all()
  schedules.value = res.data.data || res.data
  const r = await rooms.all()
  roomsList.value = r.data.data || r.data
}

function openForm(s=null) {
  form.value = s ? { ...s } : { id:null, room_id:null, day:'', start:'', end:'' }
  showForm.value = true
}

async function save() {
  if(form.value.id) await fixedSchedules.update(form.value.id, form.value)
  else await fixedSchedules.create(form.value)
  showForm.value = false
  fetchData()
}

async function remove(id) {
  if(confirm('Delete schedule?')) {
    await fixedSchedules.delete(id)
    fetchData()
  }
}

onMounted(fetchData)
</script>
