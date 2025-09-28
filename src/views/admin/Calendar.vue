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
import { reservations } from '@/api/reservations'

const events = ref([])

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: events.value
})

onMounted(async () => {
  const res = await reservations.all()
  events.value = res.data.data?.map(r => ({
    id: r.id,
    title: r.room?.name + ' - ' + r.status,
    start: r.date + 'T' + r.start,
    end: r.date + 'T' + r.end
  })) || []
  calendarOptions.value.events = events.value
})
</script>
