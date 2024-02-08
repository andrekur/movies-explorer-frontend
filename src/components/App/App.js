import { useState, useEffect } from "react";
import { Navigate, Route, Routes,  useNavigate } from "react-router-dom"

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import Main from "../Main/Main"
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  const navigate = useNavigate();

  return (
    <div className="page">
        <Header loggedIn={false}/>
        <main>
          <Routes>
            <Route path="*" element={<NotFoundPage/>}></Route>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/movies" element={<Movies/>}></Route>
            <Route path="/saved-movies" element={<SavedMovies/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/signin" element={<Login/>}></Route>
            <Route path="/signup" element={<Register/>}></Route>
          </Routes>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
