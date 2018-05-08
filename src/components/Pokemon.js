import React from 'react';
import PropTypes from 'prop-types';

const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const Pokemon = props => 
   <div className='row'>
        {props.pokemon
        .filter(pokemon => pokemon.name.includes(props.query))
        .map((pokemon, index) => {
            const pokeId = pokemon.url.split("pokemon/")[1].split("/")[0];
            return(
                <div
                    onClick={() => props.handlePokemonSelection(pokeId)}
                    className='col-3 pokemon'
                    key={index}
                    id={pokeId}
                >
                    <img
                        alt={pokemon.name}
                        src={
                            baseUrl + pokeId + ".png"
                        }
                    />
                    <p>{pokemon.name}</p>
                </div>
            )
        })}
    </div>

Pokemon.propTypes = {
    pokemon: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    query: PropTypes.string.isRequired,
    handlePokemonSelection: PropTypes.func.isRequired,
}

export default Pokemon;