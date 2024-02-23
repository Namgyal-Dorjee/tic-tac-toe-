
//import { useRef } from "react";

const GameOver = ({nameOfWinner, onRestart})=>{
 
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {nameOfWinner && <p>{nameOfWinner} won!</p>}
      {!nameOfWinner && <p>Well Played It's Draw</p>}
      <p>
        <button onClick={onRestart}>Replay</button>
      </p>
    </div>
  )
}
export default GameOver;