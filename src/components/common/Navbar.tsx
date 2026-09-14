import React, { useState } from 'react';
import { Shield, AlertCircle, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { ActivePage } from '../../types';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onQuickCategory?: (catId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { muted, toggleMute, playClick } = useSoundEffects();

  const handleNavClick = (page: ActivePage) => {
    playClick();
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: ActivePage; label: string; isHighlight?: boolean }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'request', label: 'REQUEST HELP', isHighlight: true },
    { id: 'track', label: 'TRACK REQUEST' },
    { id: 'missions', label: 'MISSIONS' },
    { id: 'realms', label: 'NINE REALMS' },
    { id: 'safety', label: 'SAFETY' },
    { id: 'valkyries', label: 'LORE & GUARDIANS' },
    { id: 'dashboard', label: 'MY REQUESTS' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090D]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded bg-gradient-to-br from-amber-500/20 via-sky-500/20 to-purple-500/20 border border-white/20 group-hover:border-cyan-400/50 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Shield className="w-5 h-5 text-sky-300" />
              <div className="absolute inset-0 rounded border border-amber-400/30 scale-105 pointer-events-none" />
            </div>
            <div>
              <div className="font-cinzel font-black tracking-[0.2em] text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                VALKYRIE
              </div>
              <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                GUARDIANS OF MIDGARD
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = activePage === link.id;
              if (link.isHighlight) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="relative ml-2 px-3.5 py-1.5 rounded text-xs font-bold font-mono tracking-widest bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-400/40 flex items-center gap-1.5 transition-all transform hover:scale-105"
                  >
                    <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                    <span>{link.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 xl:px-3 py-1.5 text-xs font-mono tracking-wider transition-all rounded ${
                    isActive
                      ? 'text-cyan-300 bg-white/5 border-b-2 border-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Status Indicator & Audio Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="tracking-wider">TWO GUARDIANS ONLINE</span>
            </div>

            {/* Sound Mute Button */}
            <button
              onClick={toggleMute}
              title={muted ? 'Unmute UI sounds' : 'Mute UI sounds'}
              aria-label={muted ? 'Unmute UI sounds' : 'Mute UI sounds'}
              className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-white/5 rounded border border-white/10 transition-colors"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('request')}
              className="px-2.5 py-1 text-[11px] font-bold font-mono tracking-wider bg-red-600 text-white rounded border border-red-400"
            >
              HELP
            </button>
            <button
              onClick={toggleMute}
              aria-label="Toggle Sound"
              className="p-1.5 text-slate-400 hover:text-white"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Menu"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1118] border-b border-white/10 px-4 pt-3 pb-6 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs font-mono text-emerald-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>FREYA & BRYNHILDR ONLINE</span>
            </div>
            <span className="text-slate-500">MIDGARD CORE</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map(link => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded text-sm font-mono tracking-wider transition-all flex items-center justify-between ${
                    link.isHighlight
                      ? 'bg-red-600/20 border border-red-500/40 text-red-300 font-bold'
                      : isActive
                      ? 'bg-cyan-500/10 border-l-4 border-cyan-400 text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isHighlight && <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
