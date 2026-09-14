import React, { useState } from 'react';
import { 
  Flame, 
  Waves, 
  Activity, 
  Car, 
  Search, 
  ShieldAlert, 
  Sparkles, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { SAFETY_GUIDES } from '../../data/safety';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const SafetyAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('fire');
  const { playClick } = useSoundEffects();

  const getIcon = (id: string) => {
    switch (id) {
      case 'fire': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'flood': return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'earthquake': return <Activity className="w-5 h-5 text-yellow-400" />;
      case 'accident': return <Car className="w-5 h-5 text-amber-400" />;
      case 'missing': return <Search className="w-5 h-5 text-amber-300" />;
      case 'threat': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'unknown': return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <Briefcase className="w-5 h-5 text-emerald-400" />;
    }
  };

  const toggleGuide = (id: string) => {
    playClick();
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {SAFETY_GUIDES.map(guide => {
        const isOpen = openId === guide.id;

        return (
          <div
            key={guide.id}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-[#111722] border-cyan-400/40 shadow-[0_0_25px_rgba(56,189,248,0.15)]'
                : 'bg-[#0D1118] border-white/10 hover:border-white/20'
            }`}
          >
            {/* Header / Trigger */}
            <button
              type="button"
              onClick={() => toggleGuide(guide.id)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {getIcon(guide.id)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                    {guide.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
                    {guide.title}
                  </h4>
                </div>
              </div>

              <div className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5">
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {/* Expanded Body */}
            {isOpen && (
              <div className="p-6 pt-0 border-t border-white/5 space-y-5 animate-fade-in text-xs font-mono">
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-4">
                  {guide.summary}
                </p>

                {/* Immediate Action Steps */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-cyan-300 uppercase tracking-wider font-bold block">
                    IMMEDIATE CRITICAL ACTIONS:
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    {guide.immediateSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparedness Checklist */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-2">
                  <span className="text-amber-300 uppercase tracking-wider font-bold block">
                    PREPAREDNESS CHECKLIST:
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    {guide.preparednessChecklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Valkyrie Field Protocol */}
                <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex items-start gap-2.5 text-cyan-200 font-sans">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-[10px] uppercase text-cyan-400 block mb-0.5">
                      VALKYRIE DEFENSIVE RESPONSE DOCTRINE
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {guide.valkyrieProtocol}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
