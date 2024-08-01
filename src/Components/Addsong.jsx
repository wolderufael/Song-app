import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSongApi } from "../Api/Api";
import Modal from "./Modal";

const Addsong = () => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function addSongFunc() {
    try {
      const res = await addSongApi(formData);
      if (res.message === "Song Added") {
        setMessage("Song added successfully");
      } else if (res.message === "Song Exists") {
        setMessage("Song already exists");
      } else {
        setMessage("An unexpected error occurred");
      }
    } catch (error) {
      setMessage("Failed to add song");
    }
  }
  return (
    <div className="song-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSongFunc();
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
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="album">
          <input
            name="album"
            id="album"
            placeholder="Album"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="genre">
          <input
            name="genre"
            id="genre"
            placeholder="Genre"
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
