import { useGame } from "../contexts/GameContext";

const Footer = () => {
  const {footerDisplay} = useGame();
  return (
    <footer>{footerDisplay}</footer>
  )
}

export default Footer