import { 
  Terminal as TerminalIcon, 
  BarChart3, 
  Workflow, 
  Lock, 
  History,
  Search,
  BrainCircuit,
  Code2,
  Shield,
  CheckCircle2
} from 'lucide-react';

export type TabId = 'terminal' | 'dashboard' | 'plan' | 'security' | 'memory';

export interface LogEntry {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'command';
  message: string;
  timestamp: string;
}

export interface SystemStatus {
  health: {
    coverage: number;
    lintScore: number;
    dependencyFreshness: number;
    securityWarnings: number;
    technicalDebt: string;
  };
  memory: {
    rss: number;
  };
  uptime: number;
  agent: string;
}

export interface AnalysisData {
  risk: {
    score: number;
    impactRadius: string;
    breakageProbability: number;
    complexity: number;
  };
  dependencies: Array<{ name: string; current: string; latest: string; status: string }>;
  memory: Array<{ key: string; value: string }>;
}

export const TABS = [
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  { id: 'dashboard', name: 'Health', icon: BarChart3 },
  { id: 'plan', name: 'Plan', icon: Workflow },
  { id: 'security', name: 'Security', icon: Lock },
  { id: 'memory', name: 'Memory', icon: History },
] as const;

export const PHASES = [
  { id: 1, name: 'Recon', icon: Search, status: 'complete' },
  { id: 2, name: 'Planning', icon: BrainCircuit, status: 'active' },
  { id: 3, name: 'Execution', icon: Code2, status: 'pending' },
  { id: 4, name: 'Validation', icon: CheckCircle2, status: 'pending' },
  { id: 5, name: 'Hygiene', icon: Shield, status: 'pending' },
] as const;
