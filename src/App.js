import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';

import './styles/main.css';

class App extends PureComponent {

  state = { 
    isFlipped: Array(4).fill(false),
    cardArray: App.cardArray().sort(),
    correctCard: Math.floor(Math.random() * (3 - 0) + 0),
    correctChoice: false
  };

  static cardArray = () => {
    return [1,2].reduce((preValue, current, index) => {
      return preValue.concat([current, current])
    },[]);
  };

  handleClick = event => {
    event.preventDefault();
    const cardId = parseInt(event.target.id); 
    const newFlipps = this.state.isFlipped.slice();
    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState({ 
        isFlipped: newFlipps,
      })};

    if (cardId === this.state.correctCard) {
       this.setState({ correctChoice: true})

    }
    console.log(this.state)

  };

  isCardCorrect = () => {
    if (this.state.correctChoice === true) {
      const displayCorrect = this.state.shuffledCard.slice();
      
    } else {
      const displayWrong = this.state.correctCard.slice();
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(4).fill(false),
      correctCard: App.correctCard().sort(() => Math.random() * 4 + 1),
      correctChoice: false
    });
  };

  isGameOver = () => {
    return this.state.isFlipped.every((element, index, array) => element !== false);
  };

  render() {
    return (
     <div>
       <Header restartGame={this.restartGame} />
       {/* { this.isGameOver() ? <GameOver restartGame={this.restartGame} /> : */}
       <div className="grid-container">
          {
            this.state.cardArray.map((correctCard, index) => 
              <Card
                key={index} 
                id={index} 
                correctCard={this.state.correctCard} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick}     
              />
            )
            
          }
        </div>
       
     </div>
    );
  }
}

export default App;
