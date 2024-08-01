import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faInfoCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = ({ id }) => {
  return (
    <header className="navbar">
      <nav className="nav">
        <NavLink  to="/"
          // activeClassName="active"
          className="nav-link">
          <FontAwesomeIcon icon={faHome} className="icon" />
          Home
        </NavLink>
        <NavLink to="/stats"
          className="nav-link">
          <FontAwesomeIcon icon={faChartLine} className="icon" />
          Stats
        </NavLink>
        <NavLink to="/about"
          className="nav-link">
          <FontAwesomeIcon icon={faInfoCircle} className="icon" />
          About
        </NavLink>
        <NavLink
          to={`/addsong`}
          className="nav-link last-item"
        >
          <div>
            <FontAwesomeIcon icon={faPlusCircle} className="icon" />
            ADD Song
          </div>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
