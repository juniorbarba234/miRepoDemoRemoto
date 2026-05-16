import { useState, useEffect } from "react";

export default function useAuthLocalStorage(){
    const [token, setToken] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("token_local");
        if(saved) setToken(saved);
    }, []);

    const login = () => {
        const fakeToken = "local_token_123xyz";
        localStorage.setItem("token_local", fakeToken);
        setToken(fakeToken);
    }

    const logout = () => {
        localStorage.removeItem("token_local");
        setToken(null);
    }

    return { token, login, logout };
}