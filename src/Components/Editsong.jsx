import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editSongApi } from "../Api/Api";
import { editSong } from "../Redux/songsSlice";
import Modal from "./Modal";

const Editsong = () => {
  // const songDetails = useSelector((state) => state.songDetails);
  // const id = songDetails.id;

  // const [formData, setFormData] = useState({
  //   title: "",
  //   artist: "",
  //   album: "",
  //   genre: "",
  // });

  const { id } = useParams();
  const songToEdit = useSelector((state) =>
    state.songs.songs.find((song) => song._id === id)
  );
  // const songState = useSelector((state) => state.songs.songs);
  // console.log("titleedit"+songToEdit.title);
  // console.log(songState);

  const [song, setSong] = useState({
    title: songToEdit?.title || "",
    artist: songToEdit?.artist || "",
    album: songToEdit?.album || "",
    genre: songToEdit?.genre || "",
  });
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");


 

  // async function editSongFunc() {
  //   try {
  //     const res = await editSongApi(id,formData);
  //     if (res.message === "Song edited successfully") {
  //       setMessage("Song edited successfully");
  //     } else if (res.message === "Song ID is required") {
  //       setMessage("Song ID is required");
  //     } else if (res.message === "At least one field is required to update") {
  //       setMessage("At least one field is required to update");
  //     } else if (res.message === "Song not found") {
  //       setMessage("Song not found");
  //     } else {
  //       setMessage("An unexpected error occurred");
  //     }
  //   } catch (error) {
  //     setMessage("Failed to edit song");
  //   }
  // }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editSong({ song, id }));
  };

  return (
    <div className="song-params">
      <form onSubmit={handleEdit}>
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
