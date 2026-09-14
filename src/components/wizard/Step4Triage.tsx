import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Shield, 
  CheckCircle2, 
  Activity, 
  ChevronRight, 
  Zap, 
  BrainCircuit,
  Eye
} from 'lucide-react';
import { EmergencyCategoryId, GuardianId, PriorityLevel } from '../../types';
import { calculateTriage } from '../../utils/triageLogic';
import { PriorityBadge, GuardianBadge } from '../common/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface TriageState {
  isUnconscious: 'YES' | 'NO' | 'NOT_SURE';
  immediateDanger: 'YES' | 'NO' | 'UNKNOWN';
  peopleAffected: number;
  priority: PriorityLevel;
  recommendedGuardian: GuardianId;
  responseType: string;
  reasoning: string;
  estimatedResponseTime: string;
}

interface Step4TriageProps {
  category: EmergencyCategoryId;
  triageData: TriageState;
  onChangeTriage: (triage: TriageState) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4Triage: React.FC<Step4TriageProps> = ({
  category,
  triageData,
  onChangeTriage,
  onNext,
  onBack
}) => {
  const [analyzing, setAnalyzing] = useState(true);
  const { playSuccess, playClick } = useSoundEffects();

  // Run animated scan when component mounts or inputs change
  useEffect(() => {
    setAnalyzing(true);
    const timer = setTimeout(() => {
      const result = calculateTriage({
        category,
        peopleAffected: triageData.peopleAffected,
        anyoneInjured: triageData.isUnconscious === 'YES' ? 'YES' : 'NO',
        immediateDanger: triageData.immediateDanger,
        isUnconscious: triageData.isUnconscious,
        isSupernatural: category === 'unknown'
      });

      onChangeTriage({
        ...triageData,
        priority: result.priority,
        recommendedGuardian: result.guardian,
        responseType: result.responseType,
        reasoning: result.reasoning,
        estimatedResponseTime: result.estimatedResponseTime
      });

      setAnalyzing(false);
      playSuccess();
    }, 900);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, triageData.isUnconscious, triageData.immediateDanger, triageData.peopleAffected]);

  const handleUpdate = (updates: Partial<TriageState>) => {
    playClick();
    onChangeTriage({
      ...triageData,
      ...updates
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          STEP 04 // GUARDIAN SELECTION MATRIX
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
          VALKYRIE RESPONSE ANALYSIS
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Determining the guardian best suited to your situation.
        </p>
      </div>

      {/* Triage Questionnaire Input Panel */}
      <div className="bg-[#111722] border border-white/10 rounded-xl p-5 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4" />
          <span>TRIAGE CALIBRATION QUESTIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Question 1: Unconscious */}
          <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-2">
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase block">
              Is anyone unconscious or non-responsive?
            </span>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(['YES', 'NO', 'NOT_SURE'] as const).map(opt => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleUpdate({ isUnconscious: opt })}
                  className={`py-2 text-xs font-mono font-bold rounded border transition-all ${
                    triageData.isUnconscious === opt
                      ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  {opt.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Immediate Threat */}
          <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-2">
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase block">
              Is there immediate kinetic or environmental threat?
            </span>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(['YES', 'NO', 'UNKNOWN'] as const).map(opt => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleUpdate({ immediateDanger: opt })}
                  className={`py-2 text-xs font-mono font-bold rounded border transition-all ${
                    triageData.immediateDanger === opt
                      ? 'bg-red-500 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dramatic Animated Result Card */}
      {analyzing ? (
        <div className="bg-[#0D121B] border border-cyan-500/40 rounded-xl p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center mx-auto animate-spin">
            <Activity className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-300 tracking-[0.2em] uppercase animate-pulse">
              ANALYZING THREAT HARMONICS & DEFENSIVE PROFILES...
            </span>
            <p className="text-xs text-slate-500 font-mono">
              Synthesizing Seiðr foresight and Midgard tactical grids
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`border rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-500 ${
            triageData.recommendedGuardian === 'freya'
              ? 'bg-gradient-to-br from-[#17120B] via-[#0D1118] to-[#17120B] border-amber-500/40 shadow-[0_0_40px_rgba(229,181,88,0.15)]'
              : triageData.recommendedGuardian === 'brynhildr'
              ? 'bg-gradient-to-br from-[#0B1522] via-[#0D1118] to-[#0B1522] border-sky-500/40 shadow-[0_0_40px_rgba(56,189,248,0.15)]'
              : 'bg-gradient-to-br from-[#160D22] via-[#0D1118] to-[#160D22] border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.2)]'
          }`}
        >
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-widest">
              <CheckCircle2 className="w-4 h-4" />
              <span>ANALYSIS COMPLETE</span>
            </div>
            <div className="flex items-center gap-3">
              <PriorityBadge priority={triageData.priority} />
              <span className="text-xs font-mono text-slate-400">
                EST. RESPONSE: <strong className="text-white">{triageData.estimatedResponseTime}</strong>
              </span>
            </div>
          </div>

          {/* Dual Response Dramatic Presentation */}
          {triageData.recommendedGuardian === 'dual' ? (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-xs font-mono text-purple-400 tracking-[0.25em] uppercase block mb-1">
                  CRITICAL SYNERGY PROTOCOL
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white uppercase tracking-wider">
                  DUAL RESPONSE RECOMMENDED
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Situation exceeds single-guardian operational parameters. Simultaneous deployment authorized.
                </p>
              </div>

              {/* Parallel Guardian Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Freya */}
                <div className="bg-[#17120B]/80 border border-amber-500/40 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-white text-lg">FREYA</h4>
                    <p className="text-xs font-mono text-amber-300 tracking-wider">
                      LOCATE • ANALYZE • GUIDE
                    </p>
                  </div>
                </div>

                {/* Brynhildr */}
                <div className="bg-[#0B1522]/80 border border-sky-500/40 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-sky-500/20 border border-sky-500/50 flex items-center justify-center text-sky-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-white text-lg">BRYNHILDR</h4>
                    <p className="text-xs font-mono text-sky-300 tracking-wider">
                      DEFEND • RESCUE • RESPOND
                    </p>
                  </div>
                </div>
              </div>

              {/* Reasoning */}
              <div className="bg-black/50 p-4 rounded-lg border border-white/10">
                <span className="text-xs font-mono text-purple-300 uppercase tracking-wider block mb-1 font-semibold">
                  TRIAGE JUSTIFICATION:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {triageData.reasoning}
                </p>
              </div>
            </div>
          ) : (
            /* Single Guardian Presentation (Freya or Brynhildr) */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    RECOMMENDED GUARDIAN
                  </span>
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-black font-cinzel text-white uppercase tracking-wider">
                      {triageData.recommendedGuardian === 'freya' ? 'FREYA' : 'BRYNHILDR'}
                    </h3>
                    <GuardianBadge guardian={triageData.recommendedGuardian} />
                  </div>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {triageData.recommendedGuardian === 'freya' ? 'THE SEER • INTELLIGENCE & FORESIGHT' : 'THE SHIELD-MAIDEN • COMBAT RESCUE'}
                  </p>
                </div>

                <div className={`w-16 h-16 rounded-xl flex items-center justify-center border shadow-lg ${
                  triageData.recommendedGuardian === 'freya'
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-[0_0_20px_rgba(229,181,88,0.3)]'
                    : 'bg-sky-500/15 border-sky-500/50 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                }`}>
                  {triageData.recommendedGuardian === 'freya' ? (
                    <Sparkles className="w-8 h-8" />
                  ) : (
                    <Shield className="w-8 h-8" />
                  )}
                </div>
              </div>

              {/* Detail fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-black/40 p-3.5 rounded border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block mb-0.5">RESPONSE TYPE</span>
                  <span className="text-white font-bold">{triageData.responseType}</span>
                </div>
                <div className="bg-black/40 p-3.5 rounded border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block mb-0.5">ESTIMATED ARRIVAL</span>
                  <span className="text-cyan-300 font-bold">{triageData.estimatedResponseTime}</span>
                </div>
              </div>

              {/* Reasoning */}
              <div className="bg-black/40 p-4 rounded-lg border border-white/10">
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider block mb-1 font-semibold">
                  WHY {triageData.recommendedGuardian === 'freya' ? 'FREYA' : 'BRYNHILDR'}?
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {triageData.reasoning}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded font-mono text-xs text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors uppercase tracking-wider"
        >
          ← BACK
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={analyzing}
          className={`px-8 py-3.5 rounded font-mono font-bold text-xs tracking-widest uppercase transition-all ${
            !analyzing
              ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(56,189,248,0.5)] cursor-pointer'
              : 'bg-white/10 text-slate-500 cursor-not-allowed'
          }`}
        >
          REVIEW DISPATCH SUMMARY →
        </button>
      </div>
    </div>
  );
};
