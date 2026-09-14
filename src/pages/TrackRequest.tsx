import React from 'react';
import { EmergencyRequest, ActivePage } from '../types';
import { RequestTracker } from '../components/tracking/RequestTracker';

interface TrackRequestPageProps {
  trackingRequestId?: string | null;
  requests: EmergencyRequest[];
  onUpdateRequest: (updated: EmergencyRequest) => void;
  setActivePage: (page: ActivePage) => void;
}

export const TrackRequestPage: React.FC<TrackRequestPageProps> = ({
  trackingRequestId,
  requests,
  onUpdateRequest,
  setActivePage
}) => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <RequestTracker
        initialRequestId={trackingRequestId}
        requests={requests}
        onUpdateRequest={onUpdateRequest}
        onNavigateRequestHelp={() => setActivePage('request')}
      />
    </div>
  );
};
