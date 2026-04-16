import { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getRandomPokemons = async () => {
      const promises = [];

      for (let i = 0; i < 20; i++) {
        const randomId = Math.floor(Math.random() * 151) + 1;

        promises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
            .then((res) => res.json())
        );
      }

      const results = await Promise.all(promises);

      const formatted = results.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        type: pokemon.types[0].type.name,
      }));

      setPokemons(formatted);
    };

    getRandomPokemons();
  }, []);

  return (
    <div className="container">
      <h1>Pokédex</h1>

      <div className="grid">
        {pokemons.map((poke) => (
          <PokemonCard
            key={poke.id}
            id={poke.id}
            name={poke.name}
            image={poke.image}
            type={poke.type}
          />
        ))}
      </div>
    </div>
  );
}

export default App;