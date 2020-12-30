import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader"
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";


export default function SavedNews(props) {


  return (
    <section id="saved-articles">
      <SavedNewsHeader />
      <NewsCardList
        displayCount="5"
        placement="saved-articles"
      />
    </section>
  );
}
