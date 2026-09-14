import React from 'react';
import { Shield, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';
import { ActivePage } from '../../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onReplayLoading?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onReplayLoading }) => {
  return (
    <footer className="w-full bg-[#050608] border-t border-white/10 pt-16 pb-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-cyan-500/10 border border-cyan-400/40 text-cyan-300">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-cinzel font-black tracking-[0.25em] text-xl text-white">
                VALKYRIE
              </span>
            </div>
            <p className="text-xs font-mono tracking-widest text-slate-300 uppercase">
              GUARDIANS OF MIDGARD
            </p>
            <blockquote className="border-l-2 border-cyan-500/50 pl-3 italic text-slate-300 font-display text-sm">
              “WHEN MORTALS CALL, THE VALKYRIES ANSWER.”
            </blockquote>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              A high-readiness emergency network connecting the districts of Midgard with guardians Freya and Brynhildr. Combining ancient seiðr foresight with impenetrable kinetic defense.
            </p>
            <div className="flex items-center gap-2 pt-2 text-emerald-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VALKYRIE NETWORK OPERATIONAL // ALL 9 SECTORS GREEN</span>
            </div>
          </div>

          {/* Rapid Links */}
          <div className="space-y-3">
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-semibold border-b border-white/10 pb-2">
              PORTAL OPERATIONS
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <button
                  onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Home Command
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('request'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-red-400 text-red-400/90 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Request Emergency Help</span>
                  <span className="text-[10px] bg-red-500/20 px-1 py-0.5 rounded border border-red-500/30">SOS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('track'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Track Response
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('missions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Active Missions
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Citizen Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Lore & Knowledge Links */}
          <div className="space-y-3">
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-semibold border-b border-white/10 pb-2">
              MYTH & PREPAREDNESS
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <button
                  onClick={() => { setActivePage('realms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Nine Realms Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('safety'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Midgard Safety Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('valkyries'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Freya — The Seer</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('valkyries'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-sky-300 transition-colors flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  <span>Brynhildr — The Shield</span>
                </button>
              </li>
              {onReplayLoading && (
                <li className="pt-2">
                  <button
                    onClick={onReplayLoading}
                    className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-200 border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 rounded"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replay Network Boot</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Fictional Disclaimer Alert */}
        <div className="border border-amber-500/20 bg-amber-500/5 rounded p-4 mb-8 text-xs text-amber-300/80 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 tracking-wider font-mono">
              IMPORTANT FICTIONAL PROJECT NOTICE:
            </span>
            <p className="mt-1 leading-relaxed text-slate-300">
              VALKYRIE is a fictional modern interpretation inspired by Norse mythology created for an internship selection project. It does not provide real-world emergency dispatch or replace municipal services. In a genuine real-world emergency, dial your local emergency services immediately.
            </p>
          </div>
        </div>

        {/* Copyright & Sub-bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            VALKYRIE © 2026 // FICTIONAL INTERACTIVE EXPERIENCE // MIDGARD SECTOR 01
          </div>
          <div className="flex items-center gap-4">
            <span>ENGINEERED FOR PRODUCTION-GRADE WEB STANDARDS</span>
            <span>•</span>
            <span className="text-cyan-400">ACCESSIBILITY COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
