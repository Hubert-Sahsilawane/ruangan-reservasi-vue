<template>
  <aside
    :class="[
      'bg-white border-r min-h-screen flex flex-col transition-all duration-300',
      isOpen ? 'w-64' : 'w-16'
    ]"
  >
    <!-- Header -->
    <div class="px-4 py-5 border-b flex items-center justify-between">
      <h2 v-if="isOpen" class="font-bold text-lg text-blue-700">
        Karyawan Panel
      </h2>
      <!-- Tombol toggle -->
      <button @click="$emit('toggleSidebar')" class="text-gray-600 hover:text-black">
        ☰
      </button>
    </div>

    <!-- Menu -->
    <nav class="p-4 space-y-4 flex-1">
      <router-link
        to="/karyawan"
        class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white shadow hover:bg-gray-100 transition"
      >
        📊 <span v-if="isOpen">Dashboard</span>
      </router-link>

      <router-link
        to="/karyawan/rooms"
        class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white shadow hover:bg-gray-100 transition"
      >
        🏛️ <span v-if="isOpen">Rooms</span>
      </router-link>

      <router-link
        to="/karyawan/reservations"
        class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white shadow hover:bg-gray-100 transition"
      >
        🗓️ <span v-if="isOpen">Reservations</span>
      </router-link>

      <router-link
        to="/karyawan/fixed-schedules"
        class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white shadow hover:bg-gray-100 transition"
      >
        📌 <span v-if="isOpen">Fixed Schedules</span>
      </router-link>
    </nav>
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
