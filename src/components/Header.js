import { useGame } from "../contexts/GameContext";
import { Link } from "react-router-dom";

const Header = () => {
  const {token, footerDisplay} = useGame();
  return (
    <header>
        <div>Attempts: {footerDisplay}</div>
        <div className="toolbar" >
            <span>[ {token} ]</span>&nbsp;&nbsp;&nbsp; 
            <Link to="/">Game</Link>
            <Link to="/rules">Rules</Link>
        </div>
    </header>
  )
}

export default Header