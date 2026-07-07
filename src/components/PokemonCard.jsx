import { getIdFromUrl, getPokemonImage } from '../utils/pokemonHelpers';

function PokemonCard({ pokemon, isFavorite, onToggleFavorite }) {
  const id = getIdFromUrl(pokemon.url);
  const image = getPokemonImage(id);

  return (
    <div className="pokemon-card">
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