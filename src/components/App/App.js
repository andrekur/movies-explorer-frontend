import { useState, useEffect } from "react";
import { useLocation, Route, Routes,  useNavigate } from "react-router-dom"

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import {moviesApiOptions, defaultApiErrorText, authorizationPaths} from '../../constants/constants'
import mainApi from "../../utils/MainApi";

import CurrentUserContext from "../../contexts/CurrentUserContext"

import Main from "../Main/Main"
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Notification from "../Notification/Notification";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotificationSuccess, setIsNotificationSuccess] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const { pathname } = useLocation()


  function notifyUser(text, isSuccess) {
    setNotificationText(text);
    setIsNotificationSuccess(isSuccess);
    setIsNotificationOpen(true);
    setTimeout(() => {setIsNotificationOpen(false)}, 5000)
  }

  function loginUser(values, successCallBack, errCallBack) {
    return mainApi.authorize(values)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        mainApi.updateApiToken(data.token)
        authorizeUser('/movies')
        successCallBack()
      })
      .catch((err) => {
        err.status === 401 ? errCallBack('Вы ввели неправильный логин или пароль') : errCallBack('При авторизации произошла ошибка');
      })
  }

  function authorizeUser(successPathToRedirect=undefined) {
    return mainApi.checkApiToken()
      .then((data) => {
        if (successPathToRedirect) {
          navigate('/movies', {replace: true});
        }
        else {
          const pathToRedirect = authorizationPaths.includes(pathname) ? '/' : pathname
          navigate(pathToRedirect, {replace: true});
        }
        setLoggedIn(true);
        return data
      })
      .then((data) => {
        mainApi.getAllSavedMovies()
          .then((_savedMovies) => {
            setSavedMovies(_savedMovies);
            setCurrentUser(data);
          })
          .catch((err) => {
            notifyUser(defaultApiErrorText, false);
          })
      })
      .catch((err) => {
        notifyUser(defaultApiErrorText, false);
      })
  }

  function handleLoginFormSubmit(values, successCallBack, errCallBack) {
    setInProgress(true);
    loginUser(values, successCallBack, errCallBack)
    setInProgress(false);
  }

  function handleRegisterFormSubmit(values, successCallBack, errCallBack) {
    setInProgress(true);
    mainApi.register(values)
      .then(() => {
        loginUser(values, () => {}, notifyUser(defaultApiErrorText, false))
        successCallBack()
        notifyUser('Вы успешно зарегистрировались!', true);
      })
      .catch((err) => {
        err.status === 409 ? errCallBack('Пользователь с таким email уже существует') : errCallBack('При регистрации пользователя произошла ошибка');
        if (err.status === 500) {
          notifyUser(defaultApiErrorText, false)
        }
      })
    setInProgress(false);
  }

  function handleLogout(e) {
    localStorage.clear();
    mainApi.resetApiToken()
    setCurrentUser(null);
    setLoggedIn(false);
    navigate("/", {replace: true});
  }

  function handleEditProfile(values, successCallBack, errCallBack) {
    setInProgress(true);
    mainApi.editUserProfile(values)
      .then((data) => {
        setCurrentUser(data)
        successCallBack()
        notifyUser('Данные успешно изменены!', true);
      })
      .catch((err) => {
        err.status === 400 ? errCallBack('Пользователь с таким email уже существует') : errCallBack('При обновлении профиля произошла ошибка.');
        if (err.status === 500) {
          notifyUser(defaultApiErrorText, false);
        }
      })
    setInProgress(false);
  }

  useEffect(() => {
    setInProgress(true);
    if (mainApi.isTokenLocal()) {
      authorizeUser();
    }
    setInProgress(false);
  }, [loggedIn])

  function handleDeleteSavedFilm(savedMovie) {
    const moviesInStorage = JSON.parse(localStorage.getItem('movies'));
    if (moviesInStorage) {
      const _movie = moviesInStorage.filter(movie => movie.id === savedMovie.movieId)[0]

      _deleteSavedFilm(_movie, savedMovie)
    }
    else {
      setSavedMovies((state) => state.filter((c) => c._id !== savedMovie._id))
    }
  }

  function _deleteSavedFilm(movie, savedMovie) {
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        movie.isSaved = false;
        const moviesInStorage = JSON.parse(localStorage.getItem('movies'));
        setSavedMovies((state) => state.filter((c) => c._id !== savedMovie._id))
        localStorage.setItem('movies', JSON.stringify(moviesInStorage.map((c) => c.id === movie.id ? movie : c)));
      })
      .catch((err) => {
        notifyUser(defaultApiErrorText, false);
      })
  }

  function handleSaveMovieClick(movie) {
    const savedMovie = savedMovies.filter(savedMovie => savedMovie.movieId === movie.id)

    if (savedMovie.length >= 1) {

      _deleteSavedFilm(movie, savedMovie[0])
    }
    else {
      mainApi.createMovie({
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
        const moviesInStorage = JSON.parse(localStorage.getItem('movies'));
        localStorage.setItem('movies', JSON.stringify(moviesInStorage.map((c) => c.id === movie.id ? movie : c)));
      })
      .catch((err) => {
        notifyUser(defaultApiErrorText, false);
      })
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn}/>
        <main>
          <Routes>
            <Route path="*" element={<NotFoundPage/>}></Route>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/movies" element={<ProtectedRouteElement element={Movies} savedMovies={savedMovies} loggedIn={loggedIn} onSaveMovieClick={handleSaveMovieClick}/>}></Route>
            <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} inProgress={inProgress} loggedIn={loggedIn} savedMovies={savedMovies} onDeleteMovieClick={handleDeleteSavedFilm}/>}></Route>
            <Route path="/profile" element={<ProtectedRouteElement element={Profile} loggedIn={loggedIn} onSubmit={handleEditProfile} logout={handleLogout}/>}></Route>
            <Route path="/signin" element={<Login onSubmit={handleLoginFormSubmit}/>}></Route>
            <Route path="/signup" element={<Register onSubmit={handleRegisterFormSubmit}/>}></Route>
          </Routes>
          {isNotificationOpen && <Notification text={notificationText} isSuccess={isNotificationSuccess}></Notification>}
        </main>
        <Footer/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
