import React, { useState } from 'react';
import { Globe2, Shield, Sparkles, Flame, Snowflake, Mountain, Zap } from 'lucide-react';
import { NINE_REALMS } from '../../data/realms';
import { Realm } from '../../types';
import { RealmDetailModal } from './RealmDetailModal';
import { PriorityBadge } from '../common/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const RealmMap: React.FC = () => {
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);
  const [hoveredRealm, setHoveredRealm] = useState<Realm | null>(null);
  const { playClick, playChime } = useSoundEffects();

  const handleRealmClick = (realm: Realm) => {
    playChime();
    setSelectedRealm(realm);
  };

  const midgard = NINE_REALMS.find(r => r.id === 'midgard') || NINE_REALMS[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          // YGGDRASIL DIMENSIONAL TOPOLOGY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white uppercase mt-1 tracking-wider">
          THE NINE REALMS
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
          Midgard is anchored at the heart of the World Tree. Monitor boundary fluctuations, dimensional anomalies, and Bifröst bridge stability across all realms.
        </p>
      </div>

      {/* Interactive Yggdrasil SVG Nexus Display */}
      <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient celestial background */}
        <div className="absolute inset-0 bg-hero-grid bg-[size:40px_40px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Circular / Yggdrasil Canvas Container */}
        <div className="relative w-full aspect-square max-w-[640px] mx-auto">
          <svg
            viewBox="0 0 600 600"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Radial glow for Midgard core */}
              <radialGradient id="midgardCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#08090D" stopOpacity="0" />
              </radialGradient>
              {/* Gradient lines for Bifröst conduits */}
              <linearGradient id="bifrostLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5b558" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#9d4edd" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Orbit Guides */}
            <circle cx="300" cy="300" r="130" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="8 8" />

            {/* Bifröst Branch Lines from Midgard (Center 300, 300) to each realm */}
            {NINE_REALMS.filter(r => r.id !== 'midgard').map(r => {
              const targetX = (r.coordinates.x / 100) * 600;
              const targetY = (r.coordinates.y / 100) * 600;
              const isTargetHovered = hoveredRealm?.id === r.id;

              return (
                <g key={`line-${r.id}`}>
                  <line
                    x1="300"
                    y1="300"
                    x2={targetX}
                    y2={targetY}
                    stroke={isTargetHovered ? '#38bdf8' : 'rgba(56,189,248,0.2)'}
                    strokeWidth={isTargetHovered ? '2.5' : '1.5'}
                    strokeDasharray={r.status === 'UNSTABLE' ? '4 4' : undefined}
                    className="transition-all duration-300"
                  />
                  {/* Flowing energy particles */}
                  <circle
                    cx={(300 + targetX) / 2}
                    cy={(300 + targetY) / 2}
                    r="2"
                    fill="#38bdf8"
                    className="animate-ping opacity-60"
                  />
                </g>
              );
            })}

            {/* Midgard Ambient Core Area */}
            <circle cx="300" cy="300" r="90" fill="url(#midgardCore)" />

            {/* Render Nodes for each Realm */}
            {NINE_REALMS.map(realm => {
              const cx = (realm.coordinates.x / 100) * 600;
              const cy = (realm.coordinates.y / 100) * 600;
              const isMidgard = realm.id === 'midgard';
              const isHovered = hoveredRealm?.id === realm.id;
              const isUnstable = realm.status === 'UNSTABLE';

              const nodeColor = isMidgard
                ? '#38bdf8'
                : realm.threatLevel === 'CRITICAL'
                ? '#ef4444'
                : realm.threatLevel === 'HIGH'
                ? '#f97316'
                : '#e5b558';

              return (
                <g
                  key={realm.id}
                  transform={`translate(${cx}, ${cy})`}
                  onClick={() => handleRealmClick(realm)}
                  onMouseEnter={() => setHoveredRealm(realm)}
                  onMouseLeave={() => setHoveredRealm(null)}
                  className="cursor-pointer transition-transform duration-200 hover:scale-110"
                >
                  {/* Pulsing ring for Midgard or Unstable realms */}
                  {(isMidgard || isUnstable) && (
                    <circle
                      cx="0"
                      cy="0"
                      r={isMidgard ? '36' : '24'}
                      fill="none"
                      stroke={nodeColor}
                      strokeWidth="1.5"
                      className="animate-ping opacity-40"
                    />
                  )}

                  {/* Outer Node Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isMidgard ? '28' : '18'}
                    fill="#0D1118"
                    stroke={isHovered ? '#ffffff' : nodeColor}
                    strokeWidth={isMidgard ? '2.5' : '1.5'}
                    className="shadow-xl"
                  />

                  {/* Inner glowing dot */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isMidgard ? '12' : '6'}
                    fill={nodeColor}
                  />

                  {/* Realm Label */}
                  <text
                    x="0"
                    y={isMidgard ? 44 : 32}
                    textAnchor="middle"
                    fill={isMidgard ? '#38bdf8' : isHovered ? '#ffffff' : '#cbd5e1'}
                    fontSize={isMidgard ? '12' : '10'}
                    fontWeight={isMidgard ? 'bold' : '600'}
                    fontFamily="monospace"
                    letterSpacing="1px"
                  >
                    {realm.name}
                  </text>
                  
                  {isMidgard && (
                    <text
                      x="0"
                      y="56"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      [CURRENT REALM]
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover / Selected Preview Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">INSPECTING:</span>
            <span className="text-cyan-300 font-bold text-sm">
              {(hoveredRealm || midgard).name}
            </span>
            <PriorityBadge priority={(hoveredRealm || midgard).threatLevel} size="sm" />
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>STATUS: <strong className="text-white">{(hoveredRealm || midgard).status}</strong></span>
            <span>MISSIONS: <strong className="text-cyan-300">{(hoveredRealm || midgard).activeMissions}</strong></span>
            <button
              onClick={() => handleRealmClick(hoveredRealm || midgard)}
              className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 rounded tracking-wider uppercase font-bold text-[11px]"
            >
              VIEW REALM DOSSIER
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Realm Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {NINE_REALMS.map(realm => {
          const isMidgard = realm.id === 'midgard';
          return (
            <div
              key={realm.id}
              onClick={() => handleRealmClick(realm)}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 hover:-translate-y-1 ${
                isMidgard
                  ? 'bg-cyan-950/30 border-cyan-400/50 shadow-[0_0_25px_rgba(56,189,248,0.2)]'
                  : 'bg-[#111722]/80 border-white/10 hover:border-cyan-400/40 hover:bg-[#161F2E]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400">
                  {realm.norseName}
                </span>
                <PriorityBadge priority={realm.threatLevel} size="sm" />
              </div>

              <h3 className="text-lg font-bold font-display text-white">
                {realm.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {realm.title}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>STATUS: <strong className="text-slate-200">{realm.status}</strong></span>
                <span className="text-cyan-300 font-semibold">ACCESS DATA →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Realm Detail Modal */}
      {selectedRealm && (
        <RealmDetailModal
          realm={selectedRealm}
          onClose={() => setSelectedRealm(null)}
        />
      )}
    </div>
  );
};
