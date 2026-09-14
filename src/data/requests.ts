import { EmergencyRequest } from '../types';

export const SEED_REQUESTS: EmergencyRequest[] = [
  {
    id: '#FOLK-48291',
    createdAt: '2026-09-14T14:20:00Z',
    updatedAt: '2026-09-14T15:10:00Z',
    category: 'missing',
    categoryTitle: 'Missing Person',
    location: {
      district: 'Northern Perimeter',
      sector: 'Sector 12',
      coordinates: '64.1466° N, 21.9426° W',
      description: 'Pine Ridge Trailhead, near Weather Station 4',
      verified: true
    },
    details: {
      description: 'Atmospheric research apprentice lost during unexpected frost fog; personal communicator offline.',
      peopleAffected: 1,
      anyoneInjured: 'NO',
      immediateDanger: 'YES'
    },
    triage: {
      priority: 'HIGH',
      recommendedGuardian: 'freya',
      responseType: 'GUIDANCE & RECONNAISSANCE',
      reasoning: 'Missing individual requires deep Seiðr resonance tracking, thermal falcon cloak scanning, and terrain prediction.',
      estimatedResponseTime: '06 MINUTES',
      isUnconscious: 'NO',
      isSupernatural: false
    },
    status: 'RESOLVED',
    statusHistory: [
      { status: 'RECEIVED', timestamp: '14:20', note: 'Emergency ticket registered via citizen communicator.' },
      { status: 'ANALYZING', timestamp: '14:21', note: 'Smart Triage determined high-risk environmental search profile.' },
      { status: 'ASSIGNED', timestamp: '14:22', note: 'Freya dispatched with Falcon Cloak.' },
      { status: 'EN_ROUTE', timestamp: '14:25', note: 'Aerial trajectory plotted over northern ridge.' },
      { status: 'ON_SCENE', timestamp: '14:38', note: 'Freya located individual sheltered in rock crevice.' },
      { status: 'RESOLVED', timestamp: '15:10', note: 'Subject extracted to Base Camp 3. Medical triage confirmed stable.' }
    ],
    feedback: {
      rating: 5,
      guardianHelpful: true,
      comments: 'Freya arrived out of the mist within minutes. Her falcon cloak guided us directly out of the frozen ravine.',
      submittedAt: '2026-09-14T15:30:00Z'
    }
  },
  {
    id: '#MID-19382',
    createdAt: '2026-09-14T15:05:00Z',
    updatedAt: '2026-09-14T16:00:00Z',
    category: 'accident',
    categoryTitle: 'Building Collapse & Entrapment',
    location: {
      district: 'Southern Aqueducts',
      sector: 'Sector 04',
      coordinates: '64.1200° N, 21.9100° W',
      description: 'Old Foundry Sub-Station 8, lower basement tier',
      verified: true
    },
    details: {
      description: 'Support pillar sheared following subterranean vibration; 4 maintenance technicians trapped under fallen steel girders.',
      peopleAffected: 4,
      anyoneInjured: 'YES',
      immediateDanger: 'YES'
    },
    triage: {
      priority: 'CRITICAL',
      recommendedGuardian: 'brynhildr',
      responseType: 'TACTICAL COMBAT RESCUE & HEAVY EXTRACTION',
      reasoning: 'Extreme physical structural failure and crushed masonry requiring heavy Svalinn Aegis shoring and kinetic breaching.',
      estimatedResponseTime: '04 MINUTES',
      isUnconscious: 'YES',
      isSupernatural: false
    },
    status: 'RESOLVED',
    statusHistory: [
      { status: 'RECEIVED', timestamp: '15:05', note: 'High-volume distress signal received from underground facility.' },
      { status: 'ANALYZING', timestamp: '15:06', note: 'Automated telemetry classified incident as Critical Structural Collapse.' },
      { status: 'ASSIGNED', timestamp: '15:07', note: 'Brynhildr assigned for kinetic extraction.' },
      { status: 'EN_ROUTE', timestamp: '15:08', note: 'Tactical drop pod launched toward Sector 04.' },
      { status: 'ON_SCENE', timestamp: '15:14', note: 'Brynhildr braced the falling ceiling beam with shield.' },
      { status: 'RESOLVED', timestamp: '16:00', note: 'All 4 workers pulled to safety; hydraulic shoring placed.' }
    ],
    feedback: {
      rating: 5,
      guardianHelpful: true,
      comments: 'She literally held up a collapsing concrete beam with her shield while pulling us out. Incredible courage.',
      submittedAt: '2026-09-14T16:15:00Z'
    }
  },
  {
    id: '#NINE-92831',
    createdAt: '2026-09-14T16:45:00Z',
    updatedAt: '2026-09-14T17:15:00Z',
    category: 'unknown',
    categoryTitle: 'Dimensional Realm Breach',
    location: {
      district: 'Eastern District',
      sector: 'Sector 07',
      coordinates: '64.1355° N, 21.8950° W',
      description: 'Plaza outside Tower 14, Eastern Financial District',
      verified: true
    },
    details: {
      description: 'Spatial rift glowing with violet and crimson flares; gravimetric distortion warping streetlamps and ground tremors.',
      peopleAffected: 28,
      anyoneInjured: 'YES',
      immediateDanger: 'YES'
    },
    triage: {
      priority: 'CRITICAL',
      recommendedGuardian: 'dual',
      responseType: 'DUAL VALKYRIE RESPONSE PROTOCOL',
      reasoning: 'Supernatural dimensional tear combined with mass civilian exposure requires Freya to stabilize the planar rift while Brynhildr establishes an impervious defensive shield perimeter.',
      estimatedResponseTime: '03 MINUTES',
      isUnconscious: 'NOT_SURE',
      isSupernatural: true
    },
    status: 'ON_SCENE',
    statusHistory: [
      { status: 'RECEIVED', timestamp: '16:45', note: 'Bifröst seismic fluctuation alert confirmed by citizen report.' },
      { status: 'ANALYZING', timestamp: '16:46', note: 'Dual threat signature identified: magical breach + physical danger.' },
      { status: 'ASSIGNED', timestamp: '16:47', note: 'Dual deployment: Freya (Foresight & Sealing) + Brynhildr (Defensive Aegis).' },
      { status: 'EN_ROUTE', timestamp: '16:48', note: 'Both guardians deployed via airborne sonic corridor.' },
      { status: 'ON_SCENE', timestamp: '16:54', note: 'Freya harmonizing Brísingamen field; Brynhildr deflecting thermal debris.' }
    ]
  }
];
