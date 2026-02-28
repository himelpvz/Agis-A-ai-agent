import { FC } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { TabId, SystemStatus } from '../types';

interface ReasoningPanelProps {
  activeTab: TabId;
  status: SystemStatus | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReasoningPanel: FC<ReasoningPanelProps> = ({ activeTab, status, isOpen, onClose }) => {
  const objective = {
    terminal: 'Executing direct system commands and monitoring output streams for anomalies.',
    dashboard: 'Analyzing project health metrics and cross-referencing dependency governance protocols.',
    plan: 'Decomposing complex engineering tasks into verifiable, incremental execution steps.',
    security: 'Hardening system security architecture and scanning for zero-day vulnerabilities.',
    memory: 'Retrieving architectural patterns and learned conventions from the high-fidelity memory engine.',
  }[activeTab];

  const content = (
    <div className="flex flex-col h-full gap-8">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <BrainCircuit className="w-5 h-5 text-blue-500" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">Reasoning Engine</h2>
        </div>
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <p className="text-[10px] text-blue-600 mb-3 font-bold uppercase tracking-widest">Current Objective</p>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">
            {objective}
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-5 h-5 text-blue-500" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">Live Telemetry</h2>
        </div>
        <div className="space-y-4">
          <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex justify-between text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-widest">
              <span>Memory RSS</span>
              <span className="text-blue-600">{status ? Math.round(status.memory.rss / 1024 / 1024) : 0}MB</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div animate={{ width: ['40%', '42%', '41%'] }} transition={{ repeat: Infinity, duration: 2 }} className="h-full bg-blue-500" />
            </div>
          </div>
          <div className="p-5 bg-white border border-gray-200 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Session Uptime</span>
            <span className="text-xs font-mono font-bold text-gray-900">{status ? Math.round(status.uptime) : 0}s</span>
          </div>
        </div>
      </section>

      <div className="mt-auto p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest">Risk Assessment</span>
        </div>
        <p className="text-[11px] text-emerald-700 leading-tight font-medium">
          Current plan risk: <span className="font-bold underline">LOW</span>. No destructive operations detected in active pipeline.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Panel */}
      <aside className="hidden xl:flex w-80 flex-col border-l border-gray-200 bg-[#fbfbfd]/80 backdrop-blur-xl p-6 z-50">
        {content}
      </aside>

      {/* Mobile Drawer */}
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] xl:hidden"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-gray-200 rounded-t-[2rem] p-8 z-[70] xl:hidden max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
              {content}
              <button 
                onClick={onClose}
                className="w-full mt-8 py-4 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold uppercase tracking-widest text-gray-600"
              >
                Close Engine
              </button>
            </motion.div>
          </>
        )}
    </>
  );
};
