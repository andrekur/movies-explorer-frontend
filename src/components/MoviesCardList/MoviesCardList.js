import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({page, cards}) {
  return (
    <ul className="moviescardlist">
      {cards.map((card) => {
        return (
          <MoviesCard
            card={card}
            key={card._id}
            page={page}
          />
        )
      })}
    </ul>
  )
}

export default MoviesCardList;