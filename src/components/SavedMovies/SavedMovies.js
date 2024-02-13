import React, {useEffect, useState} from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { filterMovies } from "../../utils/filter";

function SavedMovies({savedMovies, onDeleteMovieClick, inProgress}) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  function onSearchClick(searchText, isShort) {
    setFilteredMovies(filterMovies(savedMovies, {searchText, isShort}))
  }
  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies,])

  return (
    <section className="saved-movies">
      <SearchForm byAllFilms={false} onSearchClick={onSearchClick}/>
      <MoviesCardList page='saved-movies' cards={filteredMovies} onDeleteMovieClick={onDeleteMovieClick} inProgress={inProgress}/>
    </section>
  )
};

export default SavedMovies;