import { useState, useCallback } from 'react';

// Web Audio API synthesized sound cues (Zero external assets needed)
export function useSoundEffects() {
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem('valkyrie_muted') === 'true';
    } catch {
      return false;
    }
  });

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      try {
        localStorage.setItem('valkyrie_muted', String(next));
      } catch {}
      return next;
    });
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, gainVal = 0.05) => {
    if (muted || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user interaction
    }
  }, [muted]);

  const playClick = useCallback(() => {
    playTone(800, 'sine', 0.05, 0.03);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    if (muted) return;
    playTone(523.25, 'sine', 0.1, 0.04); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.15, 0.04), 80); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.25, 0.05), 160); // G5
  }, [muted, playTone]);

  const playAlert = useCallback(() => {
    if (muted) return;
    playTone(440, 'triangle', 0.12, 0.05);
    setTimeout(() => playTone(330, 'triangle', 0.18, 0.05), 100);
  }, [muted, playTone]);

  const playChime = useCallback(() => {
    playTone(1046.5, 'sine', 0.2, 0.03); // C6
  }, [playTone]);

  return {
    muted,
    toggleMute,
    playClick,
    playSuccess,
    playAlert,
    playChime
  };
}
