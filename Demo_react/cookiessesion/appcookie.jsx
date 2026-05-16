import { useAuthCookie } from "./useAuthCookie";

export default function AppCookie() {
    const { token, login, logout } = useAuthCookie();

    return (
        <div className="neu-card">
            <h3>Frontend (JS Cookie)</h3>
            
            {token ? (
                <>
                    <div className="status-badge">● Sesión Activa</div>
                    <button className="neu-btn" onClick={logout}>Cerrar Sesión</button>
                </>
            ) : (
                <>
                    <div className="status-badge" style={{ color: '#d63031' }}>○ Desconectado</div>
                    <button className="neu-btn" onClick={login}>Generar Cookie</button>
                </>
            )}
        </div>
    );
}