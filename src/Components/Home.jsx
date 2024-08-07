import React from "react";
import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Results from "./Results";
import { fetchSongs } from "../Redux/songsSlice";
import Addsong from "./Addsong";

const Home = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);

  useEffect(() => {
    dispatch(fetchSongs());
    console.log(songs);
  }, [dispatch]);

  return (
    <div className="search-params">
      <Addsong />
      {/* <div className="list-to-be"> */}
      <Results songs={songs} />
      {/* </div> */}
    </div>
  );
};

export default Home;
