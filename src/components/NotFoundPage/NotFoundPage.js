import React from "react";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <p className="not-found-page__text">Страница не найдена</p>
      <a className="not-found-page__return-link" href="/">Назад</a>
    </div>
  )
}

export default NotFoundPage;