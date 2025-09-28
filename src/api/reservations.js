import api from './axios'

export const reservations = {
  all: (params={}) => api.get('/reservations', { params }),
  approve: id => api.put(`/reservations/${id}/approve`),
  reject: id => api.put(`/reservations/${id}/reject`),
  destroy: id => api.delete(`/reservations/${id}`)
}
