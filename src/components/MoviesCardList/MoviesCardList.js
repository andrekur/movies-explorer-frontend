import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({page, cards, onSaveMovieClick}) {
  return (
    <ul className="moviescardlist">
      {cards && cards.map((card) => {
        return (
          <MoviesCard
            card={card}
            key={card.id || card._id}
            page={page}
            onSaveMovieClick={onSaveMovieClick}
          />
        )
      })}
    </ul>
  )
}

export default MoviesCardList;