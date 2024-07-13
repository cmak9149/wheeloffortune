import { useGame } from "../contexts/GameContext";
import {Link} from "react-router-dom";

const Header = () => {
  const {showAnswer, getNextGame} = useGame();
  return (
    <header>
        <h3><Link to="/">Wheel of Fortune for Bible</Link></h3>
        <div className="toolbar" >
            <Link to="/rules">Rules</Link>
            <button onClick={showAnswer}>Show Answer</button>
            <button onClick={getNextGame}>New Games</button>
        </div>
    </header>
  )
}

export default Header