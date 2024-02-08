import promoImage from '../../../images/utils/practicum-logo.svg'

function Promo() {
  return (
    <section className="promo">
      <img className='promo__image' src={promoImage} alt='Логотип Я.Практикум'/>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <div className="navtab">
        <ul className="navtab__list">
        <li><a className="navtab__link" href="#id_about_project">О проекте</a></li>
        <li><a className="navtab__link" href="#id_tech">Технологии</a></li>
        <li><a className="navtab__link" href="#id_about_student">Студент</a></li>
        </ul>
      </div>
    </section>
  )
}

export default Promo;