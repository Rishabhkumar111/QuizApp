import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import ProgressBar from "./ProgressBar.jsx";
import Answer from "./Answer.jsx";
import GameOverPage from "./GameOverPage.jsx";

export default function Quiz({
  storedAnswer,
  setStoredAnswer,
  isQuizCompleted,
  setisQuizCompleted
}) {
  const [answerState, setAnswerState] = useState("");
  const questionIndex =
    answerState === "" ? storedAnswer.length : storedAnswer.length - 1;
  const [stopProgressBar, setStopProgressBar] = useState(false);

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setStopProgressBar(true);
      setAnswerState("answered");
      setStoredAnswer((preAns) => {
        return [...preAns, selectedAnswer];
      });
      if (selectedAnswer === null) {
        setAnswerState("");
        setStopProgressBar(false);
        if (questionIndex == QUESTIONS.length - 1) setisQuizCompleted(true);
        return;
      }
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[questionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
          setStopProgressBar(false);
          if (questionIndex == QUESTIONS.length - 1) setisQuizCompleted(true);
        }, 2000);
      }, 1000);
    },
    [questionIndex]
  );

  const skipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );
  
  return (
    <div id="quiz">
      {!isQuizCompleted && (
        <div id="question">
          <ProgressBar
            key={questionIndex}
            timeout={10000}
            onTimeout={skipAnswer}
            stopProgressBar={stopProgressBar}
          />
          <h2>{QUESTIONS[questionIndex].text}</h2>
          <Answer
            key={questionIndex + 290}
            answers={QUESTIONS[questionIndex].answers}
            selectedAnswer={storedAnswer[storedAnswer.length - 1]}
            answerState={answerState}
            onSelect={handleSelectedAnswer}
            stopProgressBar={stopProgressBar}
          />
        </div>
      )}
      {isQuizCompleted && <GameOverPage answers={storedAnswer} />}
    </div>
  );
}
