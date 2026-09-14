import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle2, Search } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface LocationData {
  district: string;
  sector: string;
  coordinates: string;
  description: string;
  verified: boolean;
}

interface Step2LocationProps {
  location: LocationData;
  onChangeLocation: (loc: LocationData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Location: React.FC<Step2LocationProps> = ({
  location,
  onChangeLocation,
  onNext,
  onBack
}) => {
  const [detecting, setDetecting] = useState(false);
  const { playSuccess, playClick } = useSoundEffects();

  const handleSimulateLocation = () => {
    setDetecting(true);
    playClick();
    setTimeout(() => {
      onChangeLocation({
        district: 'Eastern District',
        sector: 'Sector 07',
        coordinates: '64.1355° N, 21.8950° W',
        description: 'Eastern Financial District — Plaza 14 (Near Bifröst Node)',
        verified: true
      });
      setDetecting(false);
      playSuccess();
    }, 900);
  };

  const midgardDistricts = [
    { district: 'Eastern District', sector: 'Sector 07', desc: 'Financial Core & High-Rise Spires' },
    { district: 'Northern Perimeter', sector: 'Sector 12', desc: 'Forest Boundary & Atmospheric Outposts' },
    { district: 'Central Metro', sector: 'Sector 01', desc: 'High Civilian Spire & Grand Plaza' },
    { district: 'Western Transit Zone', sector: 'Sector 09', desc: 'Mag-Rail Viaducts & Cargo Terminus' },
    { district: 'Southern Aqueducts', sector: 'Sector 04', desc: 'Subterranean Reservoir & Hydro Foundries' },
    { district: 'Old Port District', sector: 'Sector 03', desc: 'Harbor Docks & Coastal Breakwaters' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          STEP 02 // POSITIONING
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
          WHERE IS THE INCIDENT?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Provide your current Midgard coordinates for emergency transit corridor calculations.
        </p>
      </div>

      {/* Simulated Geolocation Trigger */}
      <div className="bg-[#111722] border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>COMMUNICATOR BEACON TRIANGULATION</span>
            </h3>
            <p className="text-xs text-slate-400">
              Acquire instantaneous satellite coordinates via Midgard emergency mesh network.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSimulateLocation}
            disabled={detecting}
            className="px-5 py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2"
          >
            <Navigation className={`w-4 h-4 ${detecting ? 'animate-spin' : ''}`} />
            <span>{detecting ? 'TRIANGULATING...' : 'USE MY LOCATION'}</span>
          </button>
        </div>

        {/* Detected Location Status Box */}
        {location.verified && (
          <div className="mt-5 pt-5 border-t border-white/10 bg-black/40 -mx-6 -mb-6 p-6 rounded-b-xl animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>LOCATION DETECTED & VERIFIED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-[#161F2E] p-3 rounded border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase block">REALM</span>
                <span className="text-white font-bold">MIDGARD</span>
              </div>
              <div className="bg-[#161F2E] p-3 rounded border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase block">DISTRICT</span>
                <span className="text-cyan-300 font-bold">{location.district}</span>
              </div>
              <div className="bg-[#161F2E] p-3 rounded border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase block">SECTOR</span>
                <span className="text-amber-300 font-bold">{location.sector}</span>
              </div>
            </div>
            
            {location.coordinates && (
              <div className="mt-2 text-[11px] font-mono text-slate-400">
                GPS COORDINATES: <span className="text-slate-200">{location.coordinates}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Manual Selection / Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            OR SELECT DISTRICT MANUALLY
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {midgardDistricts.map(item => {
            const isSelected = location.district === item.district && location.sector === item.sector;
            return (
              <button
                type="button"
                key={item.sector}
                onClick={() => {
                  playClick();
                  onChangeLocation({
                    district: item.district,
                    sector: item.sector,
                    coordinates: '64.1300° N, 21.9000° W',
                    description: item.desc,
                    verified: true
                  });
                }}
                className={`text-left p-3.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400 text-cyan-200'
                    : 'bg-[#111722] border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">{item.sector}</span>
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="font-bold font-display text-white text-sm">
                  {item.district}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Address / Landmark details */}
        <div className="pt-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Specific Landmark / Street / Structure (Optional)</span>
          </label>
          <input
            type="text"
            value={location.description}
            onChange={(e) => onChangeLocation({ ...location, description: e.target.value })}
            placeholder="e.g. Near Transit Hub B, Level 4 Skybridge..."
            className="w-full bg-[#111722] border border-white/10 focus:border-cyan-400 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 font-mono transition-colors"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded font-mono text-xs text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors uppercase tracking-wider"
        >
          ← BACK
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!location.verified && !location.district}
          className={`px-8 py-3.5 rounded font-mono font-bold text-xs tracking-widest uppercase transition-all ${
            location.district
              ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(56,189,248,0.5)] cursor-pointer'
              : 'bg-white/10 text-slate-500 cursor-not-allowed'
          }`}
        >
          CONTINUE TO DETAILS →
        </button>
      </div>
    </div>
  );
};
