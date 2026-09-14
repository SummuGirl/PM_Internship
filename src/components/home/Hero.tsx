import React from 'react';
import { AlertCircle, Shield, Sparkles, ChevronRight, Eye, Compass, Flame, HeartHandshake } from 'lucide-react';
import { ActivePage } from '../../types';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface HeroProps {
  setActivePage: (page: ActivePage) => void;
  onOpenChatbot?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActivePage, onOpenChatbot }) => {
  const { playClick } = useSoundEffects();

  const handleRequestHelp = () => {
    playClick();
    if (onOpenChatbot) {
      onOpenChatbot();
    } else {
      setActivePage('request');
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-200/80 bg-gradient-to-b from-white via-ivory-50 to-ivory-100">
      {/* Background Decorative Gold Lines & Rune Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern with gold tint */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.04)_1px,transparent_1px)] bg-[size:54px_54px]" />

        {/* Soft atmospheric champagne gradients */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-gradient-to-b from-gold-100/70 via-champagne-100/40 to-transparent rounded-full blur-[90px]" />
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-gold-200/25 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-champagne-300/30 rounded-full blur-[100px]" />

        {/* Geometric Norse lines */}
        <svg className="absolute top-12 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-15 stroke-gold-500" fill="none" viewBox="0 0 1200 600">
          <circle cx="600" cy="300" r="280" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="600" cy="300" r="180" strokeWidth="1.5" />
          <line x1="100" y1="300" x2="1100" y2="300" strokeWidth="0.8" />
          <line x1="600" y1="20" x2="600" y2="580" strokeWidth="0.8" />
          <polygon points="600,120 750,380 450,380" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* System Status Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 text-[11px] sm:text-xs font-mono">
          <div className="flex items-center gap-2 bg-white/90 border border-gold-300/80 px-4 py-1.5 rounded-full text-charcoal-800 shadow-sm backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold tracking-wider">MIDGARD NETWORK OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 border border-gold-300/80 px-3.5 py-1.5 rounded-full text-gold-900 shadow-sm backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>FREYA ONLINE</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 border border-gold-300/80 px-3.5 py-1.5 rounded-full text-charcoal-800 shadow-sm backdrop-blur">
            <Shield className="w-3.5 h-3.5 text-charcoal-700" />
            <span>BRYNHILDR STANDING BY</span>
          </div>
        </div>

        {/* Central Headlines */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold-400/50 bg-gold-50 text-gold-900 font-mono text-xs uppercase tracking-[0.25em] shadow-sm">
            <span>✦</span>
            <span>HIGH-READINESS SUPERHERO NETWORK</span>
            <span>✦</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-cinzel tracking-wider text-charcoal-950 uppercase leading-[1.05]">
            VALKYRIE
          </h1>

          <div className="text-lg sm:text-2xl font-cinzel font-semibold tracking-[0.25em] text-gold-700">
            GUARDIANS OF MIDGARD
          </div>

          <p className="text-xl sm:text-2xl font-cinzel font-medium italic tracking-wide text-charcoal-800 max-w-2xl mx-auto">
            “When mortals call, the Valkyries answer.”
          </p>

          <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto font-sans leading-relaxed">
            An elite emergency response system uniting two mythological guardians. <strong className="text-charcoal-900">Freya</strong> perceives unseen danger through seiðr foresight, while <strong className="text-charcoal-900">Brynhildr</strong> breaks through kinetic threats with impenetrable defense.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRequestHelp}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono font-bold text-sm tracking-widest bg-charcoal-900 hover:bg-charcoal-800 text-gold-300 shadow-[0_10px_30px_rgba(20,23,31,0.25)] border-2 border-gold-400 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <AlertCircle className="w-5 h-5 text-gold-400 animate-pulse" />
              <span>REQUEST HELP</span>
            </button>

            <button
              onClick={() => { playClick(); setActivePage('valkyries'); }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono font-semibold text-sm tracking-widest bg-white hover:bg-gold-50 text-charcoal-900 hover:text-charcoal-950 border border-gold-300 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Shield className="w-4 h-4 text-gold-600" />
              <span>MEET THE VALKYRIES</span>
              <ChevronRight className="w-4 h-4 text-charcoal-400" />
            </button>
          </div>
        </div>

        {/* Dual Valkyrie Guardian Hero Cards with Golden Sigil */}
        <div className="mt-16 max-w-5xl mx-auto relative">
          {/* Subtle Glowing Golden Valkyrie Central Symbol */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center text-gold-600 animate-gold-glow">
              <Sparkles className="w-7 h-7 text-gold-500" />
            </div>
            <span className="mt-1 text-[10px] font-mono font-bold text-gold-800 tracking-widest uppercase bg-white/95 px-2.5 py-0.5 rounded-full border border-gold-300 shadow-sm">
              VALKYRIE NEXUS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FREYA GUARDIAN CARD */}
            <div
              onClick={() => { playClick(); setActivePage('valkyries'); }}
              className="group cursor-pointer relative bg-white/90 hover:bg-white border-2 border-gold-300/80 hover:border-gold-500 rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(212,175,55,0.18)] overflow-hidden norse-gold-corners"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-gold-100/60 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-700 uppercase font-bold">
                    GUARDIAN 01 // INTELLIGENCE & GUIDANCE
                  </span>
                  <h3 className="text-3xl font-black font-cinzel text-charcoal-950 mt-1 group-hover:text-gold-700 transition-colors">
                    FREYA
                  </h3>
                  <div className="text-xs font-mono text-gold-600 tracking-wider">
                    THE SEER • SEIÐR FORESIGHT
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-600 group-hover:scale-110 transition-transform shadow-sm">
                  <Sparkles className="w-6 h-6 text-gold-500" />
                </div>
              </div>

              <blockquote className="mt-4 border-l-2 border-gold-400 pl-3 italic text-charcoal-700 text-sm font-sans">
                “Freya sees the danger.”
              </blockquote>

              <p className="mt-2 text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
                Master of seiðr divination and compassionate civilian protection. She deciphers the threads of fate to trace missing persons, anticipate crises before they peak, and illuminate safe escape corridors.
              </p>

              {/* Powers Pill Badges */}
              <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded bg-gold-50 border border-gold-200 text-gold-900">
                  Fate Perception
                </span>
                <span className="px-2.5 py-1 rounded bg-gold-50 border border-gold-200 text-gold-900">
                  Civilian Guidance
                </span>
                <span className="px-2.5 py-1 rounded bg-gold-50 border border-gold-200 text-gold-900">
                  Brísingamen Shield
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-100 flex items-center justify-between text-xs font-mono text-gold-700 font-semibold group-hover:text-gold-900">
                <span>EXPLORE FREYA'S ARCHIVE</span>
                <Eye className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* BRYNHILDR GUARDIAN CARD */}
            <div
              onClick={() => { playClick(); setActivePage('valkyries'); }}
              className="group cursor-pointer relative bg-white/90 hover:bg-white border-2 border-gold-300/80 hover:border-gold-500 rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(212,175,55,0.18)] overflow-hidden norse-gold-corners"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-champagne-200/50 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-700 uppercase font-bold">
                    GUARDIAN 02 // PHYSICAL DEFENSE & RESCUE
                  </span>
                  <h3 className="text-3xl font-black font-cinzel text-charcoal-950 mt-1 group-hover:text-gold-700 transition-colors">
                    BRYNHILDR
                  </h3>
                  <div className="text-xs font-mono text-gold-600 tracking-wider">
                    THE SHIELD • COMBAT DEFENDER
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center text-charcoal-800 group-hover:scale-110 transition-transform shadow-sm">
                  <Shield className="w-6 h-6 text-charcoal-800" />
                </div>
              </div>

              <blockquote className="mt-4 border-l-2 border-gold-400 pl-3 italic text-charcoal-700 text-sm font-sans">
                “Brynhildr faces the danger.”
              </blockquote>

              <p className="mt-2 text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
                The vanguard warrior equipped with Svalinn thermal shielding and kinetic breaching lances. Fearless and disciplined, she charges into active fires, collapsed structures, and violent threats to extract endangered civilians.
              </p>

              {/* Powers Pill Badges */}
              <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded bg-gold-50 border border-gold-200 text-charcoal-800">
                  Combat Mastery
                </span>
                <span className="px-2.5 py-1 rounded bg-gold-50 border border-gold-200 text-charcoal-800">
                  Thermal Svalinn Aegis
                </span>
                <span className="px-2.5 py-1 rounded bg-gold-50 border border-gold-200 text-charcoal-800">
                  Tactical Extraction
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-100 flex items-center justify-between text-xs font-mono text-gold-700 font-semibold group-hover:text-gold-900">
                <span>VIEW TACTICAL COMMAND</span>
                <Compass className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
