import { useState } from "react";
export function NewCard({
  card,
  isLoggedIn,
  loginModal,
  saveCard,
  tipTitle,
  buttonType,
  deleteCard,
  keyword,
}) {

  const [isVisible, setIsVisible] = useState("");
  const [isSaved, setIsSaved] = useState("");
  const handleSaveCard = () => {
    if (!isLoggedIn) {
      loginModal();
    } else {
      if (buttonType === "save") {
        saveCard(card);
        isSaved ? setIsSaved("") : setIsSaved("_saved");
      }
      if (buttonType === "delete") {
        deleteCard(card._id);
      }
    }
  };
  const publeshedDate = new Date(card.publishedAt || card.date).toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const saveButtonClesses = `label__button label__button${isSaved}`;
  const trashButtonClesses = `label__button label__button_trash`;
  const hiddenHoverClass = () => {
    if (!isLoggedIn && buttonType === "save") {
      setIsVisible("_visible");
    }
    if (isLoggedIn && buttonType === "delete") {
      setIsVisible("_visible");
    } 
  };
  return (
    <article   className="new-card">
      <a href={card.url || card.link} target="_blank" rel="noreferrer">
        <img src={card.urlToImage || card.urlToImage || card.image} alt="card" className="new-card__image" />
      </a>
          {buttonType === "delete" ? (
            <span className={`label__keyword`}>{card.keyword}</span>
          ) : (
            ""
          )}
      <div className="label">
        <div className="label__container">
          <span className={`label__tip${isVisible}`}>{tipTitle}</span>
          <button
            className={
              buttonType === "save" ? saveButtonClesses : trashButtonClesses
            }
            onMouseEnter={hiddenHoverClass}
            onMouseLeave={() => setIsVisible("")}
            onClick={handleSaveCard}
          ></button>
        </div>
      </div>
      <p className="new-card__date">{publeshedDate}</p>
      <h3 className="new-card__header">{card.title}</h3>
      <p className="new-card__description">{card.description || card.text}</p>
      <p className="new-card__source">{card.source.name || card.source}</p>
    </article>
  );
}
