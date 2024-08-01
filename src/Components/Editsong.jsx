import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editSongApi } from "../Api/Api";
import Modal from "./Modal";

const Editsong = () => {
  const songDetails = useSelector((state) => state.songDetails);
  const id = songDetails.id;
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (songDetails) {
      setFormData(songDetails);
    }
  }, [songDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function editSongFunc() {
    try {
      const res = await editSongApi(id,formData);
      if (res.message === "Song edited successfully") {
        setMessage("Song edited successfully");
      } else if (res.message === "Song ID is required") {
        setMessage("Song ID is required");
      } else if (res.message === "At least one field is required to update") {
        setMessage("At least one field is required to update");
      } else if (res.message === "Song not found") {
        setMessage("Song not found");
      } else {
        setMessage("An unexpected error occurred");
      }
    } catch (error) {
      setMessage("Failed to edit song");
    }
  }

  return (
    <div className="song-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editSongFunc();
          setShowModal(true);
        }}
      >
        <label htmlFor="title">
          <input
            name="title"
            id="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="artist">
          <input
            name="artist"
            id="artist"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="album">
          <input
            name="album"
            id="album"
            placeholder="Album"
            value={formData.album}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="genre">
          <input
            name="genre"
            id="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </label>
        <button>Edit</button>
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
      ) : null}
    </div>
  );
};

export default Editsong;
