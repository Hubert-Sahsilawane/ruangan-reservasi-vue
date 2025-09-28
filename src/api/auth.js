import api from './axios'

export const auth = {
  login: data => api.post('/login', data),
  register: data => api.post('/register', data),
  profile: () => api.get('/me'),
  updateProfile: data => api.put('/me', data),
  logout: () => api.post('/logout')
}
