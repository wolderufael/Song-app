import { useEffect, useState } from "react";
import { fetchStatistics } from "../Api/Api.js";
import "./Stats.css";

const Stats = () => {
  const [statistics, setStatistics] = useState({
    songCount: 0,
    artistCount: 0,
    albumCount: 0,
    genreCount: 0,
    songsPerArtist: [],
    songsPerAlbum: [],
    songsPerGenre: [],
  });
  useEffect(() => {
    requestStats();
  }, []);

  async function requestStats() {
    const res = await fetchStatistics();
    setStatistics(res);
    console.log(statistics.artistCount);
  }

  return (
    <div className="stats-page">
      <main className="main-content">
        <h2>Statistics</h2>

        <div className="summary-cards">
          <div className="card">
            <span role="img" aria-label="songs">
              🎵
            </span>
            <h3>Total Songs</h3>
            <p>{statistics.songCount}</p>
          </div>
          <div className="card">
            <span role="img" aria-label="artists">
              🎤
            </span>
            <h3>Total Artists</h3>
            <p>{statistics.artistCount}</p>
          </div>
          <div className="card">
            <span role="img" aria-label="albums">
              💽
            </span>
            <h3>Total Albums</h3>
            <p>{statistics.albumCount}</p>
          </div>
          <div className="card">
            <span role="img" aria-label="genres">
              🎧
            </span>
            <h3>Total Genres</h3>
            <p>{statistics.genreCount}</p>
          </div>
        </div>

        <div className="detailed-stats">
          <h2>Songs Per Artist</h2>
          <div className="artist-list">
            {statistics.songsPerArtist.map((stat) => (
              <div key={stat._id} className="artist-card">
                <h3>Artist: {stat._id}</h3>
                <p>Songs: {stat.count}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="detailed-stats">
          <h2>Songs Per Album</h2>
          <div className="album-list">
            {statistics.songsPerAlbum.map((stat) => (
              <div key={stat._id} className="album-card">
                <h3>Album: {stat._id}</h3>
                <p>Songs: {stat.count}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="detailed-stats">
          <h2>Songs Per Genre</h2>
          <div className="genre-list">
            {statistics.songsPerGenre.map((stat) => (
              <div key={stat._id} className="genre-card">
                <h3>Genre: {stat._id}</h3>
                <p>Songs: {stat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stats;
