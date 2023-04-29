export function SearchForm() {
  return (
    <div className="search-form">
      <h1 className="search-form__header">What's going on in the world?</h1>
      <p className="search-form__description">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="search-form__form">
        <input type="text" name="searchNews" id="searchNews" placeholder="Enter topic" className="search-form__form_input" />
        <button className="search-form__form_button">Search</button>
      </form>
    </div>
  );
}
