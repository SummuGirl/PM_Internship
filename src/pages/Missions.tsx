import React, { useState } from 'react';
import { Shield, Search, Filter, Activity, Sparkles } from 'lucide-react';
import { Mission, GuardianId, PriorityLevel } from '../types';
import { INITIAL_MISSIONS } from '../data/missions';
import { MissionCard } from '../components/missions/MissionCard';
import { MissionDetailModal } from '../components/missions/MissionDetailModal';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const Missions: React.FC = () => {
  const [missions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [guardianFilter, setGuardianFilter] = useState<'all' | GuardianId>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | PriorityLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const { playClick } = useSoundEffects();

  const filteredMissions = missions.filter(m => {
    if (guardianFilter !== 'all' && m.assignedGuardian !== guardianFilter) return false;
    if (priorityFilter !== 'all' && m.priority !== priorityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchLoc = m.location.toLowerCase().includes(q);
      const matchCode = m.code.toLowerCase().includes(q);
      const matchDistrict = m.district.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchCode && !matchDistrict) return false;
    }
    return true;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          // MIDGARD SECURITY TELEMETRY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white uppercase mt-1 tracking-wider">
          VALKYRIE ACTIVE MISSIONS
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
          Real-time record of active field operations, structural rescues, missing person searches, and realm breach containments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111722] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mission, sector, code..."
              className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-slate-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-slate-500 mr-1 text-[11px]">GUARDIAN:</span>
            {(['all', 'freya', 'brynhildr', 'dual'] as const).map(g => (
              <button
                key={g}
                type="button"
                onClick={() => { playClick(); setGuardianFilter(g); }}
                className={`px-2.5 py-1 rounded transition-all uppercase ${
                  guardianFilter === g
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5 font-mono text-xs">
          <span className="text-slate-500 mr-1 text-[11px]">PRIORITY:</span>
          {(['all', 'CRITICAL', 'HIGH', 'MODERATE'] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => { playClick(); setPriorityFilter(p); }}
              className={`px-2 py-0.5 rounded text-[11px] border transition-all ${
                priorityFilter === p
                  ? 'bg-white/15 border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Mission Cards Grid */}
      {filteredMissions.length === 0 ? (
        <div className="bg-[#0D121B] border border-white/10 rounded-2xl p-12 text-center text-slate-400 font-mono text-xs">
          NO MISSIONS MATCHING CRITERIA.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map(mission => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onSelect={(m) => setSelectedMission(m)}
            />
          ))}
        </div>
      )}

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
