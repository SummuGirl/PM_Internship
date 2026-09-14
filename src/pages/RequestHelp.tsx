import React from 'react';
import { EmergencyCategoryId, EmergencyRequest, ActivePage } from '../types';
import { RequestWizard } from '../components/wizard/RequestWizard';

interface RequestHelpProps {
  initialCategoryId?: EmergencyCategoryId | null;
  onTrackResponse: (requestId: string) => void;
  setActivePage: (page: ActivePage) => void;
  onRequestSubmitted: (newRequest: EmergencyRequest) => void;
}

export const RequestHelp: React.FC<RequestHelpProps> = ({
  initialCategoryId,
  onTrackResponse,
  setActivePage,
  onRequestSubmitted
}) => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-block px-3 py-1 rounded bg-red-600/10 border border-red-500/30 text-red-400 font-mono text-xs uppercase tracking-widest mb-2">
          ● EMERGENCY DISPATCH PROTOCOL
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white uppercase tracking-wider">
          REQUEST EMERGENCY HELP
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans max-w-2xl mx-auto">
          Complete the 5-step triage sequence below. The automated analysis matrix will assess threat parameters and dispatch the optimal guardian to your Midgard coordinates.
        </p>
      </div>

      <RequestWizard
        initialCategoryId={initialCategoryId}
        onTrackResponse={onTrackResponse}
        onReturnHome={() => setActivePage('home')}
        onRequestSubmitted={onRequestSubmitted}
      />
    </div>
  );
};
