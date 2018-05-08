import React from 'react';
import PropTypes from 'prop-types';

const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const Pokemon = props => 
   <div className='pokemon'>
        {props.pokemon.map((pokemon, index) =>
            <div key={index}>
                <img 
                    alt={pokemon.name} 
                    src={
                        baseUrl + 
                        pokemon.url.split("pokemon/")[1].split("/")[0] + 
                        ".png"} 
                    />
                <li>{pokemon.name} | {index + 1}</li>
            </div>
        )}
    </div>

Pokemon.propTypes = {
    pokemon: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
}

export default Pokemon;