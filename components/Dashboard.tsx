
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserProgress } from '../types';

const data = [
  { name: 'Mon', xp: 40 },
  { name: 'Tue', xp: 30 },
  { name: 'Wed', xp: 60 },
  { name: 'Thu', xp: 80 },
  { name: 'Fri', xp: 45 },
  { name: 'Sat', xp: 90 },
  { name: 'Sun', xp: 120 },
];

interface DashboardProps {
  progress: UserProgress;
}

const Dashboard: React.FC<DashboardProps> = ({ progress }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">Welcome back, Scholar!</h1>
        <p className="text-slate-400 mt-2">Your ML mastery is growing every day. Here's your weekly summary.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="fa-bolt" color="text-yellow-400" label="Current Streak" value={`${progress.streak} Days`} />
        <StatCard icon="fa-trophy" color="text-indigo-400" label="Total XP" value={progress.xp.toLocaleString()} />
        <StatCard icon="fa-check-double" color="text-emerald-400" label="Completed" value={progress.completedLessons.length.toString()} />
        <StatCard icon="fa-star" color="text-purple-400" label="Level" value={progress.level.toString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">XP Growth</h2>
            <select className="bg-slate-800 text-sm px-3 py-1 rounded-lg text-slate-300 outline-none">
              <option>This Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#6366f1" fillOpacity={1} fill="url(#colorXp)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">Recent Badges</h2>
          <div className="space-y-6">
            {progress.badges.map(badge => (
              <div key={badge.id} className="flex items-center gap-4 group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">{badge.name}</h3>
                  <p className="text-xs text-slate-500">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-indigo-400 font-medium hover:text-indigo-300 transition-colors text-sm">
            View All Achievements
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string; color: string; label: string; value: string }> = ({ icon, color, label, value }) => (
  <div className="glass p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-800 mb-4`}>
      <i className={`fa-solid ${icon} ${color} text-xl`}></i>
    </div>
    <div className="text-sm text-slate-400 font-medium">{label}</div>
    <div className="text-2xl font-bold text-white mt-1">{value}</div>
  </div>
);

export default Dashboard;
