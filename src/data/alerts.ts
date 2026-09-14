import { CityAlert } from '../types';

export const INITIAL_ALERTS: CityAlert[] = [
  {
    id: 'ALT-2026-08',
    title: 'Unusual Realm Rift Activity Detected',
    summary: 'Spontaneous Bifröst harmonic fluctuation recorded across Eastern District Sector 07.',
    details: 'Atmospheric sensors indicate localized dimensional bleeding between Midgard and Muspelheim near Eastern High-Rise Tower 14. Thermal spikes of +140°C recorded in vacant utility tunnels. Valkyries Freya and Brynhildr are both dispatched on site. Civilians are advised to maintain a 500-meter perimeter and seal air filters.',
    severity: 'CRITICAL',
    sector: 'Eastern District — Sector 07',
    timestamp: '12 minutes ago',
    active: true,
    affectedDistricts: ['Eastern Financial District', 'Old Port Ward', 'Sector 07 Perimeter'],
    evacuationRecommended: true
  },
  {
    id: 'ALT-2026-07',
    title: 'Severe Mag-Rail Transit Disruption',
    summary: 'Western Viaduct 22 suspended due to kinetic derailment event.',
    details: 'Westbound express transit lines 3A and 3B halted following structural carriage stabilization by Brynhildr. Surface shuttles are operating on emergency routes. Avoid lower thoroughfare intersections.',
    severity: 'HIGH',
    sector: 'Western Transit Zone — Sector 09',
    timestamp: '35 minutes ago',
    active: true,
    affectedDistricts: ['Western Transit Zone', 'Cargo Terminus'],
    evacuationRecommended: false
  },
  {
    id: 'ALT-2026-06',
    title: 'Sub-Zero Cryo Miasma Alert',
    summary: 'Anomalous cold front rolling down from Northern Pine sector.',
    details: 'Micro-seep from Niflheim detected in forest reservoir basin. Ambient temperature dropping to -22°C within localized 2km perimeter. Freya’s falcon sweeps are mapping safe thermal corridors.',
    severity: 'MODERATE',
    sector: 'Northern Perimeter — Sector 12',
    timestamp: '1 hour ago',
    active: true,
    affectedDistricts: ['Northern Forest Basin', 'Sector 12 Outskirts'],
    evacuationRecommended: false
  }
];
