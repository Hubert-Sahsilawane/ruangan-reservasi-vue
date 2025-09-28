<template>
  <aside class="w-64 bg-white border-r min-h-screen flex flex-col">
    <div class="px-6 py-5 border-b">
      <h2 class="font-bold text-lg text-green-700">Reservasi Ruangan</h2>
    </div>

    <nav class="p-4 space-y-1 flex-1">
      <router-link to="/admin" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        📊 <span>Dashboard</span>
      </router-link>
      <router-link to="/admin/rooms" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        🏛️ <span>Rooms</span>
      </router-link>
      <router-link to="/admin/reservations" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        🗓️ <span>Reservations</span>
      </router-link>
      <router-link to="/admin/fixed-schedules" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        📌 <span>Fixed Schedules</span>
      </router-link>
      <router-link to="/admin/calendar" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        📅 <span>Calendar</span>
      </router-link>
      <router-link to="/admin/profile" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50">
        👤 <span>Profile</span>
      </router-link>
    </nav>

    <div class="px-4 py-6">
      <button class="w-full bg-green-600 text-white py-2 rounded">Upgrade</button>
    </div>
  </aside>
</template>
