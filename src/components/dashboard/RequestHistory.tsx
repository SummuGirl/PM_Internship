import React, { useState } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  ChevronRight, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { EmergencyRequest } from '../../types';
import { PriorityBadge, GuardianBadge, StatusBadge } from '../common/Badge';
import { RequestDetailModal } from './RequestDetailModal';
import { FeedbackModal } from '../tracking/FeedbackModal';
import { SEED_REQUESTS } from '../../data/requests';
import { formatDate } from '../../utils/formatters';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useToast } from '../../hooks/useToast';

interface RequestHistoryProps {
  requests: EmergencyRequest[];
  onTrack: (id: string) => void;
  onNavigateRequestHelp: () => void;
  onResetDemoData: () => void;
  onUpdateRequest: (updated: EmergencyRequest) => void;
}

export const RequestHistory: React.FC<RequestHistoryProps> = ({
  requests,
  onTrack,
  onNavigateRequestHelp,
  onResetDemoData,
  onUpdateRequest
}) => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ALL');
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequest | null>(null);
  const [feedbackRequest, setFeedbackRequest] = useState<EmergencyRequest | null>(null);
  const { playClick, playSuccess } = useSoundEffects();
  const { showToast } = useToast();

  const filteredRequests = requests.filter(req => {
    if (filter === 'ACTIVE') return req.status !== 'RESOLVED';
    if (filter === 'RESOLVED') return req.status === 'RESOLVED';
    return true;
  });

  const handleOpenDetail = (req: EmergencyRequest) => {
    playClick();
    setSelectedRequest(req);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Filter and Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#111722] border border-white/10 rounded-xl p-4">
        {/* Filters */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          {(['ALL', 'ACTIVE', 'RESOLVED'] as const).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => { playClick(); setFilter(f); }}
              className={`px-3 py-1.5 rounded transition-all ${
                filter === f
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {f} ({
                f === 'ALL'
                  ? requests.length
                  : f === 'ACTIVE'
                  ? requests.filter(r => r.status !== 'RESOLVED').length
                  : requests.filter(r => r.status === 'RESOLVED').length
              })
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onResetDemoData}
            title="Reset to demo incident records"
            className="px-3 py-1.5 rounded bg-black/40 border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET DEMO DATA</span>
          </button>

          <button
            type="button"
            onClick={onNavigateRequestHelp}
            className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
          >
            + NEW REQUEST
          </button>
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        /* Empty State */
        <div className="bg-[#0D121B] border border-white/10 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            NO REQUESTS YET
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-sm mx-auto">
            Your submitted emergency requests will appear here with live dispatch tracking and debrief reports.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateRequestHelp}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              TRANSMIT FIRST INCIDENT BEACON
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map(req => {
            const isResolved = req.status === 'RESOLVED';
            return (
              <div
                key={req.id}
                onClick={() => handleOpenDetail(req)}
                className="group cursor-pointer bg-[#111722]/90 hover:bg-[#161F2E] border border-white/10 hover:border-cyan-400/40 rounded-xl p-5 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-black text-sm text-cyan-400 tracking-wider">
                      {req.id}
                    </span>
                    <PriorityBadge priority={req.triage.priority} size="sm" />
                    <GuardianBadge guardian={req.triage.recommendedGuardian} size="sm" />
                    <StatusBadge status={req.status} />
                  </div>

                  <h4 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {req.categoryTitle}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <span>{req.location.district} ({req.location.sector})</span>
                    <span>•</span>
                    <span>{req.details.peopleAffected} civilians</span>
                    <span>•</span>
                    <span>{formatDate(req.createdAt)}</span>
                  </div>
                </div>

                {/* Actions on right */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTrack(req.id);
                    }}
                    className="px-3.5 py-1.5 rounded bg-black/40 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-cyan-300 font-mono text-xs font-semibold tracking-wider transition-colors"
                  >
                    TRACK RADAR
                  </button>

                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onTrack={onTrack}
          onOpenFeedback={(req) => setFeedbackRequest(req)}
        />
      )}

      {/* Feedback Modal */}
      {feedbackRequest && (
        <FeedbackModal
          isOpen={true}
          onClose={() => setFeedbackRequest(null)}
          requestId={feedbackRequest.id}
          guardianName={feedbackRequest.triage.recommendedGuardian === 'dual' ? 'Freya & Brynhildr' : feedbackRequest.triage.recommendedGuardian}
          onFeedbackSubmitted={(fb) => {
            const updated: EmergencyRequest = {
              ...feedbackRequest,
              feedback: {
                ...fb,
                submittedAt: new Date().toISOString()
              }
            };
            onUpdateRequest(updated);
          }}
        />
      )}
    </div>
  );
};
