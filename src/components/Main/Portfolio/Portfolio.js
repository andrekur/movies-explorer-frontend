import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li>
          <a className="portfolio__link" href="https://andrekur.github.io/how-to-learn/" rel="noreferrer" target="_blank">Статичный сайт</a>
        </li>
        <li>
          <a className="portfolio__link" href="https://andrekur.github.io/russian-travel/" rel="noreferrer" target="_blank">Адаптивный сайт</a>
        </li>
        <li>
          <a className="portfolio__link" href="https://andrekur.nomoredomainsmonster.ru" rel="noreferrer" target="_blank">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio


