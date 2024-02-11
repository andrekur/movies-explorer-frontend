import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function MoviesCard({card, page, onSaveMovieClick, onDeleteMovieClick}) {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(getTime(card.duration))
  }, [])

  function getTime(duration) {
    const hours = Math.floor(duration / 60);
    const minute = duration % 60;
    if (hours && minute) {
      return `${hours}ч${minute}м`
    }
    if (hours) {
      return `${hours}ч`
    }
    else {
      return `${minute}м`
    }
  }

  function handleSaveMovie(e) {
    e.preventDefault()

    onSaveMovieClick(card)
  }

  function deleteMovie(e) {
    e.preventDefault()

    onDeleteMovieClick(card)
  }

  // page: all-movies/saved-movies
  return (
    <li className="moviescard">
      <a href={`${card.trailerLink}`} rel="noreferrer" target="_blank">
        <img className="moviescard__image" alt={`фотография ${card.nameRU}`} src={card.thumbnail}/>
      </a>
      <div className="moviescard__content">
        <div className="moviescard__hight-block">
          <h2 className="moviescard__title">{card.nameRU}</h2>
          { page === 'all-movies' ?
            <button className={
              `moviescard__save-btn ${ card.isSaved ? 'moviescard__save-btn_active' : '' }`
            } type="button" onClick={handleSaveMovie}/> : ''
          }
          { page === 'saved-movies' ?
            <button className="moviescard__delete-btn" onClick={deleteMovie} type="button"/> : ''
          }
        </div>
        <p className="moviescard__time">{time}</p>
      </div>
    </li>
  )
}

export default MoviesCard;