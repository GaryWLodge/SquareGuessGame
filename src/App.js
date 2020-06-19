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
    correctChoice: false,
    choiceArray: Array(24).fill(false),
    arrayCount: 0,
    prePickMode: false
  };

  static cardArray = () => {
    return [1,2].reduce((preValue, current, index) => {
      return preValue.concat([current, current])
    },[]);
  };

  handleClick = event => {
    if (this.state.prePickMode === true) {
      setTimeout(() => {
        this.setState({
          correctCard: Math.floor(Math.random() * (3 - 0) + 0)
        })
      }, 200);
    }
      event.preventDefault();
      const cardId = parseInt(event.target.id); 
      const newFlipps = this.state.isFlipped.slice();
      const choiceArray = this.state.choiceArray.slice();
      const arrayCount = this.state.arrayCount;
      if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState({ 
        isFlipped: newFlipps,
      })
      setTimeout(() => {
      this.next()
      }, 1000)
    };
      
    setTimeout(() => {
      if (cardId === this.state.correctCard) {
        if (choiceArray[arrayCount] === false) {
        choiceArray[arrayCount] = !choiceArray[arrayCount];
        this.setState({ 
          correctChoice: true,
          choiceArray: choiceArray
        })};
      }
    }, 200)

  };


  restartGame = () => {
    this.setState({
      isFlipped: Array(4).fill(false),
    cardArray: App.cardArray().sort(),
    correctCard: Math.floor(Math.random() * (3 - 0) + 0),
    correctChoice: false,
    choiceArray: Array(24).fill(false),
    arrayCount: 0,
    prePickMode: false
    });
  };

  skip = () => {
    this.setState({
      isFlipped: Array(4).fill(false),
    cardArray: App.cardArray().sort(),
    correctCard: Math.floor(Math.random() * (3 - 0) + 0),
    correctChoice: false
    })
  }

  next = () => {
    
    if (this.state.prePickMode === true) {
      const arrayCount = this.state.arrayCount;
      this.setState({
        isFlipped: Array(4).fill(false),
      cardArray: App.cardArray().sort(),
      correctCard: null,
      correctChoice: false,
      arrayCount: arrayCount + 1
      })
    }else {
      const arrayCount = this.state.arrayCount;
      this.setState({
        isFlipped: Array(4).fill(false),
      cardArray: App.cardArray().sort(),
      correctCard: Math.floor(Math.random() * (3 - 0) + 0),
      correctChoice: false,
      arrayCount: arrayCount + 1
      })
    }


  }

  prePickMode = () => {
    this.setState({
      correctCard: null,
      prePickMode: true
    })
  }

  isGameOver = () => {
    return this.state.arrayCount === 23};

  render() {
    return (
     <div>
       <Header restartGame={this.restartGame}
               prePickMode={this.prePickMode} />
       { this.isGameOver() ? 
              <GameOver 
                restartGame={this.restartGame} 
                choiceArray={this.state.choiceArray}
              /> :
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
          <div className="skip">
            <button onClick={this.skip}>
            Skip
            </button>
          </div>
          <div>
            {this.state.arrayCount + 1} of 24
          </div>
        </div>
       }
     </div>
    );
  }
}

export default App;
