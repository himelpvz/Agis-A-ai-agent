import { FC } from 'react';
import { motion } from 'framer-motion';
import { LineChart, CheckCircle2, Package, History, Target } from 'lucide-react';
import { SystemStatus, AnalysisData } from '../types';

interface DashboardProps {
  status: SystemStatus | null;
  analysis: AnalysisData | null;
}

export const Dashboard: FC<DashboardProps> = ({ status, analysis }) => {
  const stats = [
    { label: 'Coverage', value: `${status?.health.coverage}%`, icon: LineChart, color: 'text-emerald-500' },
    { label: 'Lint', value: `${status?.health.lintScore}`, icon: CheckCircle2, color: 'text-blue-500' },
    { label: 'Freshness', value: `${status?.health.dependencyFreshness}%`, icon: Package, color: 'text-indigo-500' },
    { label: 'Debt', value: status?.health.technicalDebt, icon: History, color: 'text-amber-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      className="h-full overflow-y-auto pr-2 pb-20 md:pb-0"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="premium-card flex flex-col justify-between min-h-[120px]">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="premium-card">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-gray-900">
            <Package className="w-5 h-5 text-blue-500" /> Dependency Governance
          </h3>
          <div className="space-y-2">
            {analysis?.dependencies.map((dep, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div>
                  <p className="text-sm font-bold text-gray-900">{dep.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono">v{dep.current} → v{dep.latest}</p>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                  dep.status === 'up-to-date' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 'border-amber-200 text-amber-600 bg-amber-50'
                }`}>
                  {dep.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-gray-900">
            <Target className="w-5 h-5 text-blue-500" /> Risk Estimation
          </h3>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">Risk Score</span>
              <span className="text-2xl font-bold text-gray-900">{analysis?.risk.score}<span className="text-xs text-gray-400">/100</span></span>
            </div>
            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${analysis?.risk.score}%` }}
                className="h-full bg-blue-500 rounded-full shadow-sm" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-widest">Impact Radius</p>
                <p className="text-base font-bold text-gray-900">{analysis?.risk.impactRadius}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-widest">Complexity</p>
                <p className="text-base font-bold text-gray-900">{analysis?.risk.complexity}<span className="text-xs text-gray-400">/10</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
