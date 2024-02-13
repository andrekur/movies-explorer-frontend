import React from "react";

import Avatar from '../../../images/utils/author-photo.jpg'

function AboutMe() {
  return (
    <section className="about-me" id="id_about_student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__block">
        <div className="about-me__description-block">
          <p className="about-me__name">Андрей</p>
          <p className="about-me__job">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__history">
          Я живу в мегаполисе Москва, закончил технический факультет в РТУ МИРЭА. Домашних животных нет, но в планах завести любимого кота. Я люблю слушать музыку и читать крутые книжки, а ещё увлекаюсь программированием. Пишу код на Python еще со школы. В 2023 году начал осваивать для себе новое направлении&nbsp;&mdash;&nbsp;Frontend. После окончания курса планирую развиваться как Fullstack.
          </p>
          <a className="about-me__link" href="https://github.com/andrekur" rel="noreferrer" target="_blank">Github</a>
        </div>
        <img className="about-me__author-image" src={Avatar} alt="Фотография автора"/>
      </div>
    </section>
  )
}

export default AboutMe;