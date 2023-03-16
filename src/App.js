import logo from './logo.svg';
import LazyLoad from 'react-lazy-load';
import './App.css';
import PokemonList from './components/pokemon-list';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='bt-container'> 
    <PokemonList />
  </div>
  );
}

export default App;
