import React from 'react';

const Header = ({ restartGame, prePickMode, prePickTrue }) => (
  <div className="grid-header-container">
    <div className="justify-left timer"></div>
    <div className="justify-center game-status-text"></div>
    <div className="justify-end">
      <button onClick={restartGame} className="restart-button">Restart Game</button>
    </div>
    <div className="justify-front">
      <button onClick={prePickMode} className={`${prePickTrue === true ? "pre-pick" : "restart-button"}`}
      >Pre-Pick-Mode</button>
    </div>
  </div>
);

export default Header;