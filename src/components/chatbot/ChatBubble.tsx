import React from 'react';
import { Sparkles, Shield, User } from 'lucide-react';

export interface ChatMessageItem {
  id: string;
  sender: 'valkyrie' | 'user' | 'system';
  speakerName?: string;
  guardian?: 'freya' | 'brynhildr' | 'dual';
  text: string;
  timestamp: string;
}

interface ChatBubbleProps {
  message: ChatMessageItem;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-3 animate-fade-in">
        <div className="px-4 py-1.5 rounded-full bg-gold-50/90 border border-gold-400/40 text-gold-800 text-[11px] font-mono tracking-widest uppercase flex items-center gap-2 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-ping" />
          <span>{message.text}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 my-3 animate-fade-in ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-9 h-9 rounded-full bg-charcoal-900 border border-gold-400/40 flex items-center justify-center text-gold-300 shadow-md">
            <User className="w-4 h-4" />
          </div>
        ) : (
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-400 via-champagne-300 to-amber-200 p-[1.5px] shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gold-600">
                {message.guardian === 'brynhildr' ? (
                  <Shield className="w-4 h-4 text-charcoal-800" />
                ) : (
                  <Sparkles className="w-4 h-4 text-gold-600" />
                )}
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
        )}
      </div>

      {/* Bubble Content */}
      <div className={`max-w-[82%] sm:max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Speaker Name & Time */}
        <div className={`flex items-center gap-2 text-[10px] font-mono ${isUser ? 'justify-end text-charcoal-500' : 'text-gold-700'}`}>
          <span className="font-semibold tracking-wider">
            {isUser ? 'YOU' : message.speakerName || 'FREYA // THE SEER'}
          </span>
          <span className="text-charcoal-400">{message.timestamp}</span>
        </div>

        {/* Text Container */}
        <div
          className={`p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
            isUser
              ? 'bg-charcoal-900 text-ivory-50 border border-charcoal-800 rounded-tr-none'
              : 'bg-white text-charcoal-900 border border-gold-300/60 rounded-tl-none relative norse-gold-corners'
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
};

export const TypingIndicator: React.FC<{ speaker?: string }> = ({ speaker = 'Freya' }) => {
  return (
    <div className="flex items-start gap-3 my-3 animate-fade-in">
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-400 via-champagne-300 to-amber-200 p-[1.5px] shadow-md flex-shrink-0">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gold-600">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-[10px] font-mono text-gold-700 font-semibold tracking-wider">
          {speaker.toUpperCase()} IS CONTEMPLATING...
        </div>
        <div className="bg-white border border-gold-300/50 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1.5 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
