
import React, { useState } from 'react';
import { SAMPLE_FLASHCARDS } from '../constants';

const Flashcards: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = SAMPLE_FLASHCARDS[index];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % SAMPLE_FLASHCARDS.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIndex(prev => (prev - 1 + SAMPLE_FLASHCARDS.length) % SAMPLE_FLASHCARDS.length);
    }, 200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-10 animate-fadeIn">
      <header className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2">Active Recall</h2>
        <p className="text-slate-400">Master terminology with fast-paced flashcards.</p>
      </header>

      <div 
        className="relative h-96 w-full perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 w-full h-full glass rounded-[2.5rem] border-2 border-slate-800 flex flex-col items-center justify-center p-12 backface-hidden shadow-2xl group-hover:border-indigo-500/50 transition-colors">
            <span className="text-indigo-400 text-sm font-black uppercase tracking-widest mb-6">{card.category}</span>
            <h3 className="text-3xl font-bold text-white text-center leading-tight">{card.front}</h3>
            <p className="mt-8 text-slate-500 text-sm font-medium">Click to flip</p>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 w-full h-full bg-indigo-600 rounded-[2.5rem] flex flex-col items-center justify-center p-12 backface-hidden rotate-y-180 shadow-2xl">
             <span className="text-white/60 text-sm font-black uppercase tracking-widest mb-6">Answer</span>
             <p className="text-2xl font-bold text-white text-center leading-relaxed">
               {card.back}
             </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <button onClick={handlePrev} className="w-16 h-16 glass rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
        <div className="text-slate-500 font-bold text-lg">
          {index + 1} <span className="text-slate-700">/</span> {SAMPLE_FLASHCARDS.length}
        </div>
        <button onClick={handleNext} className="w-16 h-16 glass rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <i className="fa-solid fa-arrow-right text-xl"></i>
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Flashcards;
