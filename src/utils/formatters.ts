import { PriorityLevel, RequestStatus } from '../types';

export function formatPriorityBadge(priority: PriorityLevel): {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (priority) {
    case 'CRITICAL':
      return {
        label: 'CRITICAL',
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/30',
        dot: 'bg-red-500',
      };
    case 'HIGH':
      return {
        label: 'HIGH',
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        dot: 'bg-orange-500',
      };
    case 'MODERATE':
      return {
        label: 'MODERATE',
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-400',
        border: 'border-yellow-500/30',
        dot: 'bg-yellow-500',
      };
    case 'LOW':
      return {
        label: 'LOW',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-500',
      };
    default:
      return {
        label: 'UNKNOWN',
        bg: 'bg-slate-500/10',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        dot: 'bg-slate-500',
      };
  }
}

export function formatStatusLabel(status: RequestStatus): {
  label: string;
  color: string;
  badgeClass: string;
} {
  switch (status) {
    case 'RECEIVED':
      return { label: 'REQUEST RECEIVED', color: 'text-blue-400', badgeClass: 'bg-blue-500/10 border-blue-500/30 text-blue-400' };
    case 'ANALYZING':
      return { label: 'INCIDENT ANALYZING', color: 'text-purple-400', badgeClass: 'bg-purple-500/10 border-purple-500/30 text-purple-400' };
    case 'ASSIGNED':
      return { label: 'GUARDIAN ASSIGNED', color: 'text-amber-400', badgeClass: 'bg-amber-500/10 border-amber-500/30 text-amber-400' };
    case 'EN_ROUTE':
      return { label: 'GUARDIAN EN ROUTE', color: 'text-cyan-400', badgeClass: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' };
    case 'ON_SCENE':
      return { label: 'ON SCENE / IN ACTION', color: 'text-rose-400', badgeClass: 'bg-rose-500/10 border-rose-500/30 text-rose-400' };
    case 'RESOLVED':
      return { label: 'MISSION RESOLVED', color: 'text-emerald-400', badgeClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' };
    default:
      return { label: status, color: 'text-slate-400', badgeClass: 'bg-slate-500/10 border-slate-500/30 text-slate-400' };
  }
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}
