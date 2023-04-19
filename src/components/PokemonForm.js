import React, {useState, useEffect} from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({onAddPokemon, pokemons}) {
  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    front: "",
    back: "",
  })

function handleChange(event) {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })
}

function handleSubmit(event) {
  console.log("submit")
  event.preventDefault()
  const newPokemon = {
    id: pokemons.length + 2,
    name: formData.name,
    hp: formData.hp,
    sprites: {
      front: formData.front,
      back: formData.back
    }
  }
  fetch("http://localhost:3001/pokemon", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newPokemon)
  })
  .then((r) => r.json())
  .then(onAddPokemon);
}

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input 
            fluid 
            label="Name" 
            placeholder="Name" 
            name="name" 
            value={formData.name} 
            onChange ={handleChange}
          />
          <Form.Input 
            fluid 
            label="hp" 
            placeholder="hp" 
            name="hp" 
            value={formData.hp} 
            onChange= {handleChange}
          />
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="front"
            value={formData.front}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="back"
            value={formData.back}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
