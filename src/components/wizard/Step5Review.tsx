import React, { useState } from 'react';
import { Shield, MapPin, Users, HeartPulse, Send, Edit3, Image, AlertTriangle } from 'lucide-react';
import { EmergencyRequest } from '../../types';
import { PriorityBadge, GuardianBadge } from '../common/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface Step5ReviewProps {
  draftRequest: Partial<EmergencyRequest>;
  onEditStep: (stepIndex: number) => void;
  onSubmit: () => void;
}

export const Step5Review: React.FC<Step5ReviewProps> = ({
  draftRequest,
  onEditStep,
  onSubmit
}) => {
  const [submitting, setSubmitting] = useState(false);
  const { playClick, playAlert } = useSoundEffects();

  const handleSend = () => {
    setSubmitting(true);
    playAlert();
    setTimeout(() => {
      onSubmit();
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          STEP 05 // FINAL DISPATCH VERIFICATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
          REQUEST SUMMARY
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Verify transmission parameters prior to broadcasting to the Valkyrie Network.
        </p>
      </div>

      {/* Main Review Sheet */}
      <div className="bg-[#111722] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        {/* Header Bar */}
        <div className="bg-black/50 p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold">PENDING BROADCAST</span>
          </div>
          {draftRequest.triage?.priority && (
            <PriorityBadge priority={draftRequest.triage.priority} />
          )}
        </div>

        {/* Content Rows */}
        <div className="p-6 space-y-6">
          {/* Row 1: Incident & Assigned Guardian */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">INCIDENT TYPE</span>
                <button
                  type="button"
                  onClick={() => { playClick(); onEditStep(1); }}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>EDIT</span>
                </button>
              </div>
              <div className="text-lg font-bold font-display text-white">
                {draftRequest.categoryTitle || draftRequest.category}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">ASSIGNED GUARDIAN</span>
                <button
                  type="button"
                  onClick={() => { playClick(); onEditStep(4); }}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>RE-TRIAGE</span>
                </button>
              </div>
              {draftRequest.triage?.recommendedGuardian && (
                <GuardianBadge guardian={draftRequest.triage.recommendedGuardian} size="lg" />
              )}
            </div>
          </div>

          {/* Row 2: Location & Coordinates */}
          <div className="pb-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LOCATION TELEMETRY</span>
              </span>
              <button
                type="button"
                onClick={() => { playClick(); onEditStep(2); }}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>EDIT</span>
              </button>
            </div>
            <div className="bg-black/30 p-3.5 rounded-lg border border-white/5 font-mono text-xs space-y-1">
              <div className="text-white font-bold text-sm">
                {draftRequest.location?.district} — {draftRequest.location?.sector}
              </div>
              {draftRequest.location?.description && (
                <div className="text-slate-400 text-xs">
                  {draftRequest.location.description}
                </div>
              )}
              {draftRequest.location?.coordinates && (
                <div className="text-[11px] text-cyan-400">
                  COORDINATES: {draftRequest.location.coordinates}
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Details & People Affected */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>SITUATION READOUT</span>
              </span>
              <button
                type="button"
                onClick={() => { playClick(); onEditStep(3); }}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>EDIT</span>
              </button>
            </div>
            
            <p className="text-slate-200 text-xs sm:text-sm font-sans leading-relaxed bg-black/30 p-3.5 rounded-lg border border-white/5 mb-3">
              {draftRequest.details?.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="bg-black/20 p-2.5 rounded border border-white/5">
                <span className="text-[10px] text-slate-400 block">PEOPLE AFFECTED</span>
                <span className="text-white font-bold">{draftRequest.details?.peopleAffected}</span>
              </div>
              <div className="bg-black/20 p-2.5 rounded border border-white/5">
                <span className="text-[10px] text-slate-400 block">INJURIES REPORTED</span>
                <span className="text-amber-300 font-bold">{draftRequest.details?.anyoneInjured}</span>
              </div>
              <div className="bg-black/20 p-2.5 rounded border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block">IMMEDIATE THREAT</span>
                <span className="text-red-400 font-bold">{draftRequest.details?.immediateDanger}</span>
              </div>
            </div>

            {/* Optional preview thumbnail */}
            {draftRequest.details?.evidencePreviewUrl && (
              <div className="mt-4 flex items-center gap-3 bg-black/30 p-2.5 rounded border border-white/5">
                <img
                  src={draftRequest.details.evidencePreviewUrl}
                  alt="Evidence"
                  className="w-12 h-12 object-cover rounded border border-white/10"
                />
                <div className="text-xs font-mono">
                  <span className="text-cyan-400 block font-semibold">1 OPTICAL ATTACHMENT</span>
                  <span className="text-slate-500 text-[10px]">Transmitting with ticket packet</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons: Edit Request vs Send Request */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => { playClick(); onEditStep(1); }}
          className="w-full sm:w-auto px-6 py-3.5 rounded font-mono text-xs text-slate-300 hover:text-white border border-white/20 hover:bg-white/5 transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <Edit3 className="w-4 h-4" />
          <span>EDIT REQUEST</span>
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={submitting}
          className="w-full sm:w-auto px-10 py-4 rounded font-mono font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_35px_rgba(239,68,68,0.5)] border border-red-400/50 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Send className={`w-4 h-4 ${submitting ? 'animate-bounce' : ''}`} />
          <span>{submitting ? 'TRANSMITTING BEACON...' : 'SEND EMERGENCY REQUEST'}</span>
        </button>
      </div>
    </div>
  );
};
