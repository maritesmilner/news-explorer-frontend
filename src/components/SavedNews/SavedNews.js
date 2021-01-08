import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader"
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

export default function SavedNews(props) {
  const [sortedKeywords, setSortedKeywords] = React.useState([]);
  React.useEffect(() => {
    if (props.newsCards.length > 0) {
      let keywords = [];
      //extract keywords
      props.newsCards.forEach(e => {
        const { keyword } = e;
        keywords = [...keywords, keyword];
      });
      //extract unique keywords
      const uniqueKeywords = [...new Set(keywords)];
      //get number of occurence per keyword
      let keywordNumbers = [];
      uniqueKeywords.forEach(u => {
        keywordNumbers = [...keywordNumbers, [u, keywords.filter(k => k === u).length]];
      })
      //sort keywords by occurences in descending order
      keywordNumbers.sort((a, b) => {
        if (a[1] === b[1]) {
          return 0;
        }
        else {
          return (a[1] > b[1]) ? -1 : 1;
        }
      })
      setSortedKeywords(keywordNumbers.map(k => k[0]));
    }
  }, [props.newsCards]);
  return (
    <>
      <section id="saved-news-header">
        <SavedNewsHeader
          cardCount={props.newsCards.length}
          sortedKeywords={sortedKeywords}
          keywordsToDisplay={props.keywordsToDisplay}
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
