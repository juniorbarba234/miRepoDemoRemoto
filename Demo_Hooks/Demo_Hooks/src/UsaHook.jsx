import { useState } from "react";

function UsaHook(){
    const[contador, setContador] = useState(0);
    
    return(
        <div className="counter-module">
            <div className="count-display">{contador}</div>
            <div className="cyber-buttons">
                <button className="cy-btn btn-dec" onClick={()=>setContador(contador-1)}>DECREMENTAR</button>
                <button className="cy-btn btn-inc" onClick={()=>setContador(contador+1)}>INCREMENTAR</button>
            </div>
        </div>
    );
}

export default UsaHook;