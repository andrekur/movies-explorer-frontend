import promoImage from '../../../images/utils/practicum-logo.svg'

function Promo() {
  return (
    <div className="promo">
      <img className='promo__image' src={promoImage} alt='Логотип Я.Практикум'/>
      <p className='promo__text'>Учебный проект студента факультета&nbsp;Веб-разработки.</p>
    </div>
  )
}

export default Promo;