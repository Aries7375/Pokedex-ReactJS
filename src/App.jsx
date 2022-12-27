import { Route, Routes } from "react-router-dom";
import "./App.css";
import Pokedex from "./components/Pokedex/pokedex.jsx";
import ProComponents from "./components/pokedex/ProComponents";
import usePokemon from "./hook/usePokemon";
import Home from "./pages/Home";
import PokeInfo from "./pages/PokeInfo";

function App() {
  const { light, changeDarkLight } = usePokemon();
  return (
    <div className="App">
      <div className="header-container">
        <div className="header1">
          <img
            className="header-img"
            src="../home/dlf.pt-poliwrath-png-454758.png"
            alt=""
          />
          <img
            className="header-img2"
            src="../home/pngfind.com-emolga-png-6444495.png"
            alt=""
          />
        </div>
        <div className="header2"></div>
        <div className="dark-light">
          <i
            onClick={changeDarkLight}
            className={`bx bx-sun ${light && "hide"}`}
          ></i>
          <i
            onClick={changeDarkLight}
            className={`bx bx-moon ${!light && "hide"}`}
          ></i>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProComponents />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokeInfo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
