import React, { useState, useEffect } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";


import { moviesApiOptions } from '../../constants/constants'
import { filterMovies } from "../../utils/filter";
import moviesApi from "../../utils/MoviesApi";

import { getCountItemOnPage } from "../../utils/pagination";


function Movies({onSaveMovieClick, savedMovies}) {
  const [inProgress, setInProgress] = useState(false);
  const [nowOnPage, setOnPage] = useState(getCountItemOnPage());
  const [movies, setMovies] = useState([]);
  const [wasUploaded, setWasUploaded] = useState(false);
  const [searchWasUsed, setSearchWasUsed] = useState(false);

  function loadMoviesFromStorage(moviesInStorage) {
    setWasUploaded(true);
    const filteredMovies = filterMovies(moviesInStorage, getStorageFilterData())
    setMovies(filteredMovies);
  }

  function getStorageFilterData(){
    const isShort = Boolean(localStorage.getItem('isShort') === 'true');
    const searchText = localStorage.getItem('searchText') || ''

    return {searchText, isShort}
  }

  function handleExtendCards(e) {
    e.preventDefault()

    setOnPage(nowOnPage + getCountItemOnPage())
  }

  useEffect(() => {
    setInProgress(true);
    const moviesInStorage = JSON.parse(localStorage.getItem('movies'));
    if (movies.length === 0 && moviesInStorage && !wasUploaded) {
      loadMoviesFromStorage(moviesInStorage)
      setSearchWasUsed(true)
    }
    setInProgress(false);
  }, [movies, nowOnPage])

  function onSearchClick(searchText, isShort) {
    setInProgress(true);
    const moviesInStorage = JSON.parse(localStorage.getItem('movies'));

    if (moviesInStorage) {
      loadMoviesFromStorage(moviesInStorage)
      return
    }

    moviesApi.getAllMovies()
      .then((_movies) => {
        const savedMovieIds = savedMovies.map(obj => obj.movieId);
        const preparedMovies = _movies.map(obj => ({...obj, isSaved: savedMovieIds.includes(obj.id), thumbnail: (moviesApiOptions.url + obj.image.formats.thumbnail.url)}));
        const filteredMovies = filterMovies(preparedMovies, getStorageFilterData())
        localStorage.setItem('movies', JSON.stringify(preparedMovies));
        setMovies(filteredMovies);
      })
    setSearchWasUsed(true);
    setInProgress(false);
  }

  return (
    <section className="movies">
      <SearchForm byAllFilms={true} onSearchClick={onSearchClick} inProgress={inProgress}/>
      {searchWasUsed && <MoviesCardList page='all-movies' cards={movies.slice(0, nowOnPage)} onSaveMovieClick={onSaveMovieClick} inProgress={inProgress}/>}
      {!(movies && (movies.length === nowOnPage || movies.length <= nowOnPage)) &&
        <button className="movies__pagination" type="button" onClick={handleExtendCards}>Еще</button>
      }
    </section>
  )
}

export default Movies;