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
  onOpenChatbot?: () => void;
}

export const Home: React.FC<HomeProps> = ({ setActivePage, onSelectQuickCategory, onOpenChatbot }) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const { playClick } = useSoundEffects();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Hero Section */}
      <Hero
        setActivePage={setActivePage}
        onOpenChatbot={onOpenChatbot}
      />

      {/* 2. Emergency Quick Actions */}
      <EmergencyQuickActions onSelectCategory={onSelectQuickCategory} />

      {/* 3. Emergency Alert Banner */}
      <CityAlertBanner />

      {/* 4. Meet the Valkyries Teaser Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-gold-800 uppercase tracking-widest font-bold">
            // OPERATIONAL GUARDIAN MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-charcoal-950 uppercase mt-1 tracking-wider">
            TWO GUARDIANS. ONE PURPOSE.
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2 font-sans">
            Freya predicts the vectors of crisis. Brynhildr neutralizes the kinetic threat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Freya Teaser Card */}
          <div className="bg-white border-2 border-gold-300/80 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all norse-gold-corners">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gold-800 uppercase tracking-widest font-bold">
                  FREYA // THE SEER
                </span>
                <span className="px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 font-mono text-xs font-bold">
                  ● ACTIVE
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-charcoal-950">
                “Freya sees the danger.”
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
                Harnessing Seiðr prophetic awareness, the radiant Brísingamen resonance, and silent aerial Falcon sweeps, Freya identifies catastrophes before they crest and guides civilians through escape corridors.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-lg bg-gold-50 border border-gold-200 text-gold-900">
                  Foresight 92%
                </span>
                <span className="px-3 py-1 rounded-lg bg-gold-50 border border-gold-200 text-gold-900">
                  Civilian Guidance 96%
                </span>
                <span className="px-3 py-1 rounded-lg bg-gold-50 border border-gold-200 text-gold-900">
                  Protection 89%
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gold-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => { playClick(); setActivePage('valkyries'); }}
                className="text-xs font-mono text-gold-800 hover:text-gold-950 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <span>EXPLORE THREADS OF FATE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Sparkles className="w-6 h-6 text-gold-500" />
            </div>
          </div>

          {/* Brynhildr Teaser Card */}
          <div className="bg-white border-2 border-gold-300/80 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all norse-gold-corners">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-charcoal-700 uppercase tracking-widest font-bold">
                  BRYNHILDR // THE SHIELD-MAIDEN
                </span>
                <span className="px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 font-mono text-xs font-bold">
                  ● ACTIVE
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-charcoal-950">
                “Brynhildr faces the danger.”
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
                Armed with the legendary Svalinn thermal Aegis and impenetrable kinetic armor, Brynhildr breaches high-rise infernos, structural cave-ins, and hostile incursions to extract endangered mortals.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-lg bg-gold-50 border border-gold-200 text-charcoal-800">
                  Combat Readiness 97%
                </span>
                <span className="px-3 py-1 rounded-lg bg-gold-50 border border-gold-200 text-charcoal-800">
                  Defensive Aegis 95%
                </span>
                <span className="px-3 py-1 rounded-lg bg-gold-50 border border-gold-200 text-charcoal-800">
                  Tactical Rescue 94%
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gold-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => { playClick(); setActivePage('valkyries'); }}
                className="text-xs font-mono text-charcoal-800 hover:text-charcoal-950 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <span>ACCESS TACTICAL COMMAND</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Shield className="w-6 h-6 text-charcoal-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Live Midgard Status */}
      <CityStatus />

      {/* 6. Active Missions Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-gold-800 uppercase tracking-widest font-bold">
              // ACTIVE FIELD OPERATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-charcoal-950 uppercase mt-0.5">
              CURRENT VALKYRIE MISSIONS
            </h2>
          </div>
          <button
            onClick={() => { playClick(); setActivePage('missions'); }}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-gold-50 border border-gold-300 text-xs font-mono text-charcoal-900 font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
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

      {/* 7. Nine Realms Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gold-200">
        <div className="bg-white border-2 border-gold-300/80 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono text-gold-800 uppercase tracking-widest flex items-center gap-2 font-bold">
              <Globe2 className="w-4 h-4 text-gold-600" />
              <span>YGGDRASIL CONSTELLATION OVERVIEW</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-cinzel text-charcoal-950 uppercase">
              THE NINE REALMS
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
              Explore the celestial architecture linking Midgard to Asgard, Muspelheim, and beyond. Monitor boundary tears and Bifröst bridge stability in real time.
            </p>
            <button
              onClick={() => { playClick(); setActivePage('realms'); }}
              className="px-6 py-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-gold-300 font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>LAUNCH INTERACTIVE REALM MAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-gold-300 flex items-center justify-center relative shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-gold-50/50">
            <div className="w-36 h-36 rounded-full border border-gold-400 flex items-center justify-center animate-pulse-slow">
              <div className="w-20 h-20 rounded-full bg-charcoal-900 border-2 border-gold-400 flex items-center justify-center text-gold-300 font-cinzel font-bold text-xs shadow-md">
                MIDGARD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
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
