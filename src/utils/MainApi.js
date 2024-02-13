import { mainApiOptions } from '../constants/constants'


class MainApi{
  constructor({url, headers, jwt}) {
    this._url = url;
    if (jwt) {
      headers.authorization = `Bearer ${jwt}`
    }
    this._headers = headers;
  };

  isTokenLocal() {
    return Boolean(this._headers.authorization)
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
         return response.json()
        };

        throw new Error(response.statusText);
    })
  }

  updateApiToken(jwt) {
    this._headers = {...this._headers, authorization: `Bearer ${jwt}`}
  }

  checkApiToken() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  };

  deleteMovie(movieId) {
    return this._sendRequest(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers
    })
  }

  getAllSavedMovies() {
    return this._sendRequest(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers
    })
  }

  createMovie(data) {
    return this._sendRequest(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  register({name, email, password}) {
    return this._sendRequest(`${this._url}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({name, password, email})
      })
  };

  authorize({email, password}){
    return this._sendRequest(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
  };

};

const mainApi = new MainApi({...mainApiOptions, jwt: localStorage.getItem('jwt')});

export default mainApi