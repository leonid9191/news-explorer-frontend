import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";

export function Header({ openHamburger, handleLoginClick, darkStyle, isLoggedIn, handleLogOut }) {
  return (
    <header className="header">
      <Logo darkStyle={darkStyle} />
      <Navigation
        darkStyle={darkStyle}
        handleLoginClick={handleLoginClick}
        openHamburger={openHamburger}
        isLoggedIn = {isLoggedIn}
        handleLogOut = {handleLogOut}
      />
    </header>
  );
}
