import React from 'react';

const Header = ({ restartGame, prePickMode, prePickTrue }) => (
  <div className="grid-header-container">
    <div className="justify-center game-status-text">
      <button onClick={restartGame} className="restart-button right">Restart Game</button>
      <button onClick={prePickMode} className={`left ${prePickTrue === true ? "pre-pick" : "restart-button"}`}
      >Pre-Pick-Mode </button>
    </div>
  </div>
);

export default Header;