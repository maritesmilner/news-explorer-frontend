import React from "react";
import "./NewsCardList.css";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.png";
import image3 from "../../images/image3.png";

export default function NewsCardList(props) {
  const snippet1 = "Ever since I read Richard Louv's influential book, \"Last Child in the Woods, \" the idea of having a special \"sit spot\" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...";
  const snippet2 = "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.";
  const snippet3 = "Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...";

  const cards = [
    {
      pic: image1,
      date: "November 4, 2020",
      title: "Everyone Needs a Special 'Sit Spot' in Nature",
      snippet: snippet1,
      source: "treehugger",
    },
    {
      pic: image2,
      date: "February 19, 2019",
      title: "Nature makes you better",
      snippet: snippet2,
      source: "national geographic",
    },
    {
      pic: image3,
      date: "October 19, 2020",
      title: "Nostalgic Photos of Tourists in U.S. National Parks",
      snippet: snippet3,
      source: "national geographic",
    },
  ];

  if (props.isSearching) {
    return (
      <Preloader />

    );
  }
  if (props.searchResultCount === 0) {
    return (
      <NotFound />

    );
  } else {
    return (
      <section id="news-card-list">
        <div className="news-card-list">
          <h1 className="news-card-list__title">Search results</h1>
          <ul className="news-card-list__cards">
            {
              cards.map((card, i) => (
                <NewsCard
                  card={card}
                  key={i}
                />
              ))
            }
          </ul>
          <button className="news-card-list__more" type="button" aria-label="show more" onClick={props.handleMore}>
            Show more
          </button>
        </div>

      </section>
    );
  }
}
