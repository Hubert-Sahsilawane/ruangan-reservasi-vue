<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-green-700 mb-6">Login</h1>

      <form @submit.prevent="onLogin" class="space-y-4">
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
          <span v-else>Login</span>
        </button>
      </form>

      <p class="text-sm text-center mt-4">
        Belum punya akun?
        <router-link to="/register" class="text-green-600 hover:underline">
          Daftar disini
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/api/axios"

const email = ref("")
const password = ref("")
const errorMessage = ref("")
const loading = ref(false)
const router = useRouter()

const onLogin = async () => {
  errorMessage.value = ""
  loading.value = true
  try {
    const res = await api.post("/login", {
      email: email.value,
      password: password.value,
    })

    // cek beberapa kemungkinan key token
    const token =
      res.data.access_token ||
      res.data.token ||
      res.data.data?.token

    if (token) {
      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      router.push("/admin")
    } else {
      errorMessage.value = "Token tidak ditemukan di respons API!"
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Login gagal. Periksa email dan password!"
  } finally {
    loading.value = false
  }
}
</script>
