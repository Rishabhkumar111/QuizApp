import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import trophyImg from "../assets/quiz-complete.png";
import ProgressBar from "./ProgressBar.jsx";
import Answer from "./Answer.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [storedAnswer, setStoredAnswer] = useState([]);
  const questionIndex =
    answerState === "" ? storedAnswer.length : storedAnswer.length - 1;
  const isQuizCompleted = QUESTIONS.length === storedAnswer.length;
console.log(storedAnswer.length,isQuizCompleted);
  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={trophyImg} alt="Trophy Image" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setAnswerState("answered");
      setStoredAnswer((preAns) => {
        return [...preAns, selectedAnswer];
      });
      if(selectedAnswer === null){
        setAnswerState("");
        return ;
      }
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[questionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    []
  );

  const skipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  return (
    <div id="quiz">
      <div id="question">
        <ProgressBar
          key={questionIndex}
          timeout={10000}
          onTimeout={skipAnswer}
        />
        <h2>{QUESTIONS[questionIndex].text}</h2>
        <Answer
          key={questionIndex+290}
          answers={QUESTIONS[questionIndex].answers}
          selectedAnswer={storedAnswer[storedAnswer.length - 1]}
          answerState={answerState}
          onSelect={handleSelectedAnswer}
        />
      </div>
    </div>
  );
}
