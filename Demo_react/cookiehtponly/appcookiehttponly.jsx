import { useState } from "react";

export default function AppCookieHttpOnly() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("12345");
    const [mensaje, setMensaje] = useState("");

    const login = async () => {
        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            setMensaje(data.message);
        } catch (error) {
            setMensaje("Error de conexión al servidor");
        }
    };

    const obtenerPerfil = async () => {
        try {
            const res = await fetch("http://localhost:3000/perfil", {
                credentials: "include"
            });
            const data = await res.json();
            setMensaje(data.message);
        } catch (error) {
            setMensaje("Error al obtener perfil");
        }
    };

    const logout = async () => {
        try {
            const res = await fetch("http://localhost:3000/logout", {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            setMensaje(data.message);
        } catch (error) {
            setMensaje("Error al cerrar sesión");
        }
    };

    return (
        <div className="neu-card">
            <h3>Backend (HttpOnly)</h3>
            <input
                className="neu-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
            />
            <input
                className="neu-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                type="password"
            />
            <button className="neu-btn" onClick={login}>Iniciar Sesión</button>
            <button className="neu-btn" onClick={obtenerPerfil}>Validar Perfil</button>
            <button className="neu-btn" onClick={logout}>Cerrar Sesión</button>
            
            {mensaje && (
                <div className="response-box">
                    <strong>Server:</strong> {mensaje}
                </div>
            )}
        </div>
    );
}