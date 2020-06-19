import React from 'react';

const GameOver = ({ restartGame , correctCount, wrongCount}) => (
  <div className="justify-center">
    <h1>Game Over!</h1>
<h2>You got {correctCount} Right :)</h2>
<h2>You got {wrongCount} Wrong :(</h2>

    <h3>Click Restart Game to play Again!!!</h3>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
  </div>
);

export default GameOver;