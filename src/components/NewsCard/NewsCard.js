import React from "react";
import "./NewsCard.css";

export default function NewsCard({ card, handleDeleteCard, placement, handleBookmark, isSignedIn }) {
  const handleBookmarkClick = () => handleBookmark(card);
  const handleDeleteClick = () => handleDeleteCard(card);
  let button = "";
  let toolTipText = "";
  let keyword = "";
  if (placement === "saved-articles") {
    button = <button className="newscard__delete" type="button" aria-label="delete newscard" onClick={handleDeleteClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15 3H9V5H3V7H21V5H15V3ZM5 9V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V9H17V20H7V9H5ZM9 9L9 18H11L11 9H9ZM13 9V18H15V9H13Z" />
      </svg>
    </button>;
    toolTipText = <p className="newscard__tooltip">"Remove from saved"</p>;
    keyword = <p className="newscard__keyword">{card.keyword}</p>;
  } else {
    if (!isSignedIn) {
      toolTipText = <p className="newscard__tooltip">"Sign in to save articles"</p>;
      button = <button className="newscard__bookmark" type="button" aria-label="bookmark newscard" onClick={handleBookmarkClick}>
        <svg width="14" height="19" viewBox="0 0 14 19" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.38218 12.7137L1 16.9425V1L13 1V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z" strokeWidth="2" />
        </svg>
      </button>;
    } else {
      button = <button className={`newscard__bookmark ${card.isSaved ? 'newscard__bookmark_saved' : 'newscard__bookmark_active'}`} type="button" aria-label="bookmark newscard" onClick={handleBookmarkClick}>
        <svg width="14" height="19" viewBox="0 0 14 19" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.38218 12.7137L1 16.9425V1L13 1V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z" strokeWidth="2" />
        </svg>
      </button>;
    }
  }

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const cardDate = new Date(card.publishedAt ? card.publishedAt : card.date);
  const cardDateString = `${months[cardDate.getMonth()]} ${cardDate.getDate()}, ${cardDate.getFullYear()}`;
  return (
    <li className="newscard">
      {keyword}
      <div className="newscard__button">
        {button}
        {toolTipText}
      </div>
      <img className="newscard__pic" src={card.urlToImage ? card.urlToImage : card.image} alt="article 1" />
      <div className="newscard__info">
        <p className="newscard__date">{cardDateString}</p>
        <h2 className="newscard__title">{card.title}</h2>
        <p className="newscard__snippet">{card.description ? card.description : card.text}</p>
        <h3 className="newscard__source">{card.source.name ? card.source.name : card.source}</h3>
      </div>
    </li>
  );
}
