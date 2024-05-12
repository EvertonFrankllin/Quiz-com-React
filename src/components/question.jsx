import { useContext } from 'react';

import { QuizContext } from '../context/Quiz';
import Option from "./Options";

import "./question.css";

const question = () =>{
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.Questions [quizState.currentQuestion];
    
    const onSelectOption = (option) =>{
      dispatch({
        type: "CHECK_ANSWER",
        payload:{answer: currentQuestion.answer, option}
      })
    }
  return (
    <div id='question'>
        <p> 
            Pergunta {quizState.currentQuestion + 1} de {quizState.Questions.length} 
        </p>

      <h2>{currentQuestion.question}</h2>

      <div id='options-container'>
        {currentQuestion.options.map((option)=>(
          <Option option={option} 
          key={option} 
          answer={currentQuestion.answer}
          selectOption={()=>onSelectOption(option)}
          />
        )
        )}
      </div>

        {quizState.answerSelected && (
          <button onClick={()=>dispatch({type: "CHANGE_QUESTION"})}>
          Próxima Pergunta
        </button>
        )}

    </div>
  )
}

export default question
