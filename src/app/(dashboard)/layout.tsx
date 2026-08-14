import * as React from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--bg-primary)] flex">
        <Sidebar />
        <main className="flex-1 ml-[var(--sidebar-width)] overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
