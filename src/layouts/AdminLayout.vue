<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white border-r h-screen transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16'
      ]"
    >
      <div class="flex items-center justify-between p-4">
        <span v-if="sidebarOpen" class="font-bold text-green-700">Reservasi Ruangan</span>
        <button @click="toggleSidebar" class="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <nav>
        <router-link
          v-for="item in menu"
          :key="item.name"
          :to="item.path"
          class="flex items-center gap-2 p-3 hover:bg-gray-100"
        >
          <span>{{ sidebarOpen ? item.name : item.icon }}</span>
        </router-link>
      </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-4 bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue"

const sidebarOpen = ref(true)
const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)

const menu = [
  { name: "Dashboard", path: "/admin", icon: "🏠" },
  { name: "Rooms", path: "/admin/rooms", icon: "🏢" },
  { name: "Reservations", path: "/admin/reservations", icon: "📅" },
  { name: "Fixed Schedules", path: "/admin/fixed-schedules", icon: "📌" },
  { name: "Calendar", path: "/admin/calendar", icon: "🗓️" },
  { name: "Profile", path: "/admin/profile", icon: "👤" },
]
</script>
