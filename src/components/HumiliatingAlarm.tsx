import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellRing, Play, CheckCircle2, AlertOctagon, Flame, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { TOXIC_AFFIRMATIONS } from '../data/guruData';
import { ToxicAffirmation } from '../types';
import { toxicAudio } from '../utils/audio';
import { useAuth } from '../context/AuthContext';

export const HumiliatingAlarm: React.FC = () => {
  const { user, recordMantraCompletion } = useAuth();
  const [alarmTime, setAlarmTime] = useState('04:00');
  const [isAlarmArmed, setIsAlarmArmed] = useState(true);
  const [isRinging, setIsRinging] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState<ToxicAffirmation>(TOXIC_AFFIRMATIONS[0]);
  const [typedInput, setTypedInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Monitor clock time against alarm
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (!isAlarmArmed || isRinging) return;
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentFormatted = `${currentHours}:${currentMinutes}`;

      if (currentFormatted === alarmTime && now.getSeconds() === 0) {
        triggerAlarm();
      }
    }, 1000);

    return () => clearInterval(checkInterval);
  }, [alarmTime, isAlarmArmed, isRinging]);

  // Elapsed timer when ringing
  useEffect(() => {
    if (isRinging) {
      const start = Date.now();
      setStartTime(start);
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
      }, 200);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRinging]);

  const triggerAlarm = () => {
    // Pick a random toxic affirmation
    const randomIndex = Math.floor(Math.random() * TOXIC_AFFIRMATIONS.length);
    const chosen = TOXIC_AFFIRMATIONS[randomIndex];
    setCurrentAffirmation(chosen);
    setTypedInput('');
    setCompletionMessage(null);
    setElapsedSeconds(0);
    setIsRinging(true);

    toxicAudio.startAlarmSiren();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypedInput(val);

    // Normalize comparison (trim extra trailing spaces)
    if (val.trim().toLowerCase() === currentAffirmation.text.trim().toLowerCase()) {
      // Alarm successfully silenced!
      silenceAlarm();
    }
  };

  const silenceAlarm = () => {
    toxicAudio.stopAlarmSiren();
    setIsRinging(false);

    const seconds = elapsedSeconds;
    let extraInsult = '';
    if (seconds < 5) {
      extraInsult = 'Digitou em menos de 5 segundos. O desespero da carapuça é impressionante.';
    } else if (seconds < 12) {
      extraInsult = `Demorou ${seconds} segundos. Seu concorrente já fechou duas vendas nesse tempo.`;
    } else {
      extraInsult = `Inacreditáveis ${seconds} segundos para digitar sua própria verdade. Patético!`;
    }

    const fullMessage = `${currentAffirmation.insultOnSuccess} (${extraInsult})`;
    setCompletionMessage(fullMessage);

    if (user) {
      recordMantraCompletion(currentAffirmation.difficulty, seconds);
    }
  };

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    toxicAudio.isSoundMuted = nextMuted;
    if (nextMuted) {
      toxicAudio.stopAlarmSiren();
    } else if (isRinging) {
      toxicAudio.startAlarmSiren();
    }
  };

  // Helper to highlight matching characters
  const renderAffirmationFeedback = () => {
    const target = currentAffirmation.text;
    const targetChars = target.split('');
    const typedChars = typedInput.split('');

    return (
      <div className="font-mono text-base sm:text-xl p-4 bg-black/70 rounded-xl border border-neutral-700 tracking-wide text-left leading-relaxed">
        {targetChars.map((char, index) => {
          let colorClass = 'text-neutral-500';
          if (index < typedChars.length) {
            if (typedChars[index].toLowerCase() === char.toLowerCase()) {
              colorClass = 'text-lime-400 font-bold bg-lime-950/40 px-0.5 rounded';
            } else {
              colorClass = 'text-red-400 font-black bg-red-950/80 px-0.5 rounded underline';
            }
          }
          return (
            <span key={index} className={colorClass}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative rounded-2xl bg-[#0f1118] border border-neutral-800 p-5 sm:p-7 shadow-xl overflow-hidden">
      {/* Top Banner Accent */}
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <BellRing className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white tracking-tight flex items-center gap-2">
              01. O Despertador Humilhante
              <span className="text-xs font-tech px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 uppercase">
                Anti-Soneca
              </span>
            </h2>
            <p className="text-xs text-neutral-400">
              O único alarme do mundo que só desliga quando você assume verbalmente sua condição de submisso.
            </p>
          </div>
        </div>

        <button
          onClick={toggleMute}
          title={muted ? 'Desmutar áudio do alarme' : 'Mutar áudio do alarme'}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
        </button>
      </div>

      {/* Main Alarm Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Time Setting Block */}
        <div className="md:col-span-6 bg-black/40 border border-neutral-800 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 font-tech uppercase">
              Horário do Despertador Alpha
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className={isAlarmArmed ? 'text-lime-400 font-semibold' : 'text-neutral-500'}>
                {isAlarmArmed ? 'ARMADO E PRONTO' : 'DESATIVADO (FRACO)'}
              </span>
              <input
                type="checkbox"
                checked={isAlarmArmed}
                onChange={(e) => setIsAlarmArmed(e.target.checked)}
                className="w-4 h-4 accent-lime-500 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-2xl font-bold font-tech text-lime-400 focus:outline-none focus:border-lime-500 tracking-wider"
            />
            <div className="text-xs text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <Flame className="w-3.5 h-3.5 text-yellow-500" />
                <span>Padrão Alpha: <strong>04:00 AM</strong></span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Acordar após as 05:00 AM é considerado crime contra o livre mercado.
              </p>
            </div>
          </div>
        </div>

        {/* Immediate Test Trigger Block */}
        <div className="md:col-span-6 bg-red-950/20 border border-red-900/40 p-4 rounded-xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold font-tech uppercase mb-1">
              <ShieldAlert className="w-4 h-4" />
              Simulador de Ataque de Pânico Matinal
            </div>
            <p className="text-xs text-neutral-400">
              Teste agora como seu cérebro reage ao terror psicológico de ter que digitar uma frase humilhante para calar a sirene.
            </p>
          </div>

          <button
            onClick={triggerAlarm}
            disabled={isRinging}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all brutal-shadow text-sm uppercase tracking-wider font-tech"
          >
            <Play className="w-4 h-4 fill-white" />
            Disparar Alarme Agora (Teste de Fogo)
          </button>
        </div>
      </div>

      {/* Completion Toast / Previous Result */}
      {completionMessage && !isRinging && (
        <div className="mt-5 p-4 rounded-xl bg-lime-950/30 border border-lime-800/60 flex items-start gap-3 transition-all animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <span className="font-bold text-lime-400 font-tech">ALARME DESLIGADO COM SUCESSO MORAL</span>
            <p className="text-neutral-300 italic">{completionMessage}</p>
          </div>
        </div>
      )}

      {/* ACTIVE RINGING OVERLAY MODAL */}
      {isRinging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-panic">
          <div className="relative w-full max-w-2xl bg-[#120505] border-4 border-red-600 rounded-2xl brutal-shadow-danger p-6 sm:p-8 text-center space-y-6">
            {/* Header Alarm Siren Alert */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white font-bold font-tech text-xs tracking-widest uppercase rounded">
                <AlertOctagon className="w-4 h-4 animate-spin" />
                SIRENE ALPHA EM CURSO · {elapsedSeconds}s DE VERGONHA
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-red-500 font-display uppercase tracking-tight">
                ACORDA, PERDEDOR! O MERCADO NÃO ESPERA!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300">
                A sirene continuará tocando até você digitar EXATAMENTE a frase de submissão abaixo:
              </p>
            </div>

            {/* Target Affirmation Character-by-Character Feedback */}
            <div className="space-y-2">
              <div className="text-xs text-neutral-400 uppercase font-tech flex justify-between px-1">
                <span>Frase Obrigatória de Afirmação:</span>
                <span className="text-red-400 font-semibold">Dificuldade: {currentAffirmation.difficulty}</span>
              </div>
              {renderAffirmationFeedback()}
            </div>

            {/* Typing Input */}
            <div className="space-y-2">
              <input
                ref={inputRef}
                type="text"
                value={typedInput}
                onChange={handleInputChange}
                autoFocus
                placeholder="Digite a frase exata aqui para calar o alarme..."
                className="w-full px-4 py-3.5 bg-black border-2 border-red-500 rounded-xl text-white font-mono text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 shadow-inner"
              />
              <div className="flex justify-between items-center text-xs text-neutral-400 font-tech">
                <span>
                  Progresso:{' '}
                  <strong className="text-lime-400">
                    {Math.min(typedInput.length, currentAffirmation.text.length)} / {currentAffirmation.text.length}
                  </strong>{' '}
                  caracteres
                </span>
                <span className="text-red-400 animate-pulse">
                  Não adianta dar Alt+Tab nem fingir demência
                </span>
              </div>
            </div>

            {/* Emergency Mute / Surrender */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-800">
              <span className="text-xs text-neutral-500">
                Se você fechar a aba, o Guru saberá e seu score cairá para zero.
              </span>
              <button
                type="button"
                onClick={toggleMute}
                className="text-xs font-tech text-neutral-400 hover:text-white underline decoration-dotted"
              >
                {muted ? 'Reativar Barulho da Sirene' : 'Silenciar Barulho (Trapaça de Beta)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
