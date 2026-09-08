'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  InterviewCompany, 
  InterviewDifficulty, 
  InterviewLanguage, 
  InterviewProblem, 
  InterviewSession, 
  InterviewTurn,
  InterviewType,
  InterviewEvaluation
} from '@/types/interview';
import { 
  saveInterviewSession, 
  getUserInterviewHistory 
} from '@/lib/interviewStorage';
import { InterviewEditor } from '@/components/interview/InterviewEditor';
import { InterviewChat } from '@/components/interview/InterviewChat';
import { InterviewScorecard } from '@/components/interview/InterviewScorecard';
import { 
  Bot, 
  Play, 
  Sparkles, 
  Clock, 
  History, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Code2, 
  ChevronRight,
  Layers
} from 'lucide-react';

const COMPANIES: { id: InterviewCompany; label: string; desc: string; color: string }[] = [
  { id: 'Google', label: 'Google', desc: 'Algorithmic rigor, graph traversals, and DP optimization.', color: 'from-blue-500/20 to-green-500/20' },
  { id: 'Meta', label: 'Meta', desc: 'Rapid 45-min coding agility, binary trees, and sliding window.', color: 'from-blue-600/20 to-indigo-600/20' },
  { id: 'Amazon', label: 'Amazon', desc: 'Practical data structures, OOD, and customer obsession.', color: 'from-amber-500/20 to-orange-500/20' },
  { id: 'Microsoft', label: 'Microsoft', desc: 'Clean object models, string processing, and fundamentals.', color: 'from-teal-500/20 to-blue-500/20' },
  { id: 'Apple', label: 'Apple', desc: 'Memory efficiency, elegant architecture, and clean code.', color: 'from-gray-500/20 to-slate-500/20' },
  { id: 'Uber', label: 'Uber', desc: 'Distributed thinking, intervals, and concurrency.', color: 'from-purple-500/20 to-pink-500/20' }
];

