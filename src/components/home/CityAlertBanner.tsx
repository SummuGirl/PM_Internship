import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, X, ShieldAlert, Radio } from 'lucide-react';
import { INITIAL_ALERTS } from '../../data/alerts';
import { CityAlert } from '../../types';
import { Modal } from '../common/Modal';
import { PriorityBadge } from '../common/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const CityAlertBanner: React.FC = () => {
  const [alerts, setAlerts] = useState<CityAlert[]>(INITIAL_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<CityAlert | null>(null);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const { playAlert, playClick } = useSoundEffects();

  const activeAlerts = alerts.filter(a => !dismissedIds.includes(a.id));
  if (activeAlerts.length === 0) return null;

  const currentAlert = activeAlerts[0];

  const handleDismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    setDismissedIds(prev => [...prev, id]);
  };

  const handleOpenAlert = (alert: CityAlert) => {
    playAlert();
    setSelectedAlert(alert);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-red-950/80 via-[#180A0C] to-red-950/80 border-y border-red-500/30 px-4 py-3 relative z-30 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Alert Message */}
          <div
            onClick={() => handleOpenAlert(currentAlert)}
            className="flex items-center gap-3 cursor-pointer group flex-1"
          >
            <div className="flex items-center gap-2 text-red-400 font-mono font-bold tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="hidden sm:inline">MIDGARD ALERT //</span>
            </div>
            <p className="text-slate-200 group-hover:text-white transition-colors font-sans">
              <strong className="text-red-300 font-semibold">{currentAlert.title}:</strong>{' '}
              {currentAlert.summary}
            </p>
          </div>

          {/* Action & Dismiss */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleOpenAlert(currentAlert)}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 rounded font-mono text-[11px] tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>VIEW FULL DISPATCH</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => handleDismiss(currentAlert.id, e)}
              title="Dismiss banner"
              aria-label="Dismiss banner"
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedAlert(null)}
          title={selectedAlert.title}
          subtitle={`SECTOR TELEMETRY // ${selectedAlert.sector}`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <PriorityBadge priority={selectedAlert.severity} />
              <span className="text-xs font-mono text-slate-400">{selectedAlert.timestamp}</span>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                SUMMARY
              </h4>
              <p className="text-slate-200 leading-relaxed font-sans">
                {selectedAlert.summary}
              </p>
            </div>

            <div className="bg-black/40 p-3.5 rounded border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-red-400 mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                TACTICAL READOUT & INSTRUCTIONS
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {selectedAlert.details}
              </p>
            </div>

            <div className="border-t border-white/10 pt-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                AFFECTED DISTRICTS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedAlert.affectedDistricts.map((d, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {selectedAlert.evacuationRecommended && (
              <div className="p-3 bg-red-900/30 border border-red-500/40 rounded text-xs text-red-200 font-mono flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <span>EVACUATION RECOMMENDED FOR UNFORTIFIED DOMICILE RESIDENTS.</span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
