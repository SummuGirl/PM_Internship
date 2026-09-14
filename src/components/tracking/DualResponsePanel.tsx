import React from 'react';
import { Sparkles, Shield, Compass, Activity, Eye, Zap } from 'lucide-react';
import { RequestStatus } from '../../types';

interface DualResponsePanelProps {
  status: RequestStatus;
}

export const DualResponsePanel: React.FC<DualResponsePanelProps> = ({ status }) => {
  return (
    <div className="bg-[#0E0F18] border border-purple-500/40 rounded-xl p-6 shadow-2xl relative overflow-hidden my-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">
            SYNERGISTIC DEPLOYMENT PROTOCOL
          </span>
          <h3 className="text-xl sm:text-2xl font-black font-cinzel text-white uppercase tracking-wider">
            DUAL VALKYRIE RESPONSE
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-500/40 px-3 py-1.5 rounded-full text-purple-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>PARALLEL TELEMETRY SYNCHRONIZED</span>
        </div>
      </div>

      {/* Two Parallel Status Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Freya's Channel */}
        <div className="bg-[#17120B]/90 border border-amber-500/30 rounded-xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-white text-lg">FREYA</h4>
                <p className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">
                  THE SEER • CHANNEL ALPHA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-black/40 px-2.5 py-1 rounded border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{status === 'RESOLVED' ? 'COMPLETE' : 'ANALYZING'}</span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/5 mb-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              PRIMARY TACTICAL DOCTRINE
            </span>
            <div className="font-mono text-xs font-bold text-amber-200 tracking-wider flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>LOCATE • PREDICT • GUIDE</span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-500">Seiðr Resonance:</span>
              <span className="text-amber-300 font-bold">96.4% Coherence</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-500">Falcon Cloak Sweep:</span>
              <span className="text-emerald-400">Sector Perimeter Mapped</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Evacuation Route:</span>
              <span className="text-cyan-300">Conduit 4B Optimal</span>
            </div>
          </div>
        </div>

        {/* Brynhildr's Channel */}
        <div className="bg-[#0B1522]/90 border border-sky-500/30 rounded-xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/50 flex items-center justify-center text-sky-300">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-white text-lg">BRYNHILDR</h4>
                <p className="text-[10px] font-mono text-sky-300 uppercase tracking-widest">
                  THE SHIELD-MAIDEN • CHANNEL BRAVO
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400 bg-black/40 px-2.5 py-1 rounded border border-sky-500/30">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>{status === 'RESOLVED' ? 'COMPLETE' : 'RESPONDING'}</span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/5 mb-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              PRIMARY TACTICAL DOCTRINE
            </span>
            <div className="font-mono text-xs font-bold text-sky-200 tracking-wider flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>DEFEND • RESCUE • EXTRACT</span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-500">Svalinn Aegis Field:</span>
              <span className="text-sky-300 font-bold">100% Structural Intercept</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-500">Breach Readiness:</span>
              <span className="text-emerald-400">Kinetic Lance Armed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Civilian Extraction:</span>
              <span className="text-cyan-300">Corridor Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
