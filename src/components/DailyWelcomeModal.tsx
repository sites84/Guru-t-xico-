import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, CheckCircle, Trophy, BookOpen, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { toxicAudio } from '../utils/audio';

interface DailyWelcomeModalProps {
  onUnlock?: () => void;
}

export const DailyWelcomeModal: React.FC<DailyWelcomeModalProps> = ({ onUnlock }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculates today's date key including day offset if simulated
  const getTodayKey = () => {
    const savedOffset = localStorage.getItem('guru_toxico_day_offset');
    const offset = savedOffset ? parseInt(savedOffset, 10) : 0;
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  };

  const todayKey = getTodayKey();

  useEffect(() => {
    // Check if the user has already unlocked the site for today
    const unlockedToday = localStorage.getItem(`guru_toxico_daily_access_${todayKey}`);
    if (!unlockedToday) {
      setIsOpen(true);
    }
  }, [todayKey]);

  const handleContinueAndUnlock = () => {
    toxicAudio.playCashRegister();

    // 1. Open the partner link in a new tab
    const partnerLink = 'https://s.shopee.com.br/9KiKsrOPFh';
    window.open(partnerLink, '_blank', 'noopener,noreferrer');

    // 2. Mark today as unlocked in localStorage
    localStorage.setItem(`guru_toxico_daily_access_${todayKey}`, 'true');

    // 3. Unlock and close modal
    setIsOpen(false);
    if (onUnlock) {
      onUnlock();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto rounded-3xl bg-gradient-to-b from-[#141622] via-[#0c0d14] to-[#07080c] border-2 border-lime-500/80 p-5 sm:p-8 shadow-[0_0_50px_rgba(163,230,53,0.3)] text-left animate-in fade-in zoom-in-95 duration-200">
        {/* Top Warning Badge */}
        <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-4 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/60 text-lime-400 text-xs font-tech font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-lime-400 shrink-0" />
            <span>Primeiro Acesso do Dia ({todayKey})</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-tech text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
            <span>Guia Oficial de Operação</span>
          </div>
        </div>

        {/* Modal Title */}
        <div className="space-y-2 mb-6">
          <h2 className="text-xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
            Como Funciona o <span className="text-lime-400">Guru Tóxico</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            Bem-vindo ao simulador viral de disciplina absurda e sátira anti-hustle. Conheça as principais ferramentas disponíveis para você hoje:
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[48vh] overflow-y-auto pr-1">
          {/* Feature 1 */}
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-lime-500/40 transition-colors space-y-1">
            <div className="flex items-center gap-2 text-lime-400 text-xs font-bold font-tech uppercase">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>10 Tarefas Absurdas Diárias</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Todos os dias, 10 desafios satíricos inéditos são sorteados. Cumpra-os para ganhar pontos de insanidade e testar sua resiliência moral.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-orange-500/40 transition-colors space-y-1">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold font-tech uppercase">
              <Flame className="w-4 h-4 shrink-0" />
              <span>Sequência Diária (Streak)</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Complete suas 10 tarefas do dia para manter o fogo aceso no cabeçalho e acumular dias consecutivos de dedicação espartana.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-purple-500/40 transition-colors space-y-1">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold font-tech uppercase">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Cases de Sucesso</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              6 histórias inacreditáveis e hilárias de seguidores que mudam a cada dia. Aprenda com os maiores absurdos da alta performance.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-cyan-500/40 transition-colors space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-tech uppercase">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Mantra Tóxico do Dia</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Sua dose diária de veneno motivacional em áudio ou texto para espantar a fraqueza biológica logo pela manhã.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-yellow-500/40 transition-colors space-y-1">
            <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold font-tech uppercase">
              <Trophy className="w-4 h-4 shrink-0" />
              <span>Patentes & Conquistas</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Faça login com Google para gravar seus pontos, subir de "Gado Inicial" a "Deus Quântico" e desbloquear certificados satíricos.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/40 transition-colors space-y-1">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-tech uppercase">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Termômetro de Mediocridade</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Descubra seu grau de conformismo respondendo a um questionário cáustico e gere um atestado oficial da sua mediocridade.
            </p>
          </div>
        </div>

        {/* CTA Unlock Button */}
        <div className="pt-2 border-t border-neutral-800/80 space-y-3 text-center">
          <button
            onClick={handleContinueAndUnlock}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-lime-400 via-lime-300 to-lime-400 hover:from-lime-300 hover:to-lime-200 text-black font-black text-sm sm:text-base font-tech uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(163,230,53,0.5)] hover:shadow-[0_0_45px_rgba(163,230,53,0.7)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>CONTINUAR E LIBERAR O SITE</span>
            <ExternalLink className="w-5 h-5 shrink-0" />
          </button>
          <p className="text-[11px] text-neutral-400 font-tech">
            ⚡ Ao clicar em <strong>Continuar</strong>, uma oferta parceira recomendada será aberta em outra aba e o site será <strong>liberado imediatamente</strong> para o seu acesso diário.
          </p>
        </div>
      </div>
    </div>
  );
};
