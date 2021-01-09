import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./SavedNewsHeader.css";

export default function SavedNewsHeader({ cardCount, sortedKeywords, keywordsToDisplay }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const remainingKeywords = sortedKeywords.length - keywordsToDisplay;
  const keywordsForDisplay = remainingKeywords > 0 ? sortedKeywords.slice(0, keywordsToDisplay) : sortedKeywords;

  return (
    <div className="saved-articles__header">
      <h1 className="saved-articles__title">Saved articles</h1>
      <p className="saved-articles__user">{currentUser.name}, you have {cardCount ? cardCount : 0} saved articles.</p>
      <p className="saved-articles__keywords">By keywords: <span className="bold-text">{keywordsForDisplay.join(', ')} {remainingKeywords > 0 ? `and ${remainingKeywords} other` : ""}</span></p>
    </div>

  );
}
