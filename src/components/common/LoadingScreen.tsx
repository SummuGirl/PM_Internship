import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Radio, CheckCircle } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'booting' | 'freya_online' | 'bryn_online' | 'realms_stable' | 'ready'>('booting');
  const { playSuccess, playClick } = useSoundEffects();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress > 30 && stage === 'booting') {
      setStage('freya_online');
    }
    if (progress > 65 && stage === 'freya_online') {
      setStage('bryn_online');
    }
    if (progress > 90 && stage === 'bryn_online') {
      setStage('realms_stable');
    }
    if (progress === 100 && stage !== 'ready') {
      setStage('ready');
      playSuccess();
    }
  }, [progress, stage, playSuccess]);

  const handleEnter = () => {
    playClick();
    sessionStorage.setItem('valkyrie_visited', 'true');
    onComplete();
  };

  const filledBlocks = Math.floor(progress / 5);
  const totalBlocks = 20;
  const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(Math.max(0, totalBlocks - filledBlocks));

  return (
    <div className="fixed inset-0 z-[999999] bg-[#08090D] flex flex-col items-center justify-center p-6 text-slate-100 font-mono select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Grid overlay */}
      <div className="absolute inset-0 bg-hero-grid bg-[size:32px_32px] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-[#0D1118]/90 border border-cyan-500/30 rounded-lg p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Header telemetry badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs">
            <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
            <span className="tracking-widest">MIDGARD TELEMETRY LINK</span>
          </div>
          <span className="text-[11px] text-slate-500">SYS_VER 4.2.9</span>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-sky-400">
            VALKYRIE NETWORK
          </h1>
          <p className="text-xs text-slate-400 tracking-[0.25em] mt-1 uppercase">
            GUARDIANS OF MIDGARD
          </p>
          <div className="mt-4 text-xs tracking-widest text-cyan-400/80 animate-pulse">
            INITIALIZING...
          </div>
        </div>

        {/* Connection Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs text-slate-400 tracking-wider">
            <span>MIDGARD CONNECTION</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="bg-black/60 p-2.5 rounded border border-white/10 text-cyan-400 text-sm tracking-widest text-center overflow-hidden">
            <span className="text-cyan-400 font-mono tracking-normal">{progressBar}</span>
            <span className="ml-2 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Guardian & Realm Status Rows */}
        <div className="space-y-3 bg-black/40 p-4 rounded border border-white/5 text-xs mb-8">
          {/* Freya */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300 font-semibold tracking-wider">FREYA</span>
            </div>
            {progress > 30 ? (
              <span className="text-amber-400 font-bold flex items-center gap-1.5 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                ONLINE
              </span>
            ) : (
              <span className="text-slate-600">CONNECTING...</span>
            )}
          </div>

          {/* Brynhildr */}
          <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span className="text-slate-300 font-semibold tracking-wider">BRYNHILDR</span>
            </div>
            {progress > 65 ? (
              <span className="text-sky-400 font-bold flex items-center gap-1.5 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                ONLINE
              </span>
            ) : (
              <span className="text-slate-600">CONNECTING...</span>
            )}
          </div>

          {/* Nine Realms */}
          <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 font-semibold tracking-wider">NINE REALMS</span>
            </div>
            {progress > 90 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                STABLE
              </span>
            ) : (
              <span className="text-slate-600">CALIBRATING...</span>
            )}
          </div>
        </div>

        {/* Enter Button */}
        {stage === 'ready' ? (
          <button
            onClick={handleEnter}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-sky-500/20 hover:from-amber-500/30 hover:via-cyan-500/30 hover:to-sky-500/30 border border-cyan-400 text-cyan-200 font-bold tracking-[0.2em] rounded text-sm transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] flex items-center justify-center gap-3 animate-pulse"
          >
            <span>[ ENTER VALKYRIE NETWORK ]</span>
          </button>
        ) : (
          <div className="w-full py-3.5 text-center text-xs text-slate-500 tracking-widest border border-white/5 rounded">
            ESTABLISHING ENCRYPTED BIFRÖST LINK...
          </div>
        )}
      </div>
    </div>
  );
};
