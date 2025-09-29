<template>
  <aside
    :class="[
      'bg-white border-r min-h-screen flex flex-col transition-all duration-300',
      isOpen ? 'w-64' : 'w-16'
    ]"
  >
    <!-- Header -->
    <div class="px-4 py-5 border-b flex items-center justify-between">
      <h2 v-if="isOpen" class="font-bold text-lg text-green-700">
        Reservasi Ruangan
      </h2>
      <!-- Tombol toggle -->
      <button @click="$emit('toggleSidebar')" class="text-gray-600 hover:text-black">
        ☰
      </button>
    </div>

    <!-- Menu -->
    <nav class="p-2 space-y-1 flex-1">
      <router-link to="/admin" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        📊 <span v-if="isOpen">Dashboard</span>
      </router-link>
      <router-link to="/admin/rooms" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        🏛️ <span v-if="isOpen">Rooms</span>
      </router-link>
      <router-link to="/admin/reservations" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        🗓️ <span v-if="isOpen">Reservations</span>
      </router-link>
      <router-link to="/admin/fixed-schedules" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        📌 <span v-if="isOpen">Fixed Schedules</span>
      </router-link>
      <router-link to="/admin/calendar" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        📅 <span v-if="isOpen">Calendar</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="px-4 py-6">
      <button class="w-full bg-green-600 text-white py-2 rounded">
        <span v-if="isOpen">Upgrade</span>
        <span v-else>⬆</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
})
</script>
