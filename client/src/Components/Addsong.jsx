/*eslint-disable */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, editSong } from "../Redux/userSlice.js";
import { toggleFormMode } from "../Redux/formSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialSongState = {
  title: "",
  artist: "",
  album: "",
  genre: "",
};

const Addsong = () => {
  const songToEdit = useSelector((state) => state.formData.formData);
  const message = useSelector((state) => state.user.message);
  const Error = useSelector((state) => state.user.error);
  const editMode = useSelector((state) => state.formData.editMode);
  const [song, setSong] = useState(initialSongState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode && songToEdit) {
      setSong({
        title: songToEdit.title || "",
        artist: songToEdit.artist || "",
        album: songToEdit.album || "",
        genre: songToEdit.genre || "",
      });
    } else {
      setSong(initialSongState);
    }
  }, [editMode, songToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(editSong({ song, id: songToEdit.id }));
      // dispatch(toggleFormMode(false));
    } else {
      dispatch(addSong(song));
    }
    setSong(initialSongState);
  };

  useEffect(() => {
    // console.log("addsong error message  :", Error);
    // console.log("addsong  message :", message);
    // console.log("Edit mode :", editMode);

    if (message && !editMode) {
      toast.success("Song Added Succesfully!");
    } else if (message && editMode) {
      toast.success("Song Edited Succesfully!");
      dispatch(toggleFormMode(false));
    } else if (Error) {
      if (!editMode) {
        toast.error("Song already Exists in user's list!");
      } else {
        toast.error("Error Editing Song!");
      }
    }
  }, [message, Error]);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </>
  );
};

export default Addsong;
