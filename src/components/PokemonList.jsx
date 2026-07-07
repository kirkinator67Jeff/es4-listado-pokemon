import PokemonCard from './PokemonCard';

function PokemonList({ pokemons, favorites, onToggleFavorite }) {
  if (pokemons.length === 0) {
    return <p className="empty-message">No se encontraron pokémon.</p>;
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          isFavorite={favorites.some((fav) => fav.name === pokemon.name)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default PokemonList;