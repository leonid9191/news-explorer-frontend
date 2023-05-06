import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";

export function Header({handleLoginClick}) {
  return (
    <div className="header">
      <Logo />
      <Navigation 
      handleLoginClick={handleLoginClick}
      />
    </div>
  );
}
