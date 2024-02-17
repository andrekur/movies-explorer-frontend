import React, { useEffect, useContext, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";


import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { emailRegExp, userNameRegExp } from "../../constants/constants";

function Profile({onSubmit, logout}) {
  const {values, handleChange, errors, isValid, setValues} = useFormAndValidation();
  const [errText, setErrText] = useState('');
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [inputWasChanged, setInputWasChanged] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  function _handleChange(e) {
    e.preventDefault()

    handleChange(e)
    setErrText('');
    if (currentUser.name !== e.target.value && currentUser.email !== e.target.value) {
      setInputWasChanged(true);
    }
    else {
      setInputWasChanged(false);
    }
  }

  function handleApiSuccess() {
    setInputWasChanged(false);
    setIsWaitingResponse(false);
  }

  function handleApiError(err) {
    setErrText(err);
    setIsWaitingResponse(false);
  }

  useEffect(() => {
    if (currentUser) {
      setValues({'name': currentUser.name, 'email': currentUser.email})
    }
  }, [setValues, currentUser]);

  function handleSubmit(e) {
    setIsWaitingResponse(true);
    e.preventDefault();

    onSubmit(values, handleApiSuccess, handleApiError);
  }

  function handleLogout(e) {
    e.preventDefault();

    logout();
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser ? currentUser.name : ''}!`}</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__input-block">
          <span className="profile__input-helper">Имя</span>
          <input className="profile__input profile__input_field_name" id="name" value={values.name || ''} onChange={_handleChange} pattern={userNameRegExp} type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required/>
        </div>
        <span className="profile__input-error">{errors.name || ''}</span>
        <span className="profile__line"></span>
        <div className="profile__input-block">
          <span className="profile__input-helper">E-mail</span>
          <input className="profile__input profile__input_field_email"  id="email" value={values.email || ''} onChange={_handleChange} pattern={emailRegExp} type="email" name="email" placeholder="email" required/>
        </div>
        <span className="profile__input-error">{errors.email || ''}</span>
        <div className="profile__err-block">
          {errText &&<span className="profile__err-text">{errText}</span>}
        </div>
        {!inputWasChanged && <span className="profile__save">Редактировать</span>}
        {inputWasChanged && <button className={`profile__save ${inputWasChanged && isValid && !isWaitingResponse ? 'profile__save_active' : 'profile__save_disable'}`} type="submit" disabled={isWaitingResponse}>Сохранить</button>}
      </form>
      {!inputWasChanged && <button className="profile__sign-out-btn" onClick={handleLogout} type="button">Выйти из аккаунта</button>}
    </section>
  )
}

export default Profile;