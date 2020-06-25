import React from 'react';
import ReactCardFlip from "react-card-flip";

const Card = ({ id, isFlipped, handleClick, correctCard }) => (
  <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={0} flipSpeedFrontToBack={2}>
    <button id={id} className={`card card-front `} 
    onClick={handleClick} key="front">
      {id + 1}
    </button>

    <button id={id} className={`card card-back ${correctCard === id ? "correct-card" : "wrong-card"}`} 
    onClick={handleClick} key="back">
      { correctCard + 1}
    </button>
  </ReactCardFlip>
);

export default Card;