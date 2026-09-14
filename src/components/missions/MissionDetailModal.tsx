import React from 'react';
import { Shield, Clock, Users, Activity, Radio, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Mission } from '../../types';
import { Modal } from '../common/Modal';
import { PriorityBadge, GuardianBadge } from '../common/Badge';

interface MissionDetailModalProps {
  mission: Mission | null;
  onClose: () => void;
}

export const MissionDetailModal: React.FC<MissionDetailModalProps> = ({ mission, onClose }) => {
  if (!mission) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={mission.title}
      subtitle={`${mission.id} // ${mission.code} // ${mission.district}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Header badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={mission.priority} />
            <GuardianBadge guardian={mission.assignedGuardian} />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded border border-cyan-400/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{mission.status}</span>
          </div>
        </div>

        {/* Threat level & Civilians affected */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-black/40 p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 uppercase">THREAT LEVEL READOUT</span>
              <span className="text-red-400 font-bold text-sm">{mission.threatLevel}%</span>
            </div>
            <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-700"
                style={{ width: `${mission.threatLevel}%` }}
              />
            </div>
          </div>

          <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-slate-400 uppercase block mb-1">CIVILIANS ENDANGERED</span>
              <span className="text-2xl font-bold text-white">{mission.civiliansAffected}</span>
            </div>
            <Users className="w-8 h-8 text-cyan-400/60" />
          </div>
        </div>

        {/* Objective */}
        <div className="bg-[#111722] p-4 rounded-xl border border-white/10 space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
            MISSION OBJECTIVE
          </span>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
            {mission.objective}
          </p>
        </div>

        {/* Last update & Recommended action */}
        <div className="space-y-3 font-mono text-xs">
          <div className="bg-black/30 p-3.5 rounded-lg border border-white/5">
            <span className="text-slate-400 uppercase block text-[10px] mb-1">LAST TELEMETRY UPDATE</span>
            <p className="text-slate-200">{mission.lastUpdate}</p>
          </div>

          <div className="bg-amber-950/20 p-3.5 rounded-lg border border-amber-500/30">
            <span className="text-amber-400 uppercase block text-[10px] mb-1 font-bold">
              RECOMMENDED CIVILIAN ACTION
            </span>
            <p className="text-amber-200/90">{mission.recommendedAction}</p>
          </div>
        </div>

        {/* Tactical Radio Log */}
        {mission.radioLog && mission.radioLog.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>INTERCEPTED COMM AUDIO LOGS</span>
            </span>

            <div className="space-y-2 max-h-40 overflow-y-auto bg-black/50 p-3 rounded-lg border border-white/10 font-mono text-xs">
              {mission.radioLog.map((log, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                  <span className={`font-bold text-[11px] ${log.sender.includes('BRYN') ? 'text-sky-300' : log.sender.includes('FREYA') ? 'text-amber-300' : 'text-cyan-400'}`}>
                    [{log.sender}]:
                  </span>
                  <span className="text-slate-300 flex-1">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
