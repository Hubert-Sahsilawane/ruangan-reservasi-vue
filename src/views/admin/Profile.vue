<template>
  <div class="max-w-lg bg-white p-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Profile</h2>

    <div class="mb-4">
      <label class="block text-sm font-medium">Name</label>
      <input v-model="profile.name" class="border w-full p-2 rounded"/>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium">Email</label>
      <input v-model="profile.email" type="email" class="border w-full p-2 rounded"/>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium">Role</label>
      <input v-model="profile.role" disabled class="border w-full p-2 rounded bg-gray-100 text-gray-600"/>
    </div>

    <div class="flex justify-end gap-2">
      <button @click="cancel" class="px-4 py-2 rounded border">Cancel</button>
      <button @click="update" class="bg-green-600 text-white px-4 py-2 rounded">Update</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { auth } from '@/api/auth'
import router from '@/router'

const profile = ref({ name: '', email: '', role: '' })

onMounted(async () => {
  try {
    const res = await auth.profile()
    profile.value = res.data
  } catch (err) {
    console.error(err)
  }
})

async function update() {
  try {
    await auth.update(profile.value)
    alert('Profile updated successfully!')
  } catch (err) {
    console.error(err)
    alert('Failed to update profile')
  }
}

function cancel() {
  router.push('/admin')
}
</script>
