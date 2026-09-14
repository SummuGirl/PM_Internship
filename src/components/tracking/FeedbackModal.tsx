import React, { useState } from 'react';
import { Star, CheckCircle, Send, HeartHandshake } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useToast } from '../../hooks/useToast';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  guardianName: string;
  onFeedbackSubmitted: (feedback: {
    rating: number;
    guardianHelpful: boolean;
    comments: string;
  }) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  requestId,
  guardianName,
  onFeedbackSubmitted
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [guardianHelpful, setGuardianHelpful] = useState<boolean>(true);
  const [comments, setComments] = useState<string>('');
  const { showToast } = useToast();
  const { playSuccess, playClick } = useSoundEffects();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();

    const feedbackData = {
      requestId,
      rating,
      guardianHelpful,
      comments: comments.trim(),
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const existingStr = localStorage.getItem('valkyrie_feedback');
      const list = existingStr ? JSON.parse(existingStr) : [];
      list.push(feedbackData);
      localStorage.setItem('valkyrie_feedback', JSON.stringify(list));
    } catch {}

    onFeedbackSubmitted({
      rating,
      guardianHelpful,
      comments: comments.trim()
    });

    showToast('Feedback submitted. Thank you for securing Midgard!', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="MISSION COMPLETE"
      subtitle={`DEBRIEFING FOR INCIDENT ${requestId}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">
            YOUR REQUEST HAS BEEN RESOLVED.
          </h3>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            HOW WAS YOUR EXPERIENCE WITH {guardianName.toUpperCase()}?
          </p>
        </div>

        {/* 5-Star Rating */}
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => { playClick(); setRating(star); }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 text-slate-600 hover:text-amber-400 transition-colors focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    (hoverRating || rating) >= star
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                      : 'text-slate-600'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-amber-300">
            {rating === 5 ? 'EXEMPLARY VALKYRIE SERVICE' : `${rating} OUT OF 5 STARS`}
          </span>
        </div>

        {/* Was your guardian helpful? */}
        <div className="bg-black/30 p-4 rounded-xl border border-white/10 space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
            WAS YOUR GUARDIAN HELPFUL?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { playClick(); setGuardianHelpful(true); }}
              className={`py-2.5 rounded font-mono font-bold text-xs uppercase tracking-wider border transition-all ${
                guardianHelpful
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              YES
            </button>
            <button
              type="button"
              onClick={() => { playClick(); setGuardianHelpful(false); }}
              className={`py-2.5 rounded font-mono font-bold text-xs uppercase tracking-wider border transition-all ${
                !guardianHelpful
                  ? 'bg-red-500/20 border-red-400 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              NO
            </button>
          </div>
        </div>

        {/* Additional feedback */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
            ADDITIONAL FEEDBACK (OPTIONAL)
          </label>
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Share details on response speed, safe arrival, or guardian conduct..."
            className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 rounded-lg p-3 text-xs text-white placeholder-slate-500 font-mono transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded font-mono font-bold text-xs tracking-widest uppercase bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>SUBMIT FEEDBACK</span>
        </button>
      </form>
    </Modal>
  );
};
