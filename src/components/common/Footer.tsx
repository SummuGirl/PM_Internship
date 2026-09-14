import React from 'react';
import { Shield, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';
import { ActivePage } from '../../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onReplayLoading?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onReplayLoading }) => {
  return (
    <footer className="w-full bg-white border-t border-gold-200/80 pt-16 pb-12 text-charcoal-600 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gold-50 border border-gold-300 text-gold-600">
                <Sparkles className="w-5 h-5 text-gold-600" />
              </div>
              <span className="font-cinzel font-black tracking-[0.25em] text-2xl text-charcoal-950">
                VALKYRIE
              </span>
            </div>
            <p className="text-xs font-mono tracking-widest text-gold-800 uppercase font-bold">
              GUARDIANS OF MIDGARD
            </p>
            <blockquote className="border-l-2 border-gold-400 pl-3 italic text-charcoal-700 font-cinzel text-sm">
              “When mortals call, the Valkyries answer.”
            </blockquote>
            <p className="text-xs text-charcoal-600 max-w-md leading-relaxed font-sans">
              A high-readiness emergency network connecting the mortals of Midgard with their mythological protectors. Combining ancient seiðr foresight with impenetrable kinetic defense.
            </p>
            <div className="flex items-center gap-2 pt-2 text-emerald-700 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>VALKYRIE NETWORK OPERATIONAL // ALL SECTORS GREEN</span>
            </div>
          </div>

          {/* Rapid Links */}
          <div className="space-y-3 font-mono">
            <h4 className="text-charcoal-900 text-xs uppercase tracking-widest font-bold border-b border-gold-200 pb-2">
              PORTAL OPERATIONS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-gold-700 transition-colors cursor-pointer"
                >
                  Home Command
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('request'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-charcoal-950 text-gold-800 font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Help (Chatbot)</span>
                  <span className="text-[10px] bg-gold-100 px-1 py-0.5 rounded border border-gold-300">LIVE</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('track'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-gold-700 transition-colors cursor-pointer"
                >
                  Track Response
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('missions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-gold-700 transition-colors cursor-pointer"
                >
                  Active Missions
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-gold-700 transition-colors cursor-pointer"
                >
                  Citizen Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Lore & Knowledge Links */}
          <div className="space-y-3 font-mono">
            <h4 className="text-charcoal-900 text-xs uppercase tracking-widest font-bold border-b border-gold-200 pb-2">
              MYTH & PREPAREDNESS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActivePage('realms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-gold-700 transition-colors cursor-pointer"
                >
                  Nine Realms Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('safety'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-gold-700 transition-colors cursor-pointer"
                >
                  Midgard Safety Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('valkyries'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-gold-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                  <span>Freya — The Seer</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('valkyries'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-gold-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-charcoal-700" />
                  <span>Brynhildr — The Shield</span>
                </button>
              </li>
              {onReplayLoading && (
                <li className="pt-2">
                  <button
                    onClick={onReplayLoading}
                    className="inline-flex items-center gap-1.5 text-[11px] text-charcoal-600 hover:text-charcoal-900 border border-gold-200 bg-gold-50 px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replay Network Boot</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Required Emergency Disclaimer Alert */}
        <div className="border border-gold-300 bg-gold-50/70 rounded-2xl p-4 sm:p-5 mb-8 text-xs text-charcoal-800 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-gold-900 tracking-wider font-mono uppercase">
              EMERGENCY DISCLAIMER:
            </span>
            <p className="leading-relaxed font-sans text-charcoal-700">
              VALKYRIE is a fictional superhero demonstration and does not provide real emergency response services. In an actual real-world emergency, please contact your local municipal emergency authorities immediately.
            </p>
          </div>
        </div>

        {/* Copyright & Sub-bar */}
        <div className="border-t border-gold-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-charcoal-500">
          <div>
            VALKYRIE © 2026 // FICTIONAL INTERACTIVE SUPERHERO DEMONSTRATION // MIDGARD SECTOR 01
          </div>
          <div className="flex items-center gap-4">
            <span>DESIGNED FOR INTERNSHIP SELECTION TASK</span>
            <span>•</span>
            <span className="text-gold-800 font-semibold">GOLD + WHITE + PREMIUM EDITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
