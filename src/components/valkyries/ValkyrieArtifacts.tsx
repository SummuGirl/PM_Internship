import React, { useState } from 'react';
import { Sparkles, Wind, Compass, ShieldCheck, Zap, Crosshair, ArrowUpRight } from 'lucide-react';
import { VALKYRIES } from '../../data/valkyries';
import { Modal } from '../common/Modal';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const ValkyrieArtifacts: React.FC = () => {
  const [selectedArtifact, setSelectedArtifact] = useState<{
    name: string;
    title: string;
    description: string;
    status: string;
    metricLabel: string;
    metricValue: number;
    owner: string;
  } | null>(null);

  const { playClick, playChime } = useSoundEffects();

  const allArtifacts = [
    ...VALKYRIES.freya.artifacts.map(a => ({ ...a, owner: 'FREYA' })),
    ...VALKYRIES.brynhildr.artifacts.map(a => ({ ...a, owner: 'BRYNHILDR' }))
  ];

  const getIcon = (name: string) => {
    if (name.includes('BRÍSINGAMEN')) return <Sparkles className="w-5 h-5 text-amber-300" />;
    if (name.includes('FALCON')) return <Wind className="w-5 h-5 text-amber-300" />;
    if (name.includes('CHARIOT')) return <Compass className="w-5 h-5 text-amber-300" />;
    if (name.includes('SVALINN')) return <ShieldCheck className="w-5 h-5 text-sky-300" />;
    if (name.includes('SPEAR')) return <Zap className="w-5 h-5 text-sky-300" />;
    return <Crosshair className="w-5 h-5 text-sky-300" />;
  };

  const handleOpenArtifact = (art: typeof allArtifacts[0]) => {
    playChime();
    setSelectedArtifact(art);
  };

  return (
    <div className="my-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          // SACRED & TACTICAL ARTIFACTS
        </span>
        <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white uppercase mt-1">
          MYTHIC GEAR & TECHNOLOGY
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-sans">
          Click any artifact to access technical specifications and mythological origins.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allArtifacts.map(art => {
          const isFreya = art.owner === 'FREYA';
          return (
            <div
              key={art.name}
              onClick={() => handleOpenArtifact(art)}
              className={`group cursor-pointer rounded-xl border p-5 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between ${
                isFreya
                  ? 'bg-[#141017]/90 border-amber-500/20 hover:border-amber-400/50 shadow-[0_0_20px_rgba(229,181,88,0.1)]'
                  : 'bg-[#0B131E]/90 border-sky-500/20 hover:border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    isFreya ? 'bg-amber-500/10 border-amber-500/30' : 'bg-sky-500/10 border-sky-500/30'
                  }`}>
                    {getIcon(art.name)}
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                    isFreya ? 'text-amber-300 bg-amber-500/10 border-amber-500/30' : 'text-sky-300 bg-sky-500/10 border-sky-500/30'
                  }`}>
                    {art.owner}
                  </span>
                </div>

                <h4 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {art.name}
                </h4>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {art.title}
                </div>
                <p className="text-xs text-slate-300 mt-2 font-sans line-clamp-2 leading-relaxed">
                  {art.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">{art.metricLabel}</span>
                  <span className={`font-bold ${isFreya ? 'text-amber-400' : 'text-sky-400'}`}>
                    {art.metricValue}% • {art.status}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Artifact Modal */}
      {selectedArtifact && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedArtifact(null)}
          title={selectedArtifact.name}
          subtitle={`${selectedArtifact.owner} // ${selectedArtifact.title}`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
              <span className="text-cyan-400">STATUS: {selectedArtifact.status}</span>
              <span className="text-white font-bold">{selectedArtifact.metricLabel}: {selectedArtifact.metricValue}%</span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {selectedArtifact.description}
            </p>

            <div className="bg-black/40 p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2">
              <span className="text-slate-400 uppercase text-[10px] block">
                MYTHOLOGICAL ORIGIN REFERENCE:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedArtifact.owner === 'FREYA'
                  ? 'Inspired by the mythological lore of Freyja in the Poetic and Prose Eddas, reimagined as futuristic spatial stabilization devices.'
                  : 'Inspired by the heroic Eddic cycle and shield-maiden defensive traditions, adapted into heavy kinetic structural rescue armor.'}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
