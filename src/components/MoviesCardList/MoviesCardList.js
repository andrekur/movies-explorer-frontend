import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({page, cards, onSaveMovieClick, onDeleteMovieClick}) {

  const nothingText = `${page === 'all-movies' ? 'Ничего не найдено' : 'Ничего не добавлено'}`

  return (
    <ul className="moviescardlist">
      {cards.length === 0 && <span className="moviescardlist__nothing-text">{nothingText}</span>}
      {cards && cards.map((card) => {
        return (
          <MoviesCard
            card={card}
            key={card.id || card._id}
            page={page}
            onSaveMovieClick={onSaveMovieClick}
            onDeleteMovieClick={onDeleteMovieClick}
          />
        )
      })}
    </ul>
  )
}

export default MoviesCardList;