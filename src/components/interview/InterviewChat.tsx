'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InterviewCompany, InterviewTurn } from '@/types/interview';
import { 
  Bot, 
  User, 
  Send, 
  Lightbulb, 
  CheckCircle, 
  Sparkles, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface InterviewChatProps {
  company: InterviewCompany;
  transcript: InterviewTurn[];
  onSendMessage: (msg: string, isHint: boolean) => Promise<void>;
  isSending: boolean;
  hintsUsed: number;
  onFinishAndEvaluate: () => void;
  problemTitle: string;
}

export function InterviewChat({
  company,
  transcript,
  onSendMessage,
  isSending,
  hintsUsed,
  onFinishAndEvaluate,
  problemTitle
}: InterviewChatProps) {
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [transcript]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isSending) return;
    const msg = input.trim();
    setInput('');
    await onSendMessage(msg, false);
  };

  const handleRequestHint = async () => {
    if (isSending) return;
    await onSendMessage("Could you give me a small hint or nudge in the right direction?", true);
  };

  return (
    <div className="flex flex-col h-full bg-[#12141a] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white leading-none">{company} Bar Raiser</span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">Live Mock Dialogue</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning" className="text-[10px] py-0 px-2 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-yellow-400" />
            <span>{hintsUsed} hint{hintsUsed === 1 ? '' : 's'}</span>
          </Badge>
          <Button
            size="sm"
            onClick={onFinishAndEvaluate}
            className="text-xs h-7 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white gap-1 shadow-sm"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Submit</span>
          </Button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
        {transcript.map((msg) => {
          const isInterviewer = msg.role === 'interviewer';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[92%] ${isInterviewer ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse'}`}
            >
              <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs mt-0.5 ${
                isInterviewer ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30' : 'bg-white/10 text-gray-300'
              }`}>
                {isInterviewer ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                isInterviewer
                  ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
                  : 'bg-[var(--accent-primary)] text-white rounded-tr-sm shadow-md'
              }`}>
                {msg.isHint && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-400 uppercase tracking-wider mb-1">
                    <Lightbulb className="w-3 h-3" /> Clue & Guidance
                  </div>
                )}
                <div className="prose prose-invert prose-xs max-w-none text-xs">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="p-3 bg-black/40 border-t border-white/10 space-y-2">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
            placeholder="Explain approach, ask questions, or verify constraints..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-primary)]"
          />
          <Button
            type="submit"
            size="sm"
            disabled={isSending || !input.trim()}
            className="h-8 px-3 text-xs"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <span>Explain your thoughts out loud for higher communication score</span>
          <button
            type="button"
            onClick={handleRequestHint}
            disabled={isSending}
            className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors font-medium"
          >
            <Lightbulb className="w-3 h-3" /> Need a hint?
          </button>
        </div>
      </div>
    </div>
  );
}
