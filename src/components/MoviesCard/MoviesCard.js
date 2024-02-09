import React from "react";

function MoviesCard({card, page}) {

  function handleSaveMovie(e) {
    e.preventDefault()

    // call API
  }

  function deleteMovie(e) {
    e.preventDefault()

    // call API
  }

  // page: all-movies/saved-movies
  return (
    <li className="moviescard">
      <img className="moviescard__image" alt={`фотография ${card.name}`} src={card.link}/>
      <div className="moviescard__content">
        <div className="moviescard__hight-block">
          <h2 className="moviescard__title">{card.name}</h2>
          { page === 'all-movies' ?
            <button className={
              `moviescard__save-btn ${ card.isSaved ? 'moviescard__save-btn_active' : '' }`
            } type="button" onClick={handleSaveMovie}/> : ''
          }
          { page === 'saved-movies' ?
            <button className="moviescard__delete-btn" onClick={deleteMovie} type="button"/> : ''
          }
        </div>
        <p className="moviescard__time">1ч42м</p>
      </div>
    </li>
  )
}

export default MoviesCard;