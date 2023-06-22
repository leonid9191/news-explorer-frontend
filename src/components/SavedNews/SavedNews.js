import { NewCardList } from "../NewsCardList/NewCardList";

export function SavedNews({
  cards,
  isLoggedIn,
  deleteCard,
  searchKeywords,
  NewsResults,
}) {
  return (
    <div className="saved-news">
      <NewCardList
        NewsResults={NewsResults}
        cards={cards}
        isLoggedIn={isLoggedIn}
        tipTitle={"Remove from saved"}
        buttonType="delete"
        deleteCard={deleteCard}
        searchKeywords={searchKeywords}
      />
    </div>
  );
}
