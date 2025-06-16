import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import questions from '../assets/data/questions';
import Results from './Results';
import toast from 'react-hot-toast';

const Quiz = () => {
  const location = useLocation();
  const name = localStorage.getItem('quiz-user-name');

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

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
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handleClear = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = null;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success('Quiz submitted successfully!');
    localStorage.removeItem('quiz-timeLeft');
    localStorage.removeItem('quiz-user-name');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (current < questions.length - 1) handleNext();
      else handleSubmit();
    }
  };

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
        localStorage.setItem('quiz-timeLeft', newTime);
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
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-xl border border-gray-300 flex flex-col gap-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center drop-shadow">
          👋 {name}, ready to test your skills?
        </h1>

        <div className="text-lg font-semibold text-red-600 text-center">
          ⏰ Time Remaining: {formatTime(timeLeft)}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Q{current + 1}: {currentQuestion.question}
          </h2>

          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`py-3 px-4 border rounded text-left transition duration-200 ${
                  answers[current] === option
                    ? 'bg-primary text-white font-semibold border-primary'
                    : 'bg-white text-gray-800 border-gray-400 hover:bg-primary/10'
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between mt-6">
          <button
            onClick={handlePrevious}
            className="flex-1 min-w-[100px] px-4 py-2 border rounded-lg bg-white text-gray-800 border-gray-400 hover:bg-gray-100 transition"
            disabled={current === 0}
          >
            ← Previous
          </button>

          <button
            onClick={handleClear}
            className={`flex-1 min-w-[100px] px-4 py-2 border rounded-lg ${
              answers[current] === null
                ? 'opacity-50 cursor-not-allowed bg-gray-200 border-gray-300'
                : 'bg-white text-gray-800 border-gray-400 hover:bg-yellow-100'
            } transition`}
            disabled={answers[current] === null}
          >
            Clear
          </button>

          {current < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex-1 min-w-[100px] px-4 py-2 border rounded-lg bg-primary text-white hover:scale-105 transition"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 min-w-[100px] px-4 py-2 border rounded-lg bg-green-600 text-white hover:scale-105 transition"
            >
              ✅ Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
