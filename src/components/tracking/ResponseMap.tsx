import React from 'react';
import { Shield, Sparkles, AlertCircle, Heart, Home } from 'lucide-react';
import { GuardianId, RequestStatus } from '../../types';

interface ResponseMapProps {
  guardian: GuardianId;
  status: RequestStatus;
  incidentLocation: string;
}

export const ResponseMap: React.FC<ResponseMapProps> = ({
  guardian,
  status,
  incidentLocation
}) => {
  // Determine guardian coordinates along route based on status
  let guardianPos = { x: 300, y: 80 }; // base
  if (status === 'EN_ROUTE') guardianPos = { x: 300, y: 170 };
  if (status === 'ON_SCENE' || status === 'RESOLVED') guardianPos = { x: 300, y: 260 };

  const isResolved = status === 'RESOLVED';

  return (
    <div className="bg-[#0B0E14] border border-white/10 rounded-xl p-5 shadow-2xl relative overflow-hidden">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-wider">TACTICAL SECTOR RADAR // MIDGARD S-07</span>
        </div>
        <div className="text-slate-400">
          TARGET: <span className="text-white font-bold">{incidentLocation}</span>
        </div>
      </div>

      {/* SVG Radar Map */}
      <div className="relative w-full h-[340px] sm:h-[380px] bg-[#070A0F] rounded-lg border border-white/5 overflow-hidden">
        <svg
          viewBox="0 0 600 380"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="beaconPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid Background */}
          <rect width="600" height="380" fill="url(#grid)" />

          {/* Radar Circles */}
          <circle cx="300" cy="190" r="80" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1" />
          <circle cx="300" cy="190" r="160" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Sector Boundary Polygonal Zones */}
          <path
            d="M 60 40 L 220 30 L 250 140 L 90 180 Z"
            fill="rgba(56,189,248,0.03)"
            stroke="rgba(56,189,248,0.2)"
            strokeWidth="1"
          />
          <text x="100" y="70" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace">
            DISTRICT 07A [RESIDENTIAL]
          </text>

          <path
            d="M 380 40 L 540 50 L 520 200 L 360 160 Z"
            fill="rgba(229,181,88,0.03)"
            stroke="rgba(229,181,88,0.2)"
            strokeWidth="1"
          />
          <text x="400" y="70" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace">
            DISTRICT 07B [COMMERCIAL SPIRE]
          </text>

          {/* Safe Zone Sanctuaries */}
          <g transform="translate(120, 290)">
            <circle cx="0" cy="0" r="16" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#10b981" />
            <text x="24" y="4" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">
              SAFE ZONE ALPHA
            </text>
          </g>

          <g transform="translate(480, 290)">
            <circle cx="0" cy="0" r="16" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#10b981" />
            <text x="-120" y="4" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">
              FIELD CLINIC BETA
            </text>
          </g>

          {/* Animated Route Line */}
          <path
            d="M 300 70 L 300 270"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-pulse"
          />

          {/* Target Incident Node */}
          <g transform="translate(300, 270)">
            <circle cx="0" cy="0" r="28" fill="url(#beaconPulse)" className="animate-ping opacity-60" />
            <circle cx="0" cy="0" r="14" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
              !
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold" fontFamily="monospace">
              INCIDENT LOCATION
            </text>
          </g>

          {/* Guardian Active Node */}
          <g transform={`translate(${guardianPos.x}, ${guardianPos.y})`} className="transition-all duration-700 ease-in-out">
            <circle
              cx="0"
              cy="0"
              r="22"
              fill={guardian === 'freya' ? 'rgba(229,181,88,0.2)' : 'rgba(56,189,248,0.2)'}
              stroke={guardian === 'freya' ? '#f59e0b' : '#38bdf8'}
              strokeWidth="2"
              className="animate-pulse"
            />
            <circle
              cx="0"
              cy="0"
              r="10"
              fill={guardian === 'freya' ? '#f59e0b' : '#38bdf8'}
            />
            <text
              x="0"
              y="-18"
              textAnchor="middle"
              fill={guardian === 'freya' ? '#fbbf24' : '#7dd3fc'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {guardian === 'dual' ? 'FREYA + BRYNHILDR' : guardian.toUpperCase()}
            </text>
          </g>
        </svg>

        {/* Tactical Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md p-2.5 rounded border border-white/10 text-[10px] font-mono space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-slate-300">Incident Target</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span className="text-slate-300">Guardian Vector</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Sanctuary / Clinic</span>
          </div>
        </div>
      </div>
    </div>
  );
};
