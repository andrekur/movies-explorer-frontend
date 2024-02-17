import React, { useEffect, useState} from "react";

import Form from "../Form/Form";

import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { emailRegExp } from "../../constants/constants";

function Login({onSubmit}) {
  const [errText, setErrText] = useState('');
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  function handleInputChanged(e) {
    setErrText('');
    handleChange(e);
  }

  useEffect(() => {

  }, [setValues]);

  function handleApiSuccess() {
    resetForm();
    setIsWaitingResponse(false);
  }

  function handleApiError(err) {
    setErrText(err);
    setIsWaitingResponse(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsWaitingResponse(true);
    onSubmit(values, handleApiSuccess, handleApiError);
  }

  return (
    <section className="login">
      <Form onSubmit={handleSubmit} title='Рады видеть!' submitButtonText='Войти' additionalText='Ещё не зарегистрированы?' additionalLinkText='Регистрация' additionalLink='/signup' isValid={isValid} isWaitingResponse={isWaitingResponse}>
        <span className="form__input-helper">E-mail</span>
        <input className="form__input form__input_field_email" id="email" pattern={emailRegExp} value={values.email || ''} onChange={handleInputChanged} type="email" name="email" placeholder="email" required/>
        <span className="form__input-error">{errors.email || ''}</span>
        <span className="form__input-helper">Пароль</span>
        <input className="form__input form__input_field_password"  id="password" value={values.password || ''} onChange={handleInputChanged} type="password" name="password" minLength='8' placeholder="пароль" required/>
        <span className="form__input-error">{errors.password || ''}</span>
        <span className="login__form-free-hight">
          {errText && <span className="login__error-text">{errText}</span>}
        </span>
      </Form>
    </section>
  )
}

export default Login;