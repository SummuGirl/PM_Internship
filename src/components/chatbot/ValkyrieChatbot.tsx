import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Shield, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight, Compass, PhoneCall } from 'lucide-react';
import { ChatBubble, ChatMessageItem, TypingIndicator } from './ChatBubble';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { EmergencyRequest } from '../../types';

export interface ValkyrieChatbotProps {
  onSuccess?: (request: Partial<EmergencyRequest>) => void;
  onTrackResponse?: (requestId: string) => void;
  isCompact?: boolean;
}

type ChatStep = 
  | 'GREETING'
  | 'AWAITING_NAME'
  | 'AWAITING_AGE'
  | 'AWAITING_LOCATION'
  | 'AWAITING_EMAIL'
  | 'AWAITING_GRIEVANCE'
  | 'ANALYZING'
  | 'SUBMITTING'
  | 'CONFIRMED'
  | 'ERROR';

interface CollectedData {
  name: string;
  age: number | null;
  location: string;
  email: string;
  grievance: string;
  category: string;
  assignedGuardian: 'FREYA' | 'BRYNHILDR' | 'VALKYRIE DUAL RESPONSE';
  requestId: string;
  submittedAt: string;
}

export const ValkyrieChatbot: React.FC<ValkyrieChatbotProps> = ({
  onSuccess,
  onTrackResponse,
  isCompact = false
}) => {
  const { playClick, playSuccess, playChime } = useSoundEffects();
  const [step, setStep] = useState<ChatStep>('GREETING');
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingSpeaker, setTypingSpeaker] = useState('Freya');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [triageStatusText, setTriageStatusText] = useState<string | null>(null);

  const [collectedData, setCollectedData] = useState<CollectedData>({
    name: '',
    age: null,
    location: '',
    email: '',
    grievance: '',
    category: '',
    assignedGuardian: 'FREYA',
    requestId: '',
    submittedAt: ''
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, triageStatusText]);

  // Initial greeting sequence
  useEffect(() => {
    let isMounted = true;

    const runInitialGreeting = async () => {
      setIsTyping(true);
      setTypingSpeaker('Freya');

      await new Promise(r => setTimeout(r, 800));
      if (!isMounted) return;

      const msg1: ChatMessageItem = {
        id: 'msg-1',
        sender: 'valkyrie',
        speakerName: 'FREYA // THE SEER',
        guardian: 'freya',
        text: 'You have reached the Valkyrie Network.',
        timestamp: 'Just now'
      };
      setMessages([msg1]);

      await new Promise(r => setTimeout(r, 1000));
      if (!isMounted) return;

      const msg2: ChatMessageItem = {
        id: 'msg-2',
        sender: 'valkyrie',
        speakerName: 'FREYA // THE SEER',
        guardian: 'freya',
        text: "I'm Freya. I can see the paths others cannot.",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, msg2]);

      await new Promise(r => setTimeout(r, 1100));
      if (!isMounted) return;

      const msg3: ChatMessageItem = {
        id: 'msg-3',
        sender: 'valkyrie',
        speakerName: 'FREYA // THE SEER',
        guardian: 'freya',
        text: 'Before we begin... what should I call you?',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, msg3]);
      setIsTyping(false);
      setStep('AWAITING_NAME');
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    runInitialGreeting();

    return () => {
      isMounted = false;
    };
  }, []);

  // Request category and guardian classification
  const classifyRequest = (grievanceText: string) => {
    const text = grievanceText.toLowerCase();

    // 1. Natural or major disasters -> Dual
    if (/(earthquake|flood|tsunami|hurricane|cyclone|wildfire|catastrophe)/i.test(text)) {
      return {
        category: 'Natural Disaster Response',
        assigned: 'VALKYRIE DUAL RESPONSE' as const,
        guardianId: 'dual' as const
      };
    }

    // 2. Supernatural / realm breaches -> Dual
    if (/(bifrost|portal|dimension|realm|supernatural|magic|anomaly|shadow|entity)/i.test(text)) {
      return {
        category: 'Supernatural Realm Breach',
        assigned: 'VALKYRIE DUAL RESPONSE' as const,
        guardianId: 'dual' as const
      };
    }

    // 3. Fire & Thermal -> Brynhildr
    if (/(fire|smoke|blaze|explosion|heat|burn|combustion)/i.test(text)) {
      return {
        category: 'Fire & Combustion',
        assigned: 'BRYNHILDR' as const,
        guardianId: 'brynhildr' as const
      };
    }

    // 4. Physical Danger & Active Threat -> Brynhildr
    if (/(threat|attack|weapon|danger|gun|knife|hostile|rob|intruder|kill|violence|hostage)/i.test(text)) {
      return {
        category: 'Active Threat & Physical Danger',
        assigned: 'BRYNHILDR' as const,
        guardianId: 'brynhildr' as const
      };
    }

    // 5. Transit & Structural Accidents -> Brynhildr
    if (/(accident|crash|collision|trapped|stuck|collapsed|cave-in|derailment)/i.test(text)) {
      return {
        category: 'Transit & Structural Accident',
        assigned: 'BRYNHILDR' as const,
        guardianId: 'brynhildr' as const
      };
    }

    // 6. Missing Person -> Freya
    if (/(missing|lost|disappear|vanish|find someone|unaccounted|trace)/i.test(text)) {
      return {
        category: 'Missing Person Investigation',
        assigned: 'FREYA' as const,
        guardianId: 'freya' as const
      };
    }

    // 7. Medical Emergency -> Freya (trauma oversight)
    if (/(medical|blood|heart|faint|unconscious|chok|overdose|stroke|hospital|injured)/i.test(text)) {
      return {
        category: 'Medical Emergency',
        assigned: 'FREYA' as const,
        guardianId: 'freya' as const
      };
    }

    // 8. Civilian Protection / Stalking -> Freya
    if (/(protect|guard|escort|stalk|harass|follow|safety)/i.test(text)) {
      return {
        category: 'Civilian Protection',
        assigned: 'FREYA' as const,
        guardianId: 'freya' as const
      };
    }

    // 9. Emotional / Personal Support -> Freya
    if (/(listen|alone|scared|depress|anxious|stress|talk|crying|sad|hopeless)/i.test(text)) {
      return {
        category: 'Personal & Emotional Support',
        assigned: 'FREYA' as const,
        guardianId: 'freya' as const
      };
    }

    // Default
    return {
      category: 'General Emergency Assistance',
      assigned: 'FREYA' as const,
      guardianId: 'freya' as const
    };
  };

  const handleSend = async () => {
    const raw = inputValue.trim();
    if (!raw) return;

    playClick();
    setErrorMessage(null);

    // 1. Handle Step: AWAITING_NAME
    if (step === 'AWAITING_NAME') {
      const name = raw;
      setCollectedData(prev => ({ ...prev, name }));
      setInputValue('');

      const userMsg: ChatMessageItem = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: name,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, userMsg]);

      setIsTyping(true);
      await new Promise(r => setTimeout(r, 900));

      const freyaMsg: ChatMessageItem = {
        id: `valk-${Date.now()}`,
        sender: 'valkyrie',
        speakerName: 'FREYA // THE SEER',
        guardian: 'freya',
        text: `${name}. A pleasure to meet you.\n\nHow old are you?`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, freyaMsg]);
      setIsTyping(false);
      setStep('AWAITING_AGE');
      return;
    }

    // 2. Handle Step: AWAITING_AGE
    if (step === 'AWAITING_AGE') {
      const ageNum = parseInt(raw, 10);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        setErrorMessage('Please provide a reasonable numeric age (between 1 and 120).');
        return;
      }

      setCollectedData(prev => ({ ...prev, age: ageNum }));
      setInputValue('');

      const userMsg: ChatMessageItem = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: String(ageNum),
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, userMsg]);

      setIsTyping(true);
      await new Promise(r => setTimeout(r, 900));

      const freyaMsg: ChatMessageItem = {
        id: `valk-${Date.now()}`,
        sender: 'valkyrie',
        speakerName: 'FREYA // THE SEER',
        guardian: 'freya',
        text: 'And where are you reaching us from? (City, district, or sector)',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, freyaMsg]);
      setIsTyping(false);
      setStep('AWAITING_LOCATION');
      return;
    }

    // 3. Handle Step: AWAITING_LOCATION
    if (step === 'AWAITING_LOCATION') {
      const location = raw;
      setCollectedData(prev => ({ ...prev, location }));
      setInputValue('');

      const userMsg: ChatMessageItem = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: location,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, userMsg]);

      setIsTyping(true);
      await new Promise(r => setTimeout(r, 900));

      const freyaMsg: ChatMessageItem = {
        id: `valk-${Date.now()}`,
        sender: 'valkyrie',
        speakerName: 'FREYA // THE SEER',
        guardian: 'freya',
        text: 'Where can I reach you if we need more information? Please provide your email address.',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, freyaMsg]);
      setIsTyping(false);
      setStep('AWAITING_EMAIL');
      return;
    }

    // 4. Handle Step: AWAITING_EMAIL
    if (step === 'AWAITING_EMAIL') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(raw)) {
        setErrorMessage('Please provide a valid email format (e.g. name@example.com).');
        return;
      }

      const email = raw;
      setCollectedData(prev => ({ ...prev, email }));
      setInputValue('');

      const userMsg: ChatMessageItem = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: email,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, userMsg]);

      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1000));

      const freyaMsg: ChatMessageItem = {
        id: `valk-${Date.now()}`,
        sender: 'valkyrie',
        speakerName: 'FREYA // THE SEER',
        guardian: 'freya',
        text: `Now that I know who I'm speaking with, ${collectedData.name}...\n\nSo... tell me. How can I help you?`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, freyaMsg]);
      setIsTyping(false);
      setStep('AWAITING_GRIEVANCE');
      return;
    }

    // 5. Handle Step: AWAITING_GRIEVANCE
    if (step === 'AWAITING_GRIEVANCE') {
      const grievance = raw;
      setInputValue('');

      const userMsg: ChatMessageItem = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: grievance,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, userMsg]);

      // Trigger analysis and triage
      setStep('ANALYZING');
      const classification = classifyRequest(grievance);
      const reqId = `#VALK-${Math.floor(10000 + Math.random() * 90000)}`;
      const timeStr = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const finalData: CollectedData = {
        ...collectedData,
        grievance,
        category: classification.category,
        assignedGuardian: classification.assigned,
        requestId: reqId,
        submittedAt: timeStr
      };
      setCollectedData(finalData);

      // Cinematic transition: FREYA ANALYZING...
      setTriageStatusText('FREYA ANALYZING THREADS OF FATE...');
      await new Promise(r => setTimeout(r, 1200));

      // Cinematic transition: GUARDIAN DEPLOYED
      const transitionText = 
        classification.assigned === 'BRYNHILDR'
          ? 'BRYNHILDR DEPLOYED'
          : classification.assigned === 'VALKYRIE DUAL RESPONSE'
          ? 'VALKYRIE DUAL RESPONSE'
          : 'FREYA DISPATCHED';

      setTriageStatusText(transitionText);
      await new Promise(r => setTimeout(r, 1000));
      setTriageStatusText(null);

      // Specific guardian message
      let guardianReply = '';
      let speaker = 'FREYA // THE SEER';

      if (classification.assigned === 'BRYNHILDR') {
        speaker = 'BRYNHILDR // THE SHIELD';
        guardianReply = `${collectedData.name}, Brynhildr standing by. I hear the threat, and I do not hesitate. My aegis is already moving to your coordinates. Hold fast.`;
      } else if (classification.assigned === 'VALKYRIE DUAL RESPONSE') {
        speaker = 'FREYA & BRYNHILDR';
        guardianReply = `${collectedData.name}, your situation requires both foresight and physical fortitude. Freya has illuminated the path, and Brynhildr is initiating breach protocol.`;
      } else {
        guardianReply = `${collectedData.name}, I understand. You are not alone. I have woven a protective corridor for you, and your beacon is registered.`;
      }

      const guardianMsg: ChatMessageItem = {
        id: `valk-${Date.now()}`,
        sender: 'valkyrie',
        speakerName: speaker,
        guardian: classification.guardianId,
        text: guardianReply,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, guardianMsg]);

      // Now automatically submit to backend API
      await submitToBackend(finalData);
    }
  };

  const submitToBackend = async (data: CollectedData) => {
    setStep('SUBMITTING');
    setIsTyping(true);
    setTypingSpeaker('Valkyrie Network');

    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          visitorName: data.name,
          visitorAge: data.age,
          visitorLocation: data.location,
          visitorEmail: data.email,
          visitorGrievance: data.grievance,
          category: data.category,
          assignedValkyrie: data.assignedGuardian,
          requestId: data.requestId,
          submittedAt: data.submittedAt
        })
      });

      let resData: any = null;
      try {
        resData = await response.json();
      } catch {
        // response was not JSON
      }

      if (!response.ok || !resData?.success) {
        const errorDetail = resData?.details 
          ? `${resData?.error} [${resData.details}]` 
          : (resData?.error || 'Failed to dispatch notification email.');
        throw new Error(errorDetail);
      }

      // Success
      playSuccess();
      setIsTyping(false);
      setStep('CONFIRMED');

      const confirmMsg: ChatMessageItem = {
        id: `confirm-${Date.now()}`,
        sender: 'valkyrie',
        speakerName: 'FREYA // THE SEER',
        guardian: 'freya',
        text: `I've heard you, ${data.name}.\n\nYour request has entered the Valkyrie Network under ID ${data.requestId}. The candidate has been alerted immediately via secure transmission.`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, confirmMsg]);

      if (onSuccess) {
        onSuccess({
          id: data.requestId,
          createdAt: data.submittedAt,
          categoryTitle: data.category
        });
      }
    } catch (err: any) {
      console.error('[Chatbot Submission Error]', err);
      setIsTyping(false);
      setStep('ERROR');
      setErrorMessage(
        err?.message || 'The Valkyrie Network encountered a communication error. Please try again.'
      );
    }
  };

  const handleRetry = () => {
    playClick();
    setErrorMessage(null);
    submitToBackend(collectedData);
  };

  const handleRestart = () => {
    playClick();
    setStep('GREETING');
    setMessages([]);
    setErrorMessage(null);
    setTriageStatusText(null);
    setCollectedData({
      name: '',
      age: null,
      location: '',
      email: '',
      grievance: '',
      category: '',
      assignedGuardian: 'FREYA',
      requestId: '',
      submittedAt: ''
    });

    // Re-run initial sequence
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          id: 'msg-restart-1',
          sender: 'valkyrie',
          speakerName: 'FREYA // THE SEER',
          guardian: 'freya',
          text: 'Welcome back traveler. What should I call you?',
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
      setStep('AWAITING_NAME');
    }, 700);
  };

  const progressSteps = ['Name', 'Age', 'Location', 'Email', 'Grievance', 'Guardian'];
  const getCurrentStepIndex = () => {
    switch (step) {
      case 'GREETING':
      case 'AWAITING_NAME': return 0;
      case 'AWAITING_AGE': return 1;
      case 'AWAITING_LOCATION': return 2;
      case 'AWAITING_EMAIL': return 3;
      case 'AWAITING_GRIEVANCE': return 4;
      case 'ANALYZING':
      case 'SUBMITTING':
      case 'CONFIRMED': return 5;
      default: return 0;
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto rounded-2xl bg-white border border-gold-300/60 shadow-2xl overflow-hidden flex flex-col ${isCompact ? 'h-[620px]' : 'min-h-[640px]'}`}>
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-ivory-100 via-white to-ivory-100 border-b border-gold-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-gold-50 border border-gold-400/50 flex items-center justify-center text-gold-600 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-cinzel font-bold text-charcoal-900 tracking-wider">
                VALKYRIE INTAKE NETWORK
              </h3>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-gold-100 text-gold-800 border border-gold-300">
                LIVE INTERACTION
              </span>
            </div>
            <p className="text-[11px] text-charcoal-500 font-mono">
              Direct communication link with Freya & Brynhildr
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            title="Restart Conversation"
            className="p-1.5 rounded-lg border border-gold-200 text-charcoal-500 hover:text-gold-700 hover:bg-gold-50 transition-colors text-xs font-mono flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Restart</span>
          </button>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="bg-ivory-50/70 border-b border-gold-200/50 px-4 sm:px-6 py-2 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1 sm:gap-2">
          {progressSteps.map((s, idx) => {
            const current = getCurrentStepIndex();
            const isCompleted = idx < current;
            const isCurrent = idx === current;
            return (
              <div key={s} className="flex items-center gap-1">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    isCompleted
                      ? 'bg-gold-500 text-white'
                      : isCurrent
                      ? 'bg-charcoal-900 text-gold-300 ring-2 ring-gold-400/50'
                      : 'bg-ivory-200 text-charcoal-400'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </span>
                <span
                  className={`hidden md:inline ${
                    isCurrent ? 'font-bold text-charcoal-900' : 'text-charcoal-500'
                  }`}
                >
                  {s}
                </span>
                {idx < progressSteps.length - 1 && (
                  <span className="text-gold-300 mx-0.5">›</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-gold-700 font-semibold tracking-wider text-[10px]">
          {step === 'CONFIRMED' ? 'REQUEST CONFIRMED' : 'STEP ' + (getCurrentStepIndex() + 1) + ' OF 6'}
        </div>
      </div>

      {/* Main Chat Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Guardian Status Panel (Desktop) */}
        <div className="hidden lg:flex w-72 bg-gradient-to-b from-ivory-50 via-white to-ivory-100 border-r border-gold-200/60 p-5 flex-col justify-between">
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-gold-200/60">
              <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-gold-400 via-amber-200 to-white p-1 shadow-md mb-2">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gold-600">
                  <Sparkles className="w-10 h-10 text-gold-500" />
                </div>
                <div className="absolute -bottom-1 inset-x-0 mx-auto w-max px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold font-mono uppercase tracking-wider">
                  Active
                </div>
              </div>
              <h4 className="font-cinzel font-bold text-charcoal-900 text-base">
                FREYA
              </h4>
              <p className="text-[11px] font-mono text-gold-700 uppercase tracking-wider">
                The Seer & Guide
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-ivory-300">
                <span className="text-charcoal-500">Telemetry:</span>
                <span className="text-emerald-600 font-bold">OPTIMAL</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-ivory-300">
                <span className="text-charcoal-500">Shield-Maiden:</span>
                <span className="text-charcoal-800 font-bold">BRYNHILDR ON CALL</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-ivory-300">
                <span className="text-charcoal-500">Dispatch:</span>
                <span className="text-gold-700 font-bold">AUTOMATIC</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gold-50/80 border border-gold-200/60 text-[11px] text-charcoal-700 leading-relaxed font-sans">
              <p className="font-bold text-gold-800 font-mono text-[10px] uppercase mb-1">
                CIVILIAN ADVISORY
              </p>
              Speak naturally. Freya perceives the threat vectors, and Brynhildr responds when physical danger is identified.
            </div>
          </div>

          <div className="pt-4 border-t border-gold-200/60 text-[10px] font-mono text-charcoal-400">
            TRANSMISSION PROTOCOL // VALK-2026
          </div>
        </div>

        {/* Right Chat Stream */}
        <div className="flex-1 flex flex-col bg-ivory-50/40 relative">
          {/* Scrollable messages container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-1"
          >
            {messages.map(msg => (
              <ChatBubble key={msg.id} message={msg} />
            ))}

            {isTyping && (
              <TypingIndicator speaker={typingSpeaker} />
            )}

            {/* Cinematic Triage Overlay Banner */}
            {triageStatusText && (
              <div className="my-4 p-4 rounded-xl bg-charcoal-900 border border-gold-400 text-center animate-pulse shadow-lg">
                <div className="text-[10px] font-mono text-gold-400 tracking-widest uppercase mb-0.5">
                  ✦ VALKYRIE TRIAGE MATRIX
                </div>
                <div className="text-base sm:text-lg font-cinzel font-bold text-white tracking-widest">
                  {triageStatusText}
                </div>
              </div>
            )}

            {/* Cinematic Confirmation Screen */}
            {step === 'CONFIRMED' && (
              <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-white via-gold-50/60 to-white border-2 border-gold-400 shadow-xl animate-fade-in text-center space-y-4 relative overflow-hidden">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold-100 border border-gold-400 flex items-center justify-center text-gold-600 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 text-gold-600" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-gold-100 border border-gold-400/40 text-gold-800 font-mono text-xs font-bold uppercase tracking-widest mb-1">
                    REQUEST RECEIVED
                  </span>
                  <h3 className="text-xl sm:text-2xl font-cinzel font-black text-charcoal-950 uppercase">
                    GUARDIAN DISPATCH ACKNOWLEDGED
                  </h3>
                  <p className="text-xs text-charcoal-600 font-mono mt-1">
                    Your distress beacon is registered across the Valkyrie Network.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left font-mono text-xs bg-white p-4 rounded-xl border border-gold-200">
                  <div>
                    <span className="text-charcoal-400 block text-[10px]">REQUEST IDENTIFIER</span>
                    <strong className="text-charcoal-900 text-sm">{collectedData.requestId}</strong>
                  </div>
                  <div>
                    <span className="text-charcoal-400 block text-[10px]">ASSIGNED GUARDIAN</span>
                    <strong className="text-gold-700 text-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {collectedData.assignedGuardian}
                    </strong>
                  </div>
                  <div>
                    <span className="text-charcoal-400 block text-[10px]">CITIZEN NAME</span>
                    <span className="text-charcoal-800">{collectedData.name} ({collectedData.age} yrs)</span>
                  </div>
                  <div>
                    <span className="text-charcoal-400 block text-[10px]">LOCATION</span>
                    <span className="text-charcoal-800">{collectedData.location}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  {onTrackResponse && (
                    <button
                      onClick={() => onTrackResponse(collectedData.requestId)}
                      className="px-6 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-gold-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <span>TRACK DISPATCH</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={handleRestart}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-gold-50 border border-gold-300 text-charcoal-800 font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    SUBMIT ANOTHER REQUEST
                  </button>
                </div>
              </div>
            )}

            {/* Error Message & Retry Button */}
            {errorMessage && (
              <div className="my-4 p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-sans flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                {step === 'ERROR' && (
                  <button
                    onClick={handleRetry}
                    className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>RETRY TRANSMISSION</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar */}
          {step !== 'CONFIRMED' && (
            <div className="p-3 sm:p-4 bg-white border-t border-gold-200/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={
                      step === 'AWAITING_NAME'
                        ? 'Type your name...'
                        : step === 'AWAITING_AGE'
                        ? 'Type your age (e.g. 22)...'
                        : step === 'AWAITING_LOCATION'
                        ? 'Type your city or sector (e.g. Kochi, Sector 4)...'
                        : step === 'AWAITING_EMAIL'
                        ? 'Type your email address...'
                        : step === 'AWAITING_GRIEVANCE'
                        ? 'Describe what happened or what you need...'
                        : 'Freya is contemplating...'
                    }
                    disabled={step === 'ANALYZING' || step === 'SUBMITTING'}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-ivory-50 border border-gold-300/80 text-charcoal-900 placeholder:text-charcoal-400 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30 transition-all font-sans disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim() || step === 'ANALYZING' || step === 'SUBMITTING'}
                  className="px-5 py-3 sm:py-3.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 disabled:bg-charcoal-300 text-gold-300 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">SEND</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-charcoal-400">
                <span>Press Enter to send</span>
                <span>Confidential Valkyrie Channel</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
