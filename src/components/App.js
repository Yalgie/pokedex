import React from 'react';
import Axios from 'axios';
import Async from 'async';
import Pokemon from './Pokemon';

class App extends React.Component {
  state = {
    loading: true,
    pokemon: [],
    query: "",
  }
  
  getPokemon(cb) {
    let offset = 0;
    let queries = [];
    let pokemon = [];
    
    const limit = 20;
    const offsetIncrease = 20;
    const maxResults = 151;
    const baseURL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    const loopCount = Math.round(maxResults / offsetIncrease);
    
    for (let i = 0; i < loopCount; i++) {
      queries.push(baseURL + `&offset=${offset}`);
      offset += offsetIncrease;
    }
    
    Async.mapLimit(queries, 1, (url, callback) => {
      Axios({
        method: "GET",
        url: url
      }).then((res) => {
        pokemon.push(...res.data.results);
        callback();
      }).catch((err) => {
        console.log(err);
      });
    }, () => {
      if (pokemon.length > maxResults) {
        pokemon.length = maxResults;
      }
      this.setState({
        pokemon: pokemon,
        loading: false
      });
      localStorage.setItem('pokemon', JSON.stringify(pokemon));
    });
  }
  componentWillMount() {
    const cachedPokemon = localStorage.getItem('pokemon');
    
    if (cachedPokemon === null) {
      this.getPokemon();
    }
    else {
      this.setState({
        pokemon: JSON.parse(cachedPokemon),
        loading: false
      });
    }
  }
  handleNameInput = (e) =>
    this.setState({
      query: e.target.value
    });

  handleFormSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    if (this.state.loading) {
      return (
        <p>Loading</p>
      );
    }
    else if (!this.state.loading) {
      console.log(this.state.pokemon)
      return(
        <div className="app">
          <form onSubmit={this.handleFormSubmit}>
						<input 
							type="text" 
							onChange={this.handleNameInput}
							value={this.state.query} 
							placeholder="Invite Someone"
						/>
						<button type="submit" name="submit" value="submit">Submit</button>
					</form>
          <Pokemon 
            pokemon={this.state.pokemon} 
            query={this.state.query}
          />
        </div>
      )
    }
  }
}

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

export default App;