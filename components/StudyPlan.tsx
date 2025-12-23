
import React, { useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';
import { StudyPlan as StudyPlanType } from '../types';

const StudyPlan: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlanType | null>(null);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    try {
      const generated = await generateStudyPlan(goal);
      setPlan(generated);
    } catch (error) {
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {!plan ? (
        <div className="glass p-12 rounded-3xl border border-slate-800 text-center space-y-8">
          <div className="w-20 h-20 bg-indigo-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-compass text-indigo-500 text-4xl"></i>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Chart Your ML Journey</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Tell us what you want to achieve, and we'll create a customized step-by-step roadmap for you.
            </p>
          </div>
          
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="e.g., Master Computer Vision in 3 months"
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl px-8 py-5 text-xl outline-none focus:border-indigo-500 transition-all text-white pr-20"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !goal.trim()}
              className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 transition-all"
            >
              {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-sparkles"></i>}
              Generate
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {['NLP Specialist', 'Deep Learning Basics', 'Reinforcement Learning', 'ML Ops'].map(tag => (
              <button 
                key={tag}
                onClick={() => setGoal(tag)}
                className="px-4 py-2 glass rounded-full text-sm text-slate-400 hover:text-indigo-400 hover:border-indigo-400/50 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">{plan.goal}</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-indigo-400 flex items-center gap-1">
                  <i className="fa-solid fa-calendar-days"></i> {plan.duration}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{plan.milestones.length} Milestones</span>
              </div>
            </div>
            <button 
              onClick={() => setPlan(null)}
              className="glass px-4 py-2 rounded-xl text-slate-400 hover:text-white border-slate-700 text-sm"
            >
              New Plan
            </button>
          </div>

          <div className="space-y-4">
            {plan.milestones.map((milestone, idx) => (
              <div key={milestone.id} className="glass p-6 rounded-2xl border border-slate-800 flex items-start gap-6 group hover:border-slate-700 transition-all">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    milestone.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {milestone.status === 'completed' ? <i className="fa-solid fa-check"></i> : idx + 1}
                  </div>
                  {idx !== plan.milestones.length - 1 && <div className="w-0.5 h-16 bg-slate-800 mt-2"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-200">{milestone.title}</h3>
                    <span className="px-3 py-1 bg-slate-800 text-xs rounded-full text-slate-400 uppercase tracking-widest font-bold">
                      {milestone.estimatedHours}h
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-4">{milestone.description}</p>
                  <button className="text-sm font-bold text-indigo-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Start Learning <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlan;
