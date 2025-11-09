import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AppPage from './pages/AppPage'
import ProtectedRoute from './components/ProtectedRoute'
import './styles.css'

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="navbar">
          <NavLink to="/login" className="nav-link">Login</NavLink>
          <NavLink to="/register" className="nav-link">Register</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<ProtectedRoute><AppPage/></ProtectedRoute>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
