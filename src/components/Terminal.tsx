import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Mic, 
  Plus, 
  ArrowUp, 
  Flag, 
  Eye, 
  RotateCcw,
  Bug,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  X
} from 'lucide-react';
import { LogEntry } from '../types';

interface TerminalProps {
  logs: LogEntry[];
  command: string;
  setCommand: (cmd: string) => void;
  onExecute: (e: React.FormEvent) => void;
  isExecuting: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onClear: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  logs, command, setCommand, onExecute, isExecuting, scrollRef, onClear 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-white max-w-4xl mx-auto"
    >
      {/* Chat Header */}
      <div className="px-4 md:px-8 py-3 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-bold text-gray-900">Aegis AI Session</span>
        </div>
        <button 
          onClick={onClear}
          className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear Chat
        </button>
      </div>

      {/* Chat History */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col gap-10 scrollbar-hide"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex flex-col gap-3">
            {log.type === 'command' ? (
              <div className="bg-gray-100 rounded-2xl p-6 self-stretch">
                <p className="text-sm text-gray-700 leading-relaxed">{log.message}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium">Code assistant</span>
                  </div>
                  <Bug className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span>Gemini 3 Flash Preview</span>
                  <span>•</span>
                  <span>Ran for {Math.floor(Math.random() * 300)}s</span>
                </div>

                <div className="text-sm text-gray-800 leading-relaxed">
                  {log.message}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    <Flag className="w-3.5 h-3.5" />
                    <span>Checkpoint</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View changes</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-full text-xs text-gray-500 hover:bg-gray-50 transition-colors">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {isExecuting && (
          <div className="flex flex-col gap-4">
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <span>Gemini 3 Flash Preview</span>
              <span>•</span>
              <span>Running for 3s</span>
            </div>
            <div className="flex items-center gap-2 text-blue-500">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-sm rounded-full animate-pulse" />
                <Sparkles className="w-4 h-4 relative z-10" />
              </div>
              <span className="text-xs font-medium">Ideating</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-8 border-t border-gray-100 bg-white">
        {/* Suggested Actions */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
          <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-full shrink-0">
            <Sparkles className="w-4 h-4" />
          </button>
          {[
            'Refine Terminal Input',
            'Enhance Chat Input',
            'Optimize Layout',
            'Add Security Layer'
          ].map((action, i) => (
            <button 
              key={i}
              className="px-4 py-1.5 border border-gray-200 rounded-full text-xs text-gray-600 whitespace-nowrap hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <span>{action}</span>
              {i === 1 && <ChevronRight className="w-3 h-3" />}
            </button>
          ))}
          <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-full shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onExecute} className="relative bg-gray-50 border border-gray-200 rounded-2xl p-4 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
          <textarea
            value={command} 
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Make changes, add new features, ask for anything"
            className="w-full bg-transparent border-none focus:ring-0 text-sm md:text-base text-gray-800 placeholder:text-gray-400 resize-none min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onExecute(e as unknown as React.FormEvent);
              }
            }}
          />
          <div className="flex items-center justify-end gap-3 mt-2">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-full transition-all">
              <Mic className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-full transition-all">
              <Plus className="w-5 h-5" />
            </button>
            <button 
              type="submit"
              disabled={!command.trim() || isExecuting}
              className={`p-2 rounded-full transition-all ${
                command.trim() && !isExecuting 
                  ? 'bg-gray-900 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
