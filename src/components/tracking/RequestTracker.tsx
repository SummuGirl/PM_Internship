import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  MapPin, 
  Shield, 
  CheckCircle2, 
  Radio, 
  ChevronRight, 
  RotateCw,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { EmergencyRequest, RequestStatus } from '../../types';
import { PriorityBadge, GuardianBadge, StatusBadge } from '../common/Badge';
import { ResponseMap } from './ResponseMap';
import { DualResponsePanel } from './DualResponsePanel';
import { FeedbackModal } from './FeedbackModal';
import { useToast } from '../../hooks/useToast';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface RequestTrackerProps {
  initialRequestId?: string | null;
  requests: EmergencyRequest[];
  onUpdateRequest: (updated: EmergencyRequest) => void;
  onNavigateRequestHelp: () => void;
}

const TIMELINE_STEPS: { status: RequestStatus; label: string; desc: string }[] = [
  { status: 'RECEIVED', label: 'REQUEST RECEIVED', desc: 'Dispatched through Midgard emergency beacon node' },
  { status: 'ANALYZING', label: 'INCIDENT ANALYZED', desc: 'Smart Triage threat calculations completed' },
  { status: 'ASSIGNED', label: 'GUARDIAN ASSIGNED', desc: 'Guardian telemetry locked to incident sector' },
  { status: 'EN_ROUTE', label: 'GUARDIAN EN ROUTE', desc: 'Airborne sonic corridor transit in progress' },
  { status: 'ON_SCENE', label: 'ON SCENE / IN ACTION', desc: 'Physical barrier establishment and civilian triage' },
  { status: 'RESOLVED', label: 'MISSION COMPLETE', desc: 'Civilian safety secured; site handed to municipal units' }
];

