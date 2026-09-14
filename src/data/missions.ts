import { Mission } from '../types';

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'MISSION 001',
    code: 'MSN-EDF-01',
    title: 'Eastern District High-Rise Fire',
    location: 'Tower 14, Eastern Financial District',
    district: 'Eastern District',
    sector: 'Sector 07',
    assignedGuardian: 'brynhildr',
    status: 'IN PROGRESS',
    priority: 'CRITICAL',
    threatLevel: 94,
    civiliansAffected: 38,
    objective: 'Contain 4th alarm fire spreading across residential floors 32-38; extract trapped civilians using Svalinn Aegis thermal shields.',
    lastUpdate: '2 mins ago • Brynhildr breached 34th floor stairwell; 14 civilians guided to skybridge.',
    recommendedAction: 'Maintain structural cooling line. Keep airway corridor clear for drone evac.',
    radioLog: [
      { sender: 'DISPATCH', timestamp: '17:14', message: 'Thermal plume detected in Sector 07 Tower 14.' },
      { sender: 'BRYNHILDR', timestamp: '17:16', message: 'Valkyrie on site. Deploying Svalinn heat diversion field.' },
      { sender: 'BRYNHILDR', timestamp: '17:21', message: 'Sector clear of flame front on 33. Commencing hoist on 34.' }
    ]
  },
  {
    id: 'MISSION 002',
    code: 'MSN-MPS-02',
    title: 'Missing Person — Forest Sector Perimeter',
    location: 'North Pine Boundary, Outer Grid',
    district: 'Northern Perimeter',
    sector: 'Sector 12',
    assignedGuardian: 'freya',
    status: 'SEARCHING',
    priority: 'HIGH',
    threatLevel: 68,
    civiliansAffected: 1,
    objective: 'Track missing atmospheric surveyor separated during anomalous fog event; triangulate bio-signatures via Seiðr resonance grid.',
    lastUpdate: '5 mins ago • Freya’s Falcon Cloak sweeps detected thermal signature 400m NE of telemetry mast.',
    recommendedAction: 'Maintain perimeter lighting; prevent civilians from entering heavy fog boundary.',
    radioLog: [
      { sender: 'DISPATCH', timestamp: '16:50', message: 'Surveyor beacon silent for 45 minutes.' },
      { sender: 'FREYA', timestamp: '16:55', message: 'Foresight threads aligning. Trace signature found near frozen ravine.' },
      { sender: 'FREYA', timestamp: '17:02', message: 'Descent initiated. Survivor located, hypothermic but stable.' }
    ]
  },
  {
    id: 'MISSION 003',
    code: 'MSN-RBM-03',
    title: 'Supernatural Realm Breach — Central Plaza',
    location: 'Grand Plaza, Central Spire',
    district: 'Central Metro',
    sector: 'Sector 01',
    assignedGuardian: 'dual',
    status: 'IN PROGRESS',
    priority: 'CRITICAL',
    threatLevel: 98,
    civiliansAffected: 142,
    objective: 'Dual response protocol active: Freya stabilizing dimensional planar rift using Brísingamen resonance; Brynhildr establishing kinetic perimeter against shadow manifestations.',
    lastUpdate: 'Just now • Freya has stabilized rift boundary at 64%; Brynhildr engaged hostiles at south gate.',
    recommendedAction: 'Immediate full evacuation of Central Spire quadrant 3. Do not approach violet rift arcs.',
    radioLog: [
      { sender: 'SENSOR NET', timestamp: '17:05', message: 'Bifröst harmonics unstable. Class 4 rift opening.' },
      { sender: 'FREYA', timestamp: '17:08', message: 'Rift energy is Muspelheim-tinged. Initiating containment seiðr.' },
      { sender: 'BRYNHILDR', timestamp: '17:09', message: 'In position with Aegis. No entity crosses this line.' }
    ]
  },
  {
    id: 'MISSION 004',
    code: 'MSN-PGF-04',
    title: 'Sub-City Power Grid Failure & Flooding',
    location: 'Sub-Level Hydro Substation 09',
    district: 'Southern Aqueducts',
    sector: 'Sector 04',
    assignedGuardian: 'brynhildr',
    status: 'RESOLVED',
    priority: 'HIGH',
    threatLevel: 25,
    civiliansAffected: 16,
    objective: 'Restore auxiliary floodgates and extract 16 municipal engineers trapped in rapidly rising subterranean surge.',
    lastUpdate: '45 mins ago • Floodgate sealed by hydraulic override. All 16 engineers safely evacuated to surface.',
    recommendedAction: 'Municipal maintenance crew handling secondary electrical wiring.',
    radioLog: [
      { sender: 'ENGINEER LEAD', timestamp: '15:20', message: 'Water rising 2 inches per minute. Gate jammed.' },
      { sender: 'BRYNHILDR', timestamp: '15:32', message: 'Hydraulic lock smashed. Manual lever engaged.' },
      { sender: 'DISPATCH', timestamp: '15:55', message: 'Mission marked RESOLVED. All personnel safe.' }
    ]
  },
  {
    id: 'MISSION 005',
    code: 'MSN-MAG-05',
    title: 'Mag-Rail Transit Derailment',
    location: 'Western Skyway Viaduct 22',
    district: 'Western Transit Zone',
    sector: 'Sector 09',
    assignedGuardian: 'brynhildr',
    status: 'IN PROGRESS',
    priority: 'CRITICAL',
    threatLevel: 88,
    civiliansAffected: 64,
    objective: 'Stabilize dangling lead carriage over the 80-meter canyon gorge; secure emergency tether lines.',
    lastUpdate: '8 mins ago • Brynhildr anchored carriage coupling to main concrete pillar; rescue trolley deployed.',
    recommendedAction: 'Transit authority diverted all westbound mag-trains onto line 3B.',
    radioLog: [
      { sender: 'TRANSIT CTRL', timestamp: '16:40', message: 'Derailment alarm triggered on Viaduct 22.' },
      { sender: 'BRYNHILDR', timestamp: '16:48', message: 'Tether secured. Carriage deflection stabilized.' }
    ]
  },
  {
    id: 'MISSION 006',
    code: 'MSN-STK-06',
    title: 'Hostile Incursion & VIP Extraction',
    location: 'District Hall 3, Safe Haven Corridor',
    district: 'Civic Center',
    sector: 'Sector 02',
    assignedGuardian: 'freya',
    status: 'RESOLVED',
    priority: 'MODERATE',
    threatLevel: 15,
    civiliansAffected: 4,
    objective: 'Provide protective escort for municipal peace delegates after cyber-recon threats.',
    lastUpdate: '2 hours ago • Safe transit concluded to fortified precinct; zero injuries reported.',
    recommendedAction: 'Maintain perimeter surveillance via Falcon Cloak optical sweep.',
    radioLog: [
      { sender: 'DELEGATE ESCORT', timestamp: '14:10', message: 'Unknown hostile surveillance logged.' },
      { sender: 'FREYA', timestamp: '14:15', message: 'Thread diversion active. Alternate underground corridor selected.' },
      { sender: 'FREYA', timestamp: '14:45', message: 'Target arrived at sanctuary without incident.' }
    ]
  }
];
