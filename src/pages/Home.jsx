import React from "react";
import "../components/pokedex/styles/home.css";
import usePokemon from "../hook/usePokemon";

const Home = () => {
  const { submit } = usePokemon();
  return (
    <div className="home-cont">
      <img
        className="home-pokedex-img"
        src="./home/dlf.pt-poliwrath-png-454758.png"
        alt=""
      />
      <h1>Welcome Trainer! </h1>
      <p className="home-give">Give me your name to start</p>
      <form onSubmit={submit} className="home-form">
        <input
          type="text"
          id="nameTrainer"
          className="nameTrainer"
          placeholder="Your name"
        />
        <button>START</button>
        <img
          className="poke-ball"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
          alt=""
        />
      </form>
    </div>
  );
};

export default Home;
