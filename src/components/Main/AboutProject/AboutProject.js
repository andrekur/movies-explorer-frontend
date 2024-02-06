import React from "react";

function AboutProject() {
  return (
    <div className="aboutproject" id="id_about_project">
      <h4 className="aboutproject__header">О проекте</h4>
      <div className="aboutproject__description">
        <div className="aboutproject__description__item">
          <p className="aboutproject__description__paragraph">Дипломный проект включал 5 этапов</p>
          <a className="aboutproject__description__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</a>
        </div>
        <div className="aboutproject__description__item">
          <p className="aboutproject__description__paragraph">На выполнение диплома ушло 5 недель</p>
          <a className="aboutproject__description__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</a>
        </div>
      </div>
      <section className="aboutproject__deadline">
        <p className="aboutproject__deadline__text aboutproject__deadline__background-blue aboutproject__deadline__text_color-white">1 неделя</p>
        <p className="aboutproject__deadline__text aboutproject__deadline__background-gray">4 недели</p>
        <p className="aboutproject__deadline__text aboutproject__deadline__text_color-gray">Back-end</p>
        <p className="aboutproject__deadline__text aboutproject__deadline__text_color-gray">Front-end</p>
      </section>
    </div>
  )
}

export default AboutProject;