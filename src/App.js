import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';

import './styles/main.css';

class App extends PureComponent {

  state = { 
    isFlipped: Array(4).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    correctCard: Math.floor(Math.random() * 4 + 1),
    correctChoice: false
  };

  static duplicateCard = () => {
    return [1,2].reduce((preValue, current) => {
      return preValue.concat([current, current])
    },[]);
  };

  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const selectedCard = this.state.isFlipped.slice();

    if (selectedCard[cardId] === this.state.correctCard) {
       this.setState.correctChoice = true

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardCorrect(previousCard, newCard, prevCardId, cardId);
        console.log(this.state)
      }
    }
  };

  // isCardMatch = (card1, card2, card1Id, card2Id) => {
  //   if (card1 === card2) {
  //     const hideCard = this.state.shuffledCard.slice();
  //     hideCard[card1Id] = -1;
  //     hideCard[card2Id] = -1;
  //     setTimeout(() => {
  //       this.setState(prevState => ({
  //         shuffledCard: hideCard
  //       }))
  //     }, 1000);
  //   } else {
  //     const flipBack = this.state.isFlipped.slice();
  //     flipBack[card1Id] = false;
  //     flipBack[card2Id] = false;
  //     setTimeout(() => {
  //       this.setState(prevState => ({ isFlipped: flipBack }));
  //     }, 1000);
  //   }
  // };

  isCardCorrect = (cardSelected, correctCard) => {
    if (cardSelected === correctCard) {
      const displayCorrect = this.state.shuffledCard.slice();
      
    } else {
      const displayWrong = this.state.correctCard.slice();
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(4).fill(false),
      shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
      correctCard: Math.floor(Math.random() * 4 + 1),
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
       { this.isGameOver() ? <GameOver restartGame={this.restartGame} /> :
       <div className="grid-container">
          {
            this.state.shuffledCard.map((cardNumber, index) => 
              <Card
                key={index} 
                id={index} 
                cardNumber={cardNumber} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick}     
              />
            )
          }
        </div>
       }
     </div>
    );
  }
}

export default App;
