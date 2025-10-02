<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-semibold">My Reservations</h2>
      <button
        @click="openForm()"
        class="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Reservasi
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="!list.length" class="text-center py-10 text-gray-500">
      Belum ada reservasi.
    </div>

    <!-- Tabel -->
    <div v-else>
      <table class="w-full bg-white shadow rounded border">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-3">Room</th>
            <th class="p-3">Tanggal</th>
            <th class="p-3">Hari</th>
            <th class="p-3">Jam</th>
            <th class="p-3">Status</th>
            <th class="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="r in list"
            :key="r.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-3">{{ r.room?.name }}</td>
            <td class="p-3">{{ r.tanggal }}</td>
            <td class="p-3">{{ r.hari }}</td>
            <td class="p-3">{{ r.waktu_mulai }} - {{ r.waktu_selesai }}</td>
            <td class="p-3">
              <span
                :class="{
                  'text-green-600': r.status === 'approved',
                  'text-red-600': r.status === 'rejected',
                  'text-yellow-600': r.status === 'pending',
                  'text-gray-500': r.status === 'cancelled'
                }"
              >
                {{ r.status }}
              </span>
            </td>
            <td class="p-3 text-right">
              <button
                v-if="['pending','approved'].includes(r.status)"
                @click="cancelReservation(r.id)"
                class="px-2 text-red-600"
              >
                ❌ Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form Reservasi -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded w-96 shadow-lg">
        <h3 class="text-lg mb-4 font-semibold">Buat Reservasi</h3>

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

        <!-- Hari -->
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

    <!-- Modal Cancel -->
    <div
      v-if="showCancel"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded w-96 shadow-lg">
        <h3 class="text-lg mb-4 font-semibold">Cancel Reservation</h3>

        <label class="block mb-2 text-sm font-medium">Alasan pembatalan (opsional)</label>
        <textarea
          v-model="cancelReason"
          placeholder="Tuliskan alasan pembatalan..."
          class="w-full border rounded p-2 mb-4"
        ></textarea>

        <div class="flex justify-end gap-2">
          <button @click="showCancel = false" class="px-4 py-2 rounded border">Batal</button>
          <button
            @click="confirmCancel"
            class="bg-red-600 text-white px-4 py-2 rounded"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { reservations } from "@/api/reservations"
import api from "@/api/axios"

const list = ref([]) // daftar reservasi
const roomsList = ref([])
const fixedSchedules = ref([]) // simpan fixed schedule

const showForm = ref(false)
const showCancel = ref(false)
const cancelId = ref(null)
const cancelReason = ref("")

const form = ref({
  room_id: "",
  tanggal: "",
  hari: "",
  waktu_mulai: "",
  waktu_selesai: ""
})

/* Ambil data awal */
async function fetchData() {
  const res = await reservations.all()
  list.value = res.data?.data || res.data || []

  const r = await api.get("/rooms")
  roomsList.value = r.data?.data || r.data || []

  const fs = await api.get("/fixed-schedules")
  fixedSchedules.value = fs.data?.data || fs.data || []
}

/* Buka modal */
function openForm() {
  form.value = {
    room_id: "",
    tanggal: "",
    hari: "",
    waktu_mulai: "",
    waktu_selesai: ""
  }
  showForm.value = true
}

/* Auto isi hari dari tanggal */
function updateHari() {
  if (!form.value.tanggal) {
    form.value.hari = ""
    return
  }
  const date = new Date(form.value.tanggal)
  form.value.hari = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(date)
}

/* Cek bentrok waktu */
function isOverlap(start1, end1, start2, end2) {
  return !(end1 <= start2 || start1 >= end2)
}

/* Simpan reservasi baru */
async function save() {
  const { room_id, tanggal, hari, waktu_mulai, waktu_selesai } = form.value

  if (!room_id || !tanggal || !waktu_mulai || !waktu_selesai) {
    alert("⚠️ Lengkapi semua field terlebih dahulu.")
    return
  }

  const start = waktu_mulai
  const end = waktu_selesai

  // ✅ Cek bentrok dengan Fixed Schedule
  const conflictFS = fixedSchedules.value.some(fs =>
    fs.room_id === room_id &&
    fs.hari.toLowerCase() === hari.toLowerCase() &&
    isOverlap(start, end, fs.waktu_mulai, fs.waktu_selesai)
  )
  if (conflictFS) {
    alert("❌ Reservasi ditolak karena bentrok dengan Fixed Schedule.")
    return
  }

  // ✅ Cek bentrok dengan reservasi approved
  const conflictApproved = list.value.some(r =>
    r.room_id === room_id &&
    r.tanggal === tanggal &&
    r.status === "approved" &&
    isOverlap(start, end, r.waktu_mulai, r.waktu_selesai)
  )
  if (conflictApproved) {
    alert("❌ Reservasi ditolak karena sudah ada reservasi approved di jam tersebut.")
    return
  }

  // 🚀 Kalau aman, simpan ke backend
  try {
    await reservations.create(form.value)
    showForm.value = false
    fetchData()
  } catch (err) {
    alert("❌ Gagal membuat reservasi. Cek console.")
    console.error(err.response?.data || err.message)
  }
}

/* Tampilkan modal cancel */
function cancelReservation(id) {
  cancelId.value = id
  cancelReason.value = ""
  showCancel.value = true
}

/* Konfirmasi cancel */
async function confirmCancel() {
  try {
    await reservations.cancel(cancelId.value, cancelReason.value)
    showCancel.value = false
    fetchData()
  } catch (err) {
    alert("❌ Gagal membatalkan reservasi.")
    console.error(err.response?.data || err.message)
  }
}

onMounted(fetchData)
</script>
