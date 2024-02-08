import React, { useEffect, } from "react";

import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useNavigate } from 'react-router-dom';


function Profile() {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  const curentUser = {name: 'Andre', email: 'test@email.ru'};
  const navigate = useNavigate();

  useEffect(() => {
    if (curentUser) {
      setValues({'name': curentUser.name, 'email': curentUser.email})
    }
  }, [setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    //call Api
    resetForm();
  }

  function handleLogout(e) {
    e.preventDefault();

    //call Api
    navigate('/signin', { replace: true });
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${curentUser.name}!`}</h1>
      <form className="profile__form">
        <div className="profile__input-block">
          <span className="profile__input-helper">Имя</span>
          <input className="profile__input profile__input_field_name" id="name" value={values.name || ''} onChange={handleChange} type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required/>
        </div>
        <span className="profile__input-error">{errors.name || ''}</span>
        <span className="profile__line"></span>
        <div className="profile__input-block">
          <span className="profile__input-helper">E-mail</span>
          <input className="profile__input profile__input_field_email"  id="email" value={values.email || ''} onChange={handleChange} type="email" name="email" placeholder="email" required/>
        </div>
        <span className="profile__input-error">{errors.email || ''}</span>
        <button className='profile__save' onSubmit={handleSubmit} disabled={!isValid} type="submit">Редактировать</button>
      </form>
      <button className="profile__sign-out-btn" onClick={handleLogout} type="button">Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;