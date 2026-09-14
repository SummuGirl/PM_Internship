import { ValkyrieProfile } from '../types';

export const VALKYRIES: Record<'freya' | 'brynhildr', ValkyrieProfile> = {
  freya: {
    id: 'freya',
    name: 'FREYA',
    title: 'THE SEER',
    tagline: 'Freya sees the danger. Guiding mortals through the threads of fate.',
    domains: ['FORESIGHT', 'PROTECTION', 'SEIÐR MAGIC', 'INVESTIGATION'],
    description: 'Freya serves as the network’s supreme intelligence and guidance guardian. Synthesizing ancient seiðr perception with Midgard optical grids, she maps the unseen vectors of fate, predicts emergent catastrophes before they peak, and leads mortals to sanctuaries of safety.',
    mythologyLore: 'In ancient Norse traditions, Freyja of the Vanir is celebrated for her profound connection to seiðr (prophetic wisdom), the heavenly meadow Fólkvangr where fallen souls find peace, the radiant jewel Brísingamen, and her feather cloak of swift flight. VALKYRIE reimagines these sacred motifs into a high-technology reconnaissance and benevolent guardianship persona.',
    status: 'ONLINE',
    currentMission: 'Deep Sector 07 Foresight Scan',
    colorTheme: 'gold',
    stats: [
      { label: 'FORESIGHT', value: 92 },
      { label: 'CIVILIAN GUIDANCE', value: 96 },
      { label: 'PROTECTIVE AEGIS', value: 89 },
      { label: 'SEIÐR PERCEPTION', value: 95 },
      { label: 'RAPID MOBILITY', value: 91 }
    ],
    artifacts: [
      {
        name: 'BRÍSINGAMEN',
        title: 'Radiant Resonance Necklace',
        description: 'A sacred golden toroidal catalyst that focuses celestial energy, shielding civilian minds from supernatural panic and stabilizing spatial rifts.',
        status: 'ACTIVE',
        metricLabel: 'ENERGY COHERENCE',
        metricValue: 98,
        icon: 'Sparkle'
      },
      {
        name: 'FALCON CLOAK',
        title: 'Feathered Vector Relocation System',
        description: 'An ethereal aerodynamic weave allowing instantaneous cross-district flight, frictionless atmospheric glides, and silent aerial reconnaissance.',
        status: 'READY',
        metricLabel: 'ATMOSPHERIC VELOCITY',
        metricValue: 94,
        icon: 'Wind'
      },
      {
        name: 'FELINE CHARIOT',
        title: 'Autonomous Twin Vanguard Skiff',
        description: 'A rapid low-altitude tactical carrier capable of navigating collapsed urban ruins and extracting injured mortals with zero kinetic shock.',
        status: 'AVAILABLE',
        metricLabel: 'EXTRACTION CAPACITY',
        metricValue: 100,
        icon: 'Compass'
      }
    ],
    specialFeatureTitle: 'THREADS OF FATE',
    specialFeatureDescription: 'Real-time probabilistic projection matrix analyzing civilian movement vectors, structural collapse likelihoods, and optimal evacuation corridors.'
  },
  brynhildr: {
    id: 'brynhildr',
    name: 'BRYNHILDR',
    title: 'THE SHIELD-MAIDEN',
    tagline: 'Brynhildr faces the danger. Standing between mortals and ruin.',
    domains: ['COMBAT DEFENSE', 'TACTICAL RESCUE', 'HIGH-RISK EXTRACTION', 'WARRIOR HONOR'],
    description: 'Brynhildr is the tactical spearhead of the Valkyrie Network. Forged in the fires of legendary defiance and armed with impervious hyper-dense shielding, she dives headlong into active blazes, structural collapses, and hostile incursions to physically pull civilians from the jaws of catastrophe.',
    mythologyLore: 'Brynhildr stands among the most renowned Valkyries and shield-maidens of heroic Eddic literature—renowned for unyielding courage, tactical honor, and defiance of mortal limitation. VALKYRIE casts her as Midgard’s vanguard defender: an armored bastion who answers when mortal strength is spent.',
    status: 'ONLINE',
    currentMission: 'Midgard Industrial Fire Perimeter',
    colorTheme: 'silver',
    stats: [
      { label: 'COMBAT READINESS', value: 97 },
      { label: 'BALLISTIC & THERMAL DEFENSE', value: 95 },
      { label: 'TACTICAL RESCUE SPEED', value: 94 },
      { label: 'STRUCTURAL CONTAINMENT', value: 92 },
      { label: 'PHYSICAL ENDURANCE', value: 99 }
    ],
    artifacts: [
      {
        name: 'SVALINN AEGIS',
        title: 'Thermal Kinetic Tower Shield',
        description: 'An impenetrable alloy shield capable of deflecting plasma flares, extreme structural debris, and supernatural shockwaves.',
        status: 'ACTIVE',
        metricLabel: 'DEFLECTION RATING',
        metricValue: 99,
        icon: 'ShieldCheck'
      },
      {
        name: 'SPEAR OF GYLLIR',
        title: 'Vibrational Breaching Lance',
        description: 'A precision kinetic resonator capable of instantly puncturing through 2 meters of reinforced concrete to liberate trapped survivors.',
        status: 'ARMED',
        metricLabel: 'BREACH EFFICIENCY',
        metricValue: 96,
        icon: 'Zap'
      },
      {
        name: 'VALKYR HYPER-ARMOR',
        title: 'Ceramic Titanium Exosuit',
        description: 'Reinforced ballistic mail woven with cryo-tempered steel, resisting temperatures exceeding 2,400°C in blazing collapse zones.',
        status: 'DEPLOYED',
        metricLabel: 'ARMOR INTEGRITY',
        metricValue: 98,
        icon: 'Crosshair'
      }
    ],
    specialFeatureTitle: 'TACTICAL COMMAND',
    specialFeatureDescription: 'Live battlefield telemetry tracking hostile presence, structural stress points, and opening secure civilian extraction corridors.'
  }
};

export const COMPARISON_DATA = [
  { attribute: 'Primary Role', freya: 'Intelligence & Guidance', brynhildr: 'Tactical Combat Rescue' },
  { attribute: 'Fate & Foresight', freya: '96%', brynhildr: '64%' },
  { attribute: 'Direct Combat', freya: '82%', brynhildr: '98%' },
  { attribute: 'Defensive Shielding', freya: '88%', brynhildr: '97%' },
  { attribute: 'Investigation & Search', freya: '97%', brynhildr: '72%' },
  { attribute: 'Heavy Extraction', freya: '84%', brynhildr: '96%' },
  { attribute: 'Supernatural Rift Sealing', freya: '98%', brynhildr: '85%' },
  { attribute: 'High-Heat Resistance', freya: '80%', brynhildr: '99%' }
];
