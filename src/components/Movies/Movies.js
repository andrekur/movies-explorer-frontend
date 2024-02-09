import React, { useState, useEffect } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { getCountItemOnPage } from "../../utils/pagination";

function Movies({movies, onSaveMovieClick}) {
  const [nowOnPage, setOnPage] = useState(getCountItemOnPage());

  function handleExtendCards(e) {
    e.preventDefault()

    setOnPage(nowOnPage + getCountItemOnPage())
  }

  useEffect(() => {}, [nowOnPage]) // full rerender

  return (
    <section className="movies">
      <SearchForm byAllFilms={true}/>
      <MoviesCardList page='all-movies' cards={movies.slice(0, nowOnPage)} onSaveMovieClick={onSaveMovieClick}/>
      {!(movies.length && movies.length === nowOnPage || movies.length <= nowOnPage) &&
        <button className="movies__pagination" type="button" onClick={handleExtendCards}>Еще</button>
      }
    </section>
  )
}

export default Movies;