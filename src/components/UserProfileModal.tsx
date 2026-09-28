import React, { useState } from 'react';
import { X, Award, Shield, CheckCircle2, Lock, Flame, LogOut, Sparkles, TrendingUp, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GURU_RANKS, ACHIEVEMENTS_LIST } from '../data/rankData';

export const UserProfileModal: React.FC = () => {
  const { user, profile, isProfileOpen, setIsProfileOpen, logout, currentRank, nextRankInfo, dailyStreak, bestStreak } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  if (!isProfileOpen || !user) return null;

  const unlockedAchievementIds = profile?.achievements || [];
  const totalPoints = profile?.totalPoints || 0;
  const completedTasksCount = profile?.completedTasksCount || 0;

  // Filter achievements based on selected category tab
  const filteredAchievements = ACHIEVEMENTS_LIST.filter((ach) => {
    if (selectedCategory === 'todas') return true;
    if (selectedCategory === 'desbloqueadas') return unlockedAchievementIds.includes(ach.id);
    if (selectedCategory === 'bloqueadas') return !unlockedAchievementIds.includes(ach.id);
    return ach.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0f1118] border-2 border-neutral-700 rounded-2xl brutal-shadow p-4 sm:p-6 md:p-7 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3 min-w-0">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Avatar'}
                className="w-12 h-12 rounded-xl border-2 border-lime-400 object-cover shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-800 flex items-center justify-center text-lg font-bold text-black shrink-0">
                {user.displayName?.slice(0, 2).toUpperCase() || 'GD'}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white font-display truncate">
                  {user.displayName || 'Gado Inicial'}
                </h3>
                <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-lime-950 text-lime-400 border border-lime-800/60 uppercase shrink-0">
                  Prontuário Alpha
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-tech truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={logout}
              title="Desconectar conta"
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-tech"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
            <button
              onClick={() => setIsProfileOpen(false)}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CURRENT RANK / PATENTE HERO CARD */}
        <div className={`p-4 sm:p-5 rounded-2xl border-2 ${currentRank.borderClass} ${currentRank.bgClass} space-y-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-3xl sm:text-4xl shrink-0 p-2 rounded-xl bg-black/40 border border-neutral-700/50">
                {currentRank.badge}
              </span>
              <div className="min-w-0">
                <span className="text-[11px] font-tech text-neutral-400 uppercase tracking-wider block">
                  Patente Atual (Nível {currentRank.level} de 9)
                </span>
                <h4 className={`text-base sm:text-lg font-black font-display tracking-tight break-words ${currentRank.colorClass}`}>
                  {currentRank.title}
                </h4>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 border border-neutral-700 font-tech text-xs self-start sm:self-auto shrink-0">
              <Flame className="w-4 h-4 text-lime-400" />
              <span className="text-neutral-300">Total:</span>
              <strong className="text-lime-400 text-sm font-bold">{totalPoints} PTS</strong>
            </div>
          </div>

          <p className="text-xs text-neutral-300 italic font-sans leading-relaxed break-words bg-black/30 p-2.5 rounded-xl border border-neutral-800">
            "{currentRank.description}"
          </p>

          {/* ADVANCED PROGRESS BAR VISUALIZATION: INSANITY RANK DISTANCE */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-black/60 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-tech gap-2 flex-wrap">
              <span className="text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-lime-400" />
                <span>Evolução na Hierarquia da Insanidade</span>
              </span>
              <span className="text-lime-400 font-bold px-2 py-0.5 rounded bg-lime-950/80 border border-lime-800/60 text-[11px]">
                {nextRankInfo.nextRank ? `${nextRankInfo.progressPercent}% Concluído` : 'Patente Máxima Atingida'}
              </span>
            </div>

            {/* Current vs Next Rank badges header */}
            <div className="flex items-center justify-between gap-2 text-xs font-tech pb-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-base shrink-0">{currentRank.badge}</span>
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-500 block leading-none">Nível Atual</span>
                  <span className={`font-bold truncate text-[11px] sm:text-xs block ${currentRank.colorClass}`}>
                    {currentRank.title.split('/')[0]}
                  </span>
                </div>
              </div>

              {nextRankInfo.nextRank ? (
                <div className="flex items-center gap-1.5 min-w-0 text-right">
                  <div className="min-w-0">
                    <span className="text-[10px] text-neutral-500 block leading-none">Próxima Patente</span>
                    <span className={`font-bold truncate text-[11px] sm:text-xs block ${nextRankInfo.nextRank.colorClass}`}>
                      {nextRankInfo.nextRank.title.split('/')[0]}
                    </span>
                  </div>
                  <span className="text-base shrink-0">{nextRankInfo.nextRank.badge}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-yellow-400 font-bold text-xs shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Topo Absoluto</span>
                </div>
              )}
            </div>

            {/* Progress Bar Track */}
            <div className="w-full bg-neutral-900 border border-neutral-700 h-3.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-lime-500 via-lime-400 to-yellow-400 h-full rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${nextRankInfo.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-tech text-neutral-400 pt-1">
              <span>{totalPoints} pontos acumulados</span>
              {nextRankInfo.nextRank ? (
                <span className="text-yellow-400 font-bold">
                  Faltam {nextRankInfo.pointsNeeded} pts para {nextRankInfo.nextRank.title.split('/')[0]}
                </span>
              ) : (
                <span className="text-lime-400 font-bold">Você é o Alpha Supremo!</span>
              )}
            </div>
          </div>
        </div>

        {/* STATS COUNTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-orange-950/30 border border-orange-500/40">
            <span className="text-[10px] font-tech text-orange-400 uppercase flex items-center gap-1 font-bold">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-400" />
              <span>Sequência Diária</span>
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <strong className="text-lg sm:text-xl font-bold font-tech text-orange-300">{dailyStreak}</strong>
              <span className="text-xs text-orange-400/80 font-tech font-bold">{dailyStreak === 1 ? 'dia' : 'dias'}</span>
            </div>
            <span className="text-[9px] font-tech text-neutral-400 block mt-0.5">Recorde: {bestStreak || dailyStreak}d</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-neutral-800">
            <span className="text-[10px] font-tech text-neutral-400 uppercase block">Tarefas Cumpridas</span>
            <strong className="text-lg sm:text-xl font-bold font-tech text-white">{completedTasksCount}</strong>
            <span className="text-[9px] font-tech text-neutral-500 block mt-0.5">Total histórico</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-neutral-800">
            <span className="text-[10px] font-tech text-neutral-400 uppercase block">Conquistas</span>
            <strong className="text-lg sm:text-xl font-bold font-tech text-lime-400">
              {unlockedAchievementIds.length}/{ACHIEVEMENTS_LIST.length}
            </strong>
            <span className="text-[9px] font-tech text-neutral-500 block mt-0.5">Desbloqueadas</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-neutral-800">
            <span className="text-[10px] font-tech text-neutral-400 uppercase block">Patente Atual</span>
            <strong className="text-lg sm:text-xl font-bold font-tech text-yellow-400">Nível {currentRank.level}</strong>
            <span className="text-[9px] font-tech text-neutral-500 block mt-0.5">de 10 Patentes</span>
          </div>
        </div>

        {/* SEÇÃO DE CONQUISTAS (50+ CONQUISTAS COM FILTROS) */}
        <div className="space-y-4 pt-2 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white font-display flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Quadro de Conquistas ({unlockedAchievementIds.length}/{ACHIEVEMENTS_LIST.length})</span>
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Cada conquista desbloqueia pontos bônus e frases sarcásticas de parabéns do Guru.
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-tech">
            {[
              { id: 'todas', label: `Todas (${ACHIEVEMENTS_LIST.length})` },
              { id: 'tarefas', label: 'Tarefas (15)' },
              { id: 'mantra', label: 'Mantras (8)' },
              { id: 'guru', label: 'Consulta Guru (8)' },
              { id: 'patentes', label: 'Patentes (9)' },
              { id: 'pontuacao', label: 'Pontos (8)' },
              { id: 'secretas', label: 'Secretas (3)' },
              { id: 'desbloqueadas', label: `Desbloqueadas (${unlockedAchievementIds.length})` },
              { id: 'bloqueadas', label: `Bloqueadas (${ACHIEVEMENTS_LIST.length - unlockedAchievementIds.length})` },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg transition-all shrink-0 cursor-pointer font-bold ${
                  selectedCategory === cat.id
                    ? 'bg-lime-400 text-black shadow-md'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
            {filteredAchievements.map((ach) => {
              const isUnlocked = unlockedAchievementIds.includes(ach.id);

              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-neutral-900/90 border-lime-500/50 shadow-md'
                      : 'bg-neutral-950/40 border-neutral-800/80 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isUnlocked ? 'bg-lime-500/20 border border-lime-500/40' : 'bg-neutral-900 border border-neutral-800'
                    }`}
                  >
                    {isUnlocked ? ach.icon : <Lock className="w-4 h-4 text-neutral-500" />}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h5
                        className={`text-xs font-bold font-display truncate ${
                          isUnlocked ? 'text-white' : 'text-neutral-400'
                        }`}
                      >
                        {ach.title}
                      </h5>
                      <span className="text-[10px] font-tech text-yellow-400 font-bold shrink-0">
                        +{ach.pointsReward} PTS
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed break-words">
                      {ach.description}
                    </p>

                    <div className="pt-0.5 flex items-center gap-1.5 text-[10px] font-tech">
                      {isUnlocked ? (
                        <span className="text-lime-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3 shrink-0" /> Desbloqueada
                        </span>
                      ) : (
                        <span className="text-neutral-500">Bloqueada</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROADMAP DAS 10 PATENTES DA PIRÂMIDE GURU */}
        <div className="space-y-3 pt-2 border-t border-neutral-800">
          <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <Shield className="w-4 h-4 text-lime-400" />
            <span>Hierarquia Completa de Patentes (10 Patentes)</span>
          </h4>

          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {GURU_RANKS.map((rk) => {
              const isCurrent = currentRank.id === rk.id;
              const isPassed = currentRank.level > rk.level;

              return (
                <div
                  key={rk.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                    isCurrent
                      ? `${rk.borderClass} ${rk.bgClass} font-bold`
                      : isPassed
                      ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
                      : 'bg-black/30 border-neutral-900 text-neutral-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl shrink-0">{rk.badge}</span>
                    <div className="min-w-0">
                      <span className="text-white truncate block font-display">
                        Nível {rk.level}: {rk.title}
                      </span>
                      <span className="text-[10px] font-tech text-neutral-400">
                        {rk.minPoints} a {rk.maxPoints === 999999 ? '∞' : rk.maxPoints} pts
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isCurrent ? (
                      <span className="px-2 py-0.5 rounded bg-lime-400 text-black font-tech text-[10px] font-bold">
                        SUA PATENTE
                      </span>
                    ) : isPassed ? (
                      <span className="text-neutral-400 font-tech text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-500" /> Superada
                      </span>
                    ) : (
                      <span className="text-neutral-600 font-tech text-[10px] flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueada
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

