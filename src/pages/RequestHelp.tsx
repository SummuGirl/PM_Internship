import React, { useState } from 'react';
import { EmergencyCategoryId, EmergencyRequest, ActivePage } from '../types';
import { ValkyrieChatbot } from '../components/chatbot/ValkyrieChatbot';
import { RequestWizard } from '../components/wizard/RequestWizard';
import { Sparkles, FileText, MessageSquare } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

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
  const [viewMode, setViewMode] = useState<'chatbot' | 'wizard'>('chatbot');
  const { playClick } = useSoundEffects();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-400/40 text-gold-900 font-mono text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>VALKYRIE DIRECT ASSISTANCE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-charcoal-900 uppercase tracking-wider">
          SPEAK WITH THE VALKYRIES
        </h1>

        <p className="text-xs sm:text-sm text-charcoal-600 font-sans max-w-2xl mx-auto leading-relaxed">
          No generic forms. Speak directly with Freya and Brynhildr. Describe your situation in plain words, and our mythological guardians will mobilize to your aid.
        </p>

        {/* View Mode Toggle */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex items-center p-1 rounded-xl bg-ivory-200/80 border border-gold-300/60 font-mono text-xs">
            <button
              onClick={() => { playClick(); setViewMode('chatbot'); }}
              className={`px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'chatbot'
                  ? 'bg-charcoal-900 text-gold-300 font-bold shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>CONVERSATIONAL CHATBOT (RECOMMENDED)</span>
            </button>
            <button
              onClick={() => { playClick(); setViewMode('wizard'); }}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'wizard'
                  ? 'bg-charcoal-900 text-gold-300 font-bold shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>MANUAL DISPATCH WIZARD</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'chatbot' ? (
        <div className="animate-fade-in">
          <ValkyrieChatbot
            onTrackResponse={onTrackResponse}
            onSuccess={(data) => {
              onRequestSubmitted({
                id: data.id || '#VALK-00000',
                createdAt: data.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                category: 'threat',
                categoryTitle: data.categoryTitle || 'General',
                location: { district: 'Midgard', sector: 'Sector 01', description: 'Chatbot intake', verified: true },
                details: { description: 'Submitted via Valkyrie Chatbot', peopleAffected: 1, anyoneInjured: 'NO', immediateDanger: 'UNKNOWN' },
                triage: {
                  priority: 'HIGH',
                  recommendedGuardian: 'freya',
                  responseType: 'Direct Guardian Dispatch',
                  reasoning: 'Intake validated via conversational AI matrix',
                  estimatedResponseTime: '06 MINUTES',
                  isUnconscious: 'NO',
                  isSupernatural: false
                },
                status: 'RECEIVED',
                statusHistory: [{ status: 'RECEIVED', timestamp: 'Just now', note: 'Received via live chatbot' }]
              });
            }}
          />
        </div>
      ) : (
        <div className="animate-fade-in bg-white p-6 rounded-2xl border border-gold-300 shadow-xl">
          <RequestWizard
            initialCategoryId={initialCategoryId}
            onTrackResponse={onTrackResponse}
            onReturnHome={() => setActivePage('home')}
            onRequestSubmitted={onRequestSubmitted}
          />
        </div>
      )}
    </div>
  );
};
