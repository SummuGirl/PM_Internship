import React, { useEffect } from 'react';
import { CheckCircle, Clock, Shield, Sparkles, Navigation, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EmergencyRequest } from '../../types';
import { GuardianBadge, PriorityBadge } from '../common/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface RequestConfirmationProps {
  request: EmergencyRequest;
  onTrackResponse: (requestId: string) => void;
  onReturnHome: () => void;
}

export const RequestConfirmation: React.FC<RequestConfirmationProps> = ({
  request,
  onTrackResponse,
  onReturnHome
}) => {
  const { playSuccess, playClick } = useSoundEffects();

  useEffect(() => {
    playSuccess();
    // Burst subtle ethereal sparkles
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#e5b558', '#9d4edd', '#ffffff']
      });
    } catch {}
  }, [playSuccess]);

  return (
    <div className="max-w-2xl mx-auto py-8 animate-fade-in">
      <div className="bg-[#0D121B] border border-cyan-500/40 rounded-2xl p-8 sm:p-10 shadow-[0_0_60px_rgba(56,189,248,0.2)] relative overflow-hidden text-center">
        {/* Top ambient glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-sky-400 to-purple-500" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Big Check Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-6 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle className="w-10 h-10" />
        </div>

        {/* Confirmation Headline */}
        <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 uppercase block mb-1">
          // BEACON TRANSMISSION VERIFIED
        </span>

        <h2 className="text-3xl sm:text-4xl font-black font-cinzel text-white uppercase tracking-wider mb-2">
          REQUEST RECEIVED
        </h2>

        {/* Unique Ticket ID badge */}
        <div className="inline-block bg-black/60 border border-cyan-500/50 px-6 py-2 rounded-lg font-mono text-xl sm:text-2xl font-black text-cyan-300 tracking-widest shadow-inner my-2">
          {request.id}
        </div>

        <p className="text-sm text-slate-300 font-display mt-3 max-w-md mx-auto">
          YOUR CALL HAS REACHED THE VALKYRIE NETWORK.
        </p>

        {/* Detail Matrix */}
        <div className="mt-8 bg-[#111722] border border-white/10 rounded-xl p-5 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">INCIDENT CATEGORY</span>
            <span className="text-xs font-mono text-white font-bold">{request.categoryTitle}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">GUARDIAN ASSIGNED</span>
            <GuardianBadge guardian={request.triage.recommendedGuardian} />
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">NETWORK STATUS</span>
            <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              RESPONSE INITIATED
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>ESTIMATED RESPONSE TIME</span>
            </span>
            <span className="text-sm font-mono text-amber-300 font-bold tracking-wider">
              {request.triage.estimatedResponseTime}
            </span>
          </div>
        </div>

        {/* Primary Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => { playClick(); onTrackResponse(request.id); }}
            className="w-full sm:w-auto px-8 py-4 rounded font-mono font-bold text-xs tracking-widest uppercase bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_30px_rgba(56,189,248,0.5)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>TRACK RESPONSE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => { playClick(); onReturnHome(); }}
            className="w-full sm:w-auto px-6 py-4 rounded font-mono text-xs text-slate-300 hover:text-white border border-white/20 hover:bg-white/5 transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};
