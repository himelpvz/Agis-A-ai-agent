/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  Shield, 
  Activity, 
  FolderTree,
  Zap,
  BrainCircuit,
  ArrowLeft,
  MoreHorizontal
} from 'lucide-react';

import { TabId, LogEntry, SystemStatus, AnalysisData, TABS } from './types';
import { Sidebar } from './components/Sidebar';
import { ReasoningPanel } from './components/ReasoningPanel';
import { Terminal } from './components/Terminal';
import { Dashboard } from './components/Dashboard';
import { Plan } from './components/Plan';
import { Security } from './components/Security';
import { Memory } from './components/Memory';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('terminal');
  const [isReasoningOpen, setIsReasoningOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem('aegis_chat_history');
    return saved ? JSON.parse(saved) : [
      { id: '1', type: 'info', message: 'Aegis System v1.2.0 Initializing...', timestamp: new Date().toLocaleTimeString() }
    ];
  });

  useEffect(() => {
    localStorage.setItem('aegis_chat_history', JSON.stringify(logs));
  }, [logs]);

  const clearLogs = () => {
    const initialLog: LogEntry = { id: '1', type: 'info', message: 'Aegis System v1.2.0 Initializing...', timestamp: new Date().toLocaleTimeString() };
    setLogs([initialLog]);
  };
  const [command, setCommand] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStatus();
    fetchAnalysis();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus(data);
    } catch (e) { console.error(e); }
  };

  const fetchAnalysis = async () => {
    try {
      const res = await fetch('/api/analysis');
      const data = await res.json();
      setAnalysis(data);
    } catch (e) { console.error(e); }
  };

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const [chatSession, setChatSession] = useState<any>(null);

  useEffect(() => {
    try {
      if (process.env.GEMINI_API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const chat = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: "You are Aegis, an advanced AI engineering agent. You help users build, debug, and manage their software projects. Keep your answers concise and helpful.",
          },
        });
        setChatSession(chat);
      }
    } catch (e) {
      console.error("Failed to initialize Gemini API", e);
    }
  }, []);

  const handleCommand = async (e: FormEvent) => {
    e.preventDefault();
    if (!command.trim() || isExecuting) return;

    const cmd = command.trim();
    setCommand('');
    addLog(cmd, 'command');
    setIsExecuting(true);

    try {
      if (chatSession) {
        const response = await chatSession.sendMessage({ message: cmd });
        addLog(response.text || 'No response', 'info');
      } else {
        addLog('AI is not initialized. Check your API key.', 'error');
      }
    } catch (err) {
      addLog('Execution failed: Connection error', 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f5f5f7] text-[#1d1d1f] overflow-hidden font-sans">
      {/* Mobile Header */}
      <header className="md:hidden h-14 flex items-center justify-between px-6 border-b border-gray-100 bg-white z-50">
        <div className="w-10" /> {/* Spacer */}
        <h1 className="text-sm font-medium text-gray-900">Aegis AI Engine...</h1>
        <button 
          onClick={() => setIsReasoningOpen(!isReasoningOpen)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <BrainCircuit className="w-5 h-5" />
        </button>
      </header>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10 bg-white">
        {/* Desktop Header */}
        <header className="hidden md:flex h-14 border-b border-gray-100 bg-white items-center px-8 gap-6">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{activeTab} Session</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-100" />
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <FolderTree className="w-4 h-4" />
            <span className="font-mono">/root/aegis-agent</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Self-Healing Active</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
            {activeTab === 'terminal' && (
              <Terminal 
                key="terminal"
                logs={logs}
                command={command}
                setCommand={setCommand}
                onExecute={handleCommand}
                isExecuting={isExecuting}
                scrollRef={scrollRef}
                onClear={clearLogs}
              />
            )}
            {activeTab === 'dashboard' && <Dashboard key="dashboard" status={status} analysis={analysis} />}
            {activeTab === 'plan' && <Plan key="plan" />}
            {activeTab === 'security' && <Security key="security" />}
            {activeTab === 'memory' && <Memory key="memory" analysis={analysis} />}
        </div>
      </main>

      <ReasoningPanel 
        activeTab={activeTab} 
        status={status} 
        isOpen={isReasoningOpen} 
        onClose={() => setIsReasoningOpen(false)} 
      />

      {/* Mobile Bottom Navigation - Chat/Preview Toggle */}
      <nav className="md:hidden h-20 border-t border-gray-100 bg-white flex items-center justify-between px-6 z-50">
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="bg-gray-100 p-1 rounded-full flex items-center w-full max-w-[240px] mx-4">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'terminal' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'dashboard' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            }`}
          >
            Preview
          </button>
        </div>

        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}
