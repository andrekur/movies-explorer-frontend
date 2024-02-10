import React, { useState, useEffect } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";


import { moviesApiOptions } from '../../consts/consts'
import moviesApi from "../../utils/MoviesApi";

import { getCountItemOnPage } from "../../utils/pagination";

function Movies({onSaveMovieClick, savedMovies}) {
  const [nowOnPage, setOnPage] = useState(getCountItemOnPage());
  const [movies, setMovies] = useState([]);

  function getStorageFilterData(){
    const isShort = localStorage.getItem('isShort') || true
    const searchText = localStorage.getItem('searchText') || ''

    return {searchText, isShort}
  }

  function filterMovies(_movies, filterData) {
    console.log(filterData)
    console.log(_movies)
    const filteredByDaration = filterData.isShort ? _movies.filter(movie => movie.duration <= 40) : _movies
    console.log(filteredByDaration)
    return filteredByDaration.filter(movie => (
      movie.nameRU.includes(filterData.searchText)
      || movie.nameEN.includes(filterData.searchText)
      )
    )
  }

  function handleExtendCards(e) {
    e.preventDefault()

    setOnPage(nowOnPage + getCountItemOnPage())
  }

  useEffect(() => {
    // 1)checked filter 2)call api 3)filterd


  }, [movies, nowOnPage]) // full rerender

  function onSearchClick(type, searchText, isShort) {
    console.log(type, searchText, isShort)
    const moviesInStorage = JSON.parse(localStorage.getItem('movies'));

    if (!moviesInStorage) {
      moviesApi.getAllMovies()
        .then((_movies) => {
          const savedMovieIds = savedMovies.map(obj => obj.movieId);
          const pareparedMovies = _movies.map(obj => ({...obj, isSaved: savedMovieIds.includes(obj.id), thumbnail: (moviesApiOptions.url + obj.image.formats.thumbnail.url)}));
          const filteredMovies = filterMovies(pareparedMovies, getStorageFilterData())
          setMovies(filteredMovies);
          localStorage.setItem('movies', JSON.stringify(pareparedMovies));
        })
    }
    else {
      setMovies(filterMovies(moviesInStorage, getStorageFilterData()));
    }
  }

  return (
    <section className="movies">
      <SearchForm byAllFilms={true} onSearchClick={onSearchClick}/>
      <MoviesCardList page='all-movies' cards={movies.slice(0, nowOnPage)} onSaveMovieClick={onSaveMovieClick}/>
      {!(movies.length && movies.length === nowOnPage || movies.length <= nowOnPage) &&
        <button className="movies__pagination" type="button" onClick={handleExtendCards}>Еще</button>
      }
    </section>
  )
}

export default Movies;