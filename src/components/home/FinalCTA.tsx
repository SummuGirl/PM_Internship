import React from 'react';
import { AlertCircle, Globe2, Shield } from 'lucide-react';
import { ActivePage } from '../../types';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface FinalCTAProps {
  setActivePage: (page: ActivePage) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ setActivePage }) => {
  const { playClick } = useSoundEffects();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-center">
      {/* Background glow & rune accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101726]/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-sky-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
          <Shield className="w-3.5 h-3.5" />
          <span>PERPETUAL VIGIL ACTIVE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white uppercase tracking-wider leading-tight">
          THE REALMS ARE NEVER SILENT.
        </h2>

        <p className="text-xl sm:text-2xl font-display font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-sky-200">
          WHEN MIDGARD CALLS, THE VALKYRIES ANSWER.
        </p>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
          Whether facing urban structural fires, unexplained disappearances, or tears across the dimensional weave—our guardians stand ready at a moment’s notice.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => { playClick(); setActivePage('request'); }}
            className="w-full sm:w-auto px-8 py-4 rounded font-mono font-bold text-sm tracking-widest bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-400/50 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <AlertCircle className="w-5 h-5 animate-pulse" />
            <span>REQUEST HELP</span>
          </button>

          <button
            onClick={() => { playClick(); setActivePage('realms'); }}
            className="w-full sm:w-auto px-8 py-4 rounded font-mono font-semibold text-sm tracking-widest bg-[#111722] hover:bg-[#161F2E] text-slate-200 hover:text-white border border-white/20 hover:border-cyan-400/50 flex items-center justify-center gap-2 transition-all"
          >
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>EXPLORE THE REALMS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
