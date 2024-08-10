import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Results from "./Results";
import { fetchSongs } from "../Redux/userSlice";
import Addsong from "./Addsong";

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
