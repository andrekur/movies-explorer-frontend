import React from "react";

import searchLogo from "../../images/search/icon.svg"

function SearchForm({byAllFilms,}) {
  return (
    <div className="search">
      <div className="search__input-block">
        <div className="search__content">
          <img className="search__logo" alt="иконка поиска" src={searchLogo}/>
          <input className="search__input" defaultValue="Фильм"></input>
          <button className="search__btn-search"/>
        </div>
        <div className="search__extended-block">
          <button className="search__extended-block__btn-short"/>
          <span className="search__extended-block__text">Короткометражки</span>
        </div>
      </div>
      <span className="search__line"></span>
    </div>
  )
}

export default SearchForm;