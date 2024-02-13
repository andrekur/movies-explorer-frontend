import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../components/Preloader/Preloader"

function MoviesCardList({page, cards, onSaveMovieClick, onDeleteMovieClick, inProgress}) {

  const nothingText = `${page === 'all-movies' ? 'Ничего не найдено' : 'Ничего не добавлено'}`

  if (inProgress) {
    return (
      <Preloader></Preloader>
    )
  }
  else return (
    <ul className="movies-list">
      {cards.length === 0 && <span className="movies-list__nothing-text">{nothingText}</span>}
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