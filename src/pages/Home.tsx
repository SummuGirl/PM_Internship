import React, { useState } from 'react';
import { Shield, Sparkles, AlertCircle, ArrowRight, Compass, Globe2, BookOpen } from 'lucide-react';
import { ActivePage, EmergencyCategoryId, Mission } from '../types';
import { Hero } from '../components/home/Hero';
import { EmergencyQuickActions } from '../components/home/EmergencyQuickActions';
import { CityAlertBanner } from '../components/home/CityAlertBanner';
import { CityStatus } from '../components/home/CityStatus';
import { FinalCTA } from '../components/home/FinalCTA';
import { MissionCard } from '../components/missions/MissionCard';
import { MissionDetailModal } from '../components/missions/MissionDetailModal';
import { INITIAL_MISSIONS } from '../data/missions';
import { VALKYRIES } from '../data/valkyries';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface HomeProps {
  setActivePage: (page: ActivePage) => void;
  onSelectQuickCategory: (catId: EmergencyCategoryId) => void;
}

export const Home: React.FC<HomeProps> = ({ setActivePage, onSelectQuickCategory }) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const { playClick } = useSoundEffects();

  return (
    <div className="space-y-4">
      {/* 3. Hero */}
      <Hero setActivePage={setActivePage} />

      {/* 4. Emergency Quick Actions */}
      <EmergencyQuickActions onSelectCategory={onSelectQuickCategory} />

      {/* 5. Emergency Alert Banner */}
      <CityAlertBanner />

      {/* 6. Meet the Valkyries Teaser Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            // OPERATIONAL GUARDIAN MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white uppercase mt-1 tracking-wider">
            TWO GUARDIANS. ONE PURPOSE.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
            Freya predicts the vectors of crisis. Brynhildr neutralizes the kinetic threat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Freya Teaser */}
          <div className="bg-gradient-to-br from-[#161118] via-[#0E1017] to-[#0A0D14] border border-amber-500/30 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  FREYA // THE SEER
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
                  ● ONLINE
                </span>
              </div>
              <h3 className="text-3xl font-black font-cinzel text-white">
                “Freya sees the danger.”
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Harnessing Seiðr prophetic awareness, the radiant Brísingamen resonance, and silent aerial Falcon sweeps, Freya identifies catastrophes before they crest and guides civilians through escape corridors.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-black/40 border border-white/5 text-amber-300">
                  Foresight 92%
                </span>
                <span className="px-3 py-1 rounded bg-black/40 border border-white/5 text-amber-300">
                  Civilian Guidance 96%
                </span>
                <span className="px-3 py-1 rounded bg-black/40 border border-white/5 text-amber-300">
                  Protection 89%
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => { playClick(); setActivePage('valkyries'); }}
                className="text-xs font-mono text-amber-300 hover:text-amber-200 font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>EXPLORE THREADS OF FATE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Sparkles className="w-6 h-6 text-amber-400/50" />
            </div>
          </div>

          {/* Brynhildr Teaser */}
          <div className="bg-gradient-to-br from-[#0B1524] via-[#0E1017] to-[#0A0D14] border border-sky-500/30 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                  BRYNHILDR // THE SHIELD-MAIDEN
                </span>
                <span className="px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-xs">
                  ● ONLINE
                </span>
              </div>
              <h3 className="text-3xl font-black font-cinzel text-white">
                “Brynhildr faces the danger.”
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Armed with the legendary Svalinn thermal Aegis and impenetrable kinetic armor, Brynhildr breaches high-rise infernos, structural cave-ins, and hostile incursions to extract endangered mortals.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-black/40 border border-white/5 text-sky-300">
                  Combat Readiness 97%
                </span>
                <span className="px-3 py-1 rounded bg-black/40 border border-white/5 text-sky-300">
                  Defensive Aegis 95%
                </span>
                <span className="px-3 py-1 rounded bg-black/40 border border-white/5 text-sky-300">
                  Tactical Rescue 94%
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => { playClick(); setActivePage('valkyries'); }}
                className="text-xs font-mono text-sky-300 hover:text-sky-200 font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>ACCESS TACTICAL COMMAND</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Shield className="w-6 h-6 text-sky-400/50" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Live Midgard Status */}
      <CityStatus />

      {/* 8. Active Missions Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              // ACTIVE FIELD OPERATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-white uppercase mt-0.5">
              CURRENT VALKYRIE MISSIONS
            </h2>
          </div>
          <button
            onClick={() => { playClick(); setActivePage('missions'); }}
            className="px-5 py-2.5 rounded bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-colors"
          >
            <span>VIEW ALL MISSIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIAL_MISSIONS.slice(0, 3).map(mission => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onSelect={(m) => setSelectedMission(m)}
            />
          ))}
        </div>
      </section>

      {/* 9. Nine Realms Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Globe2 className="w-4 h-4" />
              <span>YGGDRASIL CONSTELLATION OVERVIEW</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-cinzel text-white uppercase">
              THE NINE REALMS
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Explore the celestial architecture linking Midgard to Asgard, Muspelheim, and beyond. Monitor boundary tears and Bifröst bridge stability in real time.
            </p>
            <button
              onClick={() => { playClick(); setActivePage('realms'); }}
              className="px-6 py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
            >
              <span>LAUNCH INTERACTIVE REALM MAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(56,189,248,0.2)]">
            <div className="w-36 h-36 rounded-full border border-amber-500/30 flex items-center justify-center animate-pulse-slow">
              <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-200 font-cinzel font-bold text-xs">
                MIDGARD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Safety Center Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              // CIVILIAN RESILIENCE DIRECTIVES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-white uppercase mt-0.5">
              MIDGARD SAFETY CENTER
            </h2>
          </div>
          <button
            onClick={() => { playClick(); setActivePage('safety'); }}
            className="px-5 py-2.5 rounded bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-colors"
          >
            <span>VIEW ALL PROTOCOLS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'FIRE & THERMAL', desc: 'High-rise egress and flame barriers.', id: 'fire' },
            { title: 'ACTIVE THREATS', desc: 'Barricading and stealth extraction.', id: 'threat' },
            { title: 'REALM BREACHES', desc: 'Bifröst tear survival and spatial hazards.', id: 'unknown' },
            { title: '72-HR SURVIVAL KIT', desc: 'Mandatory supplies for every household.', id: 'kit' },
          ].map(item => (
            <div
              key={item.id}
              onClick={() => { playClick(); setActivePage('safety'); }}
              className="group cursor-pointer bg-[#111722] hover:bg-[#161F2E] border border-white/10 hover:border-cyan-400/40 rounded-xl p-5 transition-all"
            >
              <h4 className="font-bold font-display text-white group-hover:text-cyan-300 transition-colors text-sm">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {item.desc}
              </p>
              <div className="mt-4 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <span>READ GUIDE</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Final CTA */}
      <FinalCTA setActivePage={setActivePage} />

      {/* Mission Detail Modal */}
      {selectedMission && (
        <MissionDetailModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  );
};
