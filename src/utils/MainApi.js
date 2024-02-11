class MainApi{
  constructor({url, headers }, jwt) {
    this._url = url;
    headers.authorization = `Bearer ${jwt}`
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

  editUserProfile(data) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

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

};

export default MainApi