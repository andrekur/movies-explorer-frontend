import React from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm byAllFilms={false}/>
      <MoviesCardList page='saved-movies'/>
    </section>
  )
};

export default SavedMovies;