import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [storedAnswer, setStoredAnswer] = useState([]);
  const [isQuizCompleted, setisQuizCompleted] = useState(false);

  const handleStartGame = () => {
    setShowQuiz(true);
  };
  return (
    <>
      <Header
        setisQuizCompleted={setisQuizCompleted}
        storedAnswer={storedAnswer}
        setStoredAnswer={setStoredAnswer}
        isQuizCompleted={isQuizCompleted}
      />
      <main>
        {!showQuiz && !isQuizCompleted && (
          <div className="start-popup">
            <div className="contant">
              <p>Click start to play React Quiz game</p>
              <button onClick={handleStartGame}>Start Game</button>
            </div>
          </div>
        )}
        {showQuiz && (
          <Quiz
            storedAnswer={storedAnswer}
            setStoredAnswer={setStoredAnswer}
            isQuizCompleted={isQuizCompleted}
            setisQuizCompleted={setisQuizCompleted}
          />
        )}
      </main>
    </>
  );
}

export default App;
