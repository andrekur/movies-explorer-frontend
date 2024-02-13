export const isHeadActivePaths = ['/', '/movies', '/saved-movies', '/profile']
export const isFooterActivePaths = ['/', '/movies', '/saved-movies']
export const paginationMoviesSettings = {
  // col*row
  more: 4*4,
  many: 3*4,
  medium: 2*4,
  little: 1*5
}

export const authorizationPaths = ['/signin', '/signup']

export const defaultApiErrorText = 'Что-то пошло не так'

export const mainApiOptions = {
  url: process.env.REACT_APP_API_SERVER || "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json',
  }
}

export const moviesApiOptions = {
  url: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  }
}