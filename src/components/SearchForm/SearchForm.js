import React, { useEffect, } from "react";

import searchLogo from "../../images/search/icon.svg"


import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({byAllFilms, onSearchClick}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  useEffect(() => {

  }, [setValues]);

  function setStorageFilterData(isShort, searchText) {
    localStorage.setItem('isShort', isShort);
    localStorage.setItem('searchText', searchText);
  }

  function handleSearchClick(e) {
    e.preventDefault()
    setStorageFilterData(false, values.searchText)
    onSearchClick('all-movies', values.searchText, false)
  }

  return (
    <section className="search">
      <form className="search__input-block">
        <div className="search__content">
          <img className="search__logo" alt="иконка поиска" src={searchLogo}/>
          <input className="search__input" id="searchText" value={values.searchText || ''} onChange={handleChange} type="text" name="searchText" placeholder="Фильмы" required></input>
          <button className="search__btn-search" type="submit" onClick={handleSearchClick} disabled={!isValid}/>
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