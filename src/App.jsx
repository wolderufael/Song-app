import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Stats from "./Components/Stats";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Spotify from "./Components/Spotify";
import store from "./Redux/store";
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
