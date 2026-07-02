'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Brain,
  ListChecks,
  FileText,
  Settings
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Syllabus', href: '/syllabus', icon: BookOpen },
  { label: 'Practice Log', href: '/practice', icon: Code2 },
  { label: 'Revision', href: '/revision', icon: Brain },
  { label: 'Custom Lists', href: '/lists', icon: ListChecks },
  { label: 'Notes', href: '/notes', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)] border-r border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col">
      {/* Logo Section */}
      <div className="h-[var(--header-height)] flex items-center px-6 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Axiom
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]')} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Section (Mock) */}
      <div className="p-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[var(--surface)] flex items-center justify-center text-xs font-medium text-[var(--text-secondary)] border border-[var(--border)]">
            PK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">Pankaj Kumar</p>
            <p className="text-xs text-[var(--text-muted)] truncate">Target: SDE 2</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
