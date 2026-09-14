import React, { useState } from 'react';
import { Shield, AlertCircle, Menu, X, Volume2, VolumeX, Sparkles, MessageSquare } from 'lucide-react';
import { ActivePage } from '../../types';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenChatbot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, onOpenChatbot }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { muted, toggleMute, playClick } = useSoundEffects();

  const handleNavClick = (page: ActivePage) => {
    playClick();
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHelpClick = () => {
    playClick();
    if (onOpenChatbot) {
      onOpenChatbot();
    } else {
      handleNavClick('request');
    }
  };

  const navLinks: { id: string; targetPage: ActivePage; label: string }[] = [
    { id: 'home', targetPage: 'home', label: 'HOME' },
    { id: 'valkyries', targetPage: 'valkyries', label: 'VALKYRIES' },
    { id: 'missions', targetPage: 'missions', label: 'MISSIONS' },
    { id: 'realms', targetPage: 'realms', label: 'NINE REALMS' },
    { id: 'lore', targetPage: 'valkyries', label: 'LORE' },
    { id: 'safety', targetPage: 'safety', label: 'SAFETY' },
    { id: 'dashboard', targetPage: 'dashboard', label: 'DASHBOARD' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gold-200/80 shadow-[0_2px_15px_rgba(212,175,55,0.08)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gold-50 border border-gold-300/80 group-hover:border-gold-500 transition-all shadow-sm">
              <Sparkles className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <div className="font-cinzel font-black tracking-[0.2em] text-lg sm:text-xl text-charcoal-950 group-hover:text-gold-700 transition-colors flex items-center gap-2">
                VALKYRIE
              </div>
              <div className="text-[9px] font-mono tracking-widest text-gold-700 uppercase -mt-0.5 font-bold">
                GUARDIANS OF MIDGARD
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-mono">
            {navLinks.map(link => {
              const isActive = activePage === link.targetPage;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.targetPage)}
                  className={`px-3 py-1.5 text-xs tracking-wider transition-all rounded-lg cursor-pointer ${
                    isActive
                      ? 'text-charcoal-950 bg-gold-100/70 border-b-2 border-gold-500 font-bold'
                      : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-gold-50/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Direct Request Help CTA */}
            <button
              onClick={handleHelpClick}
              className="px-4 py-2 rounded-xl text-xs font-bold font-mono tracking-widest bg-charcoal-900 hover:bg-charcoal-800 text-gold-300 border border-gold-400 shadow-md flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>REQUEST HELP</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              title={muted ? 'Unmute UI sounds' : 'Mute UI sounds'}
              aria-label={muted ? 'Unmute UI sounds' : 'Mute UI sounds'}
              className="p-2 text-charcoal-500 hover:text-charcoal-900 hover:bg-gold-50 rounded-lg border border-gold-200 transition-colors cursor-pointer"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-600" />}
            </button>
          </div>

          {/* Mobile Menu & Help Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleHelpClick}
              className="px-3 py-1.5 text-xs font-bold font-mono tracking-wider bg-charcoal-900 text-gold-300 rounded-lg border border-gold-400"
            >
              HELP
            </button>
            <button
              onClick={toggleMute}
              aria-label="Toggle Sound"
              className="p-1.5 text-charcoal-500 hover:text-charcoal-900"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Menu"
              className="p-2 text-charcoal-700 hover:text-charcoal-950 hover:bg-gold-50 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gold-200 px-4 pt-3 pb-6 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-gold-100 mb-3 text-xs font-mono text-gold-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>FREYA & BRYNHILDR ONLINE</span>
            </div>
            <span className="text-charcoal-400">MIDGARD CORE</span>
          </div>

          <div className="grid grid-cols-1 gap-1 font-mono">
            {navLinks.map(link => {
              const isActive = activePage === link.targetPage;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.targetPage)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm tracking-wider transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-gold-100 border-l-4 border-gold-500 text-charcoal-900 font-bold'
                      : 'text-charcoal-700 hover:bg-gold-50'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
            <button
              onClick={handleHelpClick}
              className="w-full text-left mt-2 px-4 py-3 rounded-lg text-sm tracking-wider bg-charcoal-900 text-gold-300 font-bold flex items-center justify-between"
            >
              <span>REQUEST EMERGENCY HELP</span>
              <AlertCircle className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
