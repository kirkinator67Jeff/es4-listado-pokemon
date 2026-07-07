import Header from './components/Header';
import PokemonList from './components/PokemonList';
import useFetch from './hooks/useFetch';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

function App() {
  const { data, loading, error } = useFetch(API_URL);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {loading && <p className="status-message">Cargando pokémon...</p>}
        {error && (
          <p className="status-message error">
            Ocurrió un error al cargar los datos: {error}
          </p>
        )}
        {!loading && !error && data && (
          <PokemonList pokemons={data.results} />
        )}
      </main>
    </div>
  );
}

export default App;