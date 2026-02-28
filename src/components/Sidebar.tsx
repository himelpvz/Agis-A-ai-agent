import { FC } from 'react';
import { Shield, CheckCircle2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { TabId, TABS, PHASES } from '../types';

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const Sidebar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-200/50 bg-[#ebebed]/80 backdrop-blur-xl p-6 gap-8 z-50">
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 mb-2">
          <div className="traffic-light traffic-red" />
          <div className="traffic-light traffic-yellow" />
          <div className="traffic-light traffic-green" />
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">AEGIS</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Engineering Agent</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 ml-2 tracking-widest">Navigation</p>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`} />
            <span className="text-sm font-medium">{tab.name}</span>
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-2">
        <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 ml-2 tracking-widest">Pipeline</p>
        {PHASES.map((phase) => (
          <div key={phase.id} className="flex items-center gap-3 p-2 rounded-lg text-xs">
            <div className={`w-1.5 h-1.5 rounded-full ${
              phase.status === 'complete' ? 'bg-gray-400' : 
              phase.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'
            }`} />
            <span className={phase.status === 'complete' ? 'text-gray-400' : 'text-gray-700 font-medium'}>{phase.name}</span>
            {phase.status === 'complete' && <CheckCircle2 className="w-3 h-3 ml-auto text-gray-400" />}
          </div>
        ))}
      </div>

      <div className="mt-auto p-4 rounded-xl bg-white/50 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[10px] uppercase font-bold text-gray-400">Load</span>
          </div>
          <span className="text-[10px] font-mono text-blue-600 font-bold">32%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: ['20%', '45%', '30%'] }} 
            transition={{ repeat: Infinity, duration: 4 }}
            className="h-full bg-blue-500" 
          />
        </div>
      </div>
    </aside>
  );
};
