<template>
  <div class="bg-white p-6 rounded shadow">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

// API service (nanti kamu bikin di /api)
import { reservations } from '@/api/reservations'
import { fixedSchedules } from '@/api/fixedSchedules'
import { rooms } from '@/api/rooms'

const events = ref([])

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: events.value,
  eventColor: '#2563eb', // default biru
})

// helper buat bedain warna event
const getEventColor = (type, status = null) => {
  if (type === 'reservation') {
    if (status === 'approved') return '#16a34a' // hijau
    if (status === 'pending') return '#f59e0b' // kuning
    if (status === 'rejected') return '#dc2626' // merah
    return '#6b7280' // abu2
  }
  if (type === 'fixed') return '#3b82f6' // biru
  return '#64748b'
}

onMounted(async () => {
  const allEvents = []

  // === 1. Ambil Reservations ===
  try {
    const res = await reservations.all()
    const reservationEvents = res.data.data?.map(r => ({
      id: 'reservation-' + r.id,
      title: `[Reservasi] ${r.room?.name || 'Ruangan'} - ${r.status}`,
      start: r.tanggal + 'T' + r.waktu_mulai,
      end: r.tanggal + 'T' + r.waktu_selesai,
      backgroundColor: getEventColor('reservation', r.status),
      borderColor: getEventColor('reservation', r.status),
    })) || []
    allEvents.push(...reservationEvents)
  } catch (e) {
    console.error("Gagal load reservations", e)
  }

  // === 2. Ambil FixedSchedules ===
  try {
    const fs = await fixedSchedules.all()
    const fixedEvents = fs.data.data?.map(f => ({
      id: 'fixed-' + f.id,
      title: `[Fixed] ${f.room?.name || 'Ruangan'} - ${f.hari}`,
      start: f.tanggal + 'T' + f.waktu_mulai,
      end: f.tanggal + 'T' + f.waktu_selesai,
      backgroundColor: getEventColor('fixed'),
      borderColor: getEventColor('fixed'),
    })) || []
    allEvents.push(...fixedEvents)
  } catch (e) {
    console.error("Gagal load fixed schedules", e)
  }

  // === 3. Ambil Rooms (optional → hanya info tambahan, bukan event) ===
  try {
    const rs = await rooms.all()
    console.log("Rooms loaded:", rs.data.data)
    // Bisa dipakai buat filter / legend di atas calendar
  } catch (e) {
    console.error("Gagal load rooms", e)
  }

  // set ke calendar
  events.value = allEvents
  calendarOptions.value.events = events.value
})
</script>
  