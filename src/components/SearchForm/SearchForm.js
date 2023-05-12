import { useState } from "react";
export function SearchForm({ handleNewsSearch }) {
  const [keyword, setKeyword] = useState("");
  const newSearch = (e) => {
    e.preventDefault();
    handleNewsSearch(keyword);
  };
  return (
    <div className="search-form">
      <h1 className="search-form__header">What's going on in the world?</h1>
      <p className="search-form__description">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="search-form__form" name="search" onSubmit={newSearch}>
        <input
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          name="searchNews"
          id="searchNews"
          placeholder="Enter topic"
          className="search-form__form_input"
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </form>
    </div>
  );
}
