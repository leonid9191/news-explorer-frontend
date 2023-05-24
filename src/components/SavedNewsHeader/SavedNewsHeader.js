import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
export function SavedNewsHeader({ searchKeywords, savedCards }) {
  const currentUser = useContext(CurrentUserContext);
  let keywords;

  if (searchKeywords.length > 3) {
    keywords =
      searchKeywords.slice(0, 2).toString().split(",").join(", ") +
      ` and ${searchKeywords.length - 2} other(s)`;
  } else if (searchKeywords.length === 3) {
    keywords =
      searchKeywords.slice(0, 2).toString().split(",").join(", ") +
      ` and ${searchKeywords.length - 2} other(s)`;
  } else if (searchKeywords.length === 3 || 2) {
    keywords = searchKeywords.toString().split(",").join(" and ");
  } else if (searchKeywords.length === 1) {
    keywords = searchKeywords.toString();
  } else if (searchKeywords.length === 0) {
    keywords = "";
  }
  const countKeywords = (cards) => {
    return cards
      .map((card) => card.keyword)
      .reduce((tally, word) => {
        tally[word] = (tally[word] || 0) + 1;
        return tally;
      }, {});
  };

  const sortKeywords = (num) => {
    return Object.entries(num).sort((a, b) => b[1] - a[1]);
  };

  const createDesc = (keywords) => {
    switch (keywords.length) {
      case 0:
        return "n/a";
      case 1:
      case 2:
      case 3:
        return keywords
          .splice(1)
          .reduce(
            (accumulator, currentValue) => accumulator + ", " + currentValue[0],
            keywords[0][0]
          );
      default:
        return `${keywords[0][0]}, ${keywords[1][0]}, and ${
          keywords.length - 2
        } other`;
    }
  };
  const sortedKeywords = sortKeywords(countKeywords(savedCards));
  return (
    <div className="saved-news-header">
      <p className="saved-news-header__article">Saved articles</p>
      <p className="saved-news-header__count">
        {`${currentUser.name}, you have ${savedCards.length} saved articles`}
      </p>
      <p className="saved-news-header__keywords">
        By keywords: {createDesc(sortedKeywords)}
      </p>
    </div>
  );
}
