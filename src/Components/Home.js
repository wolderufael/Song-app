import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../Redux/userSlice.js";
import Addsong from "./Addsong.js";
import Navbar from "./Navbar.js";
import Results from "./Results.js";

const Home = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.user.user.songs);

  useEffect(() => {
    dispatch(fetchSongs());
    console.log(songs);
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="search-params">
        <Addsong />
        <Results songs={songs} />
      </div>
    </>
  );
};

export default Home;
