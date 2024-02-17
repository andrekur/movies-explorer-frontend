import React, { useEffect, useState} from "react";

import Form from "../Form/Form";

import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { emailRegExp, userNameRegExp } from "../../constants/constants";


function Register({onSubmit}) {
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
    <section className="register">
      <Form onSubmit={handleSubmit} title='Добро пожаловать!' submitButtonText='Зарегистрироваться' additionalText='Уже зарегистрированы?' additionalLinkText='Войти' additionalLink='/signin' isValid={isValid} isWaitingResponse={isWaitingResponse}>
        <span className="form__input-helper">Имя</span>
        <input className="form__input form__input_field_name" id="name" value={values.name || ''} pattern={userNameRegExp} onChange={handleInputChanged} type="text" name="name" placeholder="Имя" minLength='2' required/>
        <span className="form__input-error">{errors.name || ''}</span>
        <span className="form__input-helper">E-mail</span>
        <input className="form__input form__input_field_email" id="email" pattern={emailRegExp} value={values.email || ''} onChange={handleInputChanged} type="email" name="email" placeholder="example@yandex.ru" required/>
        <span className="form__input-error">{errors.email || ''}</span>
        <span className="form__input-helper">Пароль</span>
        <input className="form__input form__input_field_password"  id="password" value={values.password || ''} onChange={handleInputChanged} type="password" name="password" minLength='8' placeholder="пароль" required/>
        <span className="form__input-error">{errors.password || ''}</span>
        <span className="register__form-free-hight">
          {errText && <span className="register__error-text">{errText}</span>}
        </span>
      </Form>
    </section>
  )
}

export default Register;