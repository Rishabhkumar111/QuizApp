import headerImg from "../assets/quiz-logo.png";

export default function Header({
  setisQuizCompleted,
  storedAnswer,
  setStoredAnswer,
  isQuizCompleted,
}) {
  let cssClass = "exit";
  function handleExit() {
    const size = 7 - storedAnswer.length;
    for (var ind = 0; ind < size; ind++) {
      setStoredAnswer((preAns) => {
        return [...preAns, null];
      });
    }
    setisQuizCompleted(true);
  }
  if (isQuizCompleted) {
    cssClass = "reload";
  }
  function handleReload() {
    window.location.reload();
  }

  return (
    <header>
      <button
        className={cssClass}
        onClick={!isQuizCompleted ? handleExit : handleReload}
      >
        {isQuizCompleted ? "Reload Game" : "Exit"}
      </button>
      <img src={headerImg} alt="header-logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
