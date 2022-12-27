import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import PokeCard from "./PokeCard";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import usePokemon from "../../hook/usePokemon";

const Pokedex = () => {
  const { submitType, types, getTypes } = usePokemon();
  const [pokemons, setPokemons] = useState();

  const [typeSelect, setTypeSelect] = useState("all-pokemons");
  const navigate = useNavigate();
  const { trainer } = useSelector((state) => state);
  useEffect(() => {
    if (typeSelect !== "all-pokemons") {
      axios
        .get(typeSelect)
        .then((res) => setPokemons(res.data.pokemon.map((e) => e.pokemon)))
        .catch((err) => console.log(err));
    } else {
      const URL =
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=999999999999";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [typeSelect]);

  const change = (e) => {
    setTypeSelect(e.target.value);
    setPage(1);
  };
  //pagination
  const [page, setPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
  const initialPokemon = (page - 1) * pokemonsPerPage;
  const finalPokemon = page * pokemonsPerPage;
  const maxPage = pokemons && Math.ceil(pokemons.length / pokemonsPerPage);
  const changePerPage = (e) => {
    setPokemonsPerPage(e.target.value);
  };
  getTypes();

  return (
    <div className="pokedex-container">
      <p className="pokedex-welcome-p">
        <span className="pokedex-welcome-span">Welcome {trainer},</span> here
        you can find your favorite pokemon
      </p>
      <div className="pokedex-form-select">
        <form onSubmit={submitType} className="home-form">
          <input
            type="text"
            id="pokeName"
            className="nameTrainer"
            placeholder="Search your Pokemon"
          />
          <button>SEARCH</button>
        </form>
        <div className="selects-cont">
          <select
            name="types"
            id="types"
            onChange={change}
            className="types-select"
          >
            <option value="all-pokemons">All Pokemons</option>
            {types?.map((type) => (
              <option value={type.url} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            name=""
            id=""
            className="per-page-select"
            onChange={changePerPage}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>

      <div className="pokemons-cont">
        {pokemons?.slice(initialPokemon, finalPokemon).map((pokemon) => (
          <PokeCard key={pokemon.url} url={pokemon.url} />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
    </div>
  );
};

export default Pokedex;
