import { useState } from "react";
import Song from "./Song.js";

const Results = ({ songs = [] }) => {
  const [filterType, setFilterType] = useState("artist");
  const [filterValue, setFilterValue] = useState("");

  const filteredSongs = songs.filter((song) => {
    if (filterType === "artist") {
      return (
        song.artist &&
        song.artist.toLowerCase().startsWith(filterValue.toLowerCase())
      );
    } else if (filterType === "title") {
      return (
        song.title &&
        song.title.toLowerCase().startsWith(filterValue.toLowerCase())
      );
    } else if (filterType === "album") {
      return (
        song.album &&
        song.album.toLowerCase().startsWith(filterValue.toLowerCase())
      );
    } else if (filterType === "genre") {
      return (
        song.genre &&
        song.genre.toLowerCase().startsWith(filterValue.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="search">
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
      <h1>List of All Songs</h1>
      {!filteredSongs.length ? (
        <h1>No Songs Found!</h1>
      ) : (
        filteredSongs.map((song, index) => {
          return (
            <Song
              title={song.title}
              artist={song.artist}
              album={song.album}
              genre={song.genre}
              id={song._id}
              key={`${song._id}-${index}`}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
