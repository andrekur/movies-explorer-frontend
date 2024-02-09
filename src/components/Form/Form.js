import React from "react";

import Logo from "../Logo/Logo";


function Form({title, onSubmit, children, submitButtonText, additionalText, additionalLinkText, additionlaLink, }) {
  return (
    <div className="form">
      <Logo/>
      <h1 className="form__title">{title}</h1>
      <form className="form__content" onSubmit={onSubmit}>
        { children }
        <button className={`form__save`} type="submit">{submitButtonText}</button>
      </form>
      <div className="form__additional">
        <span className="form__additional-text">{ additionalText }</span>
        <a className="form__additional-link" href={ additionlaLink }>{ additionalLinkText }</a>
      </div>
    </div>
  )
}

export default Form;