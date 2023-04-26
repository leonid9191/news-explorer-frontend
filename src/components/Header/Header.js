import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";

export function Header() {
  return (
    <div className="header">
      <Logo />
      <Navigation />
    </div>
  );
}
