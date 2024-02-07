import React from "react";

import Logo from "../Logo/Logo";


function Form({title, onSubmit, children, submitButtonText, additionalText, additionalLinkText, additionlaLink, }) {
  return (
    <div className="form__content">
      <Logo/>
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