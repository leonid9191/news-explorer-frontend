export function SearchForm() {
  return (
    <div className="searchForm">
      <h1>What's going on in the world?</h1>
      <p>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="search-form__form">
        <input type="text" name="searchNews" id="searchNews" placeholder="Enter topic" />
        <button>Search</button>
      </form>
    </div>
  );
}
