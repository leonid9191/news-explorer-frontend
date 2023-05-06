import { useState } from "react";
import { Hamburger } from "../Hamburger/Hamburger";

export function Navigation({handleLoginClick}) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <div className="navigation">
      <ul className="navigation__container">
        <li className="navigation__link">
          <a href="/" className="navigation__home active-white">
            Home
          </a>
        </li>
        <li className="navigation__link">
          <a href="/saved-news" className="navigation__saved">
            Saved articles
          </a>
        </li>
        <li className="navigation__link">
          <a onClick={handleLoginClick} className="navigation__button">
            Sign In
          </a>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleHamburger}>
        {/* <Hamburger/> */}
      </div>
    </div>
  );
}
