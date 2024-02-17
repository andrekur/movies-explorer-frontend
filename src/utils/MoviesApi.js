import { moviesApiOptions } from '../constants/constants'


class MoviesApi{
  constructor({url, headers }) {
    this._url = url;
    this._headers = headers;
  };

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
         return response.json() 
        };

        throw new Error(response.statusText);
      })
  }

  getAllMovies() {
    return this._sendRequest(`${this._url}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers
    })
  }
};
export const moviesApi = new MoviesApi(moviesApiOptions);

export default moviesApi