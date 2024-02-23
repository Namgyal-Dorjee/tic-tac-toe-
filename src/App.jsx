
import { useState } from "react";
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning_combination";

const PLAYERS = {
  X: 'player A',
  O: 'player B'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const derivedState = (gameTurns)=>{
  let currentPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player ==='X'){
      currentPlayer = 'O';
    }
    return currentPlayer;
};

const derivedWinner = (board, player)=>{
  let winner;
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = board[combination[0].row][combination[0].column];
    const secondSquareSymbol = board[combination[1].row][combination[1].column];
    const thirdSquareSymbol = board[combination[2].row][combination[2].column];

    if(
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
      ) {
      winner = player[firstSquareSymbol];
    }
  };
  return winner;
};

const derivedGameBoard = (turns)=>{
   let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of turns){
    const {square, player} =  turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  };
  return gameBoard;
};


function App() {

  const [gameTurn, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);

  const activePlayer = derivedState(gameTurn);
  const gameBoard = derivedGameBoard(gameTurn);
  const winner = derivedWinner(gameBoard, playerName);
  const hasDraw = gameTurn.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex)=>{
    setGameTurn((preTurns)=> {
      const currentPlayer = derivedState(preTurns);
      const upDatedTurns = [
        {square: { row: rowIndex, col: colIndex}, player: currentPlayer},...preTurns
      ];
      return upDatedTurns;
    })
  };

  const handleReplay = ()=>{
    setGameTurn([])
  };

  const handlePlayerNameChange = (symbol, newName)=>{
    setPlayerName((pre)=>{
      return {
        ...pre, 
        [symbol] : newName
      }
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name={PLAYERS.X} 
                  symbol='X' 
                  isActive={activePlayer === 'X'}
                  onChangeName ={handlePlayerNameChange}
                  />
          <Player name={PLAYERS.O}
                 symbol= 'O' 
                 isActive={activePlayer === 'O'} 
                 onChangeName = {handlePlayerNameChange}
                 />
        </ol>
        {winner && <p>You won, {winner}!</p>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}
          win ={winner}
          />
        {(winner || hasDraw) && <GameOver nameOfWinner={winner} onRestart={handleReplay}/>}
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
