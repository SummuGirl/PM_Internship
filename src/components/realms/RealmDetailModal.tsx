import React from 'react';
import { Globe2, Shield, AlertTriangle, Radio, Activity, Compass, Wind } from 'lucide-react';
import { Realm } from '../../types';
import { Modal } from '../common/Modal';
import { PriorityBadge } from '../common/Badge';

interface RealmDetailModalProps {
  realm: Realm | null;
  onClose: () => void;
}

export const RealmDetailModal: React.FC<RealmDetailModalProps> = ({ realm, onClose }) => {
  if (!realm) return null;

  const isMidgard = realm.id === 'midgard';

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={realm.name}
      subtitle={`${realm.norseName} // ${realm.title}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Status & Threat Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={realm.threatLevel} />
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-400/30">
              STATUS: {realm.status}
            </span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            BIFRÖST BRIDGE: <strong className={realm.bridgeStatus === 'OPEN' ? 'text-emerald-400' : 'text-amber-400'}>{realm.bridgeStatus}</strong>
          </div>
        </div>

        {/* Threat progress bar */}
        <div className="bg-black/40 p-4 rounded-xl border border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 uppercase">DIMENSIONAL INSTABILITY INDEX</span>
            <span className="text-red-400 font-bold">{realm.threatPercentage}%</span>
          </div>
          <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-red-500 rounded-full"
              style={{ width: `${realm.threatPercentage}%` }}
            />
          </div>
        </div>

        {/* Realm Description */}
        <div>
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
            DIMENSIONAL OVERVIEW
          </span>
          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
            {realm.description}
          </p>
        </div>

        {/* Environmental Hazards */}
        <div className="bg-[#111722] p-4 rounded-xl border border-white/10 space-y-2 font-mono text-xs">
          <span className="text-slate-300 font-bold uppercase flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>ENVIRONMENTAL HAZARD PROFILE</span>
          </span>
          <p className="text-slate-400 leading-relaxed font-sans text-xs">
            {realm.environmentalHazard}
          </p>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="bg-black/30 p-3 rounded-lg border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase block">ACTIVE MISSIONS</span>
            <span className="text-white font-bold text-sm">{realm.activeMissions}</span>
          </div>
          <div className="bg-black/30 p-3 rounded-lg border border-white/5">
            <span className="text-[10px] text-slate-500 uppercase block">ANOMALIES LOGGED</span>
            <span className="text-amber-300 font-bold text-sm">{realm.activeAnomalies}</span>
          </div>
          <div className="bg-black/30 p-3 rounded-lg border border-white/5 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-500 uppercase block">GUARDIAN OVERWATCH</span>
            <span className="text-cyan-300 font-bold text-xs">{realm.guardian}</span>
          </div>
        </div>

        {isMidgard && (
          <div className="p-3 bg-cyan-950/30 border border-cyan-400/40 rounded text-xs font-mono text-cyan-200">
            ● PRIMARY OPERATIONAL REPOSITORY // ALL DISPATCH BEACONS ORIGINATE HERE
          </div>
        )}
      </div>
    </Modal>
  );
};
