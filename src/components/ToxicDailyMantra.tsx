import React, { useState, useEffect } from 'react';
import { Quote, Sparkles, RefreshCw, Copy, Check, Flame, Bot } from 'lucide-react';
import { toxicAudio } from '../utils/audio';

const PROCEDURAL_DAILY_MANTRAS = [
  'Se você precisa de despertador para acordar às 04:00, seu concorrente já comprou o prédio onde você dorme e aumentou o seu aluguel.',
  'Dormir 8 horas é terceirizar o próprio fracasso para o subconsciente. O cérebro só descansa no caixão.',
  'Enquanto você mastiga carboidrato complexo na hora do almoço, o estagiário em Singapura já automatizou a sua existência.',
  'O banho gelado não serve para limpar seu corpo, serve para congelar qualquer resquício de compaixão que você tenha por si mesmo.',
  'Se você não fechou nenhum contrato antes do sol nascer, o sol tem mais disciplina e faturamento que você.',
  'A ansiedade é apenas o seu corpo tentando avisar que você deveria estar vendendo mentoria em vez de respirar à toa.',
  'Não espere o momento certo: alugue um terno falsificado, poste uma frase de efeito no Instagram e cobre R$ 5.000 pelo Pix.',
  'Amigos que te chamam para churrasco no domingo são espiões da CLT querendo sabotar a sua alavancagem quântica.',
];

export const ToxicDailyMantra: React.FC = () => {
  const [mantra, setMantra] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);

  const today = new Date().toISOString().slice(0, 10);
  const cacheKey = `guru_toxico_daily_mantra_${today}`;

  const generateMantra = async (forceRefresh: boolean = false) => {
    if (!forceRefresh) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setMantra(cached);
        setIsAiGenerated(true);
        return;
      }
    }

    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch('/api/gemini/mantra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        const clean = (data.text || PROCEDURAL_DAILY_MANTRAS[Math.floor(Math.random() * PROCEDURAL_DAILY_MANTRAS.length)]).replace(/^["']|["']$/g, '');
        setMantra(clean);
        setIsAiGenerated(data.source === 'gemini');
        localStorage.setItem(cacheKey, clean);
      } else {
        const pick = PROCEDURAL_DAILY_MANTRAS[Math.floor(Math.random() * PROCEDURAL_DAILY_MANTRAS.length)];
        setMantra(pick);
        setIsAiGenerated(false);
        localStorage.setItem(cacheKey, pick);
      }
    } catch (err) {
      console.warn('Erro ao carregar mantra:', err);
      const pick = PROCEDURAL_DAILY_MANTRAS[Math.floor(Math.random() * PROCEDURAL_DAILY_MANTRAS.length)];
      setMantra(pick);
      setIsAiGenerated(false);
      localStorage.setItem(cacheKey, pick);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateMantra(false);
  }, []);

  const handleCopy = () => {
    if (!mantra) return;
    navigator.clipboard.writeText(`"${mantra}" — Guru Tóxico`);
    setCopied(true);
    toxicAudio.playCashRegister();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    toxicAudio.playBuzzer();
    generateMantra(true);
  };

  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-[#141824] via-[#0f121d] to-[#121622] border-2 border-purple-500/40 p-4 sm:p-6 shadow-xl space-y-3 sm:space-y-4">
      {/* Top Header Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold font-display text-white tracking-tight flex items-center gap-1.5">
            Mantra Tóxico do Dia
          </span>
          <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 uppercase flex items-center gap-1">
            <Bot className="w-3 h-3 text-purple-400" />
            {isAiGenerated ? 'Gerado por Gemini IA' : 'Protocolo de Choque'}
          </span>
        </div>

        <div className="text-[11px] font-tech text-neutral-400 flex items-center gap-2">
          <span>Data: <strong className="text-lime-400">{today}</strong></span>
          <span className="text-neutral-600">·</span>
          <span>Dose Única Diária</span>
        </div>
      </div>

      {/* Main Quote Box */}
      <div className="relative p-4 sm:p-5 rounded-xl bg-black/50 border border-neutral-800/90 min-h-[90px] flex items-center">
        <Quote className="absolute top-3 left-3 w-6 h-6 text-purple-500/20 pointer-events-none" />

        {loading ? (
          <div className="w-full flex items-center justify-center gap-2 text-xs text-purple-400 font-tech animate-pulse py-2">
            <Sparkles className="w-4 h-4 animate-spin text-lime-400" />
            <span>O Gemini está canalizando a toxidade pura dos gurus quânticos...</span>
          </div>
        ) : (
          <p className="text-sm sm:text-base md:text-lg font-bold text-neutral-100 font-display italic leading-snug pl-4 sm:pl-6 break-words">
            "{mantra}"
          </p>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 text-xs font-tech">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={loading || !mantra}
            title="Copiar mantra para postar nos stories"
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-lime-400" />
                <span className="text-lime-400 font-bold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copiar P/ Story</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          title="Gerar outro mantra imediatamente"
          className="px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800/80 text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 ml-auto sm:ml-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Gerar Novo Mantra com IA</span>
        </button>
      </div>
    </div>
  );
};
