import React, { useEffect, } from "react";

import Form from "../Form/Form";

import { useFormAndValidation } from "../../hooks/useFormAndValidation";


function Login() {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  useEffect(() => {

  }, [setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    //call Api login
    resetForm();
  }

  return (
    <div className="login">
      <Form onSubmit={handleSubmit} title='Рады видеть!' submitButtonText='Войти' additionalText='Ещё не зарегистрированы?' additionalLinkText='Регистрация' additionlaLink='/signup'>
        <span className="form__input-helper">E-mail</span>
        <input className="form__input form__input_field_email" id="email" value={values.email || ''} onChange={handleChange} type="email" name="email" placeholder="email" required/>
        <span className="form__input-error">{errors.email || ''}</span>
        <span className="form__input-helper">Пароль</span>
        <input className="form__input form__input_field_password"  id="password" value={values.password || ''} onChange={handleChange} type="password" name="password" minLength='8' placeholder="пароль" required/>
        <span className="form__input-error">{errors.password || ''}</span>
        <span className="login__form-free-hight"></span>
      </Form>
    </div>
  )
}

export default Login;