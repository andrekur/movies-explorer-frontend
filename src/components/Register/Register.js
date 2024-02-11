import React, { useEffect, useState} from "react";

import Form from "../Form/Form";

import { useFormAndValidation } from "../../hooks/useFormAndValidation";


function Register({onSubmit}) {
  const [errText, setErrText] = useState('');
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  function handleInputChanged(e) {
    setErrText('');
    handleChange(e);
  }

  useEffect(() => {

  }, [setValues]);

  function handleApiSuccess() {
    resetForm();
  }

  function handleApiError(err) {
    setErrText(err);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(values, handleApiSuccess, handleApiError);
  }

  return (
    <section className="register">
      <Form onSubmit={handleSubmit} title='Добро пожаловать!' submitButtonText='Зарегистрироваться' additionalText='Уже зарегистрированы?' additionalLinkText='Войти' additionlaLink='/signin' isValid={isValid}>
        <span className="form__input-helper">Имя</span>
        <input className="form__input form__input_field_name" id="name" value={values.name || ''} onChange={handleInputChanged} type="text" name="name" placeholder="Имя" minLength='2' required/>
        <span className="form__input-error">{errors.name || ''}</span>
        <span className="form__input-helper">E-mail</span>
        <input className="form__input form__input_field_email" id="email" value={values.email || ''} onChange={handleInputChanged} type="email" name="email" placeholder="email" required/>
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