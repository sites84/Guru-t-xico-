import React from 'react';
import { Sparkles, Trophy, X, ArrowRight, Flame } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementUnlockedModalProps {
  achievement: Achievement | null;
  remainingCount: number;
  onDismiss: () => void;
}

export const AchievementUnlockedModal: React.FC<AchievementUnlockedModalProps> = ({
  achievement,
  remainingCount,
  onDismiss,
}) => {
  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Outer Glow & Shimmer Container */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#181122] via-[#101018] to-[#0a0a0f] border-2 border-lime-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(163,230,53,0.35)] space-y-6 text-center animate-scaleUp">
        {/* Shimmer Hazard Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span className="text-[11px] font-tech text-yellow-400 uppercase font-black tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
            CONQUISTA DESBLOQUEADA, PARASITA!
          </span>

          {remainingCount > 1 && (
            <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              +{remainingCount - 1} na fila
            </span>
          )}

          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Fechar notificação"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Icon + Category Badge */}
        <div className="space-y-3">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-lime-500/20 via-purple-500/10 to-black border-2 border-lime-400 flex items-center justify-center text-5xl shadow-2xl relative">
            <span className="animate-bounce">{achievement.icon}</span>
            <div className="absolute -bottom-2.5 px-3 py-0.5 rounded-full bg-lime-400 text-black font-tech font-extrabold text-[10px] uppercase shadow-md">
              +{achievement.pointsReward} PTS ALPHA
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-tech text-lime-400 uppercase tracking-widest px-2.5 py-1 rounded bg-lime-950/80 border border-lime-800/60 font-bold">
              {achievement.category.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-2 leading-tight">
              {achievement.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1 max-w-sm mx-auto leading-relaxed">
              {achievement.description}
            </p>
          </div>
        </div>

        {/* Guru Toxic Sarcastic Roast Box */}
        {achievement.roastMessage && (
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-purple-500/40 text-left space-y-1.5 shadow-inner">
            <div className="flex items-center gap-1.5 text-[11px] font-tech text-purple-400 uppercase font-black">
              <Flame className="w-3.5 h-3.5 text-lime-400" />
              <span>PARABÉNS DO GURU TÓXICO:</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 font-sans italic leading-relaxed">
              "{achievement.roastMessage}"
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onDismiss}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400 text-black font-extrabold text-sm font-tech uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{remainingCount > 1 ? 'Próxima Conquista' : 'Aceitar a Humilhação'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
