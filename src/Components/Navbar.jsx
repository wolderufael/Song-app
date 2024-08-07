import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = ({ id }) => {
  return (
    <header className="navbar">
      <nav className="nav">
        <NavLink to="/" className="nav-link">
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
      </nav>
    </header>
  );
};

export default Navbar;
