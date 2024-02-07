import React from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { cards } from "../../consts/CardsData"

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm byAllFilms={false}/>
      <MoviesCardList page='saved-movies' cards={cards}/>
    </section>
  )
};

export default SavedMovies;