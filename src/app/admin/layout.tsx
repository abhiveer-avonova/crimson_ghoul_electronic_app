import React from 'react';
import { AdminNav } from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Admin Control Terminal | Crimson Ghoul',
  description: 'Operations, hardware catalog, inventory thresholds, and order fulfillment.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header Bar */}
        <div className="mb-8 p-6 rounded-2xl border border-cyan-900/40 bg-slate-900/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400 font-mono font-bold shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              CG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white font-mono tracking-tight">
                  ADMIN COMMAND TERMINAL
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  ROOT
                </span>
              </div>
              <p className="text-xs text-slate-400">Hardware Catalog, Inventory Reserves & Real-Time Fulfillment</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Telemetry Online</span>
          </div>
        </div>

        {/* Admin Shell Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <AdminNav />
          </aside>

          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}

