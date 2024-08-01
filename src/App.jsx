import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Components/Home";
import Stats from "./Components/Stats";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Addsong from "./Components/Addsong";
import Editsong from "./Components/Editsong";
import Spotify from "./Components/Spotify";
import store from "./Redux/store";
import "./App.css";

const App = () => {
  // console.log(store.getState());
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/about" element={<About />} />
            <Route path="/addsong" element={<Addsong />} />
            <Route path="/editsong/:id" element={<Editsong />} />
            <Route path="/deletesong/:id" element={<Addsong />} />
            <Route path="/more/:artist_name" element={<Spotify />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
