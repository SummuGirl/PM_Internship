import { EmergencyCategory } from '../types';

export const EMERGENCY_CATEGORIES: EmergencyCategory[] = [
  {
    id: 'medical',
    title: 'Medical Emergency',
    subtitle: 'Immediate trauma, cardiac arrest, respiratory failure, or mass casualties',
    icon: 'Ambulance',
    defaultPriority: 'CRITICAL',
    recommendedGuardian: 'freya',
    description: 'Civilians requiring urgent life preservation, medical stabilization, or extraction to Midgard emergency trauma centers.',
    examples: ['Unconscious civilian', 'Severe trauma injury', 'Respiratory collapse', 'Hazardous exposure']
  },
  {
    id: 'fire',
    title: 'Fire & Combustion',
    subtitle: 'Structural fires, chemical blazes, or thermal realm flare-ups',
    icon: 'Flame',
    defaultPriority: 'CRITICAL',
    recommendedGuardian: 'brynhildr',
    description: 'High-heat combustion incidents endangering residential or commercial sectors requiring containment and structural rescue.',
    examples: ['High-rise tower blaze', 'Subway thermal leak', 'Industrial chemical fire', 'Combustion anomaly']
  },
  {
    id: 'threat',
    title: 'Active Threat',
    subtitle: 'Hostile incursions, violent breaches, or armed danger in progress',
    icon: 'Swords',
    defaultPriority: 'CRITICAL',
    recommendedGuardian: 'brynhildr',
    description: 'Direct hostile confrontations requiring defensive shielding, containment, and tactical intervention.',
    examples: ['Hostile intruder breach', 'Armed criminal siege', 'Realm beast incursion', 'Riot in transit hub']
  },
  {
    id: 'accident',
    title: 'Transit & Structural Accident',
    subtitle: 'Vehicle collisions, mag-rail derailments, or structural collapses',
    icon: 'Car',
    defaultPriority: 'HIGH',
    recommendedGuardian: 'brynhildr',
    description: 'Physical entrapment, transit collisions, or infrastructural compromises requiring kinetic extraction.',
    examples: ['Mag-train derailment', 'Flyer highway collision', 'Tunnel cave-in', 'Bridge failure']
  },
  {
    id: 'missing',
    title: 'Missing Person',
    subtitle: 'Unexplained civilian disappearance or trace detection failure',
    icon: 'Search',
    defaultPriority: 'HIGH',
    recommendedGuardian: 'freya',
    description: 'Tracing missing individuals through foresight, fate thread analysis, and deep district sensor reconnaissance.',
    examples: ['Child separated in crowd', 'Researcher lost in sector boundary', 'Unaccounted hiker', 'Sub-level disappearance']
  },
  {
    id: 'disaster',
    title: 'Natural & Realm Disaster',
    subtitle: 'Flash floods, seismic tremors, extreme thermal/cryo vortexes',
    icon: 'Waves',
    defaultPriority: 'HIGH',
    recommendedGuardian: 'brynhildr',
    description: 'Large-scale environmental catastrophes affecting broad urban sectors, requiring mass evacuation corridors.',
    examples: ['Flash flood surging', 'Seismic fault tremor', 'Cryo-storm vortex', 'Inundation of low sectors']
  },
  {
    id: 'protection',
    title: 'Civilian Protection',
    subtitle: 'Targeted threat escort, safe-haven escort, or intimidation',
    icon: 'Shield',
    defaultPriority: 'MODERATE',
    recommendedGuardian: 'freya',
    description: 'Defensive presence, psychological stabilization, and proactive guidance to escort vulnerable populations.',
    examples: ['Stalking / harassment threat', 'Key witness protection', 'Safe house transit', 'Night perimeter escort']
  },
  {
    id: 'unknown',
    title: 'Unknown / Supernatural Event',
    subtitle: 'Dimensional tears, dimensional rifts, spatial distortion, spectral phenomena',
    icon: 'Sparkles',
    defaultPriority: 'CRITICAL',
    recommendedGuardian: 'dual',
    description: 'Anomalous events crossing realm boundaries requiring Freya’s seiðr foresight and Brynhildr’s kinetic containment.',
    examples: ['Bifröst fluctuation arc', 'Temporal loop echo', 'Floating gravimetric anomaly', 'Shadow entity manifestation']
  }
];
