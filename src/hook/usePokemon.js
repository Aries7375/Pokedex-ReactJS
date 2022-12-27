import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
const usePokemon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //!--------home
  const submit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.nameTrainer.value.trim().toLowerCase()));
    e.target.reset();
    navigate("/pokedex");
  };
  //!--------Pokedex
  const [types, setTypes] = useState();
  const getTypes = () => {
    useEffect(() => {
      axios
        .get("https://pokeapi.co/api/v2/type/")
        .then((res) => setTypes(res.data.results))
        .catch((err) => console.log(err));
    }, []);
  };

  const submitType = (e) => {
    e.preventDefault();
    navigate(`/pokedex/${e.target.pokeName.value.trim().toLowerCase()}`);
  };

  //!--------Dark Mode
  const [light, setLight] = useState(true);
  const changeDarkLight = () => {
    setLight(!light);
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode");
  };
  //!---------CalcWidth
  const calcWidth = (num) => {
    const obj = {};
    const calc = Math.ceil((num * 100) / 150);
    calc <= 100 ? (obj.width = `${calc}%`) : (obj.width = "100%");
    return obj;
  };
  return {
    submit,
    light,
    changeDarkLight,
    calcWidth,
    submitType,
    types,
    getTypes,
  };
};

export default usePokemon;
