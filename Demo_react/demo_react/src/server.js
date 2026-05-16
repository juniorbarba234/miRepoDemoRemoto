import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import auth from "./auth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configuración CORS estricta requerida para Cookies HttpOnly
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const SECRET = "supersupersecreto";

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Validación simulada
    if (username === "admin" && password === "12345") {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Cambiar a true si usas HTTPS
            sameSite: "Lax"   
        });
        return res.json({ message: "Login exitoso. Cookie HTTP-Only guardada." });
    }
    return res.status(401).json({ message: "Credenciales inválidas" });
});

app.get("/perfil", auth, (req, res) => {
    res.json({
        message: "¡Acceso concedido! Eres un usuario protegido.",
        user: req.user
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout exitoso. Cookie eliminada." });
});

app.listen(3000, () => {
    console.log("Servidor backend corriendo en http://localhost:3000");
});