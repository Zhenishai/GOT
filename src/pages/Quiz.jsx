import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { quizQuestions } from "../api/quizQuestions";
import { useAuth } from "../context/useAuth";
import { saveQuizResult, getQuizResult } from "../auth/quiz";
import "../styles/quiz.css";

export default function Quiz() {
  const { user } = useAuth();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [storedResult, setStoredResult] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ============================
     LOAD STORED RESULT
  ============================ */
  useEffect(() => {
    if (!user) return;

    getQuizResult(user.uid).then((result) => {
      setStoredResult(result);
      setLoading(false);
    });
  }, [user]);

  /* ============================
     GUARDS
  ============================ */
  if (!user) {
    return (
      <PageWrapper>
        <div className="quiz-page">
          <div className="quiz-card quiz-result">
            <h2>Please log in</h2>
            <p className="quiz-message">
              You must be logged in to take the quiz
            </p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (loading) {
    return null;
  }

  /* ============================
     STORED RESULT VIEW
  ============================ */
  if (storedResult && !finished) {
    return (
      <PageWrapper>
        <div className="quiz-page">
          <div className="quiz-card quiz-stored">
            <h2>
              {user.displayName || "Friend"}, your last result
            </h2>

            <div className="quiz-score">
              {storedResult.score}/{storedResult.total}
            </div>

            <p className="quiz-message">
              {storedResult.score >= 7
                ? "A true ruler of Westeros"
                : "The North remembers — try again"}
            </p>

            <button
              className="quiz-button"
              onClick={() => {
                setStoredResult(null);
                setCurrent(0);
                setScore(0);
                setFinished(false);
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const question = quizQuestions[current];

  /* ============================
     ANSWER HANDLER
  ============================ */
  const handleAnswer = async (index) => {
    const isCorrect = index === question.answer;
    const newScore = isCorrect ? score + 1 : score;

    if (current + 1 === quizQuestions.length) {
      setScore(newScore);
      setFinished(true);

      await saveQuizResult(
        user.uid,
        newScore,
        quizQuestions.length
      );
    } else {
      setScore(newScore);
      setCurrent((c) => c + 1);
    }
  };

  /* ============================
     FINAL RESULT VIEW
  ============================ */
  if (finished) {
    return (
      <PageWrapper>
        <div className="quiz-page">
          <div className="quiz-card quiz-result">
            <h2>
              {user.displayName || "Friend"}, your result
            </h2>

            <div className="quiz-score">
              {score}/{quizQuestions.length}
            </div>

            <p className="quiz-message">
              {score >= 7
                ? "Great job — the realm is yours"
                : "Winter is harsh — try again"}
            </p>

            <button
              className="quiz-button"
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setFinished(false);
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  /* ============================
     QUIZ VIEW
  ============================ */
  return (
    <PageWrapper>
      <div className="quiz-page">
        <div className="quiz-card">
          <div className="quiz-progress">
            Question {current + 1}/{quizQuestions.length}
          </div>

          <h2 className="quiz-question">
            {question.question}
          </h2>

          <div className="quiz-options">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className="quiz-option"
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
