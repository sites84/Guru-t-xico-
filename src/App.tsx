import React, { useState } from 'react';
import { Flame, TrendingUp, LogIn, Shield, Sparkles, Bot } from 'lucide-react';
import { AbsurdTasks } from './components/AbsurdTasks';
import { AbsurdSuccessCarousel } from './components/AbsurdSuccessCarousel';
import { MediocrityCalculatorModal } from './components/MediocrityCalculatorModal';
import { GuruAiRoastModal } from './components/GuruAiRoastModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ToxicDailyMantra } from './components/ToxicDailyMantra';
import { AchievementUnlockedModal } from './components/AchievementUnlockedModal';
import { TopBannerMycon } from './components/TopBannerMycon';
import { ToxicDailyTip } from './components/ToxicDailyTip';
import { DailyWelcomeModal } from './components/DailyWelcomeModal';
import { PixDonationSection } from './components/PixDonationSection';
import { ToxicLeaderboard } from './components/ToxicLeaderboard';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainAppContent() {
  const { user, profile, loginWithGoogle, currentRank, setIsProfileOpen, achievementQueue, dismissCurrentAchievement, dailyStreak } = useAuth();

  // Termômetro de Mediocridade
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAiRoastOpen, setIsAiRoastOpen] = useState(false);

  const scrollToCases = () => {
    const el = document.getElementById('secao-cases');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalPoints = profile?.totalPoints || 0;

  return (
    <div className="min-h-screen bg-[#07080c] text-neutral-100 flex flex-col font-sans selection:bg-lime-400 selection:text-black overflow-x-hidden">
      {/* Hazard Warning Strip */}
      <div className="h-1.5 hazard-border w-full shrink-0" />

      {/* BANNER NO TOPO DO SITE */}
      <TopBannerMycon />

      {/* DICA TÓXICA DO DIA */}
      <ToxicDailyTip />

      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#090a0f]/95 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-black font-display tracking-tight text-white flex items-center gap-1.5 shrink-0"
          >
            <span className="text-lime-400">GURU</span>
            <span className="text-white">TÓXICO</span>
          </a>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4 text-xs font-semibold font-tech uppercase tracking-wider">
            <button
              onClick={scrollToCases}
              className="hover:text-purple-400 text-neutral-400 transition-colors cursor-pointer text-truncate truncate hidden md:inline-block"
            >
              Cases de Sucesso
            </button>

            {/* DAILY STREAK COUNTER WITH SMALL FIRE ICON AND NUMBER */}
            <div
              onClick={() => {
                if (user) {
                  setIsProfileOpen(true);
                } else {
                  const el = document.getElementById('secao-conteudo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all select-none shrink-0 cursor-pointer ${
                dailyStreak > 0
                  ? 'bg-gradient-to-r from-orange-950/80 to-amber-950/80 border-orange-500/70 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.35)] hover:border-orange-400'
                  : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
              }`}
              title={
                dailyStreak > 0
                  ? `🔥 Sequência de ${dailyStreak} ${dailyStreak === 1 ? 'dia consecutivo' : 'dias consecutivos'} de tarefas cumpridas!`
                  : '🔥 Sequência diária: 0 dias. Cumpra as 10 missões de hoje para acender a chama!'
              }
            >
              <Flame
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                  dailyStreak > 0
                    ? 'fill-orange-500 text-orange-400 animate-pulse'
                    : 'text-neutral-500'
                }`}
              />
              <span className={`font-black font-tech text-xs sm:text-sm ${
                dailyStreak > 0 ? 'text-orange-300' : 'text-neutral-400'
              }`}>
                {dailyStreak}
              </span>
              <span className="hidden sm:inline text-[10px] font-tech text-orange-400/80 font-bold uppercase tracking-wider">
                {dailyStreak === 1 ? 'Dia' : 'Dias'}
              </span>
            </div>

            {/* User Profile / Login Button */}
            {user ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-lime-500 transition-all cursor-pointer text-white shrink-0"
                title="Abrir perfil de conquistas e patentes"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Avatar'}
                    className="w-5 h-5 rounded-full object-cover border border-lime-400"
                  />
                ) : (
                  <span className="text-sm">{currentRank.badge}</span>
                )}
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-lime-400 font-bold text-[11px] font-tech">{totalPoints} pts</span>
                    <span className="text-[10px] text-neutral-400 font-tech">· {currentRank.badge}</span>
                  </div>
                  <span className="text-[10px] text-neutral-300 font-display truncate max-w-[90px] block leading-tight">
                    {user.displayName?.split(' ')[0] || 'Perfil'}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-400 hover:bg-lime-300 text-black font-bold font-tech text-xs rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span>Entrar</span>
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
        {/* HERO SECTION */}
        <section className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#11131c] via-[#0c0d14] to-[#07080c] border border-neutral-800 p-5 sm:p-8 lg:p-10 overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-white leading-tight tracking-tight break-words">
              A HUMILHAÇÃO QUE SUA{' '}
              <span className="text-lime-400 underline decoration-red-600 underline-offset-4 sm:underline-offset-8">
                MEDIOCRIDADE
              </span>{' '}
              MERECE.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-sans max-w-2xl mx-auto break-words">
              Chega de autoajuda fofa e de achar que você é o lobo de Wall Street.
              Enfrente a rotina absurda, acumule pontos de insanidade, suba de patente na pirâmide e grave suas conquistas no seu perfil oficial.
            </p>

            {/* Profile status bar or Login prompt inside Hero */}
            <div className="pt-1">
              {user ? (
                <div
                  onClick={() => setIsProfileOpen(true)}
                  className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-neutral-700 hover:border-lime-500 text-xs font-tech cursor-pointer transition-all max-w-full"
                >
                  <span className="text-lg shrink-0">{currentRank.badge}</span>
                  <span className="text-neutral-300">
                    Conectado como <strong className="text-white">{user.displayName || 'Gado Inicial'}</strong>
                  </span>
                  <span className="text-neutral-600 hidden sm:inline">·</span>
                  <span className={`${currentRank.colorClass} font-bold`}>{currentRank.title}</span>
                  <span className="text-neutral-600 hidden sm:inline">·</span>
                  <span className="text-lime-400 font-bold">{totalPoints} PTS</span>
                  <span className="text-neutral-400 underline ml-1">Ver Prontuário</span>
                </div>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-tech cursor-pointer transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-lime-400" />
                  <span>Faça login com Google para gravar suas patentes e desbloquear conquistas</span>
                </button>
              )}
            </div>

            {/* BOTÃO PRINCIPAL COM MÁXIMO DESTAQUE: CONSULTA PESSOAL COM O GURU */}
            <div className="pt-4 flex flex-col items-center justify-center">
              <button
                onClick={() => setIsAiRoastOpen(true)}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-9 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-lime-500 hover:from-purple-500 hover:via-fuchsia-500 hover:to-lime-400 text-black font-black text-sm sm:text-base font-tech uppercase tracking-wider shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(132,204,22,0.7)] border-2 border-white/40 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <div className="p-1.5 rounded-xl bg-black/40 text-lime-300 border border-white/20">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce shrink-0" />
                </div>
                <div className="text-left flex flex-col items-start leading-tight">
                  <span className="text-sm sm:text-base text-neutral-950 font-black font-display tracking-tight flex items-center gap-1.5">
                    <span>⚡ CONSULTA PESSOAL COM O GURU</span>
                    <Sparkles className="w-4 h-4 text-neutral-950" />
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-900/90 font-tech font-bold">
                    Confesse suas fraquezas e receba um coice motivacional via IA
                  </span>
                </div>
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 shrink-0 group-hover:scale-125 transition-transform hidden sm:inline-block" />
              </button>
            </div>
          </div>
        </section>

        {/* TOXIC DAILY MANTRA GENERATED BY GEMINI AI */}
        <section className="scroll-mt-20">
          <ToxicDailyMantra />
        </section>

        {/* SEÇÃO PRINCIPAL DE CONTEÚDO: TAREFAS DIÁRIAS (CARROSSEL MANUAL) */}
        <section id="secao-conteudo" className="scroll-mt-20 space-y-8">
          {/* As 10 tarefas absurdas em carrossel manual diretamente apresentadas */}
          <AbsurdTasks />

          {/* Seção de Cases de Sucesso de nossos seguidores com Carrossel Manual */}
          <div id="secao-cases" className="pt-4 scroll-mt-20">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-800">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h2 className="text-base sm:text-lg font-bold font-display text-white">
                Cases de Sucesso de nossos seguidores
              </h2>
            </div>
            <AbsurdSuccessCarousel />
          </div>
        </section>

        {/* SEÇÃO FINAL: IMAGEM DE APOIO COMPATÍVEL COM CELULAR & BOTÃO COPIAR PIX */}
        <PixDonationSection />
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-neutral-800 bg-[#090a0f] py-6 px-4 text-center text-xs text-neutral-500 space-y-2.5 font-tech">
        <div className="flex items-center justify-center gap-2 font-bold text-neutral-400 font-display text-sm">
          <span>GURU TÓXICO</span>
          <span className="text-neutral-600">·</span>
          <span className="text-lime-500 text-xs font-tech">SÁTIRA VIRAL NÃO RECOMENDADA PARA EGOS SENSÍVEIS</span>
        </div>
        <p className="max-w-md mx-auto text-neutral-500 text-[11px] leading-relaxed break-words">
          Este aplicativo é uma paródia bem-humorada que escarnece da cultura tóxica de gurus e rotinas absurdas. Nenhum valor monetário real é cobrado. Durma bem e não caia em papo de coach.
        </p>
        <div className="text-[10px] text-neutral-600 pt-1">
          © 2026 Guru Tóxico — Todos os direitos reservados ao bom senso.
        </div>
      </footer>

      {/* POPUP DE PRIMEIRO ACESSO DO DIA */}
      <DailyWelcomeModal />

      {/* MODALS */}
      <MediocrityCalculatorModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      <GuruAiRoastModal
        isOpen={isAiRoastOpen}
        onClose={() => setIsAiRoastOpen(false)}
      />

      <UserProfileModal />

      {/* GLOBAL ACHIEVEMENT CELEBRATION POPUP */}
      <AchievementUnlockedModal
        achievement={achievementQueue[0] || null}
        remainingCount={achievementQueue.length}
        onDismiss={dismissCurrentAchievement}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
