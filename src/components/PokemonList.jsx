import PokemonCard from './PokemonCard';

function PokemonList({ pokemons, favorites, blockedPokemons, onToggleFavorite, onToggleBlock }) {
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
          isBlocked={blockedPokemons.some((blocked) => blocked.name === pokemon.name)}
          onToggleFavorite={onToggleFavorite}
          onToggleBlock={onToggleBlock}
        />
      ))}
    </div>
  );
}

export default PokemonList;