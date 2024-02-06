import React from "react";

import logo from "../../images/menu/logo.svg"

function Form({title, onSubmit, children, submitButtonText, additionalText, additionalLinkText, additionlaLink, }) {
  return (
    <div className="form__content">
      <img className="form__logo" src={logo} alt='Логотип проекта'/>
      <h2 className="form__title">{title}</h2>
      <form className="form" onSubmit={onSubmit}>
        { children }
        <button className={`form__save`}>{submitButtonText}</button>
      </form>
      <div className="form__additional">
        <span className="form__additional__text">{ additionalText }</span>
        <a className="form__additional__link" href={ additionlaLink }>{ additionalLinkText }</a>
      </div>
    </div>
  )
}

export default Form;