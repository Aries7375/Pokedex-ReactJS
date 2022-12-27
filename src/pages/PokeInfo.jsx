import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../components/pokedex/styles/pokeInfo.css";
import usePokemon from "../hook/usePokemon";

const PokeInfo = () => {
  const { calcWidth } = usePokemon();
  const [pokemon, setPokemon] = useState();
  const { id } = useParams();
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="pokeInfo-cont">
      <div className="poke-general">
        <div className={`pokeInfo-header head-${pokemon?.types[0].type.name}`}>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <h1 className="poke-id">#{pokemon?.id}</h1>
        <h2 className={`pokeInfo-name color-${pokemon?.types[0].type.name}`}>
          {pokemon?.name}
        </h2>
        <ul className="pokeInfo-we-he">
          <li>
            <span>WEIGHT</span>
            <p>{pokemon?.weight}</p>
          </li>
          <li>
            <span>HEIGHT</span>
            <p>{pokemon?.height}</p>
          </li>
        </ul>
        <div className="pokeInfo-abi-types">
          <div className="pokeInfo-types">
            <h3>Type</h3>
            <div className="pokeInfo-abi-types-data">
              {pokemon?.types.map((type) => (
                <span key={type.type.name} className={`head-${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="pokeInfo-abilities">
            <h3>Abilities</h3>
            <div className="pokeInfo-abi-types-data">
              {pokemon?.abilities.map((ability) => (
                <span key={ability.ability.name}>{ability.ability.name}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="stats-cont">
          <div className="stats-mov-title">
            <h2>Stats</h2>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
              alt=""
            />
          </div>
          {pokemon?.stats.map((stat) => (
            <div key={stat.stat.name} className="pokeInfo-stat-cont">
              <div className="pokeInfo-stat-info">
                <span>{stat.stat.name}:</span>
                <span>{stat.base_stat}/150</span>
              </div>
              <div className="pokeInfo-stat-1">
                <div
                  style={calcWidth(stat.base_stat)}
                  className={`pokeInfo-stat-2 head-${pokemon?.types[0].type.name}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="poke-movements">
        <div className="stats-mov-title">
          <h2 className="movements-h2">Movements</h2>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
            alt=""
          />
        </div>
        <div className="movements-cont">
          {pokemon?.moves.map((move) => (
            <span key={move.move.name}>{move.move.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokeInfo;
