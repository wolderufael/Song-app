/*eslint-disable */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Results from "./Results";
import { fetchSongs } from "../Redux/userSlice.js";
import Addsong from "./Addsong";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.user.user.songs);
  const username = useSelector((state) => state.auth.username);
  const message = useSelector((state) => state.auth.message);
  const isLoading = useSelector((state) => state.user.loading);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <>
      <>
        <Navbar username={username} />
        <div className="search-params">
          <Addsong />
          {isLoading ? <p>Loading songs...</p> : <Results songs={songs} />}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </>
    </>
  );
};

export default Home;
