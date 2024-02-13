import React from "react";
import { useLocation } from 'react-router-dom';

import { isFooterActivePaths } from '../../constants/constants'

function Footer() {

  const { pathname } = useLocation();

  const isActive = isFooterActivePaths.includes(pathname)

  if (isActive) {
    return (
      <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__block">
          <p className="footer__year">© 2024</p>
          <ul className="footer__links">
            <li><a className="footer__link" href="https://practicum.yandex.ru/" rel="noreferrer" target="_blank">Яндекс.Практикум</a></li>
            <li><a className="footer__link" href="https://github.com/andrekur" rel="noreferrer" target="_blank">Github</a></li>
          </ul>
        </div>
      </footer>
    )
  }
  else {
    return null
  }
}

export default Footer