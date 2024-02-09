import { authApiOptions } from '../consts/consts'


class AuthApi{
  constructor({url, headers}) {
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

  checkToken(token) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      }
    })
  };
}

export const authApi = new AuthApi(authApiOptions);

export default authApi