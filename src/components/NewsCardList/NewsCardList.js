import React from "react";
import "./NewsCardList.css";
import SearchError from "../SearchError/SearchError";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

export default function NewsCardList(props) {
  if (!props.isVisible) {
    return null;
  }
  if (props.isSearching) {
    return (
      <Preloader />
    );
  }
  if (props.isApiError) {
    return (
      <SearchError
        message="Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
      />
    );
  }
  if (props.resultCount === 0) {
    return (
      <SearchError
        title="Nothing Found"
        message="Sorry, but nothing matched your search terms."
      />
    );
  }

  const cardsForDisplay = props.displayCount ? props.newsCards.slice(0, props.displayCount) : props.newsCards;
  return (
    <section id="news-card-list">
      <div className="news-card-list">
        {props.title && <h1 className="news-card-list__title">Search results</h1>}
        <ul className="news-card-list__cards">
          {
            cardsForDisplay.map((card, i) => (
              <NewsCard
                card={card}
                placement={props.placement}
                isSignedIn={props.isSignedIn}
                handleBookmark={props.handleBookmark}
                handleDeleteCard={props.handleDeleteCard}
                key={i}
              />
            ))
          }
        </ul>
        {props.displayCount && props.newsCards.length > props.displayCount &&
          <button className="news-card-list__more" type="button" aria-label="show more" onClick={props.handleMore}>
            Show more
          </button>
        }
      </div>
    </section>
  );
}
