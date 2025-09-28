<template>
  <div>
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-semibold">Rooms</h2>
      <button @click="openForm()" class="bg-green-600 text-white px-4 py-2 rounded">+ Add Room</button>
    </div>

    <table class="w-full bg-white shadow rounded">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">Name</th>
          <th class="p-2">Capacity</th>
          <th class="p-2">Active</th>
          <th class="p-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in roomsList" :key="r.id" class="border-t">
          <td class="p-2">{{ r.name }}</td>
          <td class="p-2">{{ r.capacity }}</td>
          <td class="p-2">{{ r.is_active ? 'Yes' : 'No' }}</td>
          <td class="p-2 text-right">
            <button @click="openForm(r)" class="px-2 py-1 text-blue-600">✏️</button>
            <button @click="remove(r.id)" class="px-2 py-1 text-red-600">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded w-96">
        <h3 class="text-lg mb-4">{{ form.id ? 'Edit Room' : 'Add Room' }}</h3>
        <input v-model="form.name" placeholder="Name" class="w-full border p-2 mb-2"/>
        <input v-model="form.capacity" type="number" placeholder="Capacity" class="w-full border p-2 mb-2"/>
        <label class="flex items-center gap-2">
          <input v-model="form.is_active" type="checkbox" /> Active
        </label>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="showForm=false">Cancel</button>
          <button @click="save" class="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { rooms } from '@/api/rooms'

const roomsList = ref([])
const showForm = ref(false)
const form = ref({ id: null, name: '', capacity: '', is_active: true })

const fetchRooms = async () => {
  const res = await rooms.all()
  roomsList.value = res.data.data || res.data
}

function openForm(r=null) {
  form.value = r ? { ...r } : { id:null, name:'', capacity:'', is_active:true }
  showForm.value = true
}

async function save() {
  if (form.value.id) await rooms.update(form.value.id, form.value)
  else await rooms.create(form.value)
  showForm.value = false
  fetchRooms()
}

async function remove(id) {
  if(confirm('Delete this room?')) {
    await rooms.delete(id)
    fetchRooms()
  }
}

onMounted(fetchRooms)
</script>
