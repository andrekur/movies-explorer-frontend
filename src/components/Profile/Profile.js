import React, { useEffect, useContext, useState} from "react";
import CurentUserContext from "../contexts/CurentUserContext";


import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useNavigate } from 'react-router-dom';


function Profile({onSubmit, logout}) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();
  const [errText, setErrText] = useState('');
  const [inputWasChanged, setInputWasChanged] = useState(false);
  const curentUser = useContext(CurentUserContext);
  const navigate = useNavigate();

  function _handleChange(e) {
    e.preventDefault()

    handleChange(e)
    setErrText('');
    if (curentUser.name !== e.target.value && curentUser.email !== e.target.value) {
      setInputWasChanged(true);
    }
    else {
      setInputWasChanged(false);
    }
  }

  function handleApiSuccess() {
    setInputWasChanged(false);
  }

  function handleApiError(err) {
    setErrText(err);
  }

  useEffect(() => {
    if (curentUser) {
      setValues({'name': curentUser.name, 'email': curentUser.email})
    }
  }, [setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(values, handleApiSuccess, handleApiError);
  }

  function handleLogout(e) {
    e.preventDefault();

    logout();
    navigate('/signin', { replace: true });
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${curentUser.name}!`}</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__input-block">
          <span className="profile__input-helper">Имя</span>
          <input className="profile__input profile__input_field_name" id="name" value={values.name || ''} onChange={_handleChange} type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required/>
        </div>
        <span className="profile__input-error">{errors.name || ''}</span>
        <span className="profile__line"></span>
        <div className="profile__input-block">
          <span className="profile__input-helper">E-mail</span>
          <input className="profile__input profile__input_field_email"  id="email" value={values.email || ''} onChange={_handleChange} type="email" name="email" placeholder="email" required/>
        </div>
        <span className="profile__input-error">{errors.email || ''}</span>
        <div className="profile__err-block">
          {errText &&<span className="profile__err-text">{errText}</span>}
        </div>
        {!inputWasChanged && <span className="profile__save">Редактировать</span>}
        {inputWasChanged && <button className={`profile__save ${!isValid || !inputWasChanged ? 'profile__save_disable' : 'profile__save_active'} `} type="submit">Сохранить</button>}
      </form>
      {!inputWasChanged && <button className="profile__sign-out-btn" onClick={handleLogout} type="button">Выйти из аккаунта</button>}
    </section>
  )
}

export default Profile;