'use client';

import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { MentorChat } from './MentorChat';

interface ModuleMentorWidgetProps {
  contextTopic: string;
}

export function ModuleMentorWidget({ contextTopic }: ModuleMentorWidgetProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[400px] origin-bottom-right animate-in zoom-in-95 duration-200">
          <MentorChat
            contextTopic={contextTopic}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close mentor chat" : "Open mentor chat"}
        aria-expanded={isOpen}
        className="w-14 h-14 bg-[var(--accent-primary)] rounded-full shadow-lg shadow-[var(--accent-primary)]/20 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-primary)]"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
