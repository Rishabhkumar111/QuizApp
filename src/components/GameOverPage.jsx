import QUESTIONS from '../questions.js';
import trophyImg from "../assets/quiz-complete.png";

export default function GameOverPage({answers}) {
    let score=0;
    QUESTIONS.forEach((question, index) => {
        if(answers[index] == question.answers[0]){
            score++;
        }
    });
  return (
    <div id="summary">
      <img src={trophyImg} alt="Trophy Image" />
      <h2>Quiz Completed</h2>
      <h3>{score}</h3>
    </div>
  );
}
