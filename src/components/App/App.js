import { useState, useEffect } from "react";
import { Navigate, Route, Routes,  useNavigate } from "react-router-dom"

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import {moviesApiOptions, DefaultApiErrText } from '../../consts/consts'
import mainApi from "../../utils/MainApi";

import CurentUserContext from "../contexts/CurentUserContext"

import Main from "../Main/Main"
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [inProgres, setInProgres] = useState(false);
  const [curentUser, setCurentUser] = useState(null);

  const navigate = useNavigate();


  function handleLoginFormSubmit(values, successCallBack, errCallBack) {
    setInProgres(true);
    // authApi.authorize(values)
    //   .then((data) => {
    //     setLoggedIn(true);
    //     localStorage.setItem('jwt', data.token);
    //     navigate('/movies', {replace: true});
    //     successCallBack()
    //   })
    //   .catch((err) => {
    //     errCallBack(DefaultApiErrText)
    //   })
    setInProgres(false);
  }

  function handleRegisterFormSubmit(values, successCallBack, errCallBack) {
    setInProgres(true);
    // authApi.register(values)
    //   .then(() => {
    //     navigate("/signin", {replace: true});
    //     successCallBack()
    //   })
    //   .catch((err) => {
    //     errCallBack(DefaultApiErrText)
    //   })
    setInProgres(false);
  }

  function handleLogout(e) {
    localStorage.clear();
    setCurentUser(null);
    setLoggedIn(false);
  }

  function handleEditProfile(values, successCallBack, errCallBack) {
    setInProgres(true);
    mainApi.editUserProfile(values)
      .then((data) => {
        setCurentUser(data)
        successCallBack()
      })
      .catch((err) => {
        errCallBack(DefaultApiErrText)
      })
    setInProgres(false);
  }

  useEffect(() => {
    setInProgres(true);
    if (mainApi.isTokenLocal()) {
      mainApi.checkApiToken()
        .then((data) => {
          setLoggedIn(true);
          navigate('/movies', {replace: true});
          return data
        })
        .then((data) => {
          mainApi.getAllSavedMovies()
            .then((_savedMovies) => {
              setSavedMovies(_savedMovies);
              setCurentUser(data);
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
    setInProgres(false);
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
        console.error(err)
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
        console.error(err)
      })
    }
  }

  return (
    <div className="page">
      <CurentUserContext.Provider value={curentUser}>
        <Header loggedIn={loggedIn}/>
        <main>
          <Routes>
            <Route path="*" element={<NotFoundPage/>}></Route>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/movies" element={<ProtectedRouteElement element={Movies} savedMovies={savedMovies} loggedIn={loggedIn} onSaveMovieClick={handleSaveMovieClick}/>}></Route>
            <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} inProgres={inProgres} loggedIn={loggedIn} savedMovies={savedMovies} onDeleteMovieClick={handleDeleteSavedFilm}/>}></Route>
            <Route path="/profile" element={<ProtectedRouteElement element={Profile} loggedIn={loggedIn} onSubmit={handleEditProfile} logout={handleLogout}/>}></Route>
            <Route path="/signin" element={<Login onSubmit={handleLoginFormSubmit}/>}></Route>
            <Route path="/signup" element={<Register onSubmit={handleRegisterFormSubmit}/>}></Route>
          </Routes>
        </main>
        <Footer/>
      </CurentUserContext.Provider>
    </div>
  );
}

export default App;
