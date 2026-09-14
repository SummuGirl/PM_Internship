import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Eye, Compass, Activity, Sliders, RefreshCw } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const FateThreads: React.FC = () => {
  const [districtSector, setDistrictSector] = useState<'sector07' | 'sector12' | 'sector01'>('sector07');
  const [civilianDensity, setCivilianDensity] = useState<number>(35);
  const [calculatedSuccess, setCalculatedSuccess] = useState<number>(86);
  const [calculatedAtRisk, setCalculatedAtRisk] = useState<number>(12);
  const [projectedThreat, setProjectedThreat] = useState<'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'>('MODERATE');
  const [recommendation, setRecommendation] = useState<string>('EVACUATE EASTERN SECTOR SKYWAYS TO GROUND CONDUITS');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playClick, playChime } = useSoundEffects();

  // Canvas animated glowing woven threads
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numThreads = 7;
      for (let i = 0; i < numThreads; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;

        // Gradient glow
        const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grad.addColorStop(0, 'rgba(229, 181, 88, 0.05)');
        grad.addColorStop(0.5, i % 2 === 0 ? 'rgba(229, 181, 88, 0.7)' : 'rgba(244, 114, 182, 0.6)');
        grad.addColorStop(1, 'rgba(157, 78, 221, 0.1)');
        ctx.strokeStyle = grad;

        const yOffset = (canvas.height / (numThreads + 1)) * (i + 1);
        ctx.moveTo(0, yOffset);

        for (let x = 0; x < canvas.width; x += 10) {
          const wave1 = Math.sin(x * 0.015 + time + i) * 22;
          const wave2 = Math.cos(x * 0.03 - time * 0.8 + i) * 12;
          ctx.lineTo(x, yOffset + wave1 + wave2);
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleRecalculate = () => {
    playChime();
    const success = Math.floor(75 + Math.random() * 22);
    const atRisk = Math.floor((civilianDensity * 0.35) + Math.random() * 5);
    setCalculatedSuccess(success);
    setCalculatedAtRisk(atRisk);

    if (civilianDensity > 60) {
      setProjectedThreat('HIGH');
      setRecommendation('ESTABLISH SECONDARY FALCON AIRWAY DIVERSION IMMEDIATELY');
    } else if (civilianDensity > 25) {
      setProjectedThreat('MODERATE');
      setRecommendation('EVACUATE EASTERN SECTOR SKYWAYS TO GROUND CONDUITS');
    } else {
      setProjectedThreat('LOW');
      setRecommendation('MAINTAIN PASSIVE SEIÐR SURVEILLANCE MATRIX');
    }
  };

  return (
    <div className="bg-[#120F16] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>FREYA SPECIALIZED TELEMETRY MATRIX</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white uppercase mt-0.5">
            THREADS OF FATE
          </h3>
        </div>
        <div className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-400" />
          <span>PROBABILISTIC FORESIGHT ENGINE</span>
        </div>
      </div>

      {/* Interactive Threads Canvas Canvas */}
      <div className="relative w-full h-44 bg-black/60 rounded-xl border border-amber-500/20 overflow-hidden mb-6 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={700}
          height={180}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-2 text-center text-[10px] font-mono text-amber-300/80 tracking-widest uppercase pointer-events-none">
          ● REAL-TIME SEIÐR HARMONIC STRANDS // DIVERGENCE RESISTANCE: 0.04%
        </div>
      </div>

      {/* Simulator Controls & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-black/40 p-5 rounded-xl border border-white/10 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold block flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>FATE CALIBRATION CONTROLS</span>
          </span>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">
              TARGET SECTOR CODES
            </label>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              {(['sector07', 'sector12', 'sector01'] as const).map(sec => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => { playClick(); setDistrictSector(sec); }}
                  className={`py-2 rounded border transition-all ${
                    districtSector === sec
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  {sec.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">CIVILIAN DENSITY FACTOR</span>
              <span className="text-amber-400 font-bold">{civilianDensity} Civilians / 100m²</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={civilianDensity}
              onChange={(e) => setCivilianDensity(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={handleRecalculate}
            className="w-full py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>CALCULATE FATE PROJECTIONS</span>
          </button>
        </div>

        {/* Readout Output */}
        <div className="bg-[#17120B] p-5 rounded-xl border border-amber-500/30 space-y-4 font-mono text-xs">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
            PROJECTED SITUATIONAL METRICS
          </span>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/40 p-3 rounded border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">PROBABILITY OF SUCCESS</span>
              <span className="text-2xl font-bold text-emerald-400">{calculatedSuccess}%</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">CIVILIANS AT RISK</span>
              <span className="text-2xl font-bold text-amber-300">{calculatedAtRisk}</span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded border border-white/5 flex items-center justify-between">
            <span className="text-slate-400 uppercase">PROJECTED THREAT LEVEL</span>
            <span className={`font-bold px-2 py-0.5 rounded ${
              projectedThreat === 'HIGH' ? 'text-red-400 bg-red-950/40' : 'text-yellow-400 bg-yellow-950/40'
            }`}>
              {projectedThreat}
            </span>
          </div>

          <div className="bg-black/50 p-3.5 rounded border border-amber-500/20 space-y-1">
            <span className="text-[10px] text-amber-400 uppercase font-bold block">
              RECOMMENDATION
            </span>
            <p className="text-xs text-slate-200 font-sans leading-relaxed">
              {recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
