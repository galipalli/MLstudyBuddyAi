
import React, { useState } from 'react';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion } from '../types';
import { ML_TOPICS } from '../constants';

const QuizModule: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const startQuiz = async (selectedTopic: string) => {
    setLoading(true);
    try {
      const q = await generateQuiz(selectedTopic);
      setQuestions(q);
      setTopic(selectedTopic);
      setCurrentIndex(0);
      setScore(0);
      setShowResult(false);
      setSelectedOption(null);
      setIsSubmitted(false);
    } catch (e) {
      alert("Error generating quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === questions[currentIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse text-lg">Curating the perfect questions for you...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto glass p-12 rounded-3xl border border-slate-800 text-center space-y-8 animate-fadeIn">
        <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl shadow-indigo-500/30">
          🎓
        </div>
        <h2 className="text-4xl font-bold text-white">Quiz Completed!</h2>
        <div className="text-6xl font-black text-indigo-500">
          {score} / {questions.length}
        </div>
        <p className="text-slate-400 text-lg">
          {score === questions.length ? "Incredible! You're an ML pro." : "Great effort! Keep practicing to master this topic."}
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setQuestions([])} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all">
            Try Another Topic
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <header className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Knowledge Challenge</h2>
          <p className="text-slate-400 text-lg">Choose a topic to test your understanding. Questions are unique every time.</p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ML_TOPICS.map(t => (
            <button
              key={t}
              onClick={() => startQuiz(t)}
              className="glass p-6 rounded-2xl border border-slate-800 hover:border-indigo-500 transition-all text-center hover:bg-indigo-600/10 group"
            >
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-microscope text-indigo-400"></i>
              </div>
              <span className="font-bold text-slate-200">{t}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Topic: {topic}</span>
        <span className="text-slate-400 text-sm">Question {currentIndex + 1} of {questions.length}</span>
      </div>

      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="glass p-8 rounded-3xl border border-slate-800 space-y-8">
        <h3 className="text-2xl font-bold text-white leading-tight">{currentQ.question}</h3>
        
        <div className="space-y-4">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                isSubmitted 
                  ? idx === currentQ.correctIndex 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                    : idx === selectedOption 
                      ? 'border-rose-500 bg-rose-500/10 text-rose-400' 
                      : 'border-slate-800 opacity-50 text-slate-500'
                  : selectedOption === idx
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                    : 'border-slate-800 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span className="font-medium text-lg">{option}</span>
              {isSubmitted && idx === currentQ.correctIndex && <i className="fa-solid fa-circle-check"></i>}
              {isSubmitted && idx === selectedOption && idx !== currentQ.correctIndex && <i className="fa-solid fa-circle-xmark"></i>}
            </button>
          ))}
        </div>

        {isSubmitted && (
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 animate-slideIn">
            <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-2">Explanation</h4>
            <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-600/20 transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-3"
            >
              {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModule;
