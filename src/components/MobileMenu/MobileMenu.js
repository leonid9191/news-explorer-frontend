import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
export function MobileMenu({
  handleLoginClick,
  isOpen,
  onClose,
  isLoggedIn,
  handleLogOut,
}) {
  return (
    <div className={`mobile-menu ${isOpen && "mobile-menu_open"}`}>
      <div className="mobile-menu__overlay">
        <div className="mobile-menu__container">
          <div className="mobile-menu__header-container">
            <Logo />
            <button
              className="mobile-menu__close-button"
              onClick={onClose}
            ></button>
          </div>
          <div className="mobile-menu__link-container">
            <NavLink to="/" className={"mobile-menu__link"} onClick={onClose}>
              Home
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/saved-news"
                  className="mobile-menu__link"
                  onClick={onClose}
                >
                  Saved articles
                </NavLink>
                <button
                  className="mobile-menu__button navigation__button"
                  onClick={handleLogOut}
                >Sign out</button>
              </>
            ) : (
              <button
                className="mobile-menu__button navigation__button"
                onClick={handleLoginClick}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
