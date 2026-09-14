import React from 'react';
import { Shield, Clock, RotateCcw, AlertCircle } from 'lucide-react';
import { EmergencyRequest, ActivePage } from '../types';
import { RequestHistory } from '../components/dashboard/RequestHistory';

interface DashboardProps {
  requests: EmergencyRequest[];
  onTrack: (id: string) => void;
  setActivePage: (page: ActivePage) => void;
  onResetDemoData: () => void;
  onUpdateRequest: (updated: EmergencyRequest) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  requests,
  onTrack,
  setActivePage,
  onResetDemoData,
  onUpdateRequest
}) => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          // CITIZEN RECORD PORTAL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white uppercase mt-1 tracking-wider">
          MY REQUESTS
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
          Historical record of all distress transmissions, guardian deployments, and debrief evaluations linked to your Midgard communicator.
        </p>
      </div>

      <RequestHistory
        requests={requests}
        onTrack={onTrack}
        onNavigateRequestHelp={() => setActivePage('request')}
        onResetDemoData={onResetDemoData}
        onUpdateRequest={onUpdateRequest}
      />
    </div>
  );
};
