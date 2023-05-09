import { SearchForm } from "../SearchForm/SearchForm";
import { Header } from "../Header/Header";

export function Main({openHamburger, handleLoginClick, isLoggedIn, handleLogOut }) {
  return (
    <section className="main">
      <Header handleLoginClick={handleLoginClick} openHamburger={openHamburger} isLoggedIn={isLoggedIn} handleLogOut={handleLogOut}/>
      <SearchForm />
    </section>
  );
}
