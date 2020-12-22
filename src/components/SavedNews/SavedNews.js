import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader"
import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.png";
import image3 from "../../images/image3.png";
import image4 from "../../images/image4.png";
import image5 from "../../images/image5.png";

export default function SavedNews(props) {
  const snippet1 = "Ever since I read Richard Louv's influential book, \"Last Child in the Woods, \" the idea of having a special \"sit spot\" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...";
  const snippet2 = "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.";
  const snippet3 = "Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...";
  const snippet4 = "“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...";
  const snippet5 = "Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them.";

  const cards = [
    {
      pic: image1,
      date: "November 4, 2020",
      title: "Everyone Needs a Special 'Sit Spot' in Nature",
      snippet: snippet1,
      source: "treehugger",
      keyword: "nature",
    },
    {
      pic: image2,
      date: "February 19, 2019",
      title: "Nature makes you better",
      snippet: snippet2,
      source: "national geographic",
      keyword: "nature",
    },
    {
      pic: image3,
      date: "October 19, 2020",
      title: "Nostalgic Photos of Tourists in U.S. National Parks",
      snippet: snippet3,
      source: "national geographic",
      keyword: "yellowstone",
    },
    {
      pic: image4,
      date: "November 4, 2020",
      title: "Grand Teton Renews Historic Crest Trail",
      snippet: snippet4,
      source: "National parks traveler",
      keyword: "parks",
    },
    {
      pic: image5,
      date: "March 16, 2020",
      title: "Scientists Don't Know Why Polaris Is So Weird",
      snippet: snippet5,
      source: "treehugger",
      keyword: "photography",
    },
  ];

  return (
    <section id="saved-articles">
      <SavedNewsHeader />
      <ul className="saved-articles__cards">
        {
          cards.map((card, i) => (
            <NewsCard
              card={card}
              key={i}
              placement="saved-articles"
            />
          ))
        }
      </ul>
    </section>
  );
}
