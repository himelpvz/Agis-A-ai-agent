import { FC } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, History, Lock } from 'lucide-react';

export const Security: FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto pr-2 pb-20 md:pb-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card !bg-red-50/50 !border-red-200/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-50 rounded-xl">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-red-600">Vulnerability Scan</h3>
                <p className="text-[10px] text-red-400 font-bold">REAL-TIME MONITORING ACTIVE</p>
              </div>
            </div>
            <div className="space-y-2">
              {['SQL Injection Check', 'XSS Protection Check', 'Secret Detection'].map(check => (
                <div key={check} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <span className="text-sm text-gray-700 font-medium">{check}</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-emerald-600 font-bold">PASSED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-gray-900">
              <History className="w-4 h-4 text-blue-500" /> Hardening Log
            </h3>
            <div className="space-y-3 font-mono text-[11px] text-gray-500">
              <div className="flex gap-4">
                <span className="opacity-40">12:04:22</span>
                <span>Scanning environment variables for secrets...</span>
              </div>
              <div className="flex gap-4">
                <span className="opacity-40">12:04:23</span>
                <span>No hardcoded credentials found in source.</span>
              </div>
              <div className="flex gap-4">
                <span className="opacity-40">12:04:25</span>
                <span>Enforcing Content-Security-Policy headers.</span>
              </div>
              <div className="flex gap-4 text-blue-600 font-medium">
                <span className="opacity-40">12:04:26</span>
                <span>Security baseline established.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="premium-card text-center flex flex-col items-center justify-center py-10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
              <Lock className="w-16 h-16 text-blue-500 relative z-10" />
            </div>
            <p className="text-5xl font-bold text-gray-900 mb-2">A+</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Security Rating</p>
          </div>
          <div className="premium-card">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-4 tracking-widest">Active Protections</p>
            <div className="space-y-3">
              {['CSRF Protection', 'Rate Limiting', 'Input Sanitization', 'Secure Cookies'].map(p => (
                <div key={p} className="flex items-center gap-3 text-xs text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/20" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
