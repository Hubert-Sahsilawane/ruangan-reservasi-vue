<template>
  <div class="flex items-center bg-gray-100 rounded w-96 overflow-hidden">
    <!-- Ikon search -->
    <svg
      class="w-5 h-5 text-gray-500 ml-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z">
      </path>
    </svg>

    <!-- Input -->
    <input
      v-model="q"
      @keyup.enter="emitSearch"
      type="text"
      placeholder="Cari..."
      class="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
    />

    <!-- Tombol Cari -->
    <button
      @click="emitSearch"
      class="bg-blue-500 text-white text-sm px-4 py-2 hover:bg-blue-600 transition"
    >
      Cari
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue"
const q = ref('')
const emit = defineEmits(['search'])

function emitSearch() {
  emit('search', q.value)
}
</script>
