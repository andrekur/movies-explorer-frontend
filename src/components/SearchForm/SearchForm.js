import React from "react";

import searchLogo from "../../images/search/icon.svg"

function SearchForm({byAllFilms,}) {
  return (
    <section className="search">
      <form className="search__input-block">
        <div className="search__content">
          <img className="search__logo" alt="иконка поиска" src={searchLogo}/>
          <input className="search__input" defaultValue="Фильм"></input>
          <button className="search__btn-search" type="submit"/>
        </div>
        <div className="search__extended-block">
          <button className="search__btn-filter-short" type="submit"/>
          <span className="search__btn-filter-text">Короткометражки</span>
        </div>
      </form>
      <span className="search__line"></span>
    </section>
  )
}

export default SearchForm;