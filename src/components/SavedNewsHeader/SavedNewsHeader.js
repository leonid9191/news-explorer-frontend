import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
export function SavedNewsHeader({ searchKeywords }) {
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
  return (
    <div className="saved-news-header">
      <p className="saved-news-header__article">Saved articles</p>
      <p className="saved-news-header__count">
        {`${currentUser.data.name}, you have 5 saved articles`}
      </p>
      <p className="saved-news-header__keywords">By keywords: {keywords}</p>
    </div>
  );
}
