import React from 'react'

export default function CardElement(props) {
    
  return (
    <div onClick={()=>{props.handleFlip(props.card)}}id={props.card.id} className={`cards ${props.card.flipped?"flip":''}`}>
        <div className='card_front'>
            <img className='icon' src={`assets/images/${props.card.icon}.png`} alt='cardsfront'></img>
        </div>
        <div className='card_back'>
            {"</>"}
        </div>
    </div>
  )
}
