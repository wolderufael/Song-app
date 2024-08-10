import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faInfoCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import "./Navbar.css";

const Navbar = ({ id }) => {
  const username= useSelector((state) => state.songs.user.songs);

  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    navigate("/login");
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
        <div className="nav-link last-item" onClick={handleLogout}>
          <FontAwesomeIcon icon={faUser} className="icon" />
          Log Out
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
