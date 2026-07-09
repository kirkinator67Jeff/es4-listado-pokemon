import { getIdFromUrl, getPokemonImage } from '../utils/PokemonHelpers';

function FavoritesPanel({ favorites, onToggleFavorite }) {
  return (
    <aside className="favorites-panel">
      <h2>Favoritos ({favorites.length})</h2>
      {favorites.length === 0 && (
        <p className="empty-message">Aún no tienes favoritos.</p>
      )}
      <ul className="favorites-list">
        {favorites.map((pokemon) => {
          const id = getIdFromUrl(pokemon.url);
          return (
            <li key={pokemon.name} className="favorite-item">
              <img src={getPokemonImage(id)} alt={pokemon.name} />
              <span>{pokemon.name}</span>
              <button
                className="remove-btn"
                onClick={() => onToggleFavorite(pokemon)}
                aria-label="Quitar de favoritos"
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default FavoritesPanel;