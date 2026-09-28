import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Check, Skull, Award, MessageSquareQuote, X, LogIn, PartyPopper, Trophy, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Calendar, RefreshCw, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ABSURD_TASKS_POOL } from '../data/guruData';
import { AbsurdTask } from '../types';
import { toxicAudio } from '../utils/audio';
import { useAuth } from '../context/AuthContext';

/**
 * Retorna as 10 missões diárias usando rotação por epoch day sobre o pool de 70 tarefas.
 * Garante que NUNCA repete tarefas entre dias consecutivos!
 */
export function getDailyTasks(dayOffset: number = 0): { dateString: string; tasks: AbsurdTask[] } {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  const dateString = d.toISOString().slice(0, 10);
  const dayEpoch = Math.floor(d.getTime() / (1000 * 60 * 60 * 24));

  const pool = ABSURD_TASKS_POOL;
  // 70 tarefas no pool. 10 por dia = 7 dias consecutivos com 100% de tarefas exclusivas e zero repetição
  const startIndex = Math.abs(dayEpoch * 10) % pool.length;

  const tasks: AbsurdTask[] = [];
  for (let i = 0; i < 10; i++) {
    tasks.push(pool[(startIndex + i) % pool.length]);
  }

  return { dateString, tasks };
}

const TASK_STATE_VERSION = '4';

function migrateTaskStorage() {
  const version = localStorage.getItem('guru_toxico_task_state_version');
  if (version === TASK_STATE_VERSION) return;

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('guru_toxico_completed_10_') || key.startsWith('guru_toxico_celebration_')) {
      localStorage.removeItem(key);
    }
  });
  localStorage.removeItem('guru_toxico_day_offset');
  localStorage.setItem('guru_toxico_task_state_version', TASK_STATE_VERSION);
}

