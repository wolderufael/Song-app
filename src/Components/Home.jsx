import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Results from "./Results";
import { fetchSongs } from "../Redux/songsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);
  const [filterType, setFilterType] = useState("artist");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    dispatch(fetchSongs());
    console.log(songs);
  }, [dispatch]);

  const filteredSongs = songs.filter((song) => {
    if (filterType === "artist") {
      return song.artist.toLowerCase().startsWith(filterValue.toLowerCase());
    } else if (filterType === "title") {
      return song.title.toLowerCase().startsWith(filterValue.toLowerCase());
    } else if (filterType === "album") {
      return song.album.toLowerCase().startsWith(filterValue.toLowerCase());
    } else if (filterType === "genre") {
      return song.genre.toLowerCase().startsWith(filterValue.toLowerCase());
    }
    return true;
  });
  console.log(filteredSongs);
  return (
    <div>
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="artist">Artist</option>
          <option value="title">Title</option>
          <option value="album">Album</option>
          <option value="genre">Genre</option>
        </select>
        <input
          type="text"
          placeholder={`Filter by ${filterType}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <div className="list-to-be">
        <Results songs={filteredSongs} />
      </div>
    </div>
  );
};

export default Home;
