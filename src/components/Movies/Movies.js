import React from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  return (
    <div className="movies">
      <SearchForm byAllFilms={true}/>
      <MoviesCardList page='all-movies'/>
    </div>
  )
}

export default Movies;