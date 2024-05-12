import { useContext } from "react"
import { QuizContext } from "../context/Quiz"

import WellDone from "../img/welldone.svg";

import "./GameOver.css";

const gameOver = () => {
    const [quizState, dispatch] = useContext(QuizContext);
  return (
    <div id="gameover">
      <h2>Fim de Jogo!</h2>
      <p>Pontuação: {quizState.score}</p>
      <p>Você acertou: {quizState.score} de {quizState.Questions.length}{""} perguntas.</p>
      <img src={WellDone} alt="Imagem de Fim de jogo!"/>
      <button onClick={()=>dispatch({type: "NEW_GAME"})}>Reiniciar</button>

    </div>
  )
}

export default gameOver
