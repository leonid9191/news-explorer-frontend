import { useState } from "react";
import { NavLink } from "react-router-dom";


export function Navigation({openHamburger, handleLoginClick, darkStyle = "" }) {
  const route = window.location.pathname;

  return (
    <div className="navigation">
      <ul className="navigation__container">
        <li className="navigation__link">
          <NavLink
            to="/"
            className={`navigation__home${darkStyle} ${
              route === "/" ? "navigation__link_active" : ""
            }`}
          >
            Home
          </NavLink>
        </li>
        <li className="navigation__link">
          <NavLink
            to="/saved-news"
            className={`navigation__saved${darkStyle} ${
              route === "/" ? "" : `navigation__link_active${darkStyle}`
            }`}
          >
            Saved articles
          </NavLink>
        </li>
        <li className="navigation__link">
          <a
            onClick={handleLoginClick}
            className={`navigation__button${darkStyle}`}
          >
            Sign In
          </a>
        </li>
      </ul>
      <div className="navigation__hamburger" onClick={openHamburger}></div>
    </div>
  );
}
