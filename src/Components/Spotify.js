import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Spotify = () => {
  const client_id = "11d28d0ee0d646ef9a9719757ca73048";
  const client_secret = "3f065649ffe94e97a124a143c835e6dc";
  const { artist_name } = useParams();
  const [data, setData] = useState([]);
  const [img_url, setImg_url] = useState("");

  function cutFeaturedArtist(artistString) {
    if (typeof artistString === "string") {
      return artistString.split(" ft.")[0];
    }
    return "";
  }
  const artist_name_woutFt = cutFeaturedArtist(artist_name); //name of the artist with out the featuring artist

  useEffect(() => {
    const mainFunc = async () => {
      const token = await getToken();
      const artistID = await getArtistID(token);
      const topTracks = await getTop10(token, artistID);
      const img_data = await getImg(token, artistID);
      setImg_url(img_data);
      setData(topTracks);
      setImg_url(img_data);
      setData(topTracks);
    };

    mainFunc();
  }, [artist_name]);

  async function getToken() {
    const authOptions = {
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    };
    try {
      const response = await axios(authOptions);
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  async function getArtistID(access_token) {
    const authOptions2 = {
      method: "get",
      url: `https://api.spotify.com/v1/search?q=${artist_name_woutFt}&type=artist`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    try {
      const response = await axios(authOptions2);
      // const artistArray = response.data.artists.items.filter(
      //   (artist) =>
      //     artist.name.toLowerCase() === artist_name_woutFt.toLowerCase()
      // );


      // if (artistArray.length) {
      //   return artistArray[0].id;
      // } else {
      //   return;
      // }

      return response.data.artists.items[0].id;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTop10(access_token, artist_id) {
    const authOptions3 = {
      method: "get",
      url: `https://api.spotify.com/v1/artists/${artist_id}/top-tracks?market=US`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    try {
      const response = await axios(authOptions3);
      return response.data.tracks;
    } catch (error) {
      console.log(error);
    }
  }

  async function getImg(access_token, artist_id) {
    const authOptions4 = {
      method: "get",
      url: `https://api.spotify.com/v1/artists/${artist_id}`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    try {
      const response = await axios(authOptions4);
      return response.data.images[0].url;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="list">
      <div className="search">
        <div className="artist-img">
          <img src={img_url} alt="" />
        </div>
        <h1>Spotify Top 10 Hits of {artist_name_woutFt}</h1>
        {!data ? (
          <h1>Loading...</h1>
        ) : data.length === 0 ? (
          <h1>No Songs Found!</h1>
        ) : (
          data.map((track) => {
            return (
              <div className="song" key={track.id}>
                <div className="image-container">
                  <img
                    src={
                      track.album.images[0]?.url ||
                      "https://www.shareicon.net/data/128x128/2017/01/19/873386_network_512x512.png"
                    }
                    alt="song-logo"
                  />
                </div>
                <div className="info">
                  <h1>{track.name}</h1>
                  {/* <h2>{track.artists.map((artist) => artist.name).join(", ")}</h2> */}
                  <h2>{track.album.name}</h2>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Spotify;
