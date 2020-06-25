import React, { PureComponent } from 'react';
import Header from './components/header/Header';
import Card from './components/card/Card';
import GameOver from './components/card/GameOver';
import './styles/main.css';

class App extends PureComponent {

  state = { 
    isFlipped: Array(4).fill(false),
    cardArray: App.cardArray().sort(),
    correctCard: Math.floor(Math.random() * (4 - 0) + 0),
    correctChoice: false,
    choiceArray: Array(24).fill(false),
    arrayCount: 0,
    prePickMode: false,
    skip: false
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
    const choiceArray = this.state.choiceArray.slice();
    const arrayCount = this.state.arrayCount;
    if (this.state.prePickMode === true) {
      if (newFlipps[cardId] === false) {
        newFlipps[cardId] = !newFlipps[cardId];
        setTimeout(() => {
          this.setState({
            correctCard: Math.floor(Math.random() * (4 - 0) + 0),
          })
        }, 200);
        setTimeout(() => {
          this.setState({
            isFlipped: newFlipps
          })
        }, 300);
        setTimeout(() => {
        this.next()
        }, 1500)
      }
    }else{
      if (newFlipps[cardId] === false) {
        newFlipps[cardId] = !newFlipps[cardId];
        this.setState({ 
          isFlipped: newFlipps
        })
        setTimeout(() => {
        this.next()
        }, 1500)
    }
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
    }, 205)
  };


  restartGame = () => {
    this.setState({
      isFlipped: Array(4).fill(false),
    cardArray: App.cardArray().sort(),
    correctCard: Math.floor(Math.random() * (4 - 0) + 0),
    correctChoice: false,
    choiceArray: Array(24).fill(false),
    arrayCount: 0,
    prePickMode: false
    });
  };

  skip = () => {
      const arrayCount = this.state.arrayCount;
      this.setState({
        isFlipped: Array(4).fill(false),
      cardArray: App.cardArray().sort(),
      correctCard: Math.floor(Math.random() * (4 - 0) + 0),
      correctChoice: false,
      skip: true
      })
      setTimeout(() => {
        this.skipNext()
        },1000)
    }
  

  next = () => {
    
    if (this.state.prePickMode === true) {
      const arrayCount = this.state.arrayCount;
      this.setState({
        isFlipped: Array(4).fill(false),
      cardArray: App.cardArray().sort(),
      correctCard: null,
      correctChoice: false,
      arrayCount: arrayCount + 1,
      skip: false
      })
    }else {
      const arrayCount = this.state.arrayCount;
      this.setState({
        isFlipped: Array(4).fill(false),
      cardArray: App.cardArray().sort(),
      correctCard: Math.floor(Math.random() * (4 - 0) + 0),
      correctChoice: false,
      arrayCount: arrayCount + 1,
      skip: false
      })
    }
  }

  skipNext = () => {
    if (this.state.prePickMode === true) {
      const arrayCount = this.state.arrayCount;
      this.setState({
        isFlipped: Array(4).fill(false),
      cardArray: App.cardArray().sort(),
      correctCard: null,
      correctChoice: false,
      skip: false
      })
    }else {
      const arrayCount = this.state.arrayCount;
      this.setState({
        isFlipped: Array(4).fill(false),
      cardArray: App.cardArray().sort(),
      correctCard: Math.floor(Math.random() * (4 - 0) + 0),
      correctChoice: false,
      skip: false
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
    const correctCount = this.state.choiceArray.filter(count => count === true).length;
    const wrongCount = this.state.choiceArray.filter(count => count === false).length;
    return (
     <div>
       <Header restartGame={this.restartGame}
               prePickMode={this.prePickMode}
               prePickTrue={this.state.prePickMode} />
       { this.isGameOver() ? 
              <GameOver 
                restartGame={this.restartGame} 
                correctCount={correctCount}
                wrongCount={wrongCount}
              /> :
              <div>
       <div className="grid-container cards">
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
       
       <div className="skip-wrapper">
            <button className="skip" onClick={this.skip}>
            Skip
            </button>
            <h3>{ this.state.skip === true ? this.state.correctCard + 1 : ""}</h3>

       <div className="count">
            {this.state.arrayCount + 1} of 24
      </div>
      </div>
      </div>
      }
     </div>
    );
  }
}

export default App;
