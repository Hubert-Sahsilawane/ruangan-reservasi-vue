import { createRouter, createWebHistory } from "vue-router"
import Login from "@/views/auth/Login.vue"
import Register from "@/views/auth/Register.vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import DashboardView from "@/views/admin/DashboardView.vue"
import Rooms from "@/views/admin/Rooms.vue"
import Reservations from "@/views/admin/Reservations.vue"
import FixedSchedules from "@/views/admin/FixedSchedules.vue"
import Calendar from "@/views/admin/Calendar.vue"
import Profile from "@/views/admin/Profile.vue"

const routes = [
  {
    path: "/",
    redirect: "/login", // default redirect
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true }, // proteksi
    children: [
      { path: "", name: "Dashboard", component: DashboardView },
      { path: "rooms", name: "Rooms", component: Rooms },
      { path: "reservations", name: "Reservations", component: Reservations },
      { path: "fixed-schedules", name: "FixedSchedules", component: FixedSchedules },
      { path: "calendar", name: "Calendar", component: Calendar },
      { path: "profile", name: "Profile", component: Profile },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Proteksi route (global guard)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")

  if (to.meta.requiresAuth && !token) {
    next("/login") // kalau belum login, lempar ke login
  } else if ((to.path === "/login" || to.path === "/register") && token) {
    next("/admin") // kalau udah login, ga boleh balik ke login/register
  } else {
    next() // lanjut normal
  }
})

export default router
