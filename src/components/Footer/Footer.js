import React from "react";
import { useLocation } from 'react-router-dom';

import { isFooterActivePath} from '../../consts/consts'

function Footer() {

  const { pathname } = useLocation();

  const isActive = isFooterActivePath.includes(pathname)

  if (isActive) {
    return (
      <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__block">
          <p className="footer__year">© 2024</p>
          <ul className="footer__links">
            <a className="footer__link" href="#">Яндекс.Практикум</a>
            <a className="footer__link" href="#">Github</a>
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