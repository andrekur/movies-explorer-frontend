import React from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({savedMovies, onDeleteMovieClick}) {
  return (
    <section className="saved-movies">
      <SearchForm byAllFilms={false}/>
      <MoviesCardList page='saved-movies' cards={savedMovies} onDeleteMovieClick={onDeleteMovieClick}/>
    </section>
  )
};

export default SavedMovies;