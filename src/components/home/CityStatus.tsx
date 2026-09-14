import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Globe2, Radio, Zap } from 'lucide-react';

export const CityStatus: React.FC = () => {
  const [stats, setStats] = useState({
    civilianSafety: 91,
    realmStability: 78,
    emergencyResponse: 94,
    portalStability: 82,
    critical: 2,
    high: 5,
    moderate: 8,
    resolved: 12
  });

  // Subtle simulated telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        civilianSafety: Math.min(99, Math.max(88, prev.civilianSafety + (Math.random() > 0.5 ? 1 : -1))),
        realmStability: Math.min(85, Math.max(74, prev.realmStability + (Math.random() > 0.6 ? 1 : -1))),
        emergencyResponse: Math.min(98, Math.max(90, prev.emergencyResponse + (Math.random() > 0.5 ? 1 : -1))),
        portalStability: Math.min(89, Math.max(79, prev.portalStability + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: 'CIVILIAN SAFETY', value: stats.civilianSafety, icon: ShieldCheck, color: 'text-emerald-400', barColor: 'bg-emerald-500' },
    { label: 'REALM STABILITY', value: stats.realmStability, icon: Globe2, color: 'text-sky-400', barColor: 'bg-sky-500' },
    { label: 'EMERGENCY RESPONSE', value: stats.emergencyResponse, icon: Zap, color: 'text-amber-400', barColor: 'bg-amber-500' },
    { label: 'PORTAL STABILITY', value: stats.portalStability, icon: Radio, color: 'text-purple-400', barColor: 'bg-purple-500' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-y border-white/10 bg-[#0B0E14]/70 my-10 rounded-2xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>REAL-TIME DISTRICT TELEMETRY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white mt-1 uppercase tracking-wider">
            MIDGARD // LIVE STATUS
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded border border-white/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>BIFRÖST NETWORK FREQ: 984.2 THz</span>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map(metric => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-[#111722] border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 tracking-wider">
                  {metric.label}
                </span>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-mono font-black text-white">
                  {metric.value}%
                </span>
                <span className="text-[10px] font-mono text-emerald-400">● OPTIMAL</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full ${metric.barColor} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Incident Counter Strip */}
      <div className="bg-[#0D121B] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-mono tracking-widest text-slate-300 font-semibold uppercase">
          ACTIVE INCIDENTS ACROSS MIDGARD:
        </span>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span className="text-slate-300 font-bold">{stats.critical < 10 ? `0${stats.critical}` : stats.critical}</span>
            <span className="text-slate-400 text-[11px]">CRITICAL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
            <span className="text-slate-300 font-bold">{stats.high < 10 ? `0${stats.high}` : stats.high}</span>
            <span className="text-slate-400 text-[11px]">HIGH</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" />
            <span className="text-slate-300 font-bold">{stats.moderate < 10 ? `0${stats.moderate}` : stats.moderate}</span>
            <span className="text-slate-400 text-[11px]">MODERATE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="text-slate-300 font-bold">{stats.resolved}</span>
            <span className="text-slate-400 text-[11px]">RESOLVED</span>
          </div>
        </div>
      </div>
    </section>
  );
};
