
import { useState } from "react";


const Player = ({name, symbol, isActive, onChangeName})=>{
  const [isEdit, setIsEdit] = useState(false);
 const [player, setPlayer] = useState(name);

  let playerName = <span className="player-name">{player}</span>;

  if(isEdit){
    playerName = <input 
                      tpye='text'
                      value={player}
                      onChange={(e) => setPlayer(e.target.value)}
                      />
  }

  const editHandler = ()=>{
    setIsEdit((state) => !state);

    if(isEdit){
      onChangeName(symbol, player);
    }
    
    if(player.length === 0){
    setPlayer(name)
    }
  }


  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerName}
        {!isEdit && <span className="player-symbol">{symbol}</span>}

      </span>
      <button onClick={editHandler}>
        {isEdit ? 'Save' : 'Edit'}
      </button>
    </li>
  )
};
export default Player;