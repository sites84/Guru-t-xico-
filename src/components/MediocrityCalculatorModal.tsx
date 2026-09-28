import React, { useState } from 'react';
import { X, HelpCircle, CheckCircle2, RotateCcw, AlertTriangle, Flame } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/guruData';
import { toxicAudio } from '../utils/audio';
import { useAuth } from '../context/AuthContext';

interface MediocrityCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediocrityCalculatorModal: React.FC<MediocrityCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { recordQuizCompletion } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    localStorage.setItem('guru_toxico_quiz_completed', 'true');
    onClose();
  };

  const handleSelectOption = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    toxicAudio.playStampThud();

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final average score
      const total = nextAnswers.reduce((a, b) => a + b, 0);
      const avg = Math.round(total / QUIZ_QUESTIONS.length);
      setFinalScore(avg);
      localStorage.setItem('guru_toxico_quiz_completed', 'true');
      recordQuizCompletion(avg);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setFinalScore(null);
  };

  const getVerdict = (score: number) => {
    if (score < 25) {
      return {
        title: 'Psicopata do Mindset (Nível Marçal)',
        desc: 'Você provavelmente não dorme há 3 semanas, bebe água do radiador e já processou a própria família por baixa produtividade. Perigoso para a sociedade.',
        color: 'text-red-400'
      };
    } else if (score < 60) {
      return {
        title: 'Beta Iludido com Espasmos de Produtividade',
        desc: 'Você tenta acordar cedo na segunda-feira, mas na quarta já está maratonando reality show e comendo brigadeiro de panela com culpa.',
        color: 'text-amber-400'
      };
    } else {
      return {
        title: 'Beta Supremo / Morador Vitalício da Zona de Conforto',
        desc: 'Você é o pesadelo de qualquer coach de alta performance. Seu colchão tem o formato exato das suas costas. O mercado de trabalho chora de desgosto.',
        color: 'text-purple-400'
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-lg bg-[#11131a] border-2 border-neutral-700 rounded-2xl brutal-shadow p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <HelpCircle className="w-5 h-5 text-lime-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-white font-display text-truncate truncate">
              Termômetro Oficial de Mediocridade Humana
            </h3>
          </div>
          <button onClick={handleClose} className="text-neutral-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {finalScore === null ? (
          /* Question step */
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-neutral-400 font-tech">
              <span>Pergunta {currentStep + 1} de {QUIZ_QUESTIONS.length}</span>
              <span className="text-lime-400">{Math.round(((currentStep) / QUIZ_QUESTIONS.length) * 100)}% concluído</span>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
              <h4 className="text-sm font-bold text-white mb-4 font-sans">
                {QUIZ_QUESTIONS[currentStep].question}
              </h4>

              <div className="space-y-2">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.score)}
                    className="w-full p-3 text-left rounded-lg bg-black/50 hover:bg-neutral-800 border border-neutral-700 hover:border-lime-500 text-neutral-200 text-xs transition-colors flex items-start gap-2.5 font-medium cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-lime-400 font-tech shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="line-clamp-2 break-words">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Results view */
          <div className="space-y-4 text-center">
            <div className="inline-block p-4 rounded-full bg-neutral-900 border border-neutral-700">
              <span className="text-4xl font-black font-tech text-lime-400">
                {finalScore}%
              </span>
            </div>

            <div>
              <div className="text-xs text-neutral-400 font-tech uppercase tracking-wider mb-1 break-words">
                Índice de Inutilidade para o Capitalismo Selvagem
              </div>
              <h4 className={`text-base sm:text-lg font-bold font-display ${getVerdict(finalScore).color} break-words leading-tight`}>
                {getVerdict(finalScore).title}
              </h4>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed bg-black/40 p-3 rounded-lg border border-neutral-800 break-words">
                "{getVerdict(finalScore).desc}"
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 bg-lime-500 hover:bg-lime-400 text-black font-bold text-xs font-tech rounded-lg brutal-shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Enfrentar as 10 Tarefas Absurdas Diárias</span>
              </button>

              <button
                onClick={resetQuiz}
                className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tentar Refazer o Teste (Fingir que é Alpha)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
