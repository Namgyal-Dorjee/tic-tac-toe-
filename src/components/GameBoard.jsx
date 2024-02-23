
//import { useState } from "react";

const GameBoard = ({onSelectSquare, board, win})=>{

  return (
    <ol id='game-board'>
      {board.map((row, rowindex)=>{
        return (
          <li key={rowindex}>
            <ol>
              {row.map((symbol, colindex)=>{
                return(
                  <li key={colindex}>
                    <button onClick={()=> onSelectSquare(rowindex, colindex)} 
                            disabled={symbol !== null || win} >
                      {symbol}
                    </button>
                  </li>
                )
              })}
            </ol>
          </li>
        )
      })}
    </ol>
  )
}
export default GameBoard;