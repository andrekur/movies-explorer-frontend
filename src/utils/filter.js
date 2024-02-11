export function filterMovies(_movies, filterData) {
  const nameFilitered = _movies.filter(movie => (
    movie.nameRU.toLowerCase().includes(filterData.searchText.toLowerCase())
    || movie.nameEN.toLowerCase().includes(filterData.searchText.toLowerCase())
  ))

  if (filterData.isShort === true) {
    return nameFilitered.filter(movie => movie.duration <= 40)
  }

  return nameFilitered
}