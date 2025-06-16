import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import questions from '../assets/data/questions';
import Results from './Results';
import toast from 'react-hot-toast';

const Quiz = () => {
  const location = useLocation();
  const name = location.state?.name;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  // Check for saved time on load
  const initialTime = localStorage.getItem('quiz-timeLeft')
    ? parseInt(localStorage.getItem('quiz-timeLeft'))
    : 300;

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const containerRef = useRef(null);

  const handleOptionClick = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = option;
    setAnswers(updatedAnswers);
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleClear = () => {
    if (answers[current] !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[current] = null;
      setAnswers(updatedAnswers);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success('Quiz submitted successfully!');
    localStorage.removeItem('quiz-timeLeft'); // Clear timer on submission
    localStorage.removeItem('quiz-user-name');

  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (current < questions.length - 1) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  // Timer countdown effect with localStorage
  useEffect(() => {
    if (submitted) return;

    if (timeLeft === 0) {
      handleSubmit();
      toast.error("⏳ Time's up! Quiz auto-submitted.");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem('quiz-timeLeft', newTime); // Update localStorage
        return newTime;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, submitted]);

  useEffect(() => {
    containerRef.current?.focus();
  }, [current]);

  if (submitted) {
    return <Results quizData={{ questions, answers }} name={name} />;
  }

  const currentQuestion = questions[current];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="hero-content flex items-center justify-center bg-base-content p-4"
      >
        <div className="flex flex-col items-center w-full max-w-3xl gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-content text-center drop-shadow">
            👋 {name}, ready to test your skills?
          </h1>

          <div className="text-lg font-semibold text-error">
            ⏰ Time Remaining: {formatTime(timeLeft)}
          </div>

          <div className="bg-base-100 w-full p-6 border border-primary-content rounded-2xl shadow-xl flex flex-col gap-6">
            <h2 className="text-lg md:text-xl font-semibold text-secondary-content">
              Q{current + 1}: {currentQuestion.question}
            </h2>

            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`py-3 px-4 border rounded text-left transition duration-200 ease-in-out ${
                    answers[current] === option
                      ? 'bg-primary-content text-primary border-primary font-bold shadow'
                      : 'bg-base-100 text-base-content border-2 border-base-content hover:bg-secondary-content hover:text-base-100'
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-between mt-6">
              <button
                onClick={handlePrevious}
                className="flex-1 min-w-[110px] px-4 py-2 bg-base-100 border-2 border-base-content rounded-lg hover:bg-primary-content hover:text-primary transition"
                disabled={current === 0}
              >
                ← Previous
              </button>

              <button
                onClick={handleClear}
                className={`flex-1 min-w-[110px] px-4 py-2 bg-base-100 border-2 border-base-content rounded-lg hover:bg-secondary-content hover:text-base-100 transition ${
                  answers[current] === null ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={answers[current] === null}
              >
                Clear
              </button>

              {current < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 min-w-[110px] px-4 py-2 bg-base-100 border-2 border-base-content rounded-lg hover:bg-primary-content hover:text-primary transition"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 min-w-[110px] px-4 py-2 bg-success-content text-success border border-success-content rounded-lg hover:scale-105 transition"
                >
                  ✅ Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
