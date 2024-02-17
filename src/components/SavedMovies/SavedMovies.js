import React, {useEffect, useState} from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { filterMovies } from "../../utils/filter";

function SavedMovies({savedMovies, onDeleteMovieClick, inProgress}) {
  const [isWaitingFiltering, setIsWaitingFiltering] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  function onSearchClick(searchText, isShort) {
    setIsWaitingFiltering(true);

    setFilteredMovies(filterMovies(savedMovies, {searchText, isShort}))

    setIsWaitingFiltering(false);
  }
  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies,])

  return (
    <section className="saved-movies">
      <SearchForm byAllFilms={false} onSearchClick={onSearchClick} inProgress={inProgress} isWaitingFiltering={isWaitingFiltering}/>
      <MoviesCardList page='saved-movies' cards={filteredMovies} onDeleteMovieClick={onDeleteMovieClick} inProgress={inProgress}/>
    </section>
  )
};

export default SavedMovies;