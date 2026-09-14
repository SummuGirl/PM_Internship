import React, { useState } from 'react';
import { Sparkles, Shield, Compass, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { VALKYRIES } from '../data/valkyries';
import { FateThreads } from '../components/valkyries/FateThreads';
import { TacticalCommand } from '../components/valkyries/TacticalCommand';
import { ValkyrieArtifacts } from '../components/valkyries/ValkyrieArtifacts';
import { ValkyrieComparison } from '../components/valkyries/ValkyrieComparison';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const ValkyriesLorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'freya' | 'brynhildr' | 'lore'>('all');
  const { playClick } = useSoundEffects();

  const freya = VALKYRIES.freya;
  const bryn = VALKYRIES.brynhildr;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          // ARCHIVAL & LORE REPOSITORY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white uppercase mt-1 tracking-wider">
          KNOW THE VALKYRIES
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
          Two guardians safeguarding Midgard through complementary disciplines. Intelligence & foresight paired with kinetic combat defense.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mt-6 font-mono text-xs">
          {(['all', 'freya', 'brynhildr', 'lore'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { playClick(); setActiveTab(tab); }}
              className={`px-4 py-2 rounded-lg uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                  : 'bg-[#111722] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {tab === 'all' ? 'ALL GUARDIANS' : tab === 'freya' ? 'FREYA' : tab === 'brynhildr' ? 'BRYNHILDR' : 'MYTHOLOGY LORE'}
            </button>
          ))}
        </div>
      </div>

      {/* FREYA SECTION */}
      {(activeTab === 'all' || activeTab === 'freya') && (
        <section className="bg-gradient-to-br from-[#181211] via-[#0E1017] to-[#0A0D14] border border-amber-500/30 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>INTELLIGENCE & FORESIGHT COMMANDER</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-cinzel text-white uppercase">
                {freya.name}
              </h2>
              <div className="text-sm font-cinzel font-semibold text-amber-300 tracking-[0.2em] uppercase">
                {freya.title}
              </div>
              <blockquote className="border-l-2 border-amber-400/50 pl-4 text-slate-200 font-display italic text-base">
                “{freya.tagline}”
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-2">
                {freya.description}
              </p>

              {/* Domains */}
              <div className="flex flex-wrap gap-2 pt-2">
                {freya.domains.map(d => (
                  <span
                    key={d}
                    className="text-[11px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Box */}
            <div className="bg-black/50 border border-amber-500/30 rounded-2xl p-6 w-full lg:w-80 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-slate-400 uppercase">TELEMETRY STATUS</span>
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {freya.stats.map(s => (
                <div key={s.label} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[11px] text-slate-400">{s.label}</span>
                    <span className="text-amber-300 font-bold">{s.value}%</span>
                  </div>
                  <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Threads of Fate Interactive */}
          <FateThreads />
        </section>
      )}

      {/* BRYNHILDR SECTION */}
      {(activeTab === 'all' || activeTab === 'brynhildr') && (
        <section className="bg-gradient-to-br from-[#0B1522] via-[#0E1017] to-[#0A0D14] border border-sky-500/30 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-widest">
                <Shield className="w-4 h-4" />
                <span>TACTICAL RESCUE & COMBAT BASTION</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-cinzel text-white uppercase">
                {bryn.name}
              </h2>
              <div className="text-sm font-cinzel font-semibold text-sky-300 tracking-[0.2em] uppercase">
                {bryn.title}
              </div>
              <blockquote className="border-l-2 border-sky-400/50 pl-4 text-slate-200 font-display italic text-base">
                “{bryn.tagline}”
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-2">
                {bryn.description}
              </p>

              {/* Domains */}
              <div className="flex flex-wrap gap-2 pt-2">
                {bryn.domains.map(d => (
                  <span
                    key={d}
                    className="text-[11px] font-mono font-bold bg-sky-500/10 border border-sky-500/30 text-sky-300 px-3 py-1 rounded"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Box */}
            <div className="bg-black/50 border border-sky-500/30 rounded-2xl p-6 w-full lg:w-80 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-slate-400 uppercase">TELEMETRY STATUS</span>
                <span className="text-sky-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {bryn.stats.map(s => (
                <div key={s.label} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[11px] text-slate-400">{s.label}</span>
                    <span className="text-sky-300 font-bold">{s.value}%</span>
                  </div>
                  <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-400 h-full rounded-full"
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Command Interactive */}
          <TacticalCommand />
        </section>
      )}

      {/* Artifacts Showcase */}
      {(activeTab === 'all' || activeTab === 'freya' || activeTab === 'brynhildr') && (
        <ValkyrieArtifacts />
      )}

      {/* Head-to-Head Comparison Matrix */}
      {(activeTab === 'all' || activeTab === 'freya' || activeTab === 'brynhildr') && (
        <ValkyrieComparison />
      )}

      {/* Dedicated Lore & Norse Inspiration Section */}
      {(activeTab === 'all' || activeTab === 'lore') && (
        <section className="bg-[#0D1118] border border-white/10 rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>MYTHOLOGICAL FOUNDATIONS & REINTERPRETATION</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-cinzel text-white uppercase mt-1">
              THE MYTHOS BEHIND VALKYRIE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            <div className="space-y-3 bg-black/30 p-6 rounded-xl border border-white/5">
              <h4 className="text-base font-bold font-cinzel text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>FREYA (FREYJA OF THE VANIR)</span>
              </h4>
              <p>
                In the classical Poetic and Prose Eddas, Freyja is revered for her mastery of <em>seiðr</em>—the ancient Norse tradition of foresight, fate-weaving, and deep perception. She presides over the heavenly meadow of Fólkvangr, choosing half of those who perish bravely in mortal realms.
              </p>
              <p>
                Her iconography features the radiant toroidal necklace <strong>Brísingamen</strong>, a chariot pulled by great blue-grey cats, and a magical feather cloak allowing flight across realm horizons. VALKYRIE adapts these sacred motifs into an optical intelligence network and compassionate civil protection agency.
              </p>
            </div>

            <div className="space-y-3 bg-black/30 p-6 rounded-xl border border-white/5">
              <h4 className="text-base font-bold font-cinzel text-sky-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>BRYNHILDR (THE SHIELD-MAIDEN)</span>
              </h4>
              <p>
                Brynhildr embodies the immortal archetype of the warrior Valkyrie and defiant shield-maiden. Renowned across heroic Germanic and Norse poems (including the Völsunga saga), her legend is rooted in unflinching honor, tactical brilliance, and the courage to defy even divine dictates when mortal justice demanded it.
              </p>
              <p>
                VALKYRIE interprets her shield and spear not as instruments of conquest, but as an impenetrable emergency aegis. She stands between civilians and fires, collapsing beams, and hostile anomalies—the physical bulwark that preserves mortal life.
              </p>
            </div>
          </div>

          {/* Subtly placed disclaimer */}
          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl text-xs text-amber-300/90 font-mono flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-bold mb-0.5">NOTE ON CREATIVE INTERPRETATION:</strong>
              VALKYRIE is a fictional modern interpretation inspired by Norse mythology. Characters and technological systems are original creative reimaginings designed for this emergency response platform.
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
