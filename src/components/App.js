import React from 'react';
import Axios from 'axios';
import Async from 'async';

class App extends React.Component {
  state = {
    loading: true,
    pokemon: []
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
  render() {
    if (this.state.loading) {
      return (
        <p>Loading</p>
      );
    }
    else if (!this.state.loading) {
      return (
        <ul>
          {JSON.stringify(this.state.pokemon)}
        </ul>
      );
    }
  }
}

export default App;