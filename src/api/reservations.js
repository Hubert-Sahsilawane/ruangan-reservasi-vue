import api from './axios'

export const reservations = {
  all: (params = {}) => api.get('/reservations', { params }),

  // Karyawan
  create: data => api.post('/karyawan/reservations', data),
  cancel: (id, reason = "") => api.put(`/karyawan/reservations/${id}/cancel`, { reason }),


  // Admin
  approve: (id, reason = "") => api.put(`/reservations/${id}`, { status: 'approved', reason }),
  reject: (id, reason = "") => api.put(`/reservations/${id}`, { status: 'rejected', reason }),
  destroy: id => api.delete(`/reservations/${id}`)
}
