import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";

export function Header({ openHamburger, handleLoginClick, darkStyle }) {
  return (
    <div className="header">
      <Logo darkStyle={darkStyle} />
      <Navigation
        darkStyle={darkStyle}
        handleLoginClick={handleLoginClick}
        openHamburger={openHamburger}
      />
    </div>
  );
}
