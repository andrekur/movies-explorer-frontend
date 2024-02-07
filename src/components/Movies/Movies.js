import React from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  return (
    <section className="movies">
      <SearchForm byAllFilms={true}/>
      <MoviesCardList page='all-movies'/>
    </section>
  )
}

export default Movies;