import React, { useState, useEffect } from 'react';
import { ActivePage, EmergencyCategoryId, EmergencyRequest } from './types';
import { SEED_REQUESTS } from './data/requests';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ToastProvider, useToast } from './hooks/useToast';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LoadingScreen } from './components/common/LoadingScreen';
import { CustomCursor } from './components/common/CustomCursor';

// Pages
import { Home } from './pages/Home';
import { RequestHelp } from './pages/RequestHelp';
import { TrackRequestPage } from './pages/TrackRequest';
import { Missions } from './pages/Missions';
import { RealmsPage } from './pages/Realms';
import { SafetyCenterPage } from './pages/SafetyCenter';
import { ValkyriesLorePage } from './pages/ValkyriesLore';
import { Dashboard } from './pages/Dashboard';

function MainApp() {
  // Check if session has loaded before
  const [showLoadingScreen, setShowLoadingScreen] = useState(() => {
    try {
      return sessionStorage.getItem('valkyrie_visited') !== 'true';
    } catch {
      return false;
    }
  });

  // Active page state with URL hash synchronization
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    try {
      const hash = window.location.hash.replace('#', '') as ActivePage;
      const validPages: ActivePage[] = ['home', 'request', 'track', 'missions', 'realms', 'safety', 'valkyries', 'dashboard'];
      return validPages.includes(hash) ? hash : 'home';
    } catch {
      return 'home';
    }
  });

  // Category preselection from Quick Actions
  const [preselectedCategory, setPreselectedCategory] = useState<EmergencyCategoryId | null>(null);

  // Request ID passed to tracker
  const [trackingRequestId, setTrackingRequestId] = useState<string | null>(null);

  // Persistent requests storage in localStorage
  const [requests, setRequests] = useLocalStorage<EmergencyRequest[]>('valkyrie_requests', SEED_REQUESTS);

  // Sync active page with hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActivePage;
      const validPages: ActivePage[] = ['home', 'request', 'track', 'missions', 'realms', 'safety', 'valkyries', 'dashboard'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: ActivePage) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectQuickCategory = (catId: EmergencyCategoryId) => {
    setPreselectedCategory(catId);
    navigateToPage('request');
  };

  const handleTrackRequest = (id: string) => {
    setTrackingRequestId(id);
    navigateToPage('track');
  };

  const handleRequestSubmitted = (newRequest: EmergencyRequest) => {
    setRequests(prev => [newRequest, ...prev]);
    setTrackingRequestId(newRequest.id);
  };

  const handleUpdateRequest = (updated: EmergencyRequest) => {
    setRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleResetDemoData = () => {
    setRequests(SEED_REQUESTS);
  };

  const handleReplayLoading = () => {
    setShowLoadingScreen(true);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Desktop subtle custom cursor */}
      <CustomCursor />

      {/* Loading Screen sequence */}
      {showLoadingScreen && (
        <LoadingScreen onComplete={() => setShowLoadingScreen(false)} />
      )}

      {/* Sticky Global Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateToPage}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            setActivePage={navigateToPage}
            onSelectQuickCategory={handleSelectQuickCategory}
          />
        )}

        {activePage === 'request' && (
          <RequestHelp
            initialCategoryId={preselectedCategory}
            onTrackResponse={handleTrackRequest}
            setActivePage={navigateToPage}
            onRequestSubmitted={handleRequestSubmitted}
          />
        )}

        {activePage === 'track' && (
          <TrackRequestPage
            trackingRequestId={trackingRequestId}
            requests={requests}
            onUpdateRequest={handleUpdateRequest}
            setActivePage={navigateToPage}
          />
        )}

        {activePage === 'missions' && (
          <Missions />
        )}

        {activePage === 'realms' && (
          <RealmsPage />
        )}

        {activePage === 'safety' && (
          <SafetyCenterPage />
        )}

        {activePage === 'valkyries' && (
          <ValkyriesLorePage />
        )}

        {activePage === 'dashboard' && (
          <Dashboard
            requests={requests}
            onTrack={handleTrackRequest}
            setActivePage={navigateToPage}
            onResetDemoData={handleResetDemoData}
            onUpdateRequest={handleUpdateRequest}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActivePage={navigateToPage}
        onReplayLoading={handleReplayLoading}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
