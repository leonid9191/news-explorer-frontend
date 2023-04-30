import { NewCard } from "../NewCard/NewCard";

export function NewCardList() {
  return (
    <section className="new-card-list">
      <p className="new-card-list__title">Search results</p>
      <div className="new-card-list__items">
        <NewCard />
        <NewCard />
        <NewCard />
        <NewCard />
        <NewCard />
        <NewCard />
      </div>
      <button className="new-card-list__button">Show more</button>
    </section>
  );
}
