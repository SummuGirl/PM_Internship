import React from 'react';
import { Shield, Clock, Users, ArrowRight, AlertTriangle, Radio } from 'lucide-react';
import { Mission } from '../../types';
import { PriorityBadge, GuardianBadge } from '../common/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface MissionCardProps {
  mission: Mission;
  onSelect: (mission: Mission) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onSelect }) => {
  const { playClick } = useSoundEffects();

  const handleClick = () => {
    playClick();
    onSelect(mission);
  };

  const isResolved = mission.status === 'RESOLVED';

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer rounded-xl border p-5 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden ${
        isResolved
          ? 'bg-[#0D121B]/80 border-white/10 hover:border-emerald-500/40 opacity-80 hover:opacity-100'
          : mission.priority === 'CRITICAL'
          ? 'bg-[#140E14]/90 border-red-500/30 hover:border-red-400/60 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
          : 'bg-[#111722]/90 border-white/10 hover:border-cyan-400/50 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
      }`}
    >
      <div>
        {/* Top bar: ID and Priority */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono text-cyan-400 tracking-wider">
            {mission.id} • {mission.code}
          </span>
          <PriorityBadge priority={mission.priority} size="sm" />
        </div>

        {/* Mission Title */}
        <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors leading-snug">
          {mission.title}
        </h3>

        {/* Location & District */}
        <div className="text-xs font-mono text-slate-400 mt-1.5">
          {mission.location} ({mission.sector})
        </div>

        {/* Objective Snippet */}
        <p className="text-xs text-slate-300 mt-3 font-sans line-clamp-2 leading-relaxed">
          {mission.objective}
        </p>

        {/* Threat & Civilians row */}
        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="bg-black/30 p-2 rounded border border-white/5">
            <span className="text-[10px] text-slate-500 block">THREAT INDEX</span>
            <span className="text-red-400 font-bold">{mission.threatLevel}%</span>
          </div>
          <div className="bg-black/30 p-2 rounded border border-white/5">
            <span className="text-[10px] text-slate-400 block">ENDANGERED</span>
            <span className="text-white font-bold">{mission.civiliansAffected} CIVILIANS</span>
          </div>
        </div>
      </div>

      {/* Footer: Guardian + Status Action */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
        <GuardianBadge guardian={mission.assignedGuardian} size="sm" />

        <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
          <span>BRIEFING</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
