import React, { useState } from 'react';
import { Shield, Zap, AlertOctagon, Users, Swords, CheckCircle2, RotateCcw } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const TacticalCommand: React.FC = () => {
  const [isDeployed, setIsDeployed] = useState(false);
  const [threatLevel, setThreatLevel] = useState(94);
  const [civilians, setCivilians] = useState(17);
  const [hostiles, setHostiles] = useState(6);
  const { showToast } = useToast();
  const { playSuccess, playAlert, playClick } = useSoundEffects();

  const handleDeploy = () => {
    playAlert();
    setIsDeployed(true);
    showToast('BRYNHILDR DEPLOYED. TACTICAL RESPONSE ACTIVE', 'warning');

    // Simulate engagement results
    setTimeout(() => {
      setThreatLevel(42);
      setHostiles(1);
      playSuccess();
    }, 1800);
  };

  const handleReset = () => {
    playClick();
    setIsDeployed(false);
    setThreatLevel(94);
    setHostiles(6);
  };

  return (
    <div className="bg-[#0A101A] border border-sky-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs tracking-widest uppercase">
            <Shield className="w-4 h-4" />
            <span>BRYNHILDR COMBAT DIRECTORY</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white uppercase mt-0.5">
            TACTICAL COMMAND
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isDeployed ? (
            <span className="px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500 text-red-300 font-mono text-xs font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              DEPLOYED // TACTICAL ENGAGEMENT
            </span>
          ) : (
            <span className="px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/40 text-sky-300 font-mono text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              STANDBY // READY FOR DISPATCH
            </span>
          )}
        </div>
      </div>

      {/* Tactical Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs mb-6">
        <div className="bg-black/40 p-4 rounded-xl border border-white/10">
          <span className="text-slate-400 uppercase block text-[10px] mb-1">THREAT LEVEL</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${threatLevel > 60 ? 'text-red-400' : 'text-emerald-400'}`}>
              {threatLevel}%
            </span>
            <AlertOctagon className="w-4 h-4 text-red-400" />
          </div>
          <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full ${threatLevel > 60 ? 'bg-red-500' : 'bg-emerald-500'} transition-all duration-700`}
              style={{ width: `${threatLevel}%` }}
            />
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/10">
          <span className="text-slate-400 uppercase block text-[10px] mb-1">CIVILIANS PRESENT</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{civilians}</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-[10px] text-emerald-400 block mt-2">● EXTRACTION SECURE</span>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/10">
          <span className="text-slate-400 uppercase block text-[10px] mb-1">HOSTILE ANOMALIES</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">{hostiles < 10 ? `0${hostiles}` : hostiles}</span>
            <Swords className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-[10px] text-slate-400 block mt-2">Class 3 Incursion</span>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/10">
          <span className="text-slate-400 uppercase block text-[10px] mb-1">RESCUE ROUTE</span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-cyan-300">AVAILABLE</span>
          </div>
          <span className="text-[10px] text-cyan-400 block mt-2">Corridor 7 Locked</span>
        </div>
      </div>

      {/* Deployment Action Bar */}
      <div className="bg-[#111927] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold block">
            MISSION PRIORITY: CRITICAL
          </span>
          <p className="text-xs text-slate-300 font-sans mt-0.5">
            Authorize kinetic interception and deploy the Svalinn Aegis defensive thermal barrier.
          </p>
        </div>

        {!isDeployed ? (
          <button
            type="button"
            onClick={handleDeploy}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono font-bold text-xs tracking-widest uppercase rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.5)] border border-red-400/50 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span>[ DEPLOY BRYNHILDR ]</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="px-4 py-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded text-emerald-300 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>TACTICAL RESPONSE ACTIVE</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
