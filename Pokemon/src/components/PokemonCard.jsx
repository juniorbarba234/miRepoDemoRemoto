function PokemonCard({ name, image, type, id }) {
    return (
      <div className="pokemon-card">
        <span className="pokemon-id">#{id}</span>
  
        <img src={image} alt={name} />
  
        <h3>{name}</h3>
  
        <span className="pokemon-type">{type}</span>
      </div>
    );
  }
  
  export default PokemonCard;