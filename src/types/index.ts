export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export type GuardianId = 'freya' | 'brynhildr' | 'dual';

export type RequestStatus = 
  | 'RECEIVED'
  | 'ANALYZING'
  | 'ASSIGNED'
  | 'EN_ROUTE'
  | 'ON_SCENE'
  | 'RESOLVED';

export type EmergencyCategoryId = 
  | 'medical'
  | 'fire'
  | 'threat'
  | 'accident'
  | 'missing'
  | 'disaster'
  | 'protection'
  | 'unknown';

export interface EmergencyCategory {
  id: EmergencyCategoryId;
  title: string;
  subtitle: string;
  icon: string;
  defaultPriority: PriorityLevel;
  recommendedGuardian: GuardianId;
  description: string;
  examples: string[];
}

export interface EmergencyRequest {
  id: string; // e.g. "#FOLK-48291"
  createdAt: string;
  updatedAt: string;
  category: EmergencyCategoryId;
  categoryTitle: string;
  location: {
    district: string;
    sector: string;
    coordinates?: string;
    description: string;
    verified: boolean;
  };
  details: {
    description: string;
    peopleAffected: number;
    anyoneInjured: 'YES' | 'NO' | 'UNKNOWN';
    immediateDanger: 'YES' | 'NO' | 'UNKNOWN';
    evidencePreviewUrl?: string;
  };
  triage: {
    priority: PriorityLevel;
    recommendedGuardian: GuardianId;
    responseType: string;
    reasoning: string;
    estimatedResponseTime: string; // e.g. "08 MINUTES"
    isUnconscious: 'YES' | 'NO' | 'NOT_SURE';
    isSupernatural: boolean;
  };
  status: RequestStatus;
  statusHistory: Array<{
    status: RequestStatus;
    timestamp: string;
    note: string;
  }>;
  feedback?: {
    rating: number;
    guardianHelpful: boolean;
    comments: string;
    submittedAt: string;
  };
}

export interface ValkyrieProfile {
  id: GuardianId;
  name: string;
  title: string;
  tagline: string;
  domains: string[];
  description: string;
  mythologyLore: string;
  status: 'ONLINE' | 'ENGAGED' | 'STANDBY';
  currentMission?: string;
  colorTheme: 'gold' | 'silver' | 'dual';
  stats: {
    label: string;
    value: number; // percentage
  }[];
  artifacts: {
    name: string;
    title: string;
    description: string;
    status: string;
    metricLabel: string;
    metricValue: number;
    icon: string;
  }[];
  specialFeatureTitle: string;
  specialFeatureDescription: string;
}

export interface Mission {
  id: string; // e.g. "MISSION 001"
  code: string; // e.g. "MSN-EDF-01"
  title: string;
  location: string;
  district: string;
  sector: string;
  assignedGuardian: GuardianId;
  status: 'IN PROGRESS' | 'SEARCHING' | 'RESOLVED' | 'CRITICAL RESPONSE';
  priority: PriorityLevel;
  threatLevel: number; // percentage
  civiliansAffected: number;
  objective: string;
  lastUpdate: string;
  recommendedAction: string;
  radioLog: Array<{
    sender: string;
    timestamp: string;
    message: string;
  }>;
}

export interface Realm {
  id: string;
  name: string;
  norseName: string;
  title: string;
  status: 'STABLE' | 'UNSTABLE' | 'BREACHED' | 'FLUCTUATING';
  threatLevel: PriorityLevel;
  threatPercentage: number;
  activeAnomalies: number;
  activeMissions: number;
  guardian: string;
  description: string;
  environmentalHazard: string;
  bridgeStatus: 'OPEN' | 'CONSTRICTED' | 'CLOSED' | 'UNSTABLE';
  rulingPresence: string;
  coordinates: { x: number; y: number }; // for circular Yggdrasil nexus
}

export interface CityAlert {
  id: string;
  title: string;
  summary: string;
  details: string;
  severity: PriorityLevel;
  sector: string;
  timestamp: string;
  active: boolean;
  affectedDistricts: string[];
  evacuationRecommended: boolean;
}

export interface SafetyGuide {
  id: string;
  category: string;
  icon: string;
  title: string;
  summary: string;
  immediateSteps: string[];
  preparednessChecklist: string[];
  valkyrieProtocol: string;
}

export type ActivePage = 
  | 'home'
  | 'request'
  | 'track'
  | 'missions'
  | 'realms'
  | 'safety'
  | 'valkyries'
  | 'dashboard';
