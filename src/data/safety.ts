import { SafetyGuide } from '../types';

export const SAFETY_GUIDES: SafetyGuide[] = [
  {
    id: 'fire',
    category: 'FIRE & THERMAL HAZARD',
    icon: 'Flame',
    title: 'High-Rise & Structural Blaze Response',
    summary: 'Procedures for high-temperature blazes, chemical fires, and thermal anomaly flare-ups.',
    immediateSteps: [
      'Drop below smoke level immediately; breathable air remains lowest to the floor.',
      'Check metallic doors with the back of your hand before touching handles.',
      'Do NOT utilize elevators or vertical magnetic lifts during active thermal alarms.',
      'Signal your location at external windows using high-contrast fabric or torch pulses.'
    ],
    preparednessChecklist: [
      'Install dual-spectrum smoke and thermal detectors on all living levels.',
      'Maintain an unblocked secondary escape route toward fire stairs.',
      'Keep certified fire-retardant blankets near kitchen and heating junctions.'
    ],
    valkyrieProtocol: 'Brynhildr deploys Svalinn Aegis thermal shields to establish a pressurized cold corridor for civilian egress.'
  },
  {
    id: 'flood',
    category: 'FLOOD & HYDROLOGICAL DISASTER',
    icon: 'Waves',
    title: 'Flash Flood & Hydro Conduit Rupture',
    summary: 'Protocol for sudden tidal surges, subterranean aqueduct breaches, or heavy precipitation.',
    immediateSteps: [
      'Seek vertical elevation immediately; avoid underground pedestrian tunnels and basements.',
      'Never walk, drive, or wade through moving water deeper than 15 centimeters.',
      'De-energize main electrical breaker panels if safe to reach before water touches conduits.',
      'Listen for city horn sirens broadcast from Midgard meteorological towers.'
    ],
    preparednessChecklist: [
      'Store watertight waterproof document cases for identification and medical prescriptions.',
      'Maintain battery-powered emergency transceivers tuned to Midgard Civil Band 94.2.',
      'Identify designated high-ground assembly sanctuaries in your district.'
    ],
    valkyrieProtocol: 'Freya scans hydrological currents using falcon recon; Brynhildr manually secures heavy flood barriers.'
  },
  {
    id: 'earthquake',
    category: 'SEISMIC & STRUCTURAL TREMOR',
    icon: 'Activity',
    title: 'Earthquake & Subterranean Fault Shifts',
    summary: 'Response actions for seismic tremors triggered by tectonic or Jotunheim boundary rumbles.',
    immediateSteps: [
      'DROP, COVER, and HOLD ON beneath reinforced tables or load-bearing archways.',
      'Stay away from glass windows, exterior walls, and heavy suspended lighting fixtures.',
      'If outdoors, move to open plazas away from buildings, overhead power conduits, and glass spires.',
      'Expect aftershocks; do not re-enter compromised concrete structures.'
    ],
    preparednessChecklist: [
      'Anchor heavy bookcases, server racks, and appliances to structural studs.',
      'Pack 72-hour emergency survival kits with clean water (3 liters per person per day).',
      'Familiarize yourself with building manual gas and water shutoff valves.'
    ],
    valkyrieProtocol: 'Brynhildr provides kinetic structural shoring to prevent catastrophic progressive collapses.'
  },
  {
    id: 'accident',
    category: 'TRANSIT & TRANSIT SYSTEM ACCIDENTS',
    icon: 'Car',
    title: 'Mag-Rail, Skyway & Highway Collisions',
    summary: 'Survival protocol for mass transit collisions and high-altitude transport emergencies.',
    immediateSteps: [
      'Remain seated or braced until all carriage momentum has ceased completely.',
      'Locate emergency release levers on doors; break reinforced glass only at marked hammer points.',
      'Beware of live electromagnetic third-rails or severed high-voltage line cables.',
      'Evacuate along marked safety walkways toward the nearest station access staircase.'
    ],
    preparednessChecklist: [
      'Carry emergency glass breakers and seatbelt cutters in personal vehicles.',
      'Download Midgard Transit offline route maps to personal communicators.',
      'Learn standard civilian triage and tourniquet application basics.'
    ],
    valkyrieProtocol: 'Rapid deployment of magnetic tethers and kinetic stabilizing clamps to arrest suspended wreckage.'
  },
  {
    id: 'missing',
    category: 'MISSING PERSON & RECONNAISSANCE',
    icon: 'Search',
    title: 'Missing Persons & Sector Disappearances',
    summary: 'Step-by-step reporting and immediate tracking protocol for missing family or colleagues.',
    immediateSteps: [
      'Document last confirmed timestamp, attire, geo-coordinates, and personal communicator ID.',
      'Check known sanctuary zones, transit turnstiles, and automated checkpoint logs immediately.',
      'Submit a high-priority request through the VALKYRIE portal with a recent optical likeness.',
      'Do not enter dangerous restricted perimeter sectors alone to search.'
    ],
    preparednessChecklist: [
      'Establish a family communications plan with an designated out-of-district contact.',
      'Enable low-power passive locator beacons on elder and child personal wearables.',
      'Keep updated digital biometric dossiers stored securely offline.'
    ],
    valkyrieProtocol: 'Freya uses Seiðr thread triangulation and aerial falcon cloak sweeps to trace bio-energetic footprints.'
  },
  {
    id: 'threat',
    category: 'ACTIVE HOSTILITY & CIVILIAN ESCORT',
    icon: 'ShieldAlert',
    title: 'Hostile Incursions & Threat Containment',
    summary: 'Guidelines for navigating active violence, unauthorized armed incursions, or civilian threats.',
    immediateSteps: [
      'RUN / EVACUATE if an unobstructed path is available; leave personal belongings behind.',
      'HIDE / BARRICADE in reinforced rooms, silence devices, turn off interior lighting.',
      'DEFEND only as an absolute last resort when mortal life is under imminent attack.',
      'When Valkyries arrive, keep hands visible, empty, and follow voice guidance immediately.'
    ],
    preparednessChecklist: [
      'Identify two distinct exit routes from every regular workplace or domestic location.',
      'Learn location of panic lock triggers and safe room reinforced doors.',
      'Keep emergency quick-dial assigned to VALKYRIE emergency network.'
    ],
    valkyrieProtocol: 'Brynhildr assumes tactical vanguard intercept; Freya guides non-combatants through stealth escape corridors.'
  },
  {
    id: 'unknown',
    category: 'SUPERNATURAL & REALM BREACH',
    icon: 'Sparkles',
    title: 'Dimensional Tears & Realm Bleed Anomalies',
    summary: 'Surviving unexpected planar tears, Bifröst distortions, and mythical entity encounters.',
    immediateSteps: [
      'Do NOT look directly into violet, deep crimson, or prismatic floating anomalies.',
      'Back away slowly in the direction of stable gravity; do not run blindly through spatial distortions.',
      'Seal respirators or damp cloths across mouth to prevent breathing ethereal miasma.',
      'Transmit an UNKNOWN / SUPERNATURAL request ticket immediately via the VALKYRIE portal.'
    ],
    preparednessChecklist: [
      'Keep rune-calibrated quartz or compasses to detect early gravimetric shifts.',
      'Never attempt to interact with or contain supernatural artifacts without guardian escort.',
      'Maintain an isolated emergency radio not dependent on external satellite arrays.'
    ],
    valkyrieProtocol: 'DUAL RESPONSE INITIATION: Freya seals the dimensional weave while Brynhildr neutralizes hostile breaches.'
  },
  {
    id: 'kit',
    category: 'EMERGENCY PREPAREDNESS',
    icon: 'Briefcase',
    title: 'Standard Midgard Civilian 72-Hour Survival Kit',
    summary: 'Essential checklist of provisions every Midgard household should keep packed and ready.',
    immediateSteps: [
      'Pack provisions in a durable, waterproof backpack situated near your primary exit.',
      'Rotate perishable rations, sterile water containers, and medications every 6 months.',
      'Include physical currency, backup ID cards, and certified paper district transit maps.',
      'Check emergency broadcast transceiver frequencies quarterly.'
    ],
    preparednessChecklist: [
      '3 liters water per person/day + chlorine purification tablets',
      'Non-perishable high-protein nutrient bars and dry rations',
      'Solar / hand-crank multi-band emergency communicator & flashlight',
      'Comprehensive trauma first aid kit including compression bandages and antiseptic',
      'Thermal reflective mylar survival blankets and heavy-duty dust respirators',
      'Multi-tool knife, waterproof matches, whistle, and high-intensity chem-lights'
    ],
    valkyrieProtocol: 'Prepared citizens dramatically shorten evacuation intervals, enabling guardians to focus on critical life saves.'
  }
];
