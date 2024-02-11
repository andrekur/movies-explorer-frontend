import React, { useEffect, useState } from "react";

import searchLogo from "../../images/search/icon.svg"


import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({byAllFilms, onSearchClick}) {
  const [isShort, setIsShort] = useState(true);
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  useEffect(() => {
    if (byAllFilms) {
      const isShort = Boolean(localStorage.getItem('isShort') === 'true');
      setIsShort(isShort)
      const searchText = localStorage.getItem('searchText') || ''
      if (searchText) {
        setValues({searchText})
      }
    }
  }, [setValues]);

  function setStorageFilterData(isShort, searchText) {
    localStorage.setItem('isShort', isShort);
    localStorage.setItem('searchText', searchText);
  }

  function handleSearchClick(e) {
    e.preventDefault()

    if (byAllFilms) {
      setStorageFilterData(isShort, values.searchText)
    }
    onSearchClick(values.searchText, isShort)
  }

  function handleIsShortClick(e) {
    e.preventDefault()
    
    const changedIsShort = !isShort;
    setIsShort(changedIsShort)
    if (byAllFilms) {
      setStorageFilterData(changedIsShort, values.searchText)
    }
    onSearchClick(values.searchText, changedIsShort)
  }

  return (
    <section className="search">
      <form className="search__input-block">
        <div className="search__content">
          <img className="search__logo" alt="иконка поиска" src={searchLogo}/>
          <input
            className="search__input"
            id="searchText" value={values.searchText || ''}
            onChange={handleChange}
            type="text"
            name="searchText"
            placeholder={isValid ? `Фильмы` : 'Нужно ввести ключевое слово'}
            required
          />
          <button className={`search__btn-search ${isValid ? '': 'search__btn-search_disable'}`} type="submit" onClick={handleSearchClick} disabled={!isValid}/>
        </div>
        <div className="search__extended-block">
          <button
            className={`search__btn-filter-short ${isShort ? 'search__btn-filter-short_active' : ''} ${isValid ? '': 'search__btn-filter-short_disable'}`}
            type="submit"
            onClick={handleIsShortClick}
            disabled={!isValid}
          />
          <span className="search__btn-filter-text">Короткометражки</span>
        </div>
      </form>
      <span className="search__line"></span>
    </section>
  )
}

export default SearchForm;