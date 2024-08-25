import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./Components/Login.jsx";
import Home from "./Components/Home.jsx";
import Stats from "./Components/Stats.jsx";
import About from "./Components/About.jsx";
import Spotify from "./Components/Spotify.jsx";
import store from "./Redux/store.js";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/:username/Home" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/about" element={<About />} />
            <Route path="/more/:artist_name" element={<Spotify />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
// 