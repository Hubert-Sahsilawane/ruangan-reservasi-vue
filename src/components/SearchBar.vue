<template>
  <div class="flex items-center bg-gray-100 rounded px-3 py-2 w-96">
    <svg class="w-4 h-4 text-gray-500 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M21 20l-5.6-5.6"/></svg>
    <input v-model="q" @keyup.enter="emitSearch" type="text" placeholder="Cari..." class="bg-transparent outline-none w-full text-sm"/>
  </div>
</template>

<script setup>
import { ref } from "vue"
const q = ref('')
const emit = defineEmits(['search'])
function emitSearch() { emit('search', q.value) }
</script>
