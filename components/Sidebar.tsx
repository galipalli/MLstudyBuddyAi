
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge' },
    { id: 'study-plan', label: 'Study Plan', icon: 'fa-route' },
    { id: 'chat', label: 'AI Buddy', icon: 'fa-robot' },
    { id: 'quizzes', label: 'Quizzes', icon: 'fa-vial-circle-check' },
    { id: 'flashcards', label: 'Flashcards', icon: 'fa-layer-group' },
    { id: 'visualizer', label: 'Visualizer', icon: 'fa-chart-network' },
  ];

  return (
    <aside className="w-64 glass h-screen flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-brain text-white text-xl"></i>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">ML Buddy</h1>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 glass rounded-xl">
          <img src="https://picsum.photos/40/40" className="rounded-full w-10 h-10 border border-indigo-500" alt="Avatar" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Guest Learner</span>
            <span className="text-xs text-slate-400">Level 12 • Pro</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
