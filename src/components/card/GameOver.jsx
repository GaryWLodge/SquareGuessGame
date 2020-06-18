import React from 'react';

const GameOver = ({ restartGame , choiceArray}) => (
  <div className="justify-center">
    <h1>Game Over!</h1>
<h2>You got {choiceArray}</h2>
    <h3>Click Restart Game to play Again!!!</h3>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
  </div>
);

export default GameOver;