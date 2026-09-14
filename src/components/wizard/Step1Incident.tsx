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
  HelpCircle, 
  Check 
} from 'lucide-react';
import { EMERGENCY_CATEGORIES } from '../../data/emergencies';
import { EmergencyCategoryId } from '../../types';
import { PriorityBadge } from '../common/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface Step1IncidentProps {
  selectedCategory: EmergencyCategoryId | null;
  onSelectCategory: (id: EmergencyCategoryId) => void;
  onNext: () => void;
}

export const Step1Incident: React.FC<Step1IncidentProps> = ({
  selectedCategory,
  onSelectCategory,
  onNext
}) => {
  const { playClick } = useSoundEffects();

  const getIcon = (id: EmergencyCategoryId) => {
    switch (id) {
      case 'medical': return <Ambulance className="w-5 h-5 text-red-400" />;
      case 'fire': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'threat': return <Swords className="w-5 h-5 text-rose-400" />;
      case 'accident': return <Car className="w-5 h-5 text-yellow-400" />;
      case 'missing': return <Search className="w-5 h-5 text-amber-300" />;
      case 'disaster': return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'protection': return <Shield className="w-5 h-5 text-sky-400" />;
      case 'unknown': return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleSelect = (id: EmergencyCategoryId) => {
    playClick();
    onSelectCategory(id);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          STEP 01 // CATEGORIZATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
          WHAT HAPPENED?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Select the emergency category that most closely describes your current situation.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EMERGENCY_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.3)] ring-1 ring-cyan-400'
                  : 'bg-[#111722]/80 border-white/10 hover:border-white/30 hover:bg-[#161F2E]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
                    {getIcon(cat.id)}
                  </div>
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={cat.defaultPriority} size="sm" />
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={`text-base font-bold font-display ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex flex-wrap gap-1">
                {cat.examples.slice(0, 2).map((ex, i) => (
                  <span key={i} className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    • {ex}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedCategory}
          className={`px-8 py-3.5 rounded font-mono font-bold text-xs tracking-widest uppercase transition-all ${
            selectedCategory
              ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(56,189,248,0.5)] cursor-pointer'
              : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5'
          }`}
        >
          CONTINUE TO LOCATION →
        </button>
      </div>
    </div>
  );
};
