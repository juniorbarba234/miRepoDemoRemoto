import AppLocalStorage from './AppLocalStorage'
import AppCookie from './AppCookie'
import AppCookieHttpOnly from './AppCookieHttpOnly'
import './index.css'

function App() {
  return (
    <div>
      <h1 className="dashboard-title">Panel de Autenticación Soft UI</h1>
      
      <div className="auth-grid">
        {/* Modulo 1: Local Storage */}
        <AppLocalStorage />

        {/* Modulo 2: Javascript Cookies */}
        <AppCookie />

        {/* Modulo 3: Backend con Cookies HttpOnly */}
        <AppCookieHttpOnly />
      </div>
    </div>
  )
}

export default App