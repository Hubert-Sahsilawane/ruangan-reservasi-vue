<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-semibold">Fixed Schedules</h2>
      <button
        @click="openForm()"
        class="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add
      </button>
    </div>

    <!-- Tabel -->
    <table class="w-full bg-white shadow rounded border">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="p-3">Room</th>
          <th class="p-3">Tanggal</th>
          <th class="p-3">Hari</th>
          <th class="p-3">Jam</th>
          <th class="p-3">Keterangan</th>
          <th class="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="s in schedules"
          :key="s.id"
          class="border-t hover:bg-gray-50"
        >
          <td class="p-3">{{ s.room?.name }}</td>
          <td class="p-3">{{ formatDate(s.tanggal) }}</td>
          <td class="p-3">{{ s.hari }}</td>
          <td class="p-3">{{ formatTime(s.waktu_mulai) }} - {{ formatTime(s.waktu_selesai) }}</td>
          <td class="p-3">{{ s.keterangan || '-' }}</td>
          <td class="p-3 text-right">
            <button
              @click="openForm(s)"
              class="px-2 text-blue-600"
            >
              ✏️
            </button>
            <button
              @click="remove(s.id)"
              class="px-2 text-red-600"
            >
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Form -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded w-96 shadow-lg">
        <h3 class="text-lg mb-4 font-semibold">
          {{ form.id ? 'Edit Schedule' : 'Add Schedule' }}
        </h3>

        <!-- Pilih ruangan -->
        <select
          v-model="form.room_id"
          class="w-full border p-2 mb-2 rounded"
        >
          <option disabled value="">-- Pilih Ruangan --</option>
          <option
            v-for="r in roomsList"
            :key="r.id"
            :value="r.id"
          >
            {{ r.name }}
          </option>
        </select>

        <!-- Tanggal -->
        <input
          v-model="form.tanggal"
          type="date"
          class="w-full border p-2 mb-2 rounded"
          @change="updateHari"
        />

        <!-- Hari (auto, readonly) -->
        <input
          v-model="form.hari"
          placeholder="Hari"
          class="w-full border p-2 mb-2 rounded bg-gray-100"
          readonly
        />

        <!-- Jam mulai -->
        <input
          v-model="form.waktu_mulai"
          type="time"
          class="w-full border p-2 mb-2 rounded"
        />

        <!-- Jam selesai -->
        <input
          v-model="form.waktu_selesai"
          type="time"
          class="w-full border p-2 mb-2 rounded"
        />

        <!-- Keterangan -->
        <textarea
          v-model="form.keterangan"
          placeholder="Keterangan"
          rows="3"
          class="w-full border p-2 mb-2 rounded"
        ></textarea>

        <!-- Tombol -->
        <div class="flex justify-end gap-2 mt-4">
          <button
            @click="showForm = false"
            class="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            @click="save"
            class="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { fixedSchedules } from "@/api/fixedSchedules"
import { rooms } from "@/api/rooms"

/* State */
const schedules = ref([])
const roomsList = ref([])
const showForm = ref(false)
const form = ref({
  id: null,
  room_id: "",
  tanggal: "",
  hari: "",
  waktu_mulai: "",
  waktu_selesai: "",
  keterangan: ""
})

/* Ambil data awal */
async function fetchData() {
  const res = await fixedSchedules.all()
  schedules.value = res.data.data || res.data

  const r = await rooms.all()
  roomsList.value = Array.isArray(r.data) ? r.data : r.data.data
}

/* Buka modal (new/edit) */
function openForm(s = null) {
  form.value = s
    ? {
        id: s.id,
        room_id: s.room_id,
        tanggal: s.tanggal,
        hari: s.hari,
        waktu_mulai: s.waktu_mulai,
        waktu_selesai: s.waktu_selesai,
        keterangan: s.keterangan || ""
      }
    : {
        id: null,
        room_id: "",
        tanggal: "",
        hari: "",
        waktu_mulai: "",
        waktu_selesai: "",
        keterangan: ""
      }

  showForm.value = true
}

/* Auto update hari dari tanggal */
function updateHari() {
  if (!form.value.tanggal) {
    form.value.hari = ""
    return
  }
  const date = new Date(form.value.tanggal)
  form.value.hari = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(date)
}

/* Simpan data */
async function save() {
  if (form.value.waktu_mulai?.length === 5) {
    form.value.waktu_mulai += ":00"
  }
  if (form.value.waktu_selesai?.length === 5) {
    form.value.waktu_selesai += ":00"
  }

  if (form.value.id) {
    await fixedSchedules.update(form.value.id, form.value)
  } else {
    await fixedSchedules.create(form.value)
  }

  showForm.value = false
  fetchData()
}

/* Hapus data */
async function remove(id) {
  if (confirm("Delete schedule?")) {
    await fixedSchedules.delete(id)
    fetchData()
  }
}

/* Format tampilan */
function formatDate(dateStr) {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toISOString().split("T")[0]
}

function formatTime(timeStr) {
  return timeStr ? timeStr.slice(0, 5) : ""
}

onMounted(fetchData)
</script>
