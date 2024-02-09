import React from "react";

function NotFoundPage() {

  function handleBackward(e) {
    e.preventDefault();

    window.history.go(-1)
  }

  return (
    <section className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <p className="not-found-page__text">Страница не найдена</p>
      <a className="not-found-page__return-link" onClick={handleBackward}>Назад</a>
    </section>
  )
}

export default NotFoundPage;