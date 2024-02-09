import React from "react";

function AboutProject() {
  return (
    <section className="about-project" id="id_about_project">
      <h2 className="about-project__header">О проекте</h2>
      <div className="about-project__content">
        <div className="about-project__item">
          <p className="about-project__paragraph">Дипломный проект включал 5 этапов</p>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__item">
          <p className="about-project__paragraph">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__deadline">
        <p className="about-project__deadline-text about-project__deadline-text_background-blue about-project__deadline-text_color-white">1 неделя</p>
        <p className="about-project__deadline-text about-project__deadline-text_background-gray">4 недели</p>
        <p className="about-project__deadline-text about-project__deadline-text_color-gray">Back-end</p>
        <p className="about-project__deadline-text about-project__deadline-text_color-gray">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;