export const AbsurdTasks: React.FC = () => {
  const { user, profile, recordTaskCompletion, recordDailyTasksCompleted, dailyStreak, loginWithGoogle, currentRank, setIsProfileOpen } = useAuth();

  // One-time migration clears stale local mission locks from the broken save version.
  migrateTaskStorage();

  // Offset de dias para permitir testar a renovação diária sem esperar 24 horas
  const [dayOffset, setDayOffset] = useState<number>(() => {
    const saved = localStorage.getItem('guru_toxico_day_offset');
    return saved ? parseInt(saved, 10) : 0;
  });

  const { dateString: currentDayKey, tasks } = getDailyTasks(dayOffset);

  // Chave de armazenamento exclusiva por usuário (ou 'guest') e por dia
  const activeUserKey = user?.uid ? user.id : 'guest';

  // Lista de IDs concluídos para o dia ativo e para o usuário ativo
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`guru_toxico_completed_10_${activeUserKey}_${currentDayKey}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  // Para usuários autenticados, o banco é a fonte de verdade do histórico.
  // O localStorage continua sendo usado apenas para visitantes e para o estado visual do dia.
  useEffect(() => {
    if (user) {
      const serverCompleted = Array.isArray(profile?.completedTaskIds) ? profile.completedTaskIds : [];
      setCompletedIds(tasks.filter((task) => serverCompleted.includes(task.id)).map((task) => task.id));
      return;
    }

    const saved = localStorage.getItem(`guru_toxico_completed_10_${activeUserKey}_${currentDayKey}`);
    if (saved) {
      try {
        setCompletedIds(JSON.parse(saved));
        return;
      } catch {}
    }
    setCompletedIds([]);
  }, [activeUserKey, currentDayKey, user, profile?.completedTaskIds, tasks]);

  // Carrossel manual ativo (0 a 9)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Modal comemorativo ao completar as 10 tarefas do dia
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);

  // Feedback sarcástico em popup
  const [sarcasticFeedback, setSarcasticFeedback] = useState<{
    taskTitle: string;
    roast: string;
  } | null>(null);

  // Celebração de confetes ao fechar 10/10
  const triggerConfettiCelebration = useCallback(() => {
    toxicAudio.playCelebrationFanfare();

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#a3e635', '#eab308', '#c084fc', '#38bdf8', '#f43f5e']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tasks.length);
    toxicAudio.playStampThud();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tasks.length) % tasks.length);
    toxicAudio.playStampThud();
  };

  const handleSelectTask = (index: number) => {
    setCurrentIndex(index);
    toxicAudio.playStampThud();
  };

  const handleComplete = async (task: AbsurdTask) => {
    if (completedIds.includes(task.id)) return;
    // Do not consume the mission locally until the server confirms the points.
    // This prevents failed saves from permanently locking the mission for testing.
    if (user) {
      await recordTaskCompletion(task.id, task.alphaScore, task.difficulty);
    }

    const nextCompleted = [...completedIds, task.id];
    setCompletedIds(nextCompleted);
    if (!user) {
      localStorage.setItem(`guru_toxico_completed_10_${activeUserKey}_${currentDayKey}`, JSON.stringify(nextCompleted));
    }
    toxicAudio.playStampThud();

    const roast = task.completionRoast || 'Concluiu é, com esse bucho aí? Vamos fingir que acreditamos.';
    setSarcasticFeedback({
      taskTitle: task.title,
      roast
    });

    // Concluiu as 10 tarefas do dia: atualiza streak diário
    if (nextCompleted.length === 10) {
      await recordDailyTasksCompleted(currentDayKey);

      const celebrationKey = `guru_toxico_celebration_${activeUserKey}_${currentDayKey}`;
      const alreadyCelebrated = localStorage.getItem(celebrationKey);

      if (!alreadyCelebrated) {
        localStorage.setItem(celebrationKey, 'true');
        setShowCelebrationModal(true);
        triggerConfettiCelebration();
      }
    }

  };

  // Simular novo dia para teste (renovação automática e imediata)
  const handleSimulateNextDay = () => {
    const nextOffset = dayOffset + 1;
    setDayOffset(nextOffset);
    localStorage.setItem('guru_toxico_day_offset', String(nextOffset));
    setCurrentIndex(0);
    setSarcasticFeedback(null);
    toxicAudio.playCashRegister();
  };

  // Limpar conclusões do dia para retestar tarefas
  const handleResetTodayCompletions = () => {
    localStorage.removeItem(`guru_toxico_completed_10_${activeUserKey}_${currentDayKey}`);
    localStorage.removeItem(`guru_toxico_celebration_${activeUserKey}_${currentDayKey}`);
    setCompletedIds([]);
    toxicAudio.playStampThud();
  };

  const completedCount = completedIds.length;
  const currentTask = tasks[currentIndex];
  const isCurrentDone = currentTask ? completedIds.includes(currentTask.id) : false;

  return (
    <div className="rounded-2xl bg-[#0f1118] border border-neutral-800 p-4 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0">
            <Skull className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2 flex-wrap">
              <span>10 Tarefas Absurdas Diárias</span>
              <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-lime-950 text-lime-400 border border-lime-800/60 uppercase">
                Não-Repetitivas
              </span>
            </h2>
            <p className="text-xs text-neutral-400 break-words leading-relaxed">
              Renovação diária automática à meia-noite (rotação sem repetição entre 70 missões).
            </p>
          </div>
        </div>

        {/* Action Controls for Testing and User Info */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleSimulateNextDay}
            className="px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-lime-500 text-[11px] font-tech text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Simula a chegada de um novo dia para renovar as 10 missões sem repetir"
          >
            <RefreshCw className="w-3.5 h-3.5 text-lime-400" />
            <span>Simular Próximo Dia</span>
          </button>

          <button
            onClick={handleResetTodayCompletions}
            className="px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-yellow-500 text-[11px] font-tech text-neutral-400 hover:text-yellow-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Zera as conclusões das tarefas de hoje para poder testá-las novamente"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zerar Hoje</span>
          </button>

          {user ? (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-black/60 border border-neutral-700 hover:border-lime-500 transition-colors flex items-center gap-2 cursor-pointer"
              title="Abrir perfil de conquistas e patentes"
            >
              <span className="text-base">{currentRank.badge}</span>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] font-tech text-neutral-400 block leading-tight">Patente:</span>
                <span className={`text-xs font-bold font-tech ${currentRank.colorClass} truncate max-w-[120px] block`}>
                  {currentRank.title.split('/')[0]}
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-tech cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-lime-400" />
              <span>Entrar p/ Salvar</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress tracker (0 to 10) */}
      <div className="bg-black/50 border border-neutral-800 p-3.5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-tech">
        <div className="flex flex-wrap items-center gap-2 text-neutral-300 min-w-0">
          <Award className="w-4 h-4 text-yellow-500 shrink-0" />
          <span className="text-neutral-400">Desafio Diário ({currentDayKey}):</span>
          <span className="text-lime-400 font-bold">
            {completedCount}/10 Concluídas ({completedCount === 0 ? '0% Alpha' : completedCount === 10 ? '100% Insano' : `${completedCount * 10}% Cumprido`})
          </span>
          <span className="text-neutral-600">·</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-950/80 border border-orange-500/50 text-orange-400 font-bold text-[11px] shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-400 animate-pulse" />
            <span>Streak: {dailyStreak} {dailyStreak === 1 ? 'Dia' : 'Dias'}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {completedCount === 10 && (
            <button
              onClick={triggerConfettiCelebration}
              className="px-2.5 py-1 rounded-lg bg-lime-400 hover:bg-lime-300 text-black font-black text-[11px] flex items-center gap-1.5 transition-all shadow-md cursor-pointer animate-pulse shrink-0"
              title="Disparar chuva de confetes da insanidade"
            >
              <PartyPopper className="w-3.5 h-3.5" />
              <span>Confetes</span>
            </button>
          )}
          <div className="w-full sm:w-44 bg-neutral-800 h-2.5 rounded-full overflow-hidden shrink-0">
            <div
              className="bg-lime-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${(completedCount / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 10/10 SPARTAN PROTOCOL CELEBRATION BANNER */}
      {showCelebrationModal && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-lime-950/80 via-[#131b14] to-neutral-900 border-2 border-lime-400 shadow-2xl space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-lime-400/20 border border-lime-400 flex items-center justify-center text-lime-400 shrink-0 shadow-inner">
                <Trophy className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <span className="text-[11px] font-tech text-yellow-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  CONQUISTA HISTÓRICA DESBLOQUEADA
                </span>
                <h3 className="text-base sm:text-lg font-black font-display text-white">
                  TODAS AS 10 TAREFAS CONCLUÍDAS (10/10)!
                </h3>
              </div>
            </div>

            <button
              onClick={() => setShowCelebrationModal(false)}
              className="p-1 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
            Você acabou de cumprir todas as 10 tarefas absurdas de hoje sem desistir. O Guru Tóxico está simultaneamente horrorizado e impressionado com sua falta de amor próprio. Você ganhou <strong>+10 Pontos Alpha</strong> e a conquista <span className="text-lime-400 font-bold">"Mente Blindada de Chumbo"</span>.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={triggerConfettiCelebration}
              className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold font-tech text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Disparar Mais Confetes</span>
            </button>

            {user && (
              <button
                onClick={() => {
                  setShowCelebrationModal(false);
                  setIsProfileOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-tech text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Ver Conquistas & Nova Patente</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Sarcastic Reaction Banner */}
      {sarcasticFeedback && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/70 via-[#181119] to-neutral-900 border-2 border-red-500/80 shadow-xl flex items-start justify-between gap-3 transition-all animate-fadeIn">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-red-900/40 border border-red-500/50 text-red-400 shrink-0 mt-0.5">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 text-xs font-tech text-red-400 font-bold uppercase tracking-wider text-truncate truncate">
                <span>REAÇÃO DO GURU ALPHA:</span>
                <span className="text-neutral-500">[{sarcasticFeedback.taskTitle}]</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-100 font-sans italic font-medium leading-relaxed break-words">
                "{sarcasticFeedback.roast}"
              </p>
            </div>
          </div>
          <button
            onClick={() => setSarcasticFeedback(null)}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
            title="Fechar reação sarcástica"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* CARROSSEL MANUAL DE TAREFAS */}
      <div className="space-y-4">
        {/* Carousel Navigation Bar & Slide Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-950/60 border border-neutral-800 p-3 rounded-xl">
          {/* Mission Number Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {tasks.map((t, idx) => {
              const isDone = completedIds.includes(t.id);
              const isActive = idx === currentIndex;

              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTask(idx)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-tech font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                    isActive
                      ? 'bg-lime-400 text-black shadow-md scale-105'
                      : isDone
                      ? 'bg-lime-950/60 border border-lime-500/50 text-lime-400 hover:bg-lime-900/60'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                  title={`Ir para a Missão ${idx + 1}`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3 h-3 text-lime-400 shrink-0" />
                  ) : null}
                  <span>M{String(idx + 1).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next Manual Carousel Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="text-xs font-tech text-neutral-400">
              Missão <strong className="text-lime-400">{currentIndex + 1}</strong> de {tasks.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Missão anterior"
                aria-label="Missão anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Próxima missão"
                aria-label="Próxima missão"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Current Task Slide Card */}
        {currentTask && (
          <div
            className={`relative rounded-2xl p-5 sm:p-8 border-2 transition-all shadow-2xl flex flex-col justify-between min-h-[360px] ${
              isCurrentDone
                ? 'bg-gradient-to-b from-[#131d16] via-[#0f1411] to-[#0c0e12] border-lime-500/70 shadow-[0_0_25px_rgba(163,230,53,0.15)]'
                : 'bg-gradient-to-b from-[#141620] via-[#0e1017] to-[#0a0c12] border-neutral-700 hover:border-neutral-600'
            }`}
          >
            <div className="space-y-4">
              {/* Task Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-tech font-black text-lime-400 tracking-wider">
                    MISSÃO {String(currentIndex + 1).padStart(2, '0')} / {tasks.length}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                      currentTask.difficulty === 'Desumano'
                        ? 'bg-red-950 text-red-400 border border-red-800/60'
                        : currentTask.difficulty === 'Extremo'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                        : 'bg-purple-950 text-purple-400 border border-purple-800/60'
                    }`}
                  >
                    {currentTask.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-tech px-2.5 py-1 rounded-lg bg-black/60 border border-neutral-700 text-yellow-400 font-bold">
                    +{currentTask.alphaScore} PTS ALPHA
                  </span>
                  {isCurrentDone ? (
                    <span className="text-xs font-tech px-2.5 py-1 rounded-lg bg-lime-950 text-lime-400 border border-lime-800 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Concluída
                    </span>
                  ) : (
                    <span className="text-xs font-tech px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-400 border border-neutral-800">
                      Pendente
                    </span>
                  )}
                </div>
              </div>

              {/* Task Title */}
              <h3 className="text-xl sm:text-3xl font-black text-white font-display leading-tight tracking-tight break-words">
                {currentTask.title}
              </h3>

              {/* Task Instruction */}
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-neutral-800/90 space-y-1.5">
                <span className="text-[11px] font-tech text-neutral-400 uppercase font-bold tracking-wider block">
                  Desafio da Loucura:
                </span>
                <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-sans font-medium break-words">
                  {currentTask.instruction}
                </p>
              </div>

              {/* Justification Box */}
              <div className="p-4 bg-neutral-950/60 rounded-xl border border-neutral-800 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-xs font-tech text-yellow-500 uppercase font-bold block mb-0.5">
                    Justificativa Pseudocientífica do Guru:
                  </span>
                  <p className="text-sm text-neutral-400 italic font-sans leading-relaxed break-words">
                    "{currentTask.hustleJustification}"
                  </p>
                </div>
              </div>
            </div>

            {/* Task Action & Carousel Navigation Footer */}
            <div className="pt-6 mt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrev}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-tech font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleNext}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-tech font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full sm:w-auto">
                {isCurrentDone ? (
                  <div className="w-full sm:w-auto py-3 px-6 bg-lime-500/20 border border-lime-500/60 rounded-xl text-lime-400 text-xs sm:text-sm font-bold font-tech flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>INSANIDADE CONCLUÍDA (+{currentTask.alphaScore} PTS)</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleComplete(currentTask)}
                    className="w-full sm:w-auto py-3 px-6 bg-lime-400 hover:bg-lime-300 text-black rounded-xl text-xs sm:text-sm font-black font-tech uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer brutal-shadow-toxic"
                  >
                    <Check className="w-4 h-4 text-black shrink-0" />
                    <span>Cumpri Esta Loucura</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
