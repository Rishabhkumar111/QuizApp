import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import trophyImg from "../assets/quiz-complete.png";
import ProgressBar from "./ProgressBar.jsx";

export default function Quiz() {
  const [storedAnswer, setStoredAnswer] = useState([]);
  const questionIndex = storedAnswer.length;
  const isQuizCompleted = QUESTIONS.length === storedAnswer.length;

  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={trophyImg} alt="Trophy Image" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[questionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  const handleSelectedAnswer =useCallback( function handleSelectedAnswer(selectedAnswer) {
    setStoredAnswer((preAns) => {
      return [...preAns, selectedAnswer];
    });
  },[]);

  const skipAnswer = useCallback(()=>handleSelectedAnswer(null), [handleSelectedAnswer]);

  return (
    <div id="quiz">
      <div id="question">
        <ProgressBar
        key={questionIndex}
          timeout={10000}
          onTimeout={skipAnswer}
        />
        <h2>{QUESTIONS[questionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectedAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
