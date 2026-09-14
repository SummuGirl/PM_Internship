import React from 'react';
import { Clock, MapPin, Users, HeartPulse, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { EmergencyRequest } from '../../types';
import { Modal } from '../common/Modal';
import { PriorityBadge, GuardianBadge, StatusBadge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';

interface RequestDetailModalProps {
  request: EmergencyRequest | null;
  onClose: () => void;
  onTrack: (id: string) => void;
  onOpenFeedback: (request: EmergencyRequest) => void;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  request,
  onClose,
  onTrack,
  onOpenFeedback
}) => {
  if (!request) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={request.categoryTitle}
      subtitle={`INCIDENT DOSSIER // ${request.id} // ${formatDate(request.createdAt)}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={request.triage.priority} />
            <GuardianBadge guardian={request.triage.recommendedGuardian} />
          </div>
          <StatusBadge status={request.status} />
        </div>

        {/* Location & Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-slate-400 uppercase text-[10px] block">LOCATION</span>
            <div className="text-white font-bold text-sm">
              {request.location.district}
            </div>
            <div className="text-cyan-400">{request.location.sector}</div>
            {request.location.description && (
              <div className="text-slate-400 text-[11px] pt-1">{request.location.description}</div>
            )}
          </div>

          <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-slate-400 uppercase text-[10px] block">SITUATION</span>
            <div className="text-white font-bold text-sm">
              {request.details.peopleAffected} Civilians Impacted
            </div>
            <div className="text-amber-300">Injuries: {request.details.anyoneInjured}</div>
            <div className="text-red-400">Immediate Peril: {request.details.immediateDanger}</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#111722] p-4 rounded-xl border border-white/10 space-y-1 font-mono text-xs">
          <span className="text-slate-400 uppercase text-[10px] block mb-1">INCIDENT NOTES</span>
          <p className="text-slate-200 font-sans leading-relaxed text-xs sm:text-sm">
            {request.details.description}
          </p>
        </div>

        {/* Timeline Log */}
        <div className="border-t border-white/10 pt-4 font-mono text-xs">
          <span className="text-slate-400 uppercase tracking-widest block mb-3 text-[10px]">
            DISPATCH AUDIT LOG
          </span>
          <div className="space-y-2 max-h-40 overflow-y-auto bg-black/40 p-3 rounded-lg border border-white/10">
            {request.statusHistory.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-cyan-400 text-[10px]">{item.timestamp}</span>
                <span className="text-slate-500 font-bold">•</span>
                <span className="text-slate-300 flex-1">{item.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => { onClose(); onTrack(request.id); }}
            className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
          >
            <span>OPEN LIVE RADAR TRACKER</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {request.status === 'RESOLVED' && (
            <button
              type="button"
              onClick={() => { onClose(); onOpenFeedback(request); }}
              className="w-full sm:w-auto px-5 py-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-400 text-emerald-300 font-mono text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              LEAVE FEEDBACK
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
