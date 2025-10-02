<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

    <!-- Main -->
    <div class="flex-1 flex flex-col">
      <Navbar />

      <main class="p-6 flex-1 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Sidebar from "@/components/karyawan/Sidebar.vue"
import Navbar from "@/components/karyawan/Navbar.vue"

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
