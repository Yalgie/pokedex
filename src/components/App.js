import React from 'react';
import Axios from 'axios';
import Async from 'async';
import Pokemon from './Pokemon';
import Details from './Details';

class App extends React.Component {
  state = {
    loading: true,
    pokemon: [],
    query: "",
    selectedPokemon: null,
  }
  
  getAllPokemon(cb) {
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

  getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    Axios({
      method: "GET",
      url: url
    }).then((res) => {
      // localStorage.setItem(`pokemon-${id}`, JSON.stringify(res.data));
      this.setState({
        loading: false,
        selectedPokemon: res.data
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentWillMount() {
    const cachedPokemon = localStorage.getItem('pokemon');
    
    if (cachedPokemon === null) {
      this.getAllPokemon();
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
      query: e.target.value.toLowerCase()
    });

  handleFormSubmit = (e) => {
    e.preventDefault();
  }

  handlePokemonSelection = (id) => {
    // const cachedPokemon = localStorage.getItem(`pokemon-${id}`);
    this.setState({
      loading: true
    });

    // if (cachedPokemon === null) {
    //   this.getPokemon(id);
    // }
    // else {
    //   this.setState({
    //     loading: false,
    //     selectedPokemon: JSON.parse(cachedPokemon)
    //   });
    // }

    this.getPokemon(id);
  }

  handleReset = (e) => {
    this.setState({
      selectedPokemon: null
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading">
          <img alt="loading" src={require('../images/loading.gif')} />
          <p>Loading</p>
        </div>
      );
    }
    else if (!this.state.loading && this.state.selectedPokemon === null) {
      return(
        <div className="container">
          <img className="logo" alt="logo" src={require('../images/logo.png')} />
          <form className="searchForm" onSubmit={this.handleFormSubmit}>
						<input 
							type="text" 
							onChange={this.handleNameInput}
							value={this.state.query} 
							placeholder="Search"
						/>
					</form>
          <Pokemon 
            pokemon={this.state.pokemon} 
            query={this.state.query}
            handlePokemonSelection={this.handlePokemonSelection}
          />
          <p className="credit text-center">Thanks to <a rel="noopener noreferrer" href="https://pokeapi.co/" target="_blank">Pokéapi</a> for the awesome API</p>
        </div>
      )
    }
    else if (!this.state.loading && this.state.selectedPokemon !== null) {
      return(
        <div className="container">
          <Details 
            handleReset={this.handleReset}
            pokemon={this.state.selectedPokemon}
          />
        </div>
      )
    }
  }
}

export default App;