import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader"
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

export default function SavedNews(props) {
  return (
    <>
      <section id="saved-news-header">
        <SavedNewsHeader />
      </section>
      <NewsCardList
        displayCount="5"
        placement="saved-articles"
        newsCards={props.newsCards}
      />
    </>
  );
}
