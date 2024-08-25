/* eslint-disable */

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faInfoCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../Redux/authorizationSlice";
import "./Navbar.css";

const Navbar = ({ id }) => {
  // const username= useSelector((state) => state.user.user.username);
  const username = localStorage.getItem("username");
  // console.log("username"+username);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    dispatch(logoutRequest());
    navigate("/", { replace: true });
  };
  return (
    <header className="navbar">
      <nav className="nav">
        <NavLink to="" className="nav-link">
          <FontAwesomeIcon icon={faHome} className="icon" />
          Home
        </NavLink>
        <NavLink to="/stats" className="nav-link">
          <FontAwesomeIcon icon={faChartLine} className="icon" />
          Stats
        </NavLink>
        <NavLink to="/about" className="nav-link">
          <FontAwesomeIcon icon={faInfoCircle} className="icon" />
          About
        </NavLink>
        <div className="username">
          <FontAwesomeIcon icon={faUser} className="icon" />
          {username}
        </div>
      </nav>
      <div className="nav-link last-item">
        <button onClick={handleLogout}>
        Log Out</button>
      </div>
    </header>
  );
};

export default Navbar;
