import React, { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2, Sparkles, MessageSquare, Shield } from 'lucide-react';
import { ValkyrieChatbot } from './ValkyrieChatbot';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { EmergencyRequest } from '../../types';

interface ImmediateWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted?: (req: EmergencyRequest) => void;
  onTrackResponse?: (requestId: string) => void;
}

export const ImmediateWelcomeModal: React.FC<ImmediateWelcomeModalProps> = ({
  isOpen,
  onClose,
  onRequestSubmitted,
  onTrackResponse
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { playClick } = useSoundEffects();

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
        <button
          onClick={() => {
            playClick();
            setIsMinimized(false);
          }}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-charcoal-900 border-2 border-gold-400 text-ivory-50 shadow-2xl hover:bg-charcoal-800 transition-all transform hover:scale-105"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center text-charcoal-950 font-bold">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-charcoal-900 animate-ping" />
          </div>
          <div className="text-left font-mono">
            <div className="text-[11px] font-bold text-gold-300 tracking-wider">
              VALKYRIE CHATBOT ACTIVE
            </div>
            <div className="text-[10px] text-charcoal-400">
              Click to resume with Freya
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border-2 border-gold-400/80 shadow-[0_25px_60px_-15px_rgba(212,175,55,0.3)] overflow-hidden animate-slide-up my-auto">
        {/* Top Control Bar */}
        <div className="bg-charcoal-900 text-ivory-50 px-5 py-2.5 flex items-center justify-between border-b border-gold-400/40">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gold-300 font-bold tracking-widest uppercase">
              IMMEDIATE VALKYRIE INTAKE INTERFACE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setIsMinimized(true);
              }}
              title="Minimize Chatbot"
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-gold-300 hover:bg-white/10 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              title="Close Portal"
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Chatbot */}
        <div className="p-2 sm:p-4 bg-ivory-100">
          <ValkyrieChatbot
            isCompact={true}
            onTrackResponse={(reqId) => {
              if (onTrackResponse) onTrackResponse(reqId);
              onClose();
            }}
            onSuccess={(data) => {
              if (onRequestSubmitted) {
                onRequestSubmitted({
                  id: data.id || '#VALK-00000',
                  createdAt: data.createdAt || new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  category: 'threat',
                  categoryTitle: data.categoryTitle || 'General',
                  location: { district: 'Midgard', sector: 'Sector 01', description: 'Chat intake', verified: true },
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
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
