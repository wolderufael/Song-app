import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSong } from "../Redux/songsSlice";
import { setSongDetails } from "../Redux/songDetailsSlice";
import { deleteSongApi } from "../Api/Api";
import "./Song.css";

const Song = ({ title, artist, album, genre, id }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(setSongDetails({ title, artist, album, genre, id }));
  };
  async function handleDeleteClick() {
    dispatch(setSongDetails({ title, artist, album, genre, id }));
    try {
      await deleteSongApi(id);
      dispatch(deleteSong(id));
    } catch (error) {
      console.log(error);
    }
  }

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
        <Link to={`/editsong/${id}`} onClick={handleEditClick}>
          <button className="icon-btn edit-btn">
            <FontAwesomeIcon icon={faEdit} className="icon-song" alt="Edit" />
          </button>
        </Link>
        <button onClick={handleDeleteClick} className="icon-btn delete-btn">
          <FontAwesomeIcon icon={faTrashAlt} className="icon-song" />
        </button>
      </div>
    </div>
  );
};

export default Song;
