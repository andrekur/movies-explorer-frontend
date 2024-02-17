export function filterMovies(_movies, filterData) {
  const filteredByName = _movies.filter(movie => (
    movie.nameRU.toLowerCase().includes(filterData.searchText.toLowerCase())
    || movie.nameEN.toLowerCase().includes(filterData.searchText.toLowerCase())
  ))

  if (filterData.isShort === true) {
    return filteredByName.filter(movie => movie.duration <= 40)
  }

  return filteredByName
}