<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-green-700 mb-6">Register</h1>

      <form @submit.prevent="onRegister" class="space-y-4">
        <!-- Nama -->
        <div>
          <label class="block text-sm font-medium mb-1">Nama</label>
          <input
            v-model="name"
            type="text"
            placeholder="Masukkan nama"
            class="w-full border rounded px-3 py-2 focus:ring focus:ring-green-200 focus:outline-none"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Masukkan email"
            class="w-full border rounded px-3 py-2 focus:ring focus:ring-green-200 focus:outline-none"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            class="w-full border rounded px-3 py-2 focus:ring focus:ring-green-200 focus:outline-none"
            required
          />
        </div>

        <!-- Konfirmasi Password -->
        <div>
          <label class="block text-sm font-medium mb-1">Konfirmasi Password</label>
          <input
            v-model="passwordConfirmation"
            type="password"
            placeholder="Ulangi password"
            class="w-full border rounded px-3 py-2 focus:ring focus:ring-green-200 focus:outline-none"
            required
          />
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </p>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Register</span>
        </button>
      </form>

      <p class="text-sm text-center mt-4">
        Sudah punya akun?
        <router-link to="/login" class="text-green-600 hover:underline">
          Login disini
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/api/axios"

const name = ref("")
const email = ref("")
const password = ref("")
const passwordConfirmation = ref("")
const errorMessage = ref("")
const loading = ref(false)
const router = useRouter()

const onRegister = async () => {
  errorMessage.value = ""
  loading.value = true

  try {
    if (password.value !== passwordConfirmation.value) {
      errorMessage.value = "Password dan konfirmasi password tidak sama!"
      return
    }

    await api.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })

    // setelah register berhasil, langsung arahkan ke login
    router.push("/login")
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Registrasi gagal!"
  } finally {
    loading.value = false
  }
}
</script>
