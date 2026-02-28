import React from 'react';
import { motion } from 'motion/react';
import { History, BrainCircuit } from 'lucide-react';
import { AnalysisData } from '../types';

interface MemoryProps {
  analysis: AnalysisData | null;
}

export const Memory: React.FC<MemoryProps> = ({ analysis }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      className="h-full overflow-y-auto pr-2 pb-20 md:pb-0"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-10">
          <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <History className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Project Memory Engine</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis?.memory.map((item, i) => (
            <div key={i} className="premium-card group">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-3 tracking-widest group-hover:text-blue-500 transition-colors">{item.key}</p>
              <p className="text-sm text-gray-800 leading-relaxed font-medium">{item.value}</p>
            </div>
          ))}
          <div className="premium-card !bg-gray-50 border-dashed !border-gray-200 flex flex-col items-center justify-center text-center py-12">
            <BrainCircuit className="w-10 h-10 text-gray-300 mb-4 animate-pulse" />
            <p className="text-xs text-gray-400 font-medium max-w-[200px]">Learning new patterns from current session...</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
