import React, { useState } from 'react';
import { X, Flame, Send, MessageSquareQuote, Bot, Sparkles } from 'lucide-react';
import { toxicAudio } from '../utils/audio';
import { useAuth } from '../context/AuthContext';

interface GuruAiRoastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const PROCEDURAL_ROASTS = [
  'Você está com sono? Que lindo. Enquanto você fecha os olhos para sonhar com contos de fadas, o estagiário da China já programou 4 microsserviços e comprou a dívida pública do seu bairro. Levante dessa cama antes que a gravidade decida cobrar aluguel do seu peso morto.',
  'Ah, você acha que tem ansiedade? Ansiedade é o nome chique que perdedor dá para falta de boleto alto no final do mês. Beba um copo de vinagre de maçã com pimenta preta, faça 70 flexões de punho cerrado e pare de choramingar.',
  'Sua desculpa é tão frágil que se eu espirrar perto dela, ela se dissolve. Você nasceu para enriquecer o dono da empresa onde você bate ponto às 8h em ponto. Parabéns pela vocação de formiga operária.',
  'Você quer motivação? Motivação é para quem tem tempo de sentir coisas. Eu tenho um portfólio de ativos digitais que se recusa a esperar sua digestão lenta de carboidratos complexos terminar. Trabalhe!',
  'Se você dedicasse à prospecção de clientes metade do tempo que você passa olhando story de influenciador que aluga Porsche, você já teria saído do Serasa há três reencarnações.',
  'Dormir 8 horas? O seu concorrente dorme 22 minutos em suspensão gravitacional e acorda faturando 40 mil dólares por segundo em SaaS offshore. Seja menos medíocre.',
];

export const GuruAiRoastModal: React.FC<GuruAiRoastModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { recordConsultation } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAskGuru = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/gemini/roast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      let reply = '';
      if (res.ok) {
        const data = await res.json();
        reply = data.text || PROCEDURAL_ROASTS[Math.floor(Math.random() * PROCEDURAL_ROASTS.length)];
      } else {
        reply = PROCEDURAL_ROASTS[Math.floor(Math.random() * PROCEDURAL_ROASTS.length)];
      }

      setResponse(reply);
      toxicAudio.playBuzzer();
      await recordConsultation(prompt.trim());
    } catch (err) {
      console.warn('Erro ao chamar endpoint do Guru:', err);
      const reply = PROCEDURAL_ROASTS[Math.floor(Math.random() * PROCEDURAL_ROASTS.length)];
      setResponse(reply);
      toxicAudio.playBuzzer();
      await recordConsultation(prompt.trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-lg bg-[#11131a] border-2 border-lime-500 rounded-2xl brutal-shadow-toxic p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-lime-500/20 text-lime-400 border border-lime-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-display text-truncate truncate">
                Consulta Pessoal com o Guru
              </h3>
              <p className="text-[10px] text-lime-400 font-tech">IA de Choque Realimentada com Humilhação</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAskGuru} className="space-y-3">
          <p className="text-xs text-neutral-300 leading-relaxed">
            Confesse sua fraqueza humana, preguiça ou desculpa esfarrapada e receba um coice motivacional imediato do Guru Alpha.
          </p>

          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: 'Tô sem ânimo para trabalhar hoje' ou 'Tenho medo de vender'"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-lime-500 focus:outline-none pr-12 font-sans placeholder-neutral-500"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="absolute right-2 top-2 px-3 py-1.5 bg-lime-500 hover:bg-lime-400 disabled:opacity-40 text-black font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {loading && (
          <div className="p-4 bg-neutral-900/60 rounded-xl border border-lime-500/40 flex items-center justify-center gap-2 text-xs text-lime-400 font-tech animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin text-lime-400" />
            O Guru está formulando a destruição da sua auto-estima...
          </div>
        )}

        {response && !loading && (
          <div className="space-y-3 p-4 bg-lime-950/20 border border-lime-500/60 rounded-xl animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-lime-400 font-bold font-tech uppercase">
                <MessageSquareQuote className="w-4 h-4" />
                <span>Resposta do Guru Alpha:</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 italic leading-relaxed break-words">
              "{response}"
            </p>

            <div className="pt-2 border-t border-neutral-800 flex gap-2">
              <button
                onClick={() => {
                  setResponse(null);
                  setPrompt('');
                }}
                className="w-1/2 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-tech font-bold rounded-lg border border-neutral-700 transition-colors cursor-pointer text-truncate truncate"
              >
                Confessar Outra Fraqueza
              </button>
              <button
                onClick={onClose}
                className="w-1/2 py-2 px-3 bg-lime-500 hover:bg-lime-400 text-black text-xs font-tech font-bold rounded-lg transition-colors cursor-pointer text-truncate truncate"
              >
                Voltar à Luta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
