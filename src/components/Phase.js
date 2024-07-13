import { useEffect, useState, useCallback } from "react";
import { useGame } from "../contexts/GameContext";
import { toast } from "react-toastify";

const Phase = () => {
  const {buyAVowel, addLetter, gameInit, phaseDisplay, hint} = useGame();
  const [lastLetter, setLastLetter] = useState(""); 
  
  useEffect(() => { 
    gameInit(); 
  });

  const typingHadler = (e) => {
    const val = e.target.value;
    const lastLetterTyped = val.substring(val.length -1);
    if(["a", "e", "i", "o", "u"].indexOf(lastLetterTyped) >= 0) {
      toast.error(`Vowel ${lastLetterTyped} is not allowed`);
      setLastLetter("");
    } else {
      setLastLetter(lastLetterTyped);
    }    
  }

  const handleTry = (e) => {
    addLetter(lastLetter);
    document.getElementById("lastLetter").focus();
    setLastLetter("");
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
        <br />
        Consonants: <input type='text' value={lastLetter} onChange={typingHadler} id="lastLetter" />
        <button disabled={ lastLetter === "" } onClick={handleTry}>Try</button>
        <br />
        <button onClick={buyAVowel}>Buy a vowel</button>
    </div>
  )
}

export default Phase