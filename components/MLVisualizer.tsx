
import React, { useState } from 'react';

const MLVisualizer: React.FC = () => {
  const [layers, setLayers] = useState([3, 5, 4, 2]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Neural Net Sandbox</h2>
          <p className="text-slate-400 mt-2">Visualize the architecture of a Feedforward Neural Network.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setLayers(prev => prev.length < 6 ? [...prev, 4] : prev)}
            className="px-4 py-2 glass rounded-xl text-sm text-indigo-400 border-indigo-400/20 hover:bg-indigo-400/10"
          >
            Add Layer
          </button>
          <button 
             onClick={() => setLayers(prev => prev.length > 2 ? prev.slice(0, -1) : prev)}
             className="px-4 py-2 glass rounded-xl text-sm text-rose-400 border-rose-400/20 hover:bg-rose-400/10"
          >
            Remove Layer
          </button>
        </div>
      </header>

      <div className="glass p-12 rounded-3xl border border-slate-800 min-h-[500px] flex items-center justify-center overflow-x-auto">
        <svg width="800" height="400" className="max-w-full">
          {layers.map((nodeCount, layerIdx) => {
            const x = 100 + (layerIdx * 150);
            const nextX = 100 + ((layerIdx + 1) * 150);
            const nodes = Array.from({ length: nodeCount });
            
            return (
              <g key={layerIdx}>
                {/* Connections to next layer */}
                {layerIdx < layers.length - 1 && nodes.map((_, nodeIdx) => {
                    const y = (400 / (nodeCount + 1)) * (nodeIdx + 1);
                    return Array.from({ length: layers[layerIdx + 1] }).map((__, nextNodeIdx) => {
                      const nextY = (400 / (layers[layerIdx + 1] + 1)) * (nextNodeIdx + 1);
                      return (
                        <line
                          key={`${nodeIdx}-${nextNodeIdx}`}
                          x1={x} y1={y} x2={nextX} y2={nextY}
                          stroke="#4f46e5" strokeWidth="0.5" strokeOpacity="0.2"
                        />
                      );
                    });
                })}

                {/* Layer Nodes */}
                {nodes.map((_, nodeIdx) => {
                  const y = (400 / (nodeCount + 1)) * (nodeIdx + 1);
                  return (
                    <circle
                      key={nodeIdx}
                      cx={x} cy={y} r="12"
                      fill={layerIdx === 0 ? '#10b981' : layerIdx === layers.length - 1 ? '#f59e0b' : '#6366f1'}
                      className="transition-all duration-700 shadow-xl"
                    />
                  );
                })}

                {/* Layer Label */}
                <text x={x} y="380" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
                  {layerIdx === 0 ? 'Input' : layerIdx === layers.length - 1 ? 'Output' : `Hidden ${layerIdx}`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-slate-800">
          <h4 className="font-bold text-emerald-500 mb-2">Input Layer</h4>
          <p className="text-sm text-slate-400">Receives raw features (e.g., pixel data, user traits). Each circle represents a feature.</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-slate-800">
          <h4 className="font-bold text-indigo-500 mb-2">Hidden Layers</h4>
          <p className="text-sm text-slate-400">Extracts patterns using weights and activation functions. More layers = more complexity.</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-slate-800">
          <h4 className="font-bold text-amber-500 mb-2">Output Layer</h4>
          <p className="text-sm text-slate-400">Produces final prediction (e.g., 'Cat' vs 'Dog', or a price estimate).</p>
        </div>
      </div>
    </div>
  );
};

export default MLVisualizer;
