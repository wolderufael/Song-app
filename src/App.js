import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About.js";
import Home from "./Components/Home.js";
import Login from "./Components/Login.js";
import Spotify from "./Components/Spotify.js";
import Stats from "./Components/Stats.js";
import store from "./Redux/store.js";

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
