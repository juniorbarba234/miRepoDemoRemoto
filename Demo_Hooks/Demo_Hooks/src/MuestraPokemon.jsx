import { useEffect, useState } from "react"

export function MuestraPokemon() {
    const[pokemon, setPokemon] = useState(null);

    useEffect(
        ()=>{
            fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
                .then(res => res.json())
                .then(data => setPokemon(data));
            },[]
    );

    return (
        <div className="pokemon-module">
            {pokemon ? (
                <div className="pokemon-data">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="poke-img" />
                    <h3 className="poke-name">{pokemon.name}</h3>
                </div>
            ) : (
                <div className="loading-glitch">INICIALIZANDO CONEXIÓN...</div>
            )}
        </div>
    );
}