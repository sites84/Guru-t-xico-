import React, { useState } from 'react';
import { Flame, Skull, RefreshCw, Zap, Quote } from 'lucide-react';
import { toxicAudio } from '../utils/audio';

const TOXIC_TIPS_POOL: string[] = [
  'Se você dormiu 8 horas hoje, você perdeu 33% da sua vida descansando um corpo que nem sequer produz riqueza.',
  'Enquanto você mastiga pão com margarina, seu concorrente comprou a casa da sua mãe e alugou de volta pra ela com 18% de ágio.',
  'Cansaço biológico é desculpa de quem ganha vale-refeição. Tubarão do mercado faz fotossíntese de lucro líquido.',
  'Seus amigos te chamaram para tomar cerveja? Bloqueie todos. Amizade é passivo com depreciação diária e zero dedução no Imposto de Renda.',
  'Não reclame do seu chefe na segunda-feira. Reclame de você mesmo por ainda precisar de oxigênio para preencher planilhas.',
  'Zona de conforto é caixão estofado. Toda vez que você boceja, sua conta no Serasa ganha um ponto extra de desgraça.',
  'Banho morno enfraquece a postura do predador. Se a água do chuveiro não estiver a -2°C, você ainda raciocina como estagiário.',
  'Se você não trabalha no feriado, não reclame quando o seu feriado virar demissão em massa por corte de custos.',
  'Pare de respirar tão fundo! Cada suspiro seu consome oxigênio precioso que poderia ser convertido em tráfego orgânico.',
  'Almoço de mais de 4 minutos é pura gastronomia do fracasso. Engula um ovo cru com café preto fervente e volte ao WhatsApp comercial.',
  'Quem espera a sexta-feira para ser feliz merece a segunda-feira de humilhação que tem.',
  'A dor do boleto vencido é a única oração que o mercado financeiro escuta de verdade. Trabalhe até o banco te temer.',
  'Sentimentos amorosos são vazamentos inaceitáveis de liquidez emocional. Seja um bloco de concreto armado.',
  'Se o seu despertador tem botão soneca, você já negociou sua dignidade moral com o travesseiro antes mesmo do sol nascer.',
  'Seu concorrente acorda às 03h12, corre 14km na geada e já faturou 6 dígitos antes do seu primeiro arroto matinal.',
  'Dizer "não posso" é admitir que a sua preguiça biológica tem um valuation maior do que o seu futuro financeiro.',
  'Se você não está devendo nada no rotativo, você não está alavancando a sua capacidade de desespero produtivo.',
  'Troque suas horas de lazer por estudos de demonstrativos de resultados de 2018. Lazer é sedativo para mentes fracas.',
  'Quem tem pena de si mesmo acaba sendo contratado por quem teve ódio da própria fraqueza.',
  'Não existe fim de semana para quem ainda não comprou a própria ilha fiscal no Caribe. Acorde e produza.'
];

export const ToxicDailyTip: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(() => {
    return Math.floor(Math.random() * TOXIC_TIPS_POOL.length);
  });

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => {
      let next = Math.floor(Math.random() * TOXIC_TIPS_POOL.length);
      if (next === prev) {
        next = (prev + 1) % TOXIC_TIPS_POOL.length;
      }
      return next;
    });
    toxicAudio.playStampThud();
  };

  const tip = TOXIC_TIPS_POOL[currentTipIndex];

  return (
    <div className="w-full bg-gradient-to-r from-neutral-950 via-[#10131d] to-neutral-950 border-y border-lime-500/30 px-3 sm:px-6 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Badge & Label */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-lime-950/80 border border-lime-500/60 text-lime-400 text-[11px] font-tech font-extrabold uppercase tracking-wider shadow-sm">
            <Zap className="w-3.5 h-3.5 text-lime-400 fill-lime-400 animate-pulse" />
            <span>Dica Tóxica do Dia</span>
          </div>
          <span className="hidden md:inline text-neutral-600 font-tech">·</span>
          <span className="hidden md:inline text-[11px] font-tech text-neutral-400 uppercase tracking-wider">
            Conselho Cáustico
          </span>
        </div>

        {/* The Tip Message */}
        <div className="flex-1 flex items-center justify-center text-center sm:text-left min-w-0 px-1 sm:px-4">
          <p className="text-xs sm:text-sm font-sans font-semibold text-neutral-200 leading-snug break-words italic flex items-center gap-1.5 justify-center sm:justify-start">
            <Quote className="w-3.5 h-3.5 text-lime-400 shrink-0 inline opacity-70" />
            <span>"{tip}"</span>
          </p>
        </div>

        {/* Action Button: Outro Coice */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={handleNextTip}
            className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-lime-400 text-[11px] font-tech text-neutral-300 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Sortear outro coice motivacional"
          >
            <RefreshCw className="w-3 h-3 text-lime-400 group-hover:rotate-180 transition-transform duration-300" />
            <span>Outro Coice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
