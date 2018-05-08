import React from 'react';
import PropTypes from 'prop-types';

const Details = props => 
    <div className='row details'>
        <button className="reset" onClick={props.handleReset}>Go Back</button>
        <img alt={props.pokemon.name} src={props.pokemon.sprites.front_default} />
        <p className="name"><b>{props.pokemon.name} #{props.pokemon.id}</b></p>
        <p>Height: {props.pokemon.height}"</p>
        <p>Weight: {props.pokemon.weight}kg</p>

        {/* <p>Stats</p>
        {props.pokemon.stats.map((stat, i) => {
            return(
                <div key={i}>
                    <p>{stat.stat.name} : {stat.base_stat}</p>
                </div>
            )
        })} */}

        {props.pokemon.types.map((type, i) => {
            return (
                <div key={i}>
                    <p className={`type-label ${type.type.name}`}>{type.type.name}</p>
                </div>
            )
        })}

        {/* <p>Abilities</p>
        {props.pokemon.abilities.map((ability, i) => {
            return (
                <div key={i}>
                    <p>{ability.ability.name}</p>
                </div>
            )
        })} */}

        {/* 
            TODO: Implement:
                api/v2/evolution-chain/{id} 
                api/v2/gender/{id or name}
                api/v2/nature/{id or name}
                api/v2/location/{id} - Map?
                api/v2/ability/{id or name}
        */}

    </div>

Details.propTypes = {
    pokemon: PropTypes.shape({
        abilities: PropTypes.array,
        base_experience: PropTypes.number,
        forms: PropTypes.array,
        game_indices: PropTypes.array,
        height: PropTypes.number,
        held_items: PropTypes.array,
        id: PropTypes.number,
        is_default: PropTypes.bool,
        location_area_encounters: PropTypes.string,
        moves: PropTypes.array,
        name: PropTypes.string,
        order: PropTypes.number,
        species: PropTypes.object,
        sprites: PropTypes.object,
        stats: PropTypes.array,
        types: PropTypes.array,
        weight: PropTypes.weight
    }),
    handleReset: PropTypes.func.isRequired
}

export default Details;