import api from './axios'

export const reservations = {
  all: (params={}) => api.get('/reservations', { params }),
  approve: id => api.put(`/reservations/${id}/approve`),
  rejected: id => api.put(`/reservations/${id}/rejected`),
  destroy: id => api.delete(`/reservations/${id}`)
}
