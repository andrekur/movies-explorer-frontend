import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <p className="portfolio__link-text">Статичный сайт</p>
          <div className="portfolio__link-img"/>
        </li>
        <li className="portfolio__link">
          <p className="portfolio__link-text">Адаптивный сайт</p>
          <div className="portfolio__link-img"/>
        </li>
        <li className="portfolio__link portfolio__link_border-unactive">
          <p className="portfolio__link-text">Одностраничное приложение</p>
          <div className="portfolio__link-img"/>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio


