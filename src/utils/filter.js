export function filterMovies(_movies, filterData) {
  const filteredByDaration = filterData.isShort ? _movies.filter(movie => movie.duration <= 40) : _movies
  return filteredByDaration.filter(movie => (
    movie.nameRU.toLowerCase().includes(filterData.searchText.toLowerCase())
    || movie.nameEN.toLowerCase().includes(filterData.searchText.toLowerCase())
    )
  )
}