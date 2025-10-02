import { createRouter, createWebHistory } from "vue-router"
import Login from "@/views/auth/Login.vue"
import Register from "@/views/auth/Register.vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import KaryawanLayout from "@/layouts/KaryawanLayout.vue"
import DashboardView from "@/views/admin/Dashboard.vue"
import Rooms from "@/views/admin/Rooms.vue"
import Reservations from "@/views/admin/Reservations.vue"
import FixedSchedules from "@/views/admin/FixedSchedules.vue"
import Calendar from "@/views/admin/Calendar.vue"
import Profile from "@/views/admin/Profile.vue"

// Routes
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },

  // Admin
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, role: "admin" },
    children: [
      { path: "", name: "Dashboard", component: DashboardView },
      { path: "rooms", name: "Rooms", component: Rooms },
      { path: "reservations", name: "Reservations", component: Reservations },
      { path: "fixed-schedules", name: "FixedSchedules", component: FixedSchedules },
      { path: "calendar", name: "Calendar", component: Calendar },
      { path: "profile", name: "Profile", component: Profile },
    ],
  },

  // Karyawan
  {
    path: "/karyawan",
    component: KaryawanLayout,
    meta: { requiresAuth: true, role: "karyawan" },
    children: [
      { path: "", name: "KaryawanDashboard", component: () => import("@/views/karyawan/Dashboard.vue") },
      { path: "rooms", name: "KaryawanRooms", component: () => import("@/views/karyawan/Rooms.vue") },
      { path: "reservations", name: "KaryawanReservations", component: () => import("@/views/karyawan/Reservations.vue") },
      { path: "fixed-schedules", name: "KaryawanFixedSchedules", component: () => import("@/views/karyawan/FixedSchedules.vue") },
      { path: "profile", name: "KaryawanProfile", component: () => import("@/views/karyawan/Profile.vue") },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "{}") // simpan user saat login

  if (to.meta.requiresAuth && !token) {
    next("/login")
  } else if ((to.path === "/login" || to.path === "/register") && token) {
    // Redirect berdasarkan role
    if (user.role === "admin") next("/admin")
    else if (user.role === "karyawan") next("/karyawan")
    else next("/login") // fallback
  } else {
    next()
  }
})

export default router
