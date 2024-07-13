import { useState, useContext, createContext } from "react";
import Phases from "../data/phases.json";
import { toast } from "react-toastify";


const GameContext = createContext();

var GameContextProvider = ({children}) => {
    const [phase, setPhase] = useState("");
    const [vowels, setVowels] = useState([]);
    const [currentPhase, setCurrentPhase] = useState(-1);
    const [phaseDisplay, setPhaseDisplay] = useState([]);
    const [hint, setHint] = useState("");
    const [footerDisplay, setFooterDisplay] = useState("");
    const [hasMoreGrame, setHasMoreGame] = useState(false);
    
    const gameInit = () => {
        if (currentPhase < 0) {
            setCurrentPhase(0);
            const {phase, hint} = Phases[0];
            setHasMoreGame(Phases.length > 1);
            initPhase(phase, hint);            
        }
    }

    const initPhase = (loadingPhase, loadingHint) => {
        const vowels = ["a", "e", "i", "o", "u"]
        
        const vowelsInAnswer = {};
        const phaseTmp = [];
        const phaseDisplayTmp = [];
        const phaseArry = loadingPhase.split(" ");
        phaseArry.map(thisPhase => {
            const letterDisplayArray = [];
            const letterArray = [];
            const re = /[a-z]/i;
            for(var l = 0; l < thisPhase.length; l++) {
                const letter = thisPhase.substring(l, l+1);
                if(re.test(letter)) {
                    letterArray.push(letter.toLowerCase());
                    letterDisplayArray.push("_");
    
                    if (vowels.indexOf(letter) >= 0) {
                        vowelsInAnswer[letter] = true;    
                    }
                } else {
                    letterArray.push(letter);
                    letterDisplayArray.push(letter);                    
                }
            }
            phaseTmp.push(letterArray);
            phaseDisplayTmp.push(letterDisplayArray);
            return thisPhase;
        });
        setVowels(Object.keys(vowelsInAnswer));
        setPhase(phaseTmp);
        setPhaseDisplay(phaseDisplayTmp);
        setHint(loadingHint);
        setFooterDisplay("");
    }

    const buyAVowel = () => {
        // draw a vowel out
        if(vowels.length > 0) {
            const [aVowel, ...remainVowels] = vowels;
            // add letter
            addLetter(aVowel);
            setVowels(remainVowels); 
        }        
    }

    const addLetter = (letter) => {
        const buffer = [...phaseDisplay];
        let letterCount = 0;
        // go through 
        for(let w = 0; w < phase.length; w++) {
            for(let l = 0; l < phase[w].length; l++) {
                if(letter === phase[w][l] && phaseDisplay[w][l] === "_") {
                    // replace phaseDisplay[w][l] with letter
                    buffer[w][l] = letter;
                    letterCount++;
                }
            }
        }
        letterCount > 0? toast.info(`There are ${letterCount} ${letter}`): toast.error(`There is no ${letter}`); 
        setPhaseDisplay(buffer);
        setFooterDisplay(footerDisplay + " [" + letter + "]" + letterCount);
    }

    const getNextGame = () => {
        setCurrentPhase(currentPhase + 1);
        const {phase, hint} = Phases[currentPhase + 1];
        initPhase(phase, hint);
    }

    const showAnswer = () => {
        setPhaseDisplay(phase);
    }

    const gameApi = {phaseDisplay, hint, footerDisplay, hasMoreGrame, gameInit, buyAVowel, showAnswer, getNextGame, addLetter}
    return <GameContext.Provider value={gameApi}>
        {children}
    </GameContext.Provider>
};

const useGame = () => {
    const gameApi = useContext(GameContext);
    return gameApi;
}

export {GameContextProvider, useGame}