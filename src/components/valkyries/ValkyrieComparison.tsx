import React from 'react';
import { Sparkles, Shield, BarChart3 } from 'lucide-react';
import { COMPARISON_DATA } from '../../data/valkyries';

export const ValkyrieComparison: React.FC = () => {
  return (
    <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>CAPABILITY MATRIX</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white uppercase tracking-wider">
          VALKYRIE COMPARISON
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-sans">
          Head-to-head operational strengths and domain specializations.
        </p>
      </div>

      {/* Comparison Header */}
      <div className="grid grid-cols-3 gap-2 pb-4 border-b border-white/10 font-mono text-xs text-center font-bold">
        <div className="text-amber-400 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>FREYA</span>
        </div>
        <div className="text-slate-400 uppercase tracking-widest text-[11px]">
          OPERATIONAL ATTRIBUTE
        </div>
        <div className="text-sky-400 flex items-center justify-center gap-1.5">
          <Shield className="w-4 h-4" />
          <span>BRYNHILDR</span>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5 font-mono text-xs">
        {COMPARISON_DATA.map((item, idx) => {
          const freyaNum = parseInt(item.freya);
          const brynNum = parseInt(item.brynhildr);
          const isNumeric = !isNaN(freyaNum) && !isNaN(brynNum);

          return (
            <div key={idx} className="py-4 grid grid-cols-3 items-center gap-4">
              {/* Freya Side */}
              <div className="text-right">
                <span className="text-amber-300 font-bold block">{item.freya}</span>
                {isNumeric && (
                  <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden mt-1.5 flex justify-end">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${freyaNum}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Attribute Label */}
              <div className="text-center font-display font-semibold text-slate-200 text-xs sm:text-sm">
                {item.attribute}
              </div>

              {/* Brynhildr Side */}
              <div className="text-left">
                <span className="text-sky-300 font-bold block">{item.brynhildr}</span>
                {isNumeric && (
                  <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="bg-sky-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${brynNum}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
