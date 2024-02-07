import React from "react";

import { Link  } from "react-router-dom"
import logoImage from "../../images/menu/logo.svg"


function Logo() {
  return (
    <Link className="logo" to='/'>
      <img className="logo__image" alt='Логотип проекта' src={logoImage}/>
    </Link>
  )
}

export default Logo;