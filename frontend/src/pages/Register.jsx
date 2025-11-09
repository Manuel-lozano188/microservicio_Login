import React, { useState } from 'react'
import api from '../api'  // <- aquí importas tu api.js

function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', username: '', password: '', idRol: 1 })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    // use Vite environment variable if provided (set in docker-compose as VITE_API_URL)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
  
    const handleSubmit = async e => {
    e.preventDefault()
    try {
    await api.post('/auth/register', form) // use nginx proxy /api/ -> backend
      alert('Registro exitoso!')
      window.location.href = '/login'
    } catch (err) {
      console.error(err)
      alert('Error en el registro')
    }
  }

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre completo" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="username" placeholder="Usuario" onChange={handleChange} />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      <a href="/login">Ya tienes cuenta? Inicia sesión</a>
    </div>
  )
}

export default Register
