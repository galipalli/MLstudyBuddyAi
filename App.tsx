
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudyPlan from './components/StudyPlan';
import ChatBuddy from './components/ChatBuddy';
import QuizModule from './components/QuizModule';
import Flashcards from './components/Flashcards';
import MLVisualizer from './components/MLVisualizer';
import { INITIAL_PROGRESS } from './constants';
import { UserProgress } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard progress={progress} />;
      case 'study-plan':
        return <StudyPlan />;
      case 'chat':
        return <ChatBuddy />;
      case 'quizzes':
        return <QuizModule />;
      case 'flashcards':
        return <Flashcards />;
      case 'visualizer':
        return <MLVisualizer />;
      default:
        return <Dashboard progress={progress} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Stats Bar */}
          <div className="flex justify-end gap-6 mb-8">
             <div className="flex items-center gap-2 px-4 py-2 glass rounded-2xl">
               <span className="text-yellow-500">🔥</span>
               <span className="font-bold text-white">{progress.streak}</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 glass rounded-2xl">
               <span className="text-indigo-500">💎</span>
               <span className="font-bold text-white">{progress.xp} XP</span>
             </div>
          </div>

          {renderContent()}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
