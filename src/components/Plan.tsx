import React from 'react';
import { motion } from 'motion/react';
import { Workflow, CheckCircle2 } from 'lucide-react';

export const Plan: React.FC = () => {
  const tasks = [
    { title: 'Recon Phase', desc: 'Scan project structure and detect dependencies', status: 'done' },
    { title: 'Advanced UI Implementation', desc: 'Build multi-tab dashboard with real-time telemetry', status: 'active' },
    { title: 'Self-Healing Validation', desc: 'Implement automated error detection and recovery', status: 'pending' },
    { title: 'Security Hardening', desc: 'Scan for vulnerabilities and enforce security headers', status: 'pending' },
    { title: 'Performance Profiling', desc: 'Run benchmarks and identify bottlenecks', status: 'pending' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.98 }}
      className="h-full overflow-y-auto pr-2 pb-20 md:pb-0"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-10">
          <div className="p-4 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            <Workflow className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Autonomous Task Decomposition</h2>
            <p className="text-sm text-gray-500">Breaking complex objectives into verifiable subtasks.</p>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task, i) => (
            <div key={i} className={`premium-card !p-5 group ${
              task.status === 'active' ? 'border-blue-500/30 bg-blue-50/50' : ''
            }`}>
              <div className="flex items-start gap-5">
                <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  task.status === 'done' ? 'bg-blue-500 border-blue-500' : 
                  task.status === 'active' ? 'border-blue-500 animate-pulse shadow-[0_0_10px_rgba(0,113,227,0.3)]' : 'border-gray-200'
                }`}>
                  {task.status === 'done' && <CheckCircle2 className="w-4 h-4 text-white" />}
                  {task.status === 'active' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>
                <div className="flex-1">
                  <p className={`text-base font-bold transition-all ${task.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{task.desc}</p>
                </div>
                <div className="shrink-0">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                    task.status === 'done' ? 'border-gray-200 text-gray-400' : 
                    task.status === 'active' ? 'border-blue-200 text-blue-600 bg-blue-50' : 'border-gray-100 text-gray-400'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
