import React, { useRef } from 'react';
import { Users, AlertOctagon, HeartPulse, Image, X, Upload } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface DetailsData {
  description: string;
  peopleAffected: number;
  anyoneInjured: 'YES' | 'NO' | 'UNKNOWN';
  immediateDanger: 'YES' | 'NO' | 'UNKNOWN';
  evidencePreviewUrl?: string;
}

interface Step3DetailsProps {
  details: DetailsData;
  onChangeDetails: (details: DetailsData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Details: React.FC<Step3DetailsProps> = ({
  details,
  onChangeDetails,
  onNext,
  onBack
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { playClick } = useSoundEffects();

  const handlePeopleChange = (delta: number) => {
    playClick();
    const nextVal = Math.max(1, Math.min(100, details.peopleAffected + delta));
    onChangeDetails({ ...details, peopleAffected: nextVal });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          onChangeDetails({
            ...details,
            evidencePreviewUrl: loadEvt.target.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeEvidence = () => {
    onChangeDetails({ ...details, evidencePreviewUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isValid = details.description.trim().length >= 8;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-4">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          STEP 03 // SITUATIONAL APPRAISAL
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
          TELL US WHAT HAPPENED
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Provide contextual details to assist the automated threat assessment algorithms.
        </p>
      </div>

      {/* Incident Description */}
      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
          INCIDENT DESCRIPTION <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={4}
          value={details.description}
          onChange={(e) => onChangeDetails({ ...details, description: e.target.value })}
          placeholder="Describe what you see, hearing, or experiencing in detail (minimum 8 characters)..."
          className="w-full bg-[#111722] border border-white/10 focus:border-cyan-400 rounded-lg p-4 text-sm text-white placeholder-slate-500 font-sans leading-relaxed transition-colors"
        />
        {details.description.trim().length > 0 && details.description.trim().length < 8 && (
          <p className="text-[11px] font-mono text-amber-400">
            Please enter a little more detail (at least 8 characters).
          </p>
        )}
      </div>

      {/* Structured Parameters: People affected, Injured, Immediate Danger */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* People Affected Counter */}
        <div className="bg-[#111722] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>PEOPLE AFFECTED</span>
          </div>

          <div className="flex items-center justify-between py-2 bg-black/40 rounded-lg px-4 border border-white/5">
            <button
              type="button"
              onClick={() => handlePeopleChange(-1)}
              className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="text-2xl font-mono font-bold text-cyan-300">
              {details.peopleAffected}
            </span>
            <button
              type="button"
              onClick={() => handlePeopleChange(1)}
              className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-[10px] text-slate-400 text-center mt-2 font-mono">
            Directly endangered individuals
          </span>
        </div>

        {/* Anyone Injured */}
        <div className="bg-[#111722] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
            <HeartPulse className="w-4 h-4 text-red-400" />
            <span>ANYONE INJURED?</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 py-1">
            {(['YES', 'NO', 'UNKNOWN'] as const).map(option => {
              const isSelected = details.anyoneInjured === option;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => { playClick(); onChangeDetails({ ...details, anyoneInjured: option }); }}
                  className={`py-2 text-xs font-mono font-bold rounded border transition-all ${
                    isSelected
                      ? option === 'YES'
                        ? 'bg-red-950/60 border-red-500 text-red-300'
                        : 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                      : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <span className="text-[10px] text-slate-400 text-center mt-2 font-mono">
            Medical stabilization triage flag
          </span>
        </div>

        {/* Immediate Danger */}
        <div className="bg-[#111722] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
            <AlertOctagon className="w-4 h-4 text-orange-400" />
            <span>IMMEDIATE DANGER?</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 py-1">
            {(['YES', 'NO', 'UNKNOWN'] as const).map(option => {
              const isSelected = details.immediateDanger === option;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => { playClick(); onChangeDetails({ ...details, immediateDanger: option }); }}
                  className={`py-2 text-xs font-mono font-bold rounded border transition-all ${
                    isSelected
                      ? option === 'YES'
                        ? 'bg-orange-950/60 border-orange-500 text-orange-300'
                        : 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                      : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <span className="text-[10px] text-slate-400 text-center mt-2 font-mono">
            Direct life hazard in progress
          </span>
        </div>
      </div>

      {/* Optical Evidence Dropzone / Preview */}
      <div className="bg-[#111722] border border-white/10 rounded-xl p-5">
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
          <Image className="w-4 h-4 text-cyan-400" />
          <span>OPTIONAL EVIDENCE TRANSMISSION</span>
        </label>

        {details.evidencePreviewUrl ? (
          <div className="relative inline-block border border-cyan-400/40 rounded-lg overflow-hidden max-w-sm">
            <img
              src={details.evidencePreviewUrl}
              alt="Uploaded Evidence"
              className="max-h-48 w-auto object-cover"
            />
            <button
              type="button"
              onClick={removeEvidence}
              className="absolute top-2 right-2 bg-black/80 hover:bg-black text-red-400 p-1.5 rounded-full border border-red-500/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-2 bg-black/70 text-[10px] font-mono text-cyan-300">
              ● OPTICAL EVIDENCE ATTACHED
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/15 hover:border-cyan-400/50 rounded-lg p-6 text-center cursor-pointer transition-colors bg-black/20 group"
          >
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 mx-auto mb-2 transition-colors" />
            <p className="text-xs text-slate-300 font-mono font-medium">
              CLICK OR DROP TO TRANSMIT INCIDENT PHOTO
            </p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              PNG, JPG, WEBP (Simulated optical capture preview)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
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
          disabled={!isValid}
          className={`px-8 py-3.5 rounded font-mono font-bold text-xs tracking-widest uppercase transition-all ${
            isValid
              ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(56,189,248,0.5)] cursor-pointer'
              : 'bg-white/10 text-slate-500 cursor-not-allowed'
          }`}
        >
          PROCEED TO SMART TRIAGE →
        </button>
      </div>
    </div>
  );
};
