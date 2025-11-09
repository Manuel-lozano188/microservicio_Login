// src/api.js
import axios from 'axios'

//  Configuración base de Axios
const api = axios.create({
  // Para Docker: host.docker.internal apunta al host desde el contenedor
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

//  Interceptor: agrega automáticamente el token JWT si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Logging para depuración
    console.log('Enviando request a:', config.url, 'con headers:', config.headers)
    return config
  },
  (error) => Promise.reject(error)
)

//  Interceptor opcional: manejar respuestas con 401 o 403 (expiración del token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn('Token inválido o expirado, cerrando sesión...')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
