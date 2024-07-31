import './App.css';
import React, { useState } from 'react';
import dice1 from './assets/images/dice-1.png';
import dice2 from './assets/images/dice-2.png';
import dice3 from './assets/images/dice-3.png';
import dice4 from './assets/images/dice-4.png';
import dice5 from './assets/images/dice-5.png';
import dice6 from './assets/images/dice-6.png';


const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

function App() {
  const [scores, setScores] = useState([0, 0]);
  const [currentScores, setCurrentScores] = useState([0, 0]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [dice1Value, setDice1Value] = useState(1);
  const [dice2Value, setDice2Value] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winningScore, setWinningScore] = useState(100);
  const [winCounts, setWinCounts] = useState([0, 0]);
  const [showMessage, setShowMessage] = useState(false);


  const updateCurrentScores = (dice1, dice2) => {
    setCurrentScores((prev) => {
      const newCurrentScores = [...prev];
      if (dice1 === 6 && dice2 === 6) {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          newCurrentScores[activePlayer] = 0;
          setActivePlayer((prev) => (prev === 0 ? 1 : 0));
        }, 1000);    
        } 
        else {
        newCurrentScores[activePlayer] += dice1 + dice2;
      }
      return newCurrentScores;
    });
  };

  const checkWinner = () => {
    if (scores[activePlayer] >= winningScore) {
      setWinner(activePlayer);
      setWinCounts((prev) => {
        const newWinCounts = [...prev];
        newWinCounts[activePlayer] += 1;
        return newWinCounts;
      });
    }
  };

  const rollDice = () => {
    if (winner !== null || showMessage) return;
    const newDice1 = Math.floor(Math.random() * 6) + 1;
    const newDice2 = Math.floor(Math.random() * 6) + 1;
    setDice1Value(newDice1);
    setDice2Value(newDice2);
    updateCurrentScores(newDice1, newDice2);
    if (newDice1 === 6 && newDice2 === 6) {
      setActivePlayer((prev) => (prev === 0 ? 1 : 0));
    }
    checkWinner()
  };


  const holdScore = () => {
    if (winner !== null || showMessage) return;
    setScores((prev) => {
      const newScores = [...prev];
      newScores[activePlayer] += currentScores[activePlayer];
      return newScores;
    });
    checkWinner();
    setCurrentScores([0,0])
    setActivePlayer((prev) => (prev === 0 ? 1 : 0));
  };

  const newGame = () => {
    setScores([0, 0]);
    setCurrentScores([0, 0]);
    setActivePlayer(0);
    setWinner(null);
  };

  const handleWinningScoreChange = (e) => {
    setWinningScore(Number(e.target.value));
    console.log(winningScore)
  };

  return (
    <main>
      <section className={`player player--0 ${activePlayer === 0 ? 'player--active' : ''}`}>
        <h2 className="name" id="name--0">Player 1</h2>
        <p className="score" id="score--0">{scores[0]}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">{currentScores[0]}</p>
          <p className="win-count">Wins: {winCounts[0]}</p>
        </div>
      </section>
      <section className={`player player--1 ${activePlayer === 1 ? 'player--active' : ''}`}>
        <h2 className="name" id="name--1">Player 2</h2>
        <p className="score" id="score--1">{scores[1]}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--1">{currentScores[1]}</p>
          <p className="win-count">Wins: {winCounts[1]}</p>
        </div>
      </section>

      <img src={diceImages[dice1Value - 1]} alt="Playing dice" className="dice" />
      <img src={diceImages[dice2Value - 1]} alt="Playing dice" className="dice2" />
      <button className="btn btn--new" onClick={newGame}>New game</button>
      <button className="btn btn--roll" onClick={rollDice}>Roll dice</button>
      <button className="btn btn--hold" onClick={holdScore}>Hold</button>

      {winner !== null && (
        <div className="win-popup">
          <p>Player {winner + 1} Wins!</p>
          <button onClick={newGame}>Play Again</button>
        </div>
      )}

      <div className="winning-score">
        <label htmlFor="winning-score">Set Winning Score: </label>
        <input
          type="number"
          id="winning-score"
          value={winningScore}
          onChange={handleWinningScoreChange}
        />
      </div>
    </main>
  );
}

export default App;
