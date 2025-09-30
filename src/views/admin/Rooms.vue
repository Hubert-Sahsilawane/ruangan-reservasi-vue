<template>
  <div>
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-semibold">Rooms</h2>
      <button @click="openForm()" class="bg-green-600 text-white px-4 py-2 rounded">+ Add Room</button>
    </div>

    <!-- Table -->
    <table class="w-full bg-white shadow rounded border border-gray-200">
      <thead class="bg-gray-100 border-b border-gray-300">
        <tr>
          <th class="p-3 text-left">Name</th>
          <th class="p-3 text-left">Capacity</th>
          <th class="p-3 text-left">Active</th>
          <th class="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in roomsList" :key="r.id" class="border-b hover:bg-gray-50 transition">
          <td class="p-3">{{ r.nama_ruangan }}</td>
          <td class="p-3">{{ r.kapasitas }}</td>
          <td class="p-3">
            <span
              :class="r.status === 'aktif'
                ? 'px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full'
                : 'px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full'"
            >
              {{ r.status === 'aktif' ? 'Yes' : 'No' }}
            </span>
          </td>
          <td class="p-3 text-right space-x-2">
            <button @click="openForm(r)" class="px-2 py-1 text-blue-600 hover:underline">✏️</button>
            <button @click="remove(r.id)" class="px-2 py-1 text-red-600 hover:underline">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded w-96">
        <h3 class="text-lg mb-4">{{ form.id ? 'Edit Room' : 'Add Room' }}</h3>
        <input v-model="form.nama_ruangan" placeholder="Name" class="w-full border p-2 mb-2"/>
        <input v-model="form.kapasitas" type="number" placeholder="Capacity" class="w-full border p-2 mb-2"/>
        <label class="flex items-center gap-2">
          <input v-model="form.status" type="checkbox" true-value="aktif" false-value="non-aktif"/> Active
        </label>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="showForm=false">Cancel</button>
          <button @click="save" class="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<<script setup>
import { ref, onMounted } from "vue"
import { rooms } from '@/api/rooms'

const roomsList = ref([])
const showForm = ref(false)
const form = ref({ id: null, nama_ruangan: '', kapasitas: '', status: 'aktif' })

const fetchRooms = async () => {
  try {
    const res = await rooms.all()
    roomsList.value = res.data.data || res.data
  } catch (e) {
    console.error("Fetch rooms failed", e.response?.data || e)
  }
}

function openForm(r=null) {
  form.value = r
    ? { ...r }
    : { id:null, nama_ruangan:'', kapasitas:'', status:'aktif' }
  showForm.value = true
}

async function save() {
  try {
    if (form.value.id) {
      await rooms.update(form.value.id, {
        nama_ruangan: form.value.nama_ruangan,
        kapasitas: form.value.kapasitas,
        status: form.value.status,
      })
    } else {
      await rooms.create({
        nama_ruangan: form.value.nama_ruangan,
        kapasitas: form.value.kapasitas,
        status: form.value.status,
      })
    }
    showForm.value = false
    fetchRooms()
  } catch (e) {
    console.error("Save failed", e.response?.data || e)
    alert(JSON.stringify(e.response?.data || e))
  }
}

async function remove(id) {
  if (confirm('Delete this room?')) {
    try {
      await rooms.destroy(id) // ✅ pakai destroy, bukan delete
      fetchRooms()
    } catch (e) {
      console.error("Delete failed", e.response?.data || e)
      alert(JSON.stringify(e.response?.data || e))
    }
  }
}

onMounted(fetchRooms)
</script>
