import React, { useEffect, useRef } from "react";
import Quiz from "react-quiz-component";
import { stellantisQuiz } from "./questions";
import "./quiz.scss";

const QuizGame = () => {
  const quizRef = useRef(null);

  useEffect(() => {
    const startButton = quizRef.current.querySelector(".startQuizBtn");
    startButton && startButton.click();
  }, []);

  const renderCustomResultPage = (obj) => {
    const successRate =
      (obj.numberOfCorrectAnswers / obj.numberOfQuestions) * 100;
    return (
      <div>
        <h2>Výsledky kvízu</h2>
        <p>Počet správnych odpovedí: {obj.numberOfCorrectAnswers}</p>
        <p>Celkový počet otázok: {obj.numberOfQuestions}</p>
        <p>Percentuálna úspešnosť: {successRate.toFixed(1)}%</p>
      </div>
    );
  };

  return (
    <div className="App" ref={quizRef}>
      <Quiz
        quiz={stellantisQuiz}
        showDefaultResult={false}
        customResultPage={renderCustomResultPage}
      />
    </div>
  );
};

export default QuizGame;
