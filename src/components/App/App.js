import { useState, useEffect } from "react";
import { Navigate, Route, Routes,  useNavigate } from "react-router-dom"

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import { mainApiOptions, moviesApiOptions } from '../../consts/consts'
import authApi from "../../utils/AuthApi";
import moviesApi from "../../utils/MoviesApi";
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


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [api, setApi] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [curentUser, setCurentUser] = useState(null);

  const navigate = useNavigate();


  function handleLoginFormSubmit(values) {
    setInProgress(true);
    authApi.authorize(values)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        navigate("/", {replace: true});
      })
      .catch(console.error)
    setInProgress(false);
  }

  function handleRegisterFormSubmit(values) {
    setInProgress(true);
    authApi.register(values)
      .then(() => {
        navigate("/signin", {replace: true});
      })
      .catch(console.error)
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
          Promise.all([moviesApi.getAllMovies(), _api.getAllSavedMovies()])
            .then(([_allMovies, _savedMovies]) => {
              const savedMovieIds = _savedMovies.map(obj => obj.movieId);
              setAllMovies(_allMovies.map(obj => ({...obj, isSaved: savedMovieIds.includes(obj.id), thumbnail: (moviesApiOptions.url + obj.image.formats.thumbnail.url)})));
              setSavedMovies(_savedMovies);
              setCurentUser(data);
            })
          setApi(_api)
        })
        .catch(console.error)
    };
  }, [loggedIn])

  function handleSaveMovieClick(card) {
    api.createMovie({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: moviesApiOptions.url + card.image.url,
      trailer: card.trailerLink,
      thumbnail: moviesApiOptions.url + card.image.formats.thumbnail.url,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      movieId: card.id
    })
    .then(result => {
      setSavedMovies(savedMovies.concat(result))
    })
    .catch(console.error)
  }

  return (
    <div className="page">
        <Header loggedIn={true}/>
        <main>
          <Routes>
            <Route path="*" element={<NotFoundPage/>}></Route>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/movies" element={<ProtectedRouteElement element={Movies} loggedIn={loggedIn} onSaveMovieClick={handleSaveMovieClick} movies={allMovies}/>}></Route>
            <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn} savedMovies={savedMovies}/>}></Route>
            <Route path="/profile" element={<ProtectedRouteElement element={Profile} loggedIn={loggedIn}/>}></Route>
            <Route path="/signin" element={<Login onSubmit={handleLoginFormSubmit}/>}></Route>
            <Route path="/signup" element={<Register onSubmit={handleRegisterFormSubmit}/>}></Route>
          </Routes>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
