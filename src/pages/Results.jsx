import React from 'react';
import { useNavigate } from 'react-router-dom';

const Results = ({ quizData, name }) => {
  const navigate = useNavigate();
  const { questions, answers } = quizData;

  const score = questions.reduce((acc, question, index) => {
    return acc + (answers[index] === question.answer ? 1 : 0);
  }, 0);

  const totalQuestions = questions.length;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-2xl w-full max-w-3xl text-center border border-base-300 flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary drop-shadow">
          🎉 Well done, {name}!
        </h1>
        <p className="text-lg font-medium text-base-content">
          You scored <span className="font-bold text-success">{score}</span> out of {totalQuestions}
        </p>

        <div className="text-left mt-6">
          <h2 className="text-xl font-semibold mb-4">📊 Correct Answers:</h2>
          <ul className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-2">
            {questions.map((question, index) => (
              <li
                key={index}
                className={`p-3 rounded border ${
                  answers[index] === question.answer
                    ? 'border-success bg-success/20'
                    : 'border-error bg-error/10'
                }`}
              >
                <p className="font-medium">{question.question}</p>
                <p className="text-sm">
                  ✅ Correct: <span className="font-semibold">{question.answer}</span>
                </p>
                <p className="text-sm">
                  📝 Your Answer:{" "}
                  <span
                    className={`font-semibold ${
                      answers[index] === question.answer ? 'text-success' : 'text-error'
                    }`}
                  >
                    {answers[index] ? answers[index] : 'Not Answered'}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary w-full max-w-xs"
          >
            🔙 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
