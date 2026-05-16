import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // No mostramos el panel si estamos en la página de login
  if (location.pathname === '/login') return null;

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="sidebar">
      <Link to="/home" className="sidebar-brand">SYS_PKMN</Link>
      
      {user && (
        <div className="sidebar-links">
          <Link to="/home"> DASHBOARD_CENTRAL</Link>
          <Link to="/filtrar"> MÓDULO_FILTROS</Link>
        </div>
      )}

      <div className="sidebar-footer">
        {user && (
          <>
            <span className="nav-user">ID: {user.username}</span>
            <button onClick={handleLogout} className="btn-logout">DESCONECTAR</button>
          </>
        )}
      </div>
    </nav>
  )
}