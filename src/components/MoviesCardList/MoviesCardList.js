import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({page, cards, onSaveMovieClick, onDeleteMovieClick}) {
  console.log('terst', cards, cards.length === 0 && <a>Ничего не найдено</a>)
  return (
    <ul className="moviescardlist">
      {cards.length === 0 && <a>Ничего не найдено</a>}
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