import React from 'react';
import { 
  Ambulance, 
  Flame, 
  Swords, 
  Car, 
  Search, 
  Waves, 
  Shield, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { EMERGENCY_CATEGORIES } from '../../data/emergencies';
import { EmergencyCategoryId } from '../../types';
import { PriorityBadge } from '../common/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface EmergencyQuickActionsProps {
  onSelectCategory: (categoryId: EmergencyCategoryId) => void;
}

export const EmergencyQuickActions: React.FC<EmergencyQuickActionsProps> = ({ onSelectCategory }) => {
  const { playClick } = useSoundEffects();

  const getIcon = (id: EmergencyCategoryId) => {
    switch (id) {
      case 'medical': return <Ambulance className="w-6 h-6 text-red-400" />;
      case 'fire': return <Flame className="w-6 h-6 text-orange-400" />;
      case 'threat': return <Swords className="w-6 h-6 text-rose-400" />;
      case 'accident': return <Car className="w-6 h-6 text-yellow-400" />;
      case 'missing': return <Search className="w-6 h-6 text-amber-300" />;
      case 'disaster': return <Waves className="w-6 h-6 text-cyan-400" />;
      case 'protection': return <Shield className="w-6 h-6 text-sky-400" />;
      case 'unknown': return <Sparkles className="w-6 h-6 text-purple-400" />;
      default: return <Shield className="w-6 h-6 text-slate-400" />;
    }
  };

  const handleCardClick = (id: EmergencyCategoryId) => {
    playClick();
    onSelectCategory(id);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase">
          // IMMEDIATE DISPATCH INITIATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-black font-cinzel text-white mt-1 uppercase tracking-wider">
          HOW CAN WE HELP?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
          Select an emergency protocol below. Your selection pre-configures the triage scanner for accelerated response.
        </p>
      </div>

      {/* 8 Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {EMERGENCY_CATEGORIES.map(cat => {
          return (
            <button
              key={cat.id}
              onClick={() => handleCardClick(cat.id)}
              className="group text-left relative bg-[#111722]/90 hover:bg-[#161F2E] border border-white/10 hover:border-cyan-400/50 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] flex flex-col justify-between"
            >
              {/* Corner tech accents */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400/60 rounded-tr transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/40 transition-transform">
                    {getIcon(cat.id)}
                  </div>
                  <PriorityBadge priority={cat.defaultPriority} size="sm" />
                </div>

                <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              {/* Action Prompt */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                <span>START REQUEST</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
