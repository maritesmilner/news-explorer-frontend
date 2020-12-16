import React from "react";
import "./About.css";
import authorPic from "../../images/author.png";

export default function About(props) {
  return (
    <section id="about">
      <div className="about">
        <img className="about__pic" src={authorPic} alt="author" />
        <div className="about__wrapper">
          <h1 className="about__title">About the author</h1>
          <p className="about__description">
            This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.
          </p>
          <p className="about__description">
            You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}
