import { useEffect, useState } from "react"

export function UsaHookEffect() {
    const[hora, setHora] = useState(new Date());

    useEffect(
        ()=>{
            const timer = setInterval(
                ()=>{
                    setHora(new Date());
                }, 1000
            );
            return ()=> clearInterval(timer);
        },[]
    );

    return (
        <div className="clock-module">
            <div className="time-display">{hora.toLocaleTimeString()}</div>
            <div className="status-blinker">ESTADO: EN LÍNEA</div>
        </div>
    );
}