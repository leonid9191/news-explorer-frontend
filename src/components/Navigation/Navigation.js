import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import icon_black from "../../images/exit.svg"
import icon_white from "../../images/exit_white.svg"

export function Navigation({
  openHamburger,
  handleLoginClick,
  darkStyle = "",
  isLoggedIn,
  handleLogOut
}) {
  const currentUser = useContext(CurrentUserContext)
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
        {isLoggedIn ? (
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
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <li className="navigation__link">
            <button
              onClick={handleLogOut}
              className={`navigation__button${darkStyle} navigation__sign-out`}
            >
              {currentUser.data.name}
              <img
                className="navigation__button_icon"
                src={darkStyle ? icon_black : icon_white}
                alt="exit"
              />
            </button>
          </li>
        ) : (
          <li className="navigation__link">
            <button
              onClick={handleLoginClick}
              className={`navigation__button${darkStyle}`}
            >
              Sign In
            </button>
          </li>
        )}
      </ul>
      <div className={`${route === '/saved-news' ? 'navigation__hamburger_black' : 'navigation__hamburger'}`} onClick={openHamburger}></div>
    </div>
  );
}
