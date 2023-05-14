import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";
import { SearchForm } from "../SearchForm/SearchForm";

export function Header({
  openHamburger,
  handleLoginClick,
  darkStyle,
  isLoggedIn,
  handleLogOut,
  handleNewsSearch,
}) {
  const route = window.location.pathname;
  let searchFormLayout = '';
  if(route === '/'){
    searchFormLayout = <SearchForm handleNewsSearch={handleNewsSearch} />
  }
  return (
    <header className={`${route === '/saved-news' ? 'header__savedNews' : 'header'}`}>
      <div className="header__navigation">
        <Logo darkStyle={darkStyle} />
        <Navigation
          darkStyle={darkStyle}
          handleLoginClick={handleLoginClick}
          openHamburger={openHamburger}
          isLoggedIn={isLoggedIn}
          handleLogOut={handleLogOut}
        />
      </div>
      {searchFormLayout}
    </header>
  );
}
