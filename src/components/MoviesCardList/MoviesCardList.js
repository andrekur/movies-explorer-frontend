import MoviesCard from "../MoviesCard/MoviesCard";

import { cards } from "../../consts/CardsData"

function MoviesCardList({page}) {
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