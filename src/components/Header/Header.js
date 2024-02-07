import React, { useEffect, useState } from "react";
import { NavLink, useLocation} from 'react-router-dom';

import { useMenuClose } from '../../hooks/menuOverlayClick';
import { isHeadActivePath} from '../../consts/consts'
import Logo from '../Logo/Logo'

function Header({loggedIn}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useMenuClose(mobileMenuOpen, handleOpenMobileMenu);
  const { pathname } = useLocation();

  const isMainPage = pathname === '/';
  const isHeaderActive = isHeadActivePath.includes(pathname)

  useEffect(() => {
  }, [loggedIn])

  function handleOpenMobileMenu(e) {
    e.preventDefault();

    setMobileMenuOpen(!mobileMenuOpen);
  }

  if (isHeaderActive) {
    return (
      <header className={`header ${ isMainPage ? 'header_background_gray' : ''}`}>
        <div className="header__block ">
          <Logo/>
          <div className="header__navigation">
            { loggedIn &&
              <div className="header__desktop-menu">
                <nav className="header__desktop-menu__links">
                  <NavLink to="/movies" className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""} `}>Фильмы</NavLink>
                  <NavLink to="/saved-movies" className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""}`}>Сохранённые фильмы</NavLink>
                </nav>
                <NavLink className="header__profile-link" to='/profile'/>
              </div>
            }
            { !loggedIn &&
              <div className="header__auth-block">
                <button className="header__signup-btn">Регистрация</button>
                <button className="header__sign-btn">Войти</button>
              </div>
            }
          </div>
          <button className="header__mobile-menu_open-btn" onClick={handleOpenMobileMenu}/>
          { mobileMenuOpen && loggedIn && 
            <div className="header__mobile-menu">
              <div className="header__mobile-menu-content">
                <nav className="header__mobile-menu__links">
                  <NavLink to="/" className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""} `}>Главная</NavLink>
                  <NavLink to="/movies" className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""} `}>Фильмы</NavLink>
                  <NavLink to="/saved-movies" className={({isActive}) => `header__link ${isActive ? "header__link_active" : ""}`}>Сохранённые фильмы</NavLink>
                </nav>
                <NavLink className="header__profile-link" to='/profile'/>
                <button className="header__mobile-menu_close-btn" onClick={handleOpenMobileMenu}/>
              </div>
            </div>
          }
        </div>
      </header>
    )
  }
  else {
    return null;
  }
}

export default Header