import React, { useState, useEffect } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { cards } from "../../consts/CardsData"
import { getCountItemOnPage } from "../../utils/pagination";

function Movies() {
  const [nowOnPage, setOnPage] = useState(getCountItemOnPage());

  function handleExtendCards(e) {
    e.preventDefault()

    setOnPage(nowOnPage + getCountItemOnPage())
  }

  useEffect(() => {
    console.log(nowOnPage)
  }, [nowOnPage]) // full rerender

  return (
    <section className="movies">
      <SearchForm byAllFilms={true}/>
      <MoviesCardList page='all-movies' cards={cards.slice(0, nowOnPage)}/>
      {!(cards.length == nowOnPage || cards.length <= nowOnPage) &&
        <button className="movies__pagination" type="button" onClick={handleExtendCards}>Еще</button>
      }
    </section>
  )
}

export default Movies;