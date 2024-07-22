import { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";

const Phase = () => {
  const allConsonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  const { tryAGuess, buyAVowel, addLetter, gameInit, phaseDisplay, hint} = useGame();
  const [ consonants, setConsonants ] = useState(allConsonants);
  
  useEffect(() => { 
    gameInit(); 
  });

  const tryAConsonant = (tryCon) => {
    addLetter(tryCon);
    // remove the c from consants
    setConsonants(consonants.filter(c => { return c !== tryCon }) );
  }
 
  const takeAGuess = () => {
    let guess = window.prompt("Put in your guess");
    if (guess !== "") {
      const result = tryAGuess(guess);
      if (result) {
        setConsonants(allConsonants);
      }
    }      
  }

  return (
    <div> 
        <h4>{hint}</h4>
        {phaseDisplay.map((word, index) => {
          return <div key={ 'w'+ index} className="word">{
            word.map((letter, index) => {
              return <div key={ 'l'+ index} className="letter">{letter}</div>
            })
          }</div>
        
        })}
        <br />
        <div className="responseSection">
          {consonants.map(c => {
            return <button key={c} className="letterKey" onClick={ () => { tryAConsonant(c) } } >{c}</button>
          })}
          <br />
          <br />
          <button onClick={buyAVowel}>Buy a vowel</button>&nbsp;&nbsp;&nbsp;
          <button onClick={takeAGuess}>Take a guess</button>          
        </div>

    </div>
  )
}

export default Phase