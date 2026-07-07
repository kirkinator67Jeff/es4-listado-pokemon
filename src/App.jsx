import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import FavoritesPanel from './components/FavoritesPanel';
import BlockedPanel from './components/BlockedPanel';
import useFetch from './hooks/useFetch';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const FAVORITES_STORAGE_KEY = 'pokemon-favorites';
const BLOCKED_STORAGE_KEY = 'pokemon-blocked';

function App() {
  const { data, loading, error } = useFetch(API_URL);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [blockedPokemons, setBlockedPokemons] = useState(() => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = window.localStorage.getItem(BLOCKED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.localStorage.setItem(BLOCKED_STORAGE_KEY, JSON.stringify(blockedPokemons));
  }, [blockedPokemons]);

  useEffect(() => {
    setFavorites((prev) =>
      prev.filter(
        (fav) => !blockedPokemons.some((blocked) => blocked.name === fav.name)
      )
    );
  }, [blockedPokemons]);

  const filteredPokemons = useMemo(() => {
    if (!data) return [];
    return data.results.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !blockedPokemons.some((blocked) => blocked.name === pokemon.name)
    );
  }, [data, searchTerm, blockedPokemons]);

  function handleToggleFavorite(pokemon) {
    setFavorites((prev) => {
      const alreadyFavorite = prev.some((fav) => fav.name === pokemon.name);
      if (alreadyFavorite) {
        return prev.filter((fav) => fav.name !== pokemon.name);
      }
      return [...prev, pokemon];
    });
  }

  function handleToggleBlock(pokemon) {
    const isBlocked = blockedPokemons.some((blocked) => blocked.name === pokemon.name);

    if (isBlocked) {
      setBlockedPokemons((prev) =>
        prev.filter((blocked) => blocked.name !== pokemon.name)
      );
      return;
    }

    setBlockedPokemons((prev) => [...prev, pokemon]);
    setFavorites((prev) => prev.filter((fav) => fav.name !== pokemon.name));
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
              blockedPokemons={blockedPokemons}
              onToggleFavorite={handleToggleFavorite}
              onToggleBlock={handleToggleBlock}
            />
          )}
        </main>

        <aside className="sidebar">
          <FavoritesPanel
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
          <BlockedPanel
            blockedPokemons={blockedPokemons}
            onToggleBlock={handleToggleBlock}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;