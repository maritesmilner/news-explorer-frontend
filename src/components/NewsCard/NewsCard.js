import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./NewsCard.css";

export default function NewsCard({ card }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  return (
    <li className="newscard">
      <img className="newscard__pic" src={card.pic} alt="article 1" />
      <div className="newscard__info">
        <p className="newscard__date">{card.date}</p>
        <h2 className="newscard__title">{card.title}</h2>
        <p className="newscard__snippet">{card.snippet}</p>
        <h3 className="newscard__source">{card.source}</h3>
      </div>
    </li>
  );
}
