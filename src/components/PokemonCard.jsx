import { getIdFromUrl, getPokemonImage } from '../utils/pokemonHelpers';

function PokemonCard({ pokemon }) {
  const id = getIdFromUrl(pokemon.url);
  const image = getPokemonImage(id);

  return (
    <div className="pokemon-card">
      <img src={image} alt={pokemon.name} loading="lazy" />
      <p className="pokemon-name">{pokemon.name}</p>
    </div>
  );
}

export default PokemonCard;