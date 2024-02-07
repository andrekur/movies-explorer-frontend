import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a className="portfolio__link-text" href="https://andrekur.github.io/how-to-learn/" rel="noreferrer" target="_blank">Статичный сайт</a>
          <div className="portfolio__link-img"/>
        </li>
        <li className="portfolio__link">
          <a className="portfolio__link-text" href="https://andrekur.github.io/russian-travel/" rel="noreferrer" target="_blank">Адаптивный сайт</a>
          <div className="portfolio__link-img"/>
        </li>
        <li className="portfolio__link portfolio__link_border-unactive">
          <a className="portfolio__link-text" href="https://andrekur.nomoredomainsmonster.ru" rel="noreferrer" target="_blank">Одностраничное приложение</a>
          <div className="portfolio__link-img"/>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio


