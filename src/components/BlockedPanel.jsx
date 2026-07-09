import { getIdFromUrl, getPokemonImage } from '../utils/PokemonHelpers';

function BlockedPanel({ blockedPokemons, onToggleBlock }) {
  return (
    <section className="blocked-panel">
      <h2>Bloqueados ({blockedPokemons.length})</h2>
      {blockedPokemons.length === 0 && (
        <p className="empty-message">No hay pokémon bloqueados.</p>
      )}
      <ul className="favorites-list">
        {blockedPokemons.map((pokemon) => {
          const id = getIdFromUrl(pokemon.url);
          return (
            <li key={pokemon.name} className="favorite-item">
              <img src={getPokemonImage(id)} alt={pokemon.name} />
              <span>{pokemon.name}</span>
              <button
                className="remove-btn"
                onClick={() => onToggleBlock(pokemon)}
                aria-label="Desbloquear pokémon"
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BlockedPanel;
