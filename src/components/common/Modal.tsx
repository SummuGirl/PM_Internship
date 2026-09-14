import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  }[maxWidth];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Box */}
      <div
        className={`relative w-full ${maxWidthClasses} bg-[#0D1118] border border-cyan-500/30 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-8 transition-all`}
      >
        {/* Top tech accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-sky-400 to-purple-500" />

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              // TELEMETRY TRANSMISSION
            </span>
            <h2 className="text-xl font-bold font-display text-white mt-0.5 tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-1 font-mono">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto text-slate-200 text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};
