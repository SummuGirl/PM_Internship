import React from 'react';
import { PriorityLevel, GuardianId, RequestStatus } from '../../types';
import { formatPriorityBadge, formatStatusLabel } from '../../utils/formatters';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'sm' | 'md' | 'lg';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const meta = formatPriorityBadge(priority);
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-widest',
    lg: 'text-sm px-3.5 py-1.5 font-semibold tracking-widest',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase font-semibold border rounded-sm ${meta.bg} ${meta.text} ${meta.border} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} animate-pulse`} />
      {meta.label}
    </span>
  );
};

interface GuardianBadgeProps {
  guardian: GuardianId;
  size?: 'sm' | 'md' | 'lg';
}

export const GuardianBadge: React.FC<GuardianBadgeProps> = ({ guardian, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  }[size];

  if (guardian === 'freya') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-mono uppercase font-semibold tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-sm ${sizeClasses}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        FREYA • THE SEER
      </span>
    );
  }

  if (guardian === 'brynhildr') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-mono uppercase font-semibold tracking-wider bg-sky-500/10 text-sky-300 border border-sky-500/30 rounded-sm ${sizeClasses}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
        BRYNHILDR • THE SHIELD
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase font-semibold tracking-wider bg-purple-500/15 text-purple-200 border border-purple-500/40 rounded-sm ${sizeClasses}`}
    >
      <span className="flex items-center -space-x-1">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
      </span>
      DUAL RESPONSE • FREYA + BRYNHILDR
    </span>
  );
};

interface StatusBadgeProps {
  status: RequestStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const meta = formatStatusLabel(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 uppercase tracking-wider font-semibold border rounded-sm ${meta.badgeClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping opacity-75" />
      {meta.label}
    </span>
  );
};
