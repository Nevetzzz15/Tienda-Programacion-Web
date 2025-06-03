import { createContext, useContext, useEffect, useState } from 'react'
import usuariosDB from '../data/usuarios.json' // base simulada

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)

  // Al cargar, intenta recuperar sesión desde localStorage
  useEffect(() => {
    const guardado = localStorage.getItem('usuario')
    if (guardado) {
      setUsuario(JSON.parse(guardado))
    }
  }, [])

  // Iniciar sesión
  const login = (correo, password) => {
    const user = usuariosDB.find(
      u => u.correo === correo && u.password === password
    )

    if (user) {
      setUsuario(user)
      localStorage.setItem('usuario', JSON.stringify(user))
      return true
    }

    return false
  }

  // Registrar nuevo usuario
  const registrar = ({ nombre, apellido, correo, password }) => {
    const existe = usuariosDB.find(u => u.correo === correo)
    if (existe) return false

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      apellido,
      correo,
      password,
      ordenes: []
    }

    // Simulación: solo actualizamos estado, no escribimos en JSON
    setUsuario(nuevoUsuario)
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario))
    return true
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  return (
    <UserContext.Provider value={{ usuario, login, logout, registrar }}>
      {children}
    </UserContext.Provider>
  )
}