import photo from "../../images/card.png";
export function NewCard() {
  return (
    <div className="new-card">
      <img src={photo} alt="card" className="new-card__image" />
      <div className="label">
        <div className="label__container">
          <span className="label__tip">Sign in to save articles</span>
          <button className="label__button"></button>
        </div>
      </div>
      <p className="new-card__date">November 4, 2020</p>
      <h3 className="new-card__header">
        Everyone Needs a Special 'Sit Spot' in Nature
      </h3>
      <p className="new-card__description">
        Ever since I read Richard Louv's influential book, "Last Child in the
        Woods," the idea of having a special "sit spot" has stuck with me. This
        advice, which Louv attributes to nature educator Jon Young, is for both
        adults and children to find...
      </p>
      <p className="new-card__source">treehugger</p>
    </div>
  );
}
