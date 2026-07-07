import { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import FavoritesPanel from './components/FavoritesPanel';
import useFetch from './hooks/useFetch';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

function App() {
  const { data, loading, error } = useFetch(API_URL);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  const filteredPokemons = useMemo(() => {
    if (!data) return [];
    return data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  function handleToggleFavorite(pokemon) {
    setFavorites((prev) => {
      const alreadyFavorite = prev.some((fav) => fav.name === pokemon.name);
      if (alreadyFavorite) {
        return prev.filter((fav) => fav.name !== pokemon.name);
      }
      return [...prev, pokemon];
    });
  }

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <main className="main-content">
          {!loading && !error && (
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          )}

          {loading && <p className="status-message">Cargando pokémon...</p>}
          {error && (
            <p className="status-message error">
              Ocurrió un error al cargar los datos: {error}
            </p>
          )}
          {!loading && !error && (
            <PokemonList
              pokemons={filteredPokemons}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </main>

        <FavoritesPanel
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;