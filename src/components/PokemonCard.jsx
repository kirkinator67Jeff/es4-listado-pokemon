import { getIdFromUrl, getPokemonImage } from '../utils/pokemonHelpers';

function PokemonCard({ pokemon, isFavorite, isBlocked, onToggleFavorite, onToggleBlock }) {
  const id = getIdFromUrl(pokemon.url);
  const image = getPokemonImage(id);

  return (
    <div className={`pokemon-card ${isBlocked ? 'blocked-card' : ''}`}>
      <button
        className={`block-btn ${isBlocked ? 'active' : ''}`}
        onClick={() => onToggleBlock(pokemon)}
        aria-label={isBlocked ? 'Desbloquear pokémon' : 'Bloquear pokémon'}
      >
        {isBlocked ? '🔓' : '🔒'}
      </button>
      <button
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(pokemon)}
        aria-label="Marcar como favorito"
      >
        {isFavorite ? '★' : '☆'}
      </button>
      <img src={image} alt={pokemon.name} loading="lazy" />
      <p className="pokemon-name">{pokemon.name}</p>
    </div>
  );
}

export default PokemonCard;