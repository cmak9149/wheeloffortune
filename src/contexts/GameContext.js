import { useState, useContext, createContext } from "react";
import Phases from "../data/phases.json";
import { toast } from "react-toastify";


const GameContext = createContext();

var GameContextProvider = ({children}) => {
    const [token, setToken] = useState(15);
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
                    letterArray.push(letter);
                    letterDisplayArray.push("_");
                    
                    if (vowels.indexOf(letter.toLowerCase()) >= 0) {
                        vowelsInAnswer[letter.toLowerCase()] = true;    
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
            setToken(token - 2);
        } else {
            toast.error(`No more vowel`); 
        }       
    }

    const addLetter = (letter) => {
        let newBalance = token;
        newBalance--;

        const buffer = [...phaseDisplay];
        let letterCount = 0;
        let letterLC = letter.toLowerCase();
        // go through 
        for(let w = 0; w < phase.length; w++) {
            for(let l = 0; l < phase[w].length; l++) {
                if(letterLC === phase[w][l].toLocaleLowerCase() && phaseDisplay[w][l] === "_") {
                    // replace phaseDisplay[w][l] with letter
                    buffer[w][l] = phase[w][l];
                    letterCount++;
                }
            }
        }
        newBalance += letterCount * 2;

        letterCount > 0? toast.info(`There are ${letterCount} ${letter}`): toast.error(`There is no ${letter}`); 
        setPhaseDisplay(buffer);
        setFooterDisplay(footerDisplay + " [" + letter + "]" + letterCount);
        setToken(newBalance);
    }

    const tryAGuess = (guess) => {
        let hasUnknown = false;
        // first, there must be at least unknown before guess can be proceed
        phaseDisplay.map(word => {
            return word.map(l => {
                if (l === "_") {
                    hasUnknown = true;
                }
                return true;
            }); 
        });

        if (!hasUnknown) {
            toast.error("Cannot guess there is no unknown letter. Go to next game");
            getNextGame();
            return false;
        }

        let newBalance = token;
        newBalance -= 1;
        // at least one unknown 
        let santizedGuess = guess.toLowerCase();
        santizedGuess = santizedGuess.replace(" ", "");
        santizedGuess = santizedGuess.replace(",", "");

        let santizeAnswer = phase.join('').toLowerCase();
        santizeAnswer = santizeAnswer.replace(" ", "");
        santizeAnswer = santizeAnswer.replace(/,/g, "");

        if (santizeAnswer === santizedGuess) {
            newBalance += 5;
            toast.info("You got it right: " + santizeAnswer);
            getNextGame();
            setToken(newBalance);
            return true; 
        } else {
            setToken(newBalance);
            toast.error("It is not " + guess);
            return false;
        }        
    }

    const getNextGame = () => {
        setCurrentPhase(currentPhase + 1);
        const {phase, hint} = Phases[currentPhase + 1];
        initPhase(phase, hint);
    }

    const showAnswer = () => {
        setPhaseDisplay(phase);
    }

    const gameApi = {token, tryAGuess, phaseDisplay, hint, footerDisplay, hasMoreGrame, gameInit, buyAVowel, showAnswer, getNextGame, addLetter}
    return <GameContext.Provider value={gameApi}>
        {children}
    </GameContext.Provider>
};

const useGame = () => {
    const gameApi = useContext(GameContext);
    return gameApi;
}

export {GameContextProvider, useGame}