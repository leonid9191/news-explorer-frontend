import nothingFoundIcon from "../../images/nothing-found.svg";

const NothingFound = ({ isNothingFound }) => {
  return (
    <div className={`nothing-found nothing-found${isNothingFound}`}>
      <img
        className="nothing-found__icon"
        src={nothingFoundIcon}
        alt="Not Found Icon"
      />
      <p className="nothing-found__text">Nothing found</p>
      <p className="nothing-found__subtext">Sorry, but nothing matched</p>
      <p className="nothing-found__subtext">your search terms.</p>
    </div>
  );
};

export default NothingFound;