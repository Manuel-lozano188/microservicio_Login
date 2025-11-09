// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api'

function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectParam = searchParams.get('redirect')
  const toParam = searchParams.get('to') // helper param para páginas específicas

  // Actualiza el estado del form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Envía login al backend
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = { ...form }

      // Manejo de redirect opcional
      let redirectToSend = redirectParam
      if (!redirectToSend && toParam === 'opcion1') {
        redirectToSend = 'http://localhost:5000/opcion1/index.html'
      }
      if (redirectToSend) body.redirect = redirectToSend

      console.log('Login request body:', body)

      const res = await api.post('/auth/login', body)
      console.log('Login response data:', res?.data)

      // Guardar token en localStorage
      const token = res.data?.token || res.data
      if (token) {
        localStorage.setItem('token', token)
        console.log('Token guardado:', token)
      }

      // Redirige si backend envía redirect + code
      const redirect = res.data?.redirect
      const code = res.data?.code
      if (redirect && code) {
        window.location.href = `${redirect}${redirect.includes('?') ? '&' : '?'}code=${encodeURIComponent(code)}`
        return
      }

      // Redirige a SPA protegida
      navigate('/app')
    } catch (err) {
      console.error('Error en login:', err.response?.data || err.message)
      alert('Error en login: ' + (err.response?.data || err.message))
    }
  }

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <a href="/register">No tienes cuenta? Regístrate</a>
    </div>
  )
}

export default Login