export const RequestTracker: React.FC<RequestTrackerProps> = ({
  initialRequestId,
  requests,
  onUpdateRequest,
  onNavigateRequestHelp
}) => {
  const [searchQuery, setSearchQuery] = useState(initialRequestId || '');
  const [activeRequest, setActiveRequest] = useState<EmergencyRequest | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { showToast } = useToast();
  const { playClick, playSuccess, playAlert } = useSoundEffects();

  // Auto load request on mount or prop change
  useEffect(() => {
    if (initialRequestId) {
      setSearchQuery(initialRequestId);
      handleSearch(initialRequestId);
    } else if (requests.length > 0 && !activeRequest) {
      // Default to most recent
      setActiveRequest(requests[0]);
      setSearchQuery(requests[0].id);
    }
  }, [initialRequestId, requests]);

  const handleSearch = (idToFind?: string) => {
    playClick();
    const target = (idToFind || searchQuery).trim().toUpperCase();
    const normalizedTarget = target.startsWith('#') ? target : `#${target}`;

    const match = requests.find(r => r.id.toUpperCase() === normalizedTarget);
    if (match) {
      setActiveRequest(match);
      setNotFound(false);
      playSuccess();
      showToast(`Request ${match.id} loaded`, 'info');
    } else {
      setActiveRequest(null);
      setNotFound(true);
      playAlert();
      showToast(`Request ${target} not found`, 'warning');
    }
  };

  // Simulate Next Status in the pipeline
  const advanceSimulation = () => {
    if (!activeRequest) return;
    playClick();

    const currentIndex = TIMELINE_STEPS.findIndex(s => s.status === activeRequest.status);
    if (currentIndex < TIMELINE_STEPS.length - 1) {
      const nextStep = TIMELINE_STEPS[currentIndex + 1];
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const updated: EmergencyRequest = {
        ...activeRequest,
        status: nextStep.status,
        updatedAt: new Date().toISOString(),
        statusHistory: [
          ...activeRequest.statusHistory,
          {
            status: nextStep.status,
            timestamp: nowTime,
            note: nextStep.desc
          }
        ]
      };

      onUpdateRequest(updated);
      setActiveRequest(updated);
      showToast(`Status updated: ${nextStep.label}`, 'success');

      if (nextStep.status === 'RESOLVED') {
        playSuccess();
        setTimeout(() => {
          setIsFeedbackOpen(true);
        }, 800);
      }
    }
  };

  const getStepState = (stepStatus: RequestStatus) => {
    if (!activeRequest) return 'pending';
    const currentIndex = TIMELINE_STEPS.findIndex(s => s.status === activeRequest.status);
    const stepIndex = TIMELINE_STEPS.findIndex(s => s.status === stepStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto py-6">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          // LIVE INCIDENT TELEMETRY
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-cinzel text-white uppercase mt-1 tracking-wider">
          TRACK YOUR REQUEST
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monitor your dispatched guardian’s trajectory, ETA, and real-time field status.
        </p>
      </div>

      {/* Search Bar & Preset Quick-Select */}
      <div className="bg-[#111722] border border-white/10 rounded-2xl p-6 shadow-xl">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Request ID (e.g. #FOLK-48291)..."
              className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 rounded-lg pl-12 pr-4 py-3.5 text-sm font-mono text-white placeholder-slate-500 uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs tracking-widest uppercase rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
          >
            TRACK
          </button>
        </form>

        {/* Quick Demo Pre-fill Pills */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">TRY DEMO TICKETS:</span>
          {requests.slice(0, 4).map(req => (
            <button
              key={req.id}
              type="button"
              onClick={() => {
                setSearchQuery(req.id);
                handleSearch(req.id);
              }}
              className="px-2.5 py-1 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-400/40 border border-white/10 rounded text-slate-300 hover:text-cyan-300 transition-colors"
            >
              {req.id} ({req.categoryTitle.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Error / Not Found State */}
      {notFound && (
        <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-8 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h3 className="text-lg font-bold font-display text-white">
            REQUEST NOT FOUND
          </h3>
          <p className="text-xs font-mono text-slate-400 max-w-md mx-auto">
            Check the request ID and try again, or initiate a new emergency broadcast.
          </p>
          <button
            onClick={onNavigateRequestHelp}
            className="mt-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-wider rounded font-bold"
          >
            SUBMIT NEW REQUEST
          </button>
        </div>
      )}

      {/* Active Request Details & Pipeline */}
      {activeRequest && (
        <div className="space-y-8">
          {/* Main Info Card */}
          <div className="bg-[#0D121B] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-400">INCIDENT DOSSIER</span>
                  <span className="text-cyan-400 font-mono font-black text-lg">{activeRequest.id}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
                  {activeRequest.categoryTitle}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <PriorityBadge priority={activeRequest.triage.priority} />
                  <GuardianBadge guardian={activeRequest.triage.recommendedGuardian} />
                  <StatusBadge status={activeRequest.status} />
                </div>
              </div>

              {/* Simulation control widget */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                {activeRequest.status !== 'RESOLVED' ? (
                  <button
                    type="button"
                    onClick={advanceSimulation}
                    className="px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-600/30 to-sky-600/30 hover:from-cyan-600/40 hover:to-sky-600/40 border border-cyan-400/50 text-cyan-200 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all cursor-pointer"
                  >
                    <RotateCw className="w-4 h-4 animate-spin-slow" />
                    <span>SIMULATE NEXT STATUS STEP</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsFeedbackOpen(true)}
                    className="px-5 py-3 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-400 text-emerald-200 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>LEAVE GUARDIAN FEEDBACK</span>
                  </button>
                )}
              </div>
            </div>

            {/* Timeline progression */}
            <div className="py-8 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-6">
                DISPATCH PIPELINE PROGRESSION:
              </span>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {TIMELINE_STEPS.map((step, idx) => {
                  const state = getStepState(step.status);
                  return (
                    <div
                      key={step.status}
                      className={`p-3.5 rounded-xl border transition-all ${
                        state === 'completed'
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                          : state === 'active'
                          ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/30'
                          : 'bg-black/30 border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                        {state === 'completed' && <span className="text-xs font-bold">✓</span>}
                        {state === 'active' && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        )}
                        {state === 'pending' && <span className="text-slate-600">○</span>}
                      </div>
                      <div className="font-mono text-xs font-bold leading-tight mb-1">
                        {step.label}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Incident Details Summary Grid */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 uppercase block text-[10px]">SECTOR LOCATION</span>
                <div className="text-white font-bold text-sm">
                  {activeRequest.location.district}
                </div>
                <div className="text-cyan-400">{activeRequest.location.sector}</div>
                {activeRequest.location.description && (
                  <p className="text-slate-400 text-[11px] pt-1">{activeRequest.location.description}</p>
                )}
              </div>

              <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 uppercase block text-[10px]">CASUALTIES / PEOPLE</span>
                <div className="text-white font-bold text-sm">
                  {activeRequest.details.peopleAffected} Civilians Affected
                </div>
                <div className="text-amber-300">Injuries: {activeRequest.details.anyoneInjured}</div>
                <div className="text-red-400">Immediate Peril: {activeRequest.details.immediateDanger}</div>
              </div>

              <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-slate-400 uppercase block text-[10px]">ESTIMATED ARRIVAL</span>
                <div className="text-amber-300 font-bold text-sm">
                  {activeRequest.triage.estimatedResponseTime}
                </div>
                <div className="text-slate-300">{activeRequest.triage.responseType}</div>
                <span className="text-[10px] text-emerald-400 block pt-1">● SATELLITE BEACON VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Dual Response Special Panel (Section 19) */}
          {activeRequest.triage.recommendedGuardian === 'dual' && (
            <DualResponsePanel status={activeRequest.status} />
          )}

          {/* Tactical Sector Map (Section 18) */}
          <ResponseMap
            guardian={activeRequest.triage.recommendedGuardian}
            status={activeRequest.status}
            incidentLocation={`${activeRequest.location.district}, ${activeRequest.location.sector}`}
          />
        </div>
      )}

      {/* Feedback Modal */}
      {activeRequest && (
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          requestId={activeRequest.id}
          guardianName={activeRequest.triage.recommendedGuardian === 'dual' ? 'Freya & Brynhildr' : activeRequest.triage.recommendedGuardian}
          onFeedbackSubmitted={(fb) => {
            const updated: EmergencyRequest = {
              ...activeRequest,
              feedback: {
                ...fb,
                submittedAt: new Date().toISOString()
              }
            };
            onUpdateRequest(updated);
            setActiveRequest(updated);
          }}
        />
      )}
    </div>
  );
};
