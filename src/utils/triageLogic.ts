import { EmergencyCategoryId, GuardianId, PriorityLevel } from '../types';

export interface TriageInputs {
  category: EmergencyCategoryId;
  peopleAffected: number;
  anyoneInjured: 'YES' | 'NO' | 'UNKNOWN';
  immediateDanger: 'YES' | 'NO' | 'UNKNOWN';
  isUnconscious: 'YES' | 'NO' | 'NOT_SURE';
  isSupernatural?: boolean;
}

export interface TriageResult {
  priority: PriorityLevel;
  guardian: GuardianId;
  responseType: string;
  reasoning: string;
  estimatedResponseTime: string;
}

export function calculateTriage(inputs: TriageInputs): TriageResult {
  const { category, peopleAffected, anyoneInjured, immediateDanger, isUnconscious } = inputs;
  const isSupernatural = Boolean(inputs.isSupernatural || category === 'unknown');

  // 1. Calculate Priority
  let priority: PriorityLevel = 'MODERATE';

  if (
    immediateDanger === 'YES' && 
    (isUnconscious === 'YES' || anyoneInjured === 'YES' || category === 'threat' || category === 'fire' || category === 'unknown' || peopleAffected >= 10)
  ) {
    priority = 'CRITICAL';
  } else if (
    immediateDanger === 'YES' || 
    anyoneInjured === 'YES' || 
    isUnconscious === 'YES' || 
    category === 'threat' || 
    category === 'fire' || 
    category === 'missing' ||
    peopleAffected >= 4
  ) {
    priority = 'HIGH';
  } else if (category === 'protection' || category === 'accident' || peopleAffected >= 2) {
    priority = 'MODERATE';
  } else {
    priority = 'LOW';
  }

  // 2. Calculate Guardian and Reasoning
  let guardian: GuardianId = 'freya';
  let responseType = 'GUIDANCE & PROTECTION';
  let reasoning = '';

  // DUAL RESPONSE conditions:
  // - Supernatural event / Realm breach
  // - High casualties (>= 15) with immediate danger
  // - Critical danger combined with multiple conflicting risks
  if (isSupernatural || (peopleAffected >= 15 && immediateDanger === 'YES')) {
    guardian = 'dual';
    responseType = 'DUAL RESPONSE — FREYA + BRYNHILDR';
    reasoning = isSupernatural
      ? 'Dimensional anomaly detected. Dual response protocol initiated: Freya provides Seiðr spatial stabilization while Brynhildr establishes an impenetrable kinetic defense perimeter.'
      : 'Mass civilian crisis with immediate threat. Dual deployment authorized: Freya organizes mass predictive evacuation while Brynhildr neutralizes the core hazard.';
  } 
  // BRYNHILDR conditions:
  // - Combat / Active threat
  // - Fire / High heat
  // - Structural collapse / Vehicle entrapment
  // - Immediate physical/kinetic peril
  else if (
    category === 'threat' || 
    category === 'fire' || 
    (category === 'accident' && immediateDanger === 'YES') ||
    (immediateDanger === 'YES' && isUnconscious === 'YES')
  ) {
    guardian = 'brynhildr';
    responseType = 'TACTICAL COMBAT RESCUE & HIGH-RISK DEFENSE';
    reasoning = category === 'fire'
      ? 'Thermal hazard and structural danger require Brynhildr’s Svalinn Aegis heat-resistant shielding and kinetic breaching.'
      : category === 'threat'
      ? 'Direct hostile threat detected. Brynhildr’s combat prowess and defensive bastion protocol are optimal to neutralize the hazard.'
      : 'Critical physical danger and trapped victims require Brynhildr’s heavy kinetic extraction and structural stabilization.';
  }
  // FREYA conditions:
  // - Medical emergency (with no combat threat)
  // - Missing person
  // - Civilian protection / Escort
  // - Moderate non-combat guidance
  else if (category === 'missing') {
    guardian = 'freya';
    responseType = 'RECONNAISSANCE & FATE THREAD TRACKING';
    reasoning = 'Disappearance requires Freya’s Seiðr foresight, aerial Falcon Cloak reconnaissance, and probabilistic terrain analysis.';
  } else if (category === 'medical') {
    guardian = 'freya';
    responseType = 'RAPID MEDICAL TRIAGE & SAFE HAVEN ESCORT';
    reasoning = 'Civilian medical crisis requires Freya’s serene guidance, swift aerial trauma transport, and trauma stabilization.';
  } else if (category === 'protection') {
    guardian = 'freya';
    responseType = 'CIVILIAN ESCORT & AEGIS PROTECTION';
    reasoning = 'Threat requires protective surveillance, cloaked transit corridors, and psychological stabilization.';
  } else {
    // Default fallback
    guardian = 'freya';
    responseType = 'INTELLIGENCE & FIELD GUIDANCE';
    reasoning = 'Situation favors proactive intelligence gathering, district monitoring, and structured citizen safety guidance.';
  }

  // 3. Response time calculation
  let estimatedResponseTime = '12 MINUTES';
  switch (priority) {
    case 'CRITICAL':
      estimatedResponseTime = guardian === 'dual' ? '03 MINUTES' : '04 MINUTES';
      break;
    case 'HIGH':
      estimatedResponseTime = '07 MINUTES';
      break;
    case 'MODERATE':
      estimatedResponseTime = '12 MINUTES';
      break;
    case 'LOW':
      estimatedResponseTime = '20 MINUTES';
      break;
  }

  return {
    priority,
    guardian,
    responseType,
    reasoning,
    estimatedResponseTime
  };
}
