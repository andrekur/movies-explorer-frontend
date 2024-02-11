import React, { useState, useEffect } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";


import { moviesApiOptions } from '../../consts/consts'
import { filterMovies } from "../../utils/filter";
import moviesApi from "../../utils/MoviesApi";

import { getCountItemOnPage } from "../../utils/pagination";


function Movies({onSaveMovieClick, savedMovies}) {
  const [inProgres, setInProgres] = useState(false);
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
    setInProgres(true);
    const moviesInStorage = JSON.parse(localStorage.getItem('movies'));
    if (movies.length === 0 && moviesInStorage && !wasUploaded) {
      loadMoviesFromStorage(moviesInStorage)
      setSearchWasUsed(true)
    }
    setInProgres(false);
  }, [movies, nowOnPage])

  function onSearchClick(searchText, isShort) {
    setInProgres(true);
    const moviesInStorage = JSON.parse(localStorage.getItem('movies'));

    if (moviesInStorage) {
      loadMoviesFromStorage(moviesInStorage)
      return
    }

    moviesApi.getAllMovies()
      .then((_movies) => {
        const savedMovieIds = savedMovies.map(obj => obj.movieId);
        const pareparedMovies = _movies.map(obj => ({...obj, isSaved: savedMovieIds.includes(obj.id), thumbnail: (moviesApiOptions.url + obj.image.formats.thumbnail.url)}));
        const filteredMovies = filterMovies(pareparedMovies, getStorageFilterData())
        localStorage.setItem('movies', JSON.stringify(pareparedMovies));
        setMovies(filteredMovies);
      })
    setSearchWasUsed(true);
    setInProgres(false);
  }

  return (
    <section className="movies">
      <SearchForm byAllFilms={true} onSearchClick={onSearchClick}/>
      {searchWasUsed && <MoviesCardList page='all-movies' cards={movies.slice(0, nowOnPage)} onSaveMovieClick={onSaveMovieClick} inProgres={inProgres}/>}
      {!(movies && (movies.length === nowOnPage || movies.length <= nowOnPage)) &&
        <button className="movies__pagination" type="button" onClick={handleExtendCards}>Еще</button>
      }
    </section>
  )
}

export default Movies;