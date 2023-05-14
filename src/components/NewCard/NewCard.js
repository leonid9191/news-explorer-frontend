import { useState } from "react";
import photo from "../../images/error-404.jpg";
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
        console.log("delete");
        deleteCard(card);
      }
    }
  };

  const publeshedDate = new Date(card.publishedAt).toLocaleString("default", {
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
      <a href={card.url} target="_blank" rel="noreferrer">
        <img src={card.urlToImage || photo} alt="card" className="new-card__image" />
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
      <p className="new-card__description">{card.description}</p>
      <p className="new-card__source">{card.source.name}</p>
    </article>
  );
}
