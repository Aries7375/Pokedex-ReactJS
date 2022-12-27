import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/pokeCard.css";

const PokeCard = ({ url }) => {
  const [pokemon, setPokemon] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);
  const click = () => {
    navigate(`/pokedex/${pokemon?.id}`);
  };
  return (
    <div className={`poke-card-cont head-${pokemon?.types[0].type.name}`}>
      <article className="poke-card" onClick={click}>
        <div className={`card-head head-${pokemon?.types[0].type.name}`}>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt="pokemon"
          />
        </div>
        <section>
          <h3 className={`color-${pokemon?.types[0].type.name}`}>
            {pokemon?.name}
          </h3>
          <ul className="card-types">
            {pokemon?.types.map((type) => (
              <li key={type.type.url}>{type.type.name}</li>
            ))}
          </ul>
          <ul className="card-stats">
            {pokemon?.stats.map((stat) => (
              <li key={stat.stat.url} className="card-stat">
                <span>{stat.stat.name}</span>
                <span className={`color-${pokemon?.types[0].type.name}`}>
                  {stat.base_stat}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default PokeCard;