export default function MockInterviewPage() {
  const { user } = useAuth();
  
  // Navigation / Phase
  const [phase, setPhase] = React.useState<'SETUP' | 'ACTIVE' | 'EVALUATION'>('SETUP');
  const [history, setHistory] = React.useState<InterviewSession[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = React.useState(true);

  // Setup Wizard State
  const [company, setCompany] = React.useState<InterviewCompany>('Google');
  const [difficulty, setDifficulty] = React.useState<InterviewDifficulty>('MEDIUM');
  const [roundType, setRoundType] = React.useState<InterviewType>('ALGORITHMS');
  const [duration, setDuration] = React.useState<number>(45); // minutes
  const [language, setLanguage] = React.useState<InterviewLanguage>('python');
  const [isStarting, setIsStarting] = React.useState(false);

  // Active Session State
  const [currentSession, setCurrentSession] = React.useState<InterviewSession | null>(null);
  const [code, setCode] = React.useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = React.useState<number>(45 * 60);
  const [transcript, setTranscript] = React.useState<InterviewTurn[]>([]);
  const [isSendingChat, setIsSendingChat] = React.useState(false);
  const [isEvaluating, setIsEvaluating] = React.useState(false);
  const [activeLeftTab, setActiveLeftTab] = React.useState<'problem' | 'chat'>('chat');

  // Load Past Interview History
  React.useEffect(() => {
    async function loadHistory() {
      if (!user) {
        setIsLoadingHistory(false);
        return;
      }
      try {
        const list = await getUserInterviewHistory(user.uid);
        setHistory(list);
      } catch (err) {
        console.warn("Could not load history:", err);
      } finally {
        setIsLoadingHistory(false);
      }
    }
    loadHistory();
  }, [user]);

  // Active Interview Countdown Timer
  React.useEffect(() => {
    if (phase !== 'ACTIVE' || isEvaluating) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishAndEvaluate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, isEvaluating]);

  // Start Interview Action
  const handleStartInterview = async () => {
    setIsStarting(true);
    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'START',
          company,
          difficulty,
          type: roundType
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const problem: InterviewProblem = data.problem;
      const initialCode = problem.starterCode[language] || '';

      const firstTurn: InterviewTurn = {
        id: 'turn-0',
        role: 'interviewer',
        content: data.greeting,
        timestamp: new Date().toISOString()
      };

      const session: InterviewSession = {
        id: `int-${Date.now()}`,
        userId: user?.uid || 'guest',
        company,
        type: roundType,
        difficulty,
        problem,
        language,
        code: initialCode,
        durationMinutes: duration,
        secondsRemaining: duration * 60,
        status: 'IN_PROGRESS',
        transcript: [firstTurn],
        hintsUsed: 0,
        createdAt: new Date().toISOString()
      };

      setCurrentSession(session);
      setCode(initialCode);
      setTranscript([firstTurn]);
      setSecondsRemaining(duration * 60);
      setPhase('ACTIVE');

      await saveInterviewSession(session);
    } catch (err: any) {
      alert(`Could not start interview: ${err.message || 'Server error'}`);
    } finally {
      setIsStarting(false);
    }
  };

  // Send Message in Active Interview
  const handleSendMessage = async (userMsg: string, isHint: boolean) => {
    if (!currentSession) return;
    setIsSendingChat(true);

    const userTurn: InterviewTurn = {
      id: `turn-${Date.now()}`,
      role: 'candidate',
      content: userMsg,
      timestamp: new Date().toISOString(),
      isHint
    };

    const newTranscript = [...transcript, userTurn];
    setTranscript(newTranscript);
    const newHintsUsed = isHint ? currentSession.hintsUsed + 1 : currentSession.hintsUsed;

    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'MESSAGE',
          company: currentSession.company,
          problem: currentSession.problem,
          transcript: newTranscript,
          code,
          isHintRequest: isHint,
          userMessage: userMsg
        })
      });

      const data = await res.json();
      const reply = data.reply || "Understood. Please proceed with your implementation.";

      const aiTurn: InterviewTurn = {
        id: `turn-${Date.now() + 1}`,
        role: 'interviewer',
        content: reply,
        timestamp: new Date().toISOString(),
        isHint
      };

      const updatedTranscript = [...newTranscript, aiTurn];
      setTranscript(updatedTranscript);

      const updatedSession: InterviewSession = {
        ...currentSession,
        code,
        transcript: updatedTranscript,
        hintsUsed: newHintsUsed,
        secondsRemaining
      };

      setCurrentSession(updatedSession);
      await saveInterviewSession(updatedSession);
    } catch (err) {
      console.warn("Failed to get reply:", err);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Submit and Evaluate Session
  const handleFinishAndEvaluate = async () => {
    if (!currentSession || isEvaluating) return;
    setIsEvaluating(true);

    try {
      const totalSeconds = currentSession.durationMinutes * 60;
      const secondsTaken = Math.max(60, totalSeconds - secondsRemaining);

      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'EVALUATE',
          company: currentSession.company,
          problem: currentSession.problem,
          transcript,
          code,
          language,
          hintsUsed: currentSession.hintsUsed,
          secondsTaken
        })
      });

      const data = await res.json();
      const evaluation: InterviewEvaluation = data.evaluation;

      const completedSession: InterviewSession = {
        ...currentSession,
        code,
        transcript,
        status: 'COMPLETED',
        evaluation,
        completedAt: new Date().toISOString()
      };

      setCurrentSession(completedSession);
      setPhase('EVALUATION');

      await saveInterviewSession(completedSession);
      setHistory(prev => [completedSession, ...prev.filter(p => p.id !== completedSession.id)]);
    } catch (err: any) {
      alert(`Evaluation error: ${err.message || 'Check connection'}`);
    } finally {
      setIsEvaluating(false);
    }
  };

  // View Past Session Scorecard
  const handleViewPastScorecard = (session: InterviewSession) => {
    setCurrentSession(session);
    setPhase('EVALUATION');
  };

  // =========================================================================
  // VIEW: EVALUATION SCORECARD
  // =========================================================================
  if (phase === 'EVALUATION' && currentSession?.evaluation) {
    return (
      <InterviewScorecard
        evaluation={currentSession.evaluation}
        session={currentSession}
        onRestart={() => {
          setCurrentSession(null);
          setPhase('SETUP');
        }}
      />
    );
  }

  // =========================================================================
  // VIEW: ACTIVE INTERVIEW ARENA
  // =========================================================================
  if (phase === 'ACTIVE' && currentSession) {
    return (
      <div className="h-[calc(100vh-6rem)] flex flex-col gap-3 max-w-[1600px] mx-auto w-full pb-2 animate-in fade-in duration-300">
        {/* Arena Subheader */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/40 rounded-xl border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[var(--accent-primary)]" />
              {currentSession.company} Interview Round
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-300 font-medium">{currentSession.problem.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setActiveLeftTab('chat')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeLeftTab === 'chat' ? 'bg-[var(--accent-primary)] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Interviewer Chat
              </button>
              <button
                onClick={() => setActiveLeftTab('problem')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeLeftTab === 'problem' ? 'bg-[var(--accent-primary)] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Problem Details
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm("End this interview session early? You will receive evaluation on your current code.")) {
                  handleFinishAndEvaluate();
                }
              }}
              className="text-xs h-7 border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              End Round
            </Button>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0">
          {/* Left Column: Chat or Problem Info */}
          <div className="lg:col-span-5 flex flex-col min-h-0">
            {activeLeftTab === 'chat' ? (
              <InterviewChat
                company={currentSession.company}
                transcript={transcript}
                onSendMessage={handleSendMessage}
                isSending={isSendingChat}
                hintsUsed={currentSession.hintsUsed}
                onFinishAndEvaluate={handleFinishAndEvaluate}
                problemTitle={currentSession.problem.title}
              />
            ) : (
              <Card className="flex-1 p-5 overflow-y-auto bg-[#12141a] border-white/10 space-y-4 text-xs scrollbar-thin scrollbar-thumb-white/10">
                <div>
                  <Badge variant="default" className="mb-2">
                    {currentSession.difficulty}
                  </Badge>
                  <h2 className="text-xl font-bold text-white mb-2">{currentSession.problem.title}</h2>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {currentSession.problem.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-gray-200">Examples</h3>
                  {currentSession.problem.examples.map((ex, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 font-mono">
                      <div><strong className="text-gray-400">Input:</strong> {ex.input}</div>
                      <div><strong className="text-emerald-400">Output:</strong> {ex.output}</div>
                      {ex.explanation && (
                        <div className="text-gray-500 text-[11px]">Note: {ex.explanation}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-gray-200">Constraints</h3>
                  <ul className="list-disc pl-4 space-y-0.5 text-gray-400 font-mono">
                    {currentSession.problem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Code Editor & Runner */}
          <div className="lg:col-span-7 flex flex-col min-h-0">
            <InterviewEditor
              code={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              starterCode={currentSession.problem.starterCode}
              secondsRemaining={secondsRemaining}
              isEvaluating={isEvaluating}
              examples={currentSession.problem.examples}
            />
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: SETUP & DASHBOARD
  // =========================================================================
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 animate-fade-in">
      {/* Header Banner */}
      <div className="relative rounded-2xl p-8 overflow-hidden bg-gradient-to-r from-indigo-900/50 via-purple-900/30 to-black/60 border border-indigo-500/20 shadow-2xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[var(--accent-primary)]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            AI Bar-Raiser Simulation
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            FAANG Mock Interview Arena
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Practice real 45-minute technical coding and design interviews with conversational AI bar-raisers tailored to Google, Meta, Amazon, Apple, Microsoft, and Uber interview bars.
          </p>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Setup Wizard Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-[var(--bg-secondary)]/60 border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-[var(--accent-primary)]" />
              1. Select Target Company
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPANIES.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setCompany(c.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    company === c.id
                      ? 'bg-gradient-to-br ' + c.color + ' border-[var(--accent-primary)] shadow-md'
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">{c.label}</span>
                    {company === c.id && <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" />}
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Difficulty & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/5">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">2. Difficulty</label>
                <div className="flex gap-1.5">
                  {(['EASY', 'MEDIUM', 'HARD'] as InterviewDifficulty[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        difficulty === d ? 'bg-[var(--accent-primary)] text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">3. Preferred Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as InterviewLanguage)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--accent-primary)] cursor-pointer"
                >
                  <option value="python" className="bg-[#1a1d24]">Python</option>
                  <option value="javascript" className="bg-[#1a1d24]">JavaScript</option>
                  <option value="typescript" className="bg-[#1a1d24]">TypeScript</option>
                  <option value="java" className="bg-[#1a1d24]">Java</option>
                  <option value="cpp" className="bg-[#1a1d24]">C++</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">4. Round Duration</label>
                <div className="flex gap-1.5">
                  {[30, 45].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDuration(mins)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        duration === mins ? 'bg-purple-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Simulates real {company} coding environment with timer & evaluation.
              </span>
              <Button
                onClick={handleStartInterview}
                isLoading={isStarting}
                className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 px-6"
              >
                <Play className="w-4 h-4 fill-current" />
                {isStarting ? 'Preparing Interview Room...' : `Start ${company} Interview`}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: History & Tips */}
        <div className="space-y-6">
          {/* Past Sessions */}
          <Card className="p-6 bg-[var(--bg-secondary)]/60 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-purple-400" />
              Past Interview Sessions
            </h3>

            {isLoadingHistory ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-gray-500 space-y-1">
                <Award className="w-8 h-8 mx-auto opacity-40 mb-2" />
                <p className="text-xs font-medium">No past interview sessions yet</p>
                <p className="text-[11px] text-gray-600">Start your first round to get official rubric evaluations.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                {history.map((sess) => (
                  <div
                    key={sess.id}
                    onClick={() => sess.evaluation && handleViewPastScorecard(sess)}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white group-hover:text-[var(--accent-primary)] transition-colors">
                        {sess.company} • {sess.problem.title}
                      </span>
                      {sess.evaluation && (
                        <span className="font-mono font-bold text-emerald-400">
                          {sess.evaluation.score}/100
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>{sess.difficulty} • {sess.language}</span>
                      <span>{new Date(sess.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Bar Raiser Rules */}
          <Card className="p-5 bg-indigo-950/20 border-indigo-500/20 text-xs text-indigo-200/80 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Bar-Raiser Interview Protocol
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>• Always articulate your brute force idea before jumping to code.</li>
              <li>• Explicitly state Time and Space complexity.</li>
              <li>• Ask for hints if stuck for &gt;5 minutes — hints reduce points moderately, but staying silent hurts communication.</li>
              <li>• Run through sample test cases dry before submitting.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
