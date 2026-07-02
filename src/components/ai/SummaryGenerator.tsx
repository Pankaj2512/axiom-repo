'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface SummaryGeneratorProps {
  topicName: string;
}

export function SummaryGenerator({ topicName }: SummaryGeneratorProps) {
  const [rawNotes, setRawNotes] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: rawNotes, topicData: topicName })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSummary(data.summary);
      setIsExpanded(true);
    } catch (err) {
      alert("Failed to generate summary. Make sure GEMINI_API_KEY is set in .env.local");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-[var(--bg-secondary)]/50 backdrop-blur border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          AI Note Summarizer
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {!summary ? (
            <>
              <p className="text-sm text-gray-400">
                Paste your messy thoughts, raw code snippets, or quick notes below. The AI will structure it into a clean cheat sheet for {topicName}.
              </p>
              <textarea 
                value={rawNotes}
                onChange={(e) => setRawNotes(e.target.value)}
                placeholder="- O(n) time\n- use hashmap to store complement\n- edge case: what if duplicate numbers?"
                className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-[var(--accent-primary)] font-mono resize-none scrollbar-thin scrollbar-thumb-white/10"
              />
              <div className="flex justify-end">
                <Button onClick={handleGenerate} disabled={isLoading}>
                  {isLoading ? 'Generating...' : 'Generate Cheat Sheet'}
                </Button>
              </div>
            </>
          ) : (
            <div>
              <div className="prose prose-invert max-w-none p-4 rounded-xl bg-black/40 border border-white/5 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setSummary('')}>
                  Reset
                </Button>
                <Button>
                  <FileText className="w-4 h-4 mr-2" /> Save to Revision
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
