import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, AlertOctagon, Sparkles, Quote, Flame } from 'lucide-react';
import { getDailySuccessCases } from '../data/absurdSuccessCases';
import { toxicAudio } from '../utils/audio';

export const AbsurdSuccessCarousel: React.FC = () => {
  // Day offset to sync with tasks simulation or new day
  const [dayOffset, setDayOffset] = useState<number>(() => {
    const saved = localStorage.getItem('guru_toxico_day_offset');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Listen to storage changes in case day offset is adjusted
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('guru_toxico_day_offset');
      setDayOffset(saved ? parseInt(saved, 10) : 0);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const { dateString, cases: dailyCases } = getDailySuccessCases(dayOffset);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index to 0 if day changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [dateString]);

  const totalCases = dailyCases.length;
  const currentCase = dailyCases[currentIndex] || dailyCases[0];

  const handleNext = useCallback(() => {
    if (totalCases === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalCases);
    toxicAudio.playStampThud();
  }, [totalCases]);

  const handlePrev = useCallback(() => {
    if (totalCases === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalCases) % totalCases);
    toxicAudio.playStampThud();
  }, [totalCases]);

  if (!currentCase) return null;

  return (
    <div className="rounded-2xl bg-[#0f1118] border border-neutral-800 p-4 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight flex items-center gap-2 flex-wrap">
              Cases de Sucesso de nossos seguidores
              <span className="text-[11px] font-tech px-2 py-0.5 rounded bg-lime-950 text-lime-400 border border-lime-800/60 uppercase font-bold">
                6 Cases de Hoje ({dateString})
              </span>
            </h2>
            <p className="text-xs text-neutral-400 break-words">
              Histórias reais (ou quase) de indivíduos que destruíram a própria dignidade no altar da alta performance.
            </p>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Case anterior"
            aria-label="Case anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-tech text-neutral-400 px-2">
            <strong className="text-lime-400">{currentIndex + 1}</strong> / {totalCases}
          </span>

          <button
            onClick={handleNext}
            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Próximo case"
            aria-label="Próximo case"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Carousel Slide Card */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#131622] via-[#0e1017] to-[#0a0b10] border-2 border-neutral-800 hover:border-purple-500/50 p-5 sm:p-7 transition-all duration-300 shadow-2xl">
        <div className="space-y-5">
          {/* Top Author & Metric Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-900 border border-purple-400/30 flex items-center justify-center text-sm font-black font-tech text-white shadow-inner shrink-0">
                {currentCase.avatarText}
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white font-display break-words">
                  {currentCase.author}
                </h3>
                <p className="text-xs text-purple-300 font-tech break-words">
                  {currentCase.role}
                </p>
              </div>
            </div>

            {/* Metric pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-800/50 text-xs font-tech self-start sm:self-auto shrink-0">
              <span className="text-neutral-400">{currentCase.metric.label}:</span>
              <span className="text-lime-400 font-bold text-sm">{currentCase.metric.value}</span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <Quote className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <h4 className="text-sm sm:text-base md:text-lg font-extrabold text-neutral-100 font-display leading-snug break-words">
                "{currentCase.headline}"
              </h4>
            </div>

            {/* Narrative Story */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans pl-7 break-words">
              {currentCase.story}
            </p>
          </div>

          {/* Claimed Revenue vs Actual Reality Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {/* Claimed */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-tech font-bold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>Faturamento Fictício Prometido</span>
              </div>
              <p className="text-sm sm:text-base font-black font-tech text-emerald-300 break-words">
                {currentCase.claimedRevenue}
              </p>
            </div>

            {/* Reality */}
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/50 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-tech font-bold text-red-400 uppercase tracking-wider">
                <AlertOctagon className="w-3.5 h-3.5 shrink-0 text-red-400" />
                <span>Desfecho Trágico da Vida Real</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-neutral-200 break-words">
                {currentCase.actualOutcome}
              </p>
            </div>
          </div>

          {/* Alpha Lesson Quote */}
          <div className="p-3 bg-black/60 border border-neutral-800 rounded-xl flex items-start gap-2.5">
            <Flame className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <div className="text-xs font-sans italic text-neutral-300 min-w-0">
              <span className="font-tech text-yellow-400 font-bold not-italic mr-1 uppercase">Lição Alpha:</span>
              "{currentCase.alphaLesson}"
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {currentCase.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-tech text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {dailyCases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              toxicAudio.playStampThud();
            }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-lime-400' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
            }`}
            aria-label={`Ir para o case ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
