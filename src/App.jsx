import { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import useFetch from './hooks/useFetch';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

function App() {
  const { data, loading, error } = useFetch(API_URL);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemons = useMemo(() => {
    if (!data) return [];
    return data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className="app">
      <Header />
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
        {!loading && !error && <PokemonList pokemons={filteredPokemons} />}
      </main>
    </div>
  );
}

export default App;