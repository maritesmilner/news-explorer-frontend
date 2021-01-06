import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader"
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

export default function SavedNews(props) {
  return (
    <>
      <section id="saved-news-header">
        <SavedNewsHeader
          cardCount={props.newsCards.length}
        />
      </section>
      <NewsCardList
        placement="saved-articles"
        newsCards={props.newsCards}
        isVisible={true}
        isSignedIn={props.isSignedIn}
        handleDeleteCard={props.handleDeleteCard}
      />
    </>
  );
}
