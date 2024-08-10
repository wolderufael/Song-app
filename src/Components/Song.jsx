import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSong } from "../Redux/userSlice";
import { setFormData, toggleFormMode } from "../Redux/formSlice";
import "./Song.css";

const Song = ({ title, artist, album, genre, id }) => {
  const dispatch = useDispatch();

  const handleEdit = (title, artist, album, genre, id) => {
    try {
      const payload = { title, artist, album, genre, id };
      console.log("setFormData payload:", payload);
      dispatch(setFormData(payload));
      dispatch(toggleFormMode(true));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id) => {
    try {
      dispatch(deleteSong(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="song">
      <Link to={`/more/${artist}`}>
        <div className="image-container">
          <img
            src="https://www.shareicon.net/data/128x128/2017/01/19/873386_network_512x512.png"
            alt="song-logo"
          />
        </div>
        <div className="info">
          <h1>{title}</h1>
          <h2>{artist}</h2>
          <h2>{album}</h2>
          <h2>{genre}</h2>
        </div>
      </Link>
      <div className="icons">
        <button
          className="icon-btn edit-btn"
          onClick={() => handleEdit(title, artist, album, genre, id)}
        >
          <FontAwesomeIcon icon={faEdit} className="icon-song" alt="Edit" />
        </button>
        <button
          className="icon-btn delete-btn"
          onClick={() => handleDelete(id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="icon-song" />
        </button>
      </div>
    </div>
  );
};

export default Song;
