import React from 'react';
import { Shield, AlertTriangle, PhoneCall, Download, CheckCircle2 } from 'lucide-react';
import { SafetyAccordion } from '../components/safety/SafetyAccordion';
import { useToast } from '../hooks/useToast';

export const SafetyCenterPage: React.FC = () => {
  const { showToast } = useToast();

  const handleDownload = () => {
    showToast('Civilian Emergency Protocol Dossier downloaded to local communicator.', 'success');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          // CITIZEN PREPAREDNESS ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-cinzel text-white uppercase mt-1 tracking-wider">
          MIDGARD SAFETY CENTER
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
          Standard operational guidance and civilian survival protocols during urban catastrophes and dimensional realm anomalies.
        </p>
      </div>

      {/* Emergency Hotlines Box */}
      <div className="bg-gradient-to-r from-red-950/40 via-[#111722] to-amber-950/40 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold font-display text-white text-base">
              MIDGARD PRIORITY EMERGENCY CHANNELS
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Direct frequency dial: <strong className="text-cyan-300">Channel 911-VALK</strong> • Sub-Band 94.2 MHz
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="px-5 py-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>DOWNLOAD OFFLINE PROTOCOL PDF</span>
        </button>
      </div>

      {/* Main Accordion */}
      <SafetyAccordion />
    </div>
  );
};
