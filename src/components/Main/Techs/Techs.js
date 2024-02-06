import React from "react";

function Techs() {
  return (
    <div className="techs" id="id_tech">
      <h4 className="techs__title">Технологии</h4>
      <div className="techs__block">
        <h3 className="techs__header">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </div>
  )
}

export default Techs;