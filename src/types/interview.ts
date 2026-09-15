export type InterviewCompany = 'Google' | 'Meta' | 'Amazon' | 'Microsoft' | 'Apple' | 'Uber' | 'Generic';
export type InterviewType = 'ALGORITHMS' | 'SYSTEM_DESIGN' | 'OBJECT_ORIENTED_DESIGN' | 'BEHAVIORAL';
export type InterviewDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type InterviewVerdict = 'STRONG_HIRE' | 'HIRE' | 'LEAN_HIRE' | 'LEAN_NO_HIRE' | 'NO_HIRE';
export type InterviewLanguage = 'python' | 'javascript' | 'typescript' | 'java' | 'cpp';

export interface InterviewTurn {
  id: string;
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp: string;
  isHint?: boolean;
}

export interface InterviewProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface InterviewProblem {
  id: string;
  title: string;
  description: string;
  examples: InterviewProblemExample[];
  constraints: string[];
  starterCode: Record<InterviewLanguage, string>;
  targetComplexity: {
    time: string;
    space: string;
  };
}

export interface InterviewRubrics {
  problemSolving: number; // 0 - 100
  codeQuality: number;    // 0 - 100
  communication: number;  // 0 - 100
  efficiency: number;     // 0 - 100
}

export interface InterviewEvaluation {
  verdict: InterviewVerdict;
  score: number; // 0 - 100
  rubrics: InterviewRubrics;
  summary: string;
  strengths: string[];
  areasToImprove: string[];
  optimalSolutionHints: string;
  evaluatedAt: string;
}

export interface InterviewSession {
  id: string;
  userId: string;
  company: InterviewCompany;
  type: InterviewType;
  difficulty: InterviewDifficulty;
  problem: InterviewProblem;
  language: InterviewLanguage;
  code: string;
  durationMinutes: number;
  secondsRemaining: number;
  status: 'CONFIGURING' | 'IN_PROGRESS' | 'EVALUATING' | 'COMPLETED';
  transcript: InterviewTurn[];
  hintsUsed: number;
  evaluation?: InterviewEvaluation;
  createdAt: string;
  completedAt?: string;
}
