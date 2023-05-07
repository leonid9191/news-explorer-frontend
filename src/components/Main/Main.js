import { SearchForm } from "../SearchForm/SearchForm";
import { Header } from "../Header/Header";

export function Main({openHamburger, handleLoginClick }) {
  return (
    <section className="main">
      <Header handleLoginClick={handleLoginClick} openHamburger={openHamburger} />
      <SearchForm />
    </section>
  );
}
