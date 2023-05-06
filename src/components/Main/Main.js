import { SearchForm } from "../SearchForm/SearchForm";
import { Header } from "../Header/Header";

export function Main({handleLoginClick}) {
  return (
    <section className="main">
      <Header
      handleLoginClick={handleLoginClick}
      />
      <SearchForm />
    </section>
  );
}
