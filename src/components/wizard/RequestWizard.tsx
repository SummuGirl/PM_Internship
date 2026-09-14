import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import { EmergencyCategoryId, EmergencyRequest, GuardianId, PriorityLevel } from '../../types';
import { EMERGENCY_CATEGORIES } from '../../data/emergencies';
import { generateRequestId } from '../../utils/idGenerator';
import { Step1Incident } from './Step1Incident';
import { Step2Location } from './Step2Location';
import { Step3Details } from './Step3Details';
import { Step4Triage } from './Step4Triage';
import { Step5Review } from './Step5Review';
import { RequestConfirmation } from './RequestConfirmation';
import { useToast } from '../../hooks/useToast';

interface RequestWizardProps {
  initialCategoryId?: EmergencyCategoryId | null;
  onTrackResponse: (requestId: string) => void;
  onReturnHome: () => void;
  onRequestSubmitted: (newRequest: EmergencyRequest) => void;
}

export const RequestWizard: React.FC<RequestWizardProps> = ({
  initialCategoryId,
  onTrackResponse,
  onReturnHome,
  onRequestSubmitted
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedRequest, setSubmittedRequest] = useState<EmergencyRequest | null>(null);
  const { showToast } = useToast();

  // Wizard state
  const [category, setCategory] = useState<EmergencyCategoryId | null>(initialCategoryId || null);
  const [location, setLocation] = useState({
    district: 'Eastern District',
    sector: 'Sector 07',
    coordinates: '64.1355° N, 21.8950° W',
    description: '',
    verified: false
  });
  const [details, setDetails] = useState<{
    description: string;
    peopleAffected: number;
    anyoneInjured: 'YES' | 'NO' | 'UNKNOWN';
    immediateDanger: 'YES' | 'NO' | 'UNKNOWN';
    evidencePreviewUrl?: string;
  }>({
    description: '',
    peopleAffected: 2,
    anyoneInjured: 'UNKNOWN',
    immediateDanger: 'UNKNOWN',
    evidencePreviewUrl: undefined
  });
  const [triage, setTriage] = useState<{
    isUnconscious: 'YES' | 'NO' | 'NOT_SURE';
    immediateDanger: 'YES' | 'NO' | 'UNKNOWN';
    peopleAffected: number;
    priority: PriorityLevel;
    recommendedGuardian: GuardianId;
    responseType: string;
    reasoning: string;
    estimatedResponseTime: string;
  }>({
    isUnconscious: 'NO',
    immediateDanger: 'UNKNOWN',
    peopleAffected: 2,
    priority: 'HIGH',
    recommendedGuardian: 'freya',
    responseType: 'GUIDANCE & PROTECTION',
    reasoning: 'Proactive guidance and threat scanning.',
    estimatedResponseTime: '08 MINUTES'
  });

  // If initial category passed via prop, preselect it
  useEffect(() => {
    if (initialCategoryId) {
      setCategory(initialCategoryId);
    }
  }, [initialCategoryId]);

  // Keep triage state in sync with step 3 inputs
  useEffect(() => {
    setTriage(prev => ({
      ...prev,
      peopleAffected: details.peopleAffected,
      immediateDanger: details.immediateDanger
    }));
  }, [details.peopleAffected, details.immediateDanger]);

  const selectedCategoryMeta = EMERGENCY_CATEGORIES.find(c => c.id === category);

  const handleSubmit = () => {
    const requestId = generateRequestId('FOLK');
    const now = new Date().toISOString();

    const newRequest: EmergencyRequest = {
      id: requestId,
      createdAt: now,
      updatedAt: now,
      category: category || 'unknown',
      categoryTitle: selectedCategoryMeta?.title || 'Unknown Emergency',
      location: { ...location },
      details: { ...details },
      triage: {
        priority: triage.priority,
        recommendedGuardian: triage.recommendedGuardian,
        responseType: triage.responseType,
        reasoning: triage.reasoning,
        estimatedResponseTime: triage.estimatedResponseTime,
        isUnconscious: triage.isUnconscious,
        isSupernatural: category === 'unknown'
      },
      status: 'RECEIVED',
      statusHistory: [
        {
          status: 'RECEIVED',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: 'Emergency distress beacon received by Valkyrie Network dispatch.'
        },
        {
          status: 'ANALYZING',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: `Smart Triage assigned ${triage.recommendedGuardian.toUpperCase()} for ${triage.responseType}.`
        }
      ]
    };

    onRequestSubmitted(newRequest);
    setSubmittedRequest(newRequest);
    showToast(`Emergency request ${requestId} broadcasted!`, 'success');
  };

  if (submittedRequest) {
    return (
      <RequestConfirmation
        request={submittedRequest}
        onTrackResponse={onTrackResponse}
        onReturnHome={onReturnHome}
      />
    );
  }

  const steps = [
    { num: '01', title: 'INCIDENT' },
    { num: '02', title: 'LOCATION' },
    { num: '03', title: 'DETAILS' },
    { num: '04', title: 'TRIAGE' },
    { num: '05', title: 'REVIEW' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Stepper Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          {/* Connector Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-cyan-400 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isPassed = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;

            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                    isPassed
                      ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                      : isCurrent
                      ? 'bg-[#0D1118] text-cyan-300 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.6)] ring-4 ring-cyan-500/20'
                      : 'bg-[#111722] text-slate-500 border-white/10'
                  }`}
                >
                  {isPassed ? '✓' : step.num}
                </div>
                <span
                  className={`text-[10px] font-mono tracking-wider uppercase mt-2 hidden sm:block ${
                    isCurrent ? 'text-cyan-300 font-bold' : isPassed ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-[#0D1118] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
        {currentStep === 1 && (
          <Step1Incident
            selectedCategory={category}
            onSelectCategory={(id) => setCategory(id)}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2Location
            location={location}
            onChangeLocation={(loc) => setLocation(loc)}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Step3Details
            details={details}
            onChangeDetails={(det) => setDetails(det)}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4Triage
            category={category || 'unknown'}
            triageData={triage}
            onChangeTriage={(tri) => setTriage(tri)}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <Step5Review
            draftRequest={{
              category: category || 'unknown',
              categoryTitle: selectedCategoryMeta?.title,
              location,
              details,
              triage: {
                ...triage,
                isSupernatural: category === 'unknown'
              }
            }}
            onEditStep={(stepIdx) => setCurrentStep(stepIdx)}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Emergency Contact Notice (Section 37 requirement) */}
      <div className="mt-8 border border-amber-500/30 bg-amber-500/5 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-sans">
        <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="font-mono font-bold text-amber-300 uppercase tracking-wider">
            IMMEDIATE DANGER?
          </div>
          <p className="text-slate-300 mt-1 leading-relaxed">
            If someone is in immediate life-threatening peril, please contact your local real-world emergency services (such as 911 / 112). 
            VALKYRIE is a fictional interactive demonstration and does not provide genuine municipal emergency response.
          </p>
        </div>
      </div>
    </div>
  );
};
