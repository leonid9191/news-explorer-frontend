import { NewCard } from "../NewCard/NewCard";
import { useState } from "react";

export function NewCardList({
  NewsResults,
  cards,
  isLoggedIn,
  loginModal,
  saveCard,
  tipTitle,
  buttonType,
  deleteCard,
  keyword,
}) {
  const route = window.location.pathname;
  const [initCards, setInitCards] = useState(3);
  const threeCards = cards.filter((card, index) => index < initCards);
  const handleShowMore = () => {
    setInitCards(initCards + 3);
  };
  return (
    <section className={`new-card-list${NewsResults}`}>
      {route === "/saved-news" ? (
        ""
      ) : (
        <h2 className="new-card-list__title">Search results</h2>
      )}

      <div className="new-card-list__items">
        {threeCards.map((card, index) => (
          // <li className="new-card-list__item">
            <NewCard
              key={index}
              card={card}
              isLoggedIn={isLoggedIn}
              loginModal={loginModal}
              saveCard={saveCard}
              tipTitle={tipTitle}
              buttonType={buttonType}
              deleteCard={deleteCard}
            />
          // </li>
        ))}
      </div>
      {cards.length > 3 ? (
        <button className="new-card-list__button" onClick={handleShowMore}>
          Show more
        </button>
      ) : (
        ""
      )}
    </section>
  );
}
