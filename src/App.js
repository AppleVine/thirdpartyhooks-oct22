import { useEffect, useState } from 'react';
import './App.css';
import { useFavicon, useLocalStorage, useTitle } from 'react-use';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImageUrl, setPokemonImageUrl] = useState("")
  const [storedPokemonName, setStoredPokemonName, removeStoredPokemonName] = useLocalStorage("pokemonName", pokemonName)
  const [pokemonFormInput, setPokemonFormInput] = useState("")

// useLocalStorage(pokemonImageUrl);
  useFavicon(pokemonImageUrl);
  useTitle(pokemonName ? 
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
    :
    "React app")

  useEffect(() => {
    setPokemonName(storedPokemonName)
  }, []);


  useEffect(() => {
    if (pokemonName){
      setStoredPokemonName(pokemonName);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        setPokemonImageUrl(data.sprites.front_default);
      });
    }
  }, [pokemonName])

  const submitNewPokemon = () => {
    console.log("Submitting name to state");
    setPokemonName(pokemonFormInput);
  }

  return (
    <div className="App">

      <form>
        <label>Pokemon name:</label>
        <input type="text" value={pokemonFormInput} onChange ={(event) => {setPokemonFormInput(event.target.value)}} />
        {/* <input type="submit" onSubmit={submitNewPokemon}/> */}
      </form>
      <button onClick={submitNewPokemon}>
        Submit Pokemon name
      </button>

    </div>
  );
}

export default App;
