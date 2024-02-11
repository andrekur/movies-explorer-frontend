import { useState, useEffect } from "react";
import { Navigate, Route, Routes,  useNavigate } from "react-router-dom"

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import { mainApiOptions, moviesApiOptions, DefaultApiErrText } from '../../consts/consts'
import authApi from "../../utils/AuthApi";
import MainApi from "../../utils/MainApi";

import CurentUserContext from "../contexts/CurentUserContext"

import Main from "../Main/Main"
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import ErrorNotification from "../ErrorNotification/ErrorNotification";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [api, setApi] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [curentUser, setCurentUser] = useState(null);
  const [errText, setErrText] = useState('');

  const navigate = useNavigate();


  function handleLoginFormSubmit(values, successCallBack, errCallBack) {
    setInProgress(true);
    authApi.authorize(values)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        navigate('/movies', {replace: true});
        successCallBack()
      })
      .catch((err) => {
        errCallBack(DefaultApiErrText)
      })
    setInProgress(false);
  }

  function handleRegisterFormSubmit(values) {
    setInProgress(true);
    authApi.register(values)
      .then(() => {
        navigate("/signin", {replace: true});
      })
      .catch((err) => {
        setErrText(DefaultApiErrText)
        console.error(err)
      })
    setInProgress(false);
  }

  function handleLogout(e) {
    localStorage.clear();
    setCurentUser(null);
    setLoggedIn(false);
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      authApi.checkToken(jwt)
        .then((data) => {
          setLoggedIn(true);
          navigate("/", {replace: true});
          return data
        })
        .then((data) => {
          const _api = new MainApi(mainApiOptions, jwt)
          _api.getAllSavedMovies()
            .then((_savedMovies) => {
              setSavedMovies(_savedMovies);
              setCurentUser(data);
            })
          setApi(_api)
        })
        .catch((err) => {
          setErrText(DefaultApiErrText)
          console.error(err)
        })
    };
  }, [loggedIn])

  function handleDeleteSavedFilm(savedMovie) {
    const moviesInStorage = JSON.parse(localStorage.getItem('movies'));
    if (moviesInStorage) {
      const _movie = moviesInStorage.filter(movie => movie.id === savedMovie.movieId)[0]
      console.log(_movie, savedMovie)
      _deleteSavedFilm(_movie, savedMovie)
    }
    else {
      setSavedMovies((state) => state.filter((c) => c._id !== savedMovie._id))
    }
  }

  function _deleteSavedFilm(movie, savedMovie) {
    api.deleteMovie(savedMovie._id)
      .then(() => {
        movie.isSaved = false;
        const moviesInStorage = JSON.parse(localStorage.getItem('movies'));
        setSavedMovies((state) => state.filter((c) => c._id !== savedMovie._id))
        localStorage.setItem('movies', JSON.stringify(moviesInStorage.map((c) => c.id === movie.id ? movie : c)));
      })
      .catch((err) => {
        setErrText(DefaultApiErrText)
        console.error(err)
      })
  }

  function handleSaveMovieClick(movie) {
    const savedMovie = savedMovies.filter(savedMovie => savedMovie.movieId === movie.id)

    if (savedMovie.length >= 1) {
      console.log(movie, savedMovie[0])
      _deleteSavedFilm(movie, savedMovie[0])
    }
    else {
      api.createMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: moviesApiOptions.url + movie.image.url,
        trailer: movie.trailerLink,
        thumbnail: moviesApiOptions.url + movie.image.formats.thumbnail.url,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id
      })
      .then(result => {
        movie.isSaved = true;
        setSavedMovies(savedMovies.concat(result))
      })
      .catch((err) => {
        setErrText(DefaultApiErrText)
        console.error(err)
      })
    }
  }

  return (
    <div className="page">
        <Header loggedIn={loggedIn}/>
        <main>
          <Routes>
            <Route path="*" element={<NotFoundPage/>}></Route>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/movies" element={<ProtectedRouteElement element={Movies} savedMovies={savedMovies} loggedIn={loggedIn} onSaveMovieClick={handleSaveMovieClick}/>}></Route>
            <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn} savedMovies={savedMovies} onDeleteMovieClick={handleDeleteSavedFilm}/>}></Route>
            <Route path="/profile" element={<ProtectedRouteElement element={Profile} loggedIn={loggedIn}/>}></Route>
            <Route path="/signin" element={<Login onSubmit={handleLoginFormSubmit}/>}></Route>
            <Route path="/signup" element={<Register onSubmit={handleRegisterFormSubmit}/>}></Route>
          </Routes>
          {errText && <ErrorNotification text={errText}></ErrorNotification>}
        </main>
        <Footer/>
    </div>
  );
}

export default App;
