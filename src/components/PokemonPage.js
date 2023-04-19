import React, {useEffect, useState} from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState ("")

  useEffect(() => {
    fetch("http://localhost:3001/pokemon")
    .then(response => response.json())
    .then(data => setPokemons(data))
  },[])

  function handleAddPokemon(newPokemon) {
    setPokemons([...pokemons, newPokemon]);
  }
  

  const pokemonsToDisplay = pokemons.filter((pokemon) => 
  pokemon.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onAddPokemon={handleAddPokemon} pokemons={pokemons}/>
      <br />
      <Search search={search} setSearch={setSearch}/>
      <br />
      <PokemonCollection pokemons={pokemonsToDisplay}/>
    </Container>
  );
}

export default PokemonPage;
