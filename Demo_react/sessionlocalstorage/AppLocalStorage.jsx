import useAuthLocalStorage from './useAuthLocalStorage.';

export default function AppLocalStorage() {
    const { token, login, logout } = useAuthLocalStorage();

    return (
        <div className="neu-card">
            <h3>Frontend (LocalStorage)</h3>
            
            {token ? (
                <>
                    <div className="status-badge">● Sesión Activa</div>
                    <button className="neu-btn" onClick={logout}>Cerrar Sesión</button>
                </>
            ) : (
                <>
                    <div className="status-badge" style={{ color: '#d63031' }}>○ Desconectado</div>
                    <button className="neu-btn" onClick={login}>Guardar Token</button>
                </>
            )}
        </div>
    );
}