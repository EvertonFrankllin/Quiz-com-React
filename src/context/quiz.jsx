/* 
Devemos criar um contexto que faça analogia ao contexto que queremos alterar
Devemos importar o contexto do React e depois inicializaremos ele

*/
import { createContext, useReducer } from "react";

import Questions from '../data/questions';
import Question from "../components/question";

const STAGES = ['Start', 'Playing', 'End'];

const initialStates = {
    gameStage: STAGES[0], 
    Questions,
    currentQuestion: 0,
    score: 0, 
    answerSelected: false,
};

const quizReducer =(state, action)=>{
    

    switch(action.type){
        case "CHANGE_STATE":

        return(
                {
                    ...state,
                    gameStage: STAGES[1],
                    
                });
            
        

        case "REORDER_QUESTIONS":

        const reorderQuestions = Questions.sort(()=>{
            return Math.random() - 0.5;
        });
               
                return {
                    ...state,
                    questions: reorderQuestions,
                };

                case "CHANGE_QUESTION":

                    const nextQuestion = state.currentQuestion + 1;

                    let endGame = false;

                    if(!Questions[nextQuestion]) {
                        endGame = true;
                    };

                    return{
                        ...state,
                        currentQuestion:nextQuestion,
                        gameStage: endGame ? STAGES[2] : state.gameStage,
                        answerSelected: false, 
                    } ;
                    case "NEW_GAME":
                        return initialStates;
                        
                        case "CHECK_ANSWER":
                            if(state.answerSelected) return state;
                            const answer = action.payload.answer;
                            const option = action.payload.option;
                            let correctAnswer = 0

                            if(answer === option) correctAnswer = 1;
                            return {
                                ...state,
                                score: state.score + correctAnswer,
                                answerSelected: option,
                            }
 
        default:
            return state;
    }
};



export const QuizContext = createContext();

export const QuizProvider = ({children})=>{
    const value =useReducer(quizReducer, initialStates);

    return <QuizContext.Provider value={value}> {children}</QuizContext.Provider>
    
};






