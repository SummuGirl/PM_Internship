import React from 'react';
import { AlertCircle, Shield, Sparkles, Compass, Eye, ChevronRight } from 'lucide-react';
import { ActivePage } from '../../types';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface HeroProps {
  setActivePage: (page: ActivePage) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActivePage }) => {
  const { playClick } = useSoundEffects();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      {/* Background Ambience & Atmospheric Fog */}
      <div className="absolute inset-0 bg-[#08090D] pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-hero-grid bg-[size:48px_48px] opacity-15" />
        
        {/* Freya celestial gold/rose glow (left) */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-[100px]" />
        
        {/* Brynhildr tactical steel/crimson glow (right) */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-bl from-sky-500/15 via-red-500/10 to-transparent rounded-full blur-[100px]" />

        {/* Midgard skyline silhouette baseline */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0D1118] via-transparent to-transparent opacity-90" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* System Status Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-[11px] sm:text-xs font-mono">
          <div className="flex items-center gap-2 bg-[#111722]/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-emerald-400 backdrop-blur shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MIDGARD NETWORK OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-2 bg-[#111722]/80 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-300 backdrop-blur shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>FREYA AVAILABLE</span>
          </div>
          <div className="flex items-center gap-2 bg-[#111722]/80 border border-sky-500/30 px-3.5 py-1.5 rounded-full text-sky-300 backdrop-blur shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>BRYNHILDR AVAILABLE</span>
          </div>
        </div>

        {/* Central Headlines */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-block px-4 py-1 rounded border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 font-mono text-xs uppercase tracking-[0.3em]">
            // REALM INTERFACE DIRECTORY 2026
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-cinzel tracking-wider text-white uppercase leading-[1.1]">
            VALKYRIE
          </h1>

          <div className="text-lg sm:text-2xl font-cinzel font-semibold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-slate-100 to-sky-300">
            GUARDIANS OF MIDGARD
          </div>

          <p className="text-base sm:text-xl font-display font-medium tracking-wide text-slate-200 max-w-2xl mx-auto leading-relaxed">
            “WHEN MORTALS CALL, THE VALKYRIES ANSWER.”
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
            A high-technology fictional emergency response network connecting the citizens of Midgard with their mythological guardians. Dual response capabilities for everyday crises and supernatural realm bleeds.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => { playClick(); setActivePage('request'); }}
              className="w-full sm:w-auto px-8 py-4 rounded font-mono font-bold text-sm tracking-widest bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-400/50 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <span>REQUEST EMERGENCY HELP</span>
            </button>

            <button
              onClick={() => { playClick(); setActivePage('valkyries'); }}
              className="w-full sm:w-auto px-8 py-4 rounded font-mono font-semibold text-sm tracking-widest bg-[#111722]/90 hover:bg-[#161F2E] text-slate-200 hover:text-white border border-white/20 hover:border-cyan-400/50 flex items-center justify-center gap-2 transition-all"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>MEET THE VALKYRIES</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Dual Guardian Cinematic Visual Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* FREYA CARD */}
          <div
            onClick={() => { playClick(); setActivePage('valkyries'); }}
            className="group cursor-pointer relative bg-gradient-to-br from-[#121622] to-[#0A0D14] border border-amber-500/30 hover:border-amber-400/60 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_35px_rgba(229,181,88,0.25)] overflow-hidden"
          >
            {/* Top gold ambient shimmer */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                  GUARDIAN SPEC 01 // INTELLIGENCE & GUIDANCE
                </span>
                <h3 className="text-2xl font-black font-cinzel text-white mt-1 group-hover:text-amber-300 transition-colors">
                  FREYA
                </h3>
                <div className="text-xs font-mono text-amber-300/80 tracking-widest">
                  THE SEER • SEIÐR FORESIGHT
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-200">Freya sees the danger.</strong> Synthesizes prophetic seiðr perception with Midgard telemetry, predicting threats, tracing missing persons, and charting paths to safety.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px] font-mono border-t border-white/10 pt-4">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-amber-400 font-bold">92%</div>
                <div className="text-[9px] text-slate-400">FORESIGHT</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-amber-400 font-bold">96%</div>
                <div className="text-[9px] text-slate-400">GUIDANCE</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-amber-400 font-bold">89%</div>
                <div className="text-[9px] text-slate-400">AEGIS</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:text-amber-300 pt-1">
              <span>EXPLORE THREADS OF FATE</span>
              <Eye className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* BRYNHILDR CARD */}
          <div
            onClick={() => { playClick(); setActivePage('valkyries'); }}
            className="group cursor-pointer relative bg-gradient-to-br from-[#101726] to-[#0A0D14] border border-sky-500/30 hover:border-sky-400/60 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] overflow-hidden"
          >
            {/* Top steel-blue ambient shimmer */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/20 transition-all" />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
                  GUARDIAN SPEC 02 // TACTICAL DEFENSE & RESCUE
                </span>
                <h3 className="text-2xl font-black font-cinzel text-white mt-1 group-hover:text-sky-300 transition-colors">
                  BRYNHILDR
                </h3>
                <div className="text-xs font-mono text-sky-300/80 tracking-widest">
                  THE SHIELD-MAIDEN • IMPENETRABLE DEFENSE
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/40 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-300 leading-relaxed">
              <strong className="text-sky-200">Brynhildr faces the danger.</strong> Built for heavy physical containment, active fire breaching, hostage defense, and high-risk extraction in extreme hazard zones.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px] font-mono border-t border-white/10 pt-4">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-sky-400 font-bold">97%</div>
                <div className="text-[9px] text-slate-400">COMBAT</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-sky-400 font-bold">95%</div>
                <div className="text-[9px] text-slate-400">DEFENSE</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-sky-400 font-bold">94%</div>
                <div className="text-[9px] text-slate-400">RESCUE</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-sky-400 group-hover:text-sky-300 pt-1">
              <span>ACCESS TACTICAL COMMAND</span>
              <Compass className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
