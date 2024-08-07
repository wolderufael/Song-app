import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
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
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
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
