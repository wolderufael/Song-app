import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSong } from "../Redux/songsSlice";
import Modal from "./Modal";

const initialSongState = {
  title: "",
  artist: "",
  album: "",
  genre: "",
};

const Addsong = () => {
  const [song, setSong] = useState(initialSongState);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSong(song));
    setSong(initialSongState);
  };

  // async function addSongFunc() {
  //   try {
  //     const res = await addSongApi(formData);
  //     if (res.message === "Song Added") {
  //       setMessage("Song added successfully");
  //     } else if (res.message === "Song Exists") {
  //       setMessage("Song already exists");
  //     } else {
  //       setMessage("An unexpected error occurred");
  //     }
  //   } catch (error) {
  //     setMessage("Failed to add song");
  //   }
  // }
  return (
    <div className="song-params">
      <form
        onSubmit={
          handleSubmit
          // (e) => {
          // e.preventDefault();
          // addSongFunc();
          // setShowModal(true);
          // }
        }
      >
        <label htmlFor="title">
          <input
            name="title"
            id="title"
            placeholder="Title"
            value={song.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="artist">
          <input
            name="artist"
            id="artist"
            placeholder="Artist"
            value={song.artist}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="album">
          <input
            name="album"
            id="album"
            placeholder="Album"
            value={song.album}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="genre">
          <input
            name="genre"
            id="genre"
            placeholder="Genre"
            value={song.genre}
            onChange={handleChange}
            required
          />
        </label>
        <button>Submit</button>
      </form>
      {showModal ? (
        <Modal>
          <div>
            <h1>{message}</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/");
                }}
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        []
      )}
    </div>
  );
};

export default Addsong;
