import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./SavedNewsHeader.css";

export default function SavedNewsHeader() {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <div className="saved-articles__header">
      <h1 className="saved-articles__title">Saved articles</h1>
      <p className="saved-articles__user">{currentUser.name} Elise, you have 5 saved articles.</p>
      <p className="saved-articles__keywords">By keywords: <span className="bold-text">Nature, Yellowstone, and 2 other</span></p>
    </div>

  );
}
