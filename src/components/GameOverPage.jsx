import QUESTIONS from "../questions.js";
import trophyImg from "../assets/quiz-complete.png";

export default function GameOverPage({ answers }) {
  const skippedAnswers = answers.filter((answer) => answer === null);
  const correctAnswers = answers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );
  const totalQuestions = answers.length;

  const skippedAnswerShare = Math.round((skippedAnswers.length*100)/totalQuestions);
  const correctAnswerShare = Math.round((correctAnswers.length*100)/totalQuestions);
  const wrongAnswerShare = 100 - skippedAnswerShare - correctAnswerShare;
  return (
    <div id="summary">
      <img src={trophyImg} alt="Trophy Image" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswerShare}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswerShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
