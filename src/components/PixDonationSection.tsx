import React, { useState } from 'react';
import { Copy, Check, QrCode, Shield, Heart } from 'lucide-react';
import { toxicAudio } from '../utils/audio';

export const PixDonationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const pixCode = '00020101021126330014BR.GOV.BCB.PIX0111308810008415204000053039865802BR5921Edson Lopes Fernandes6009SAO PAULO62080504daqr63042D44';
  const imageUrl = 'https://raw.githubusercontent.com/sites84/Gifator/main/200178.png';

  const handleCopyPix = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(pixCode);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = pixCode;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      toxicAudio.playCashRegister();

      setTimeout(() => {
        setCopied(false);
      }, 3500);
    } catch (err) {
      console.error('Falha ao copiar PIX:', err);
    }
  };

  return (
    <section className="relative rounded-3xl bg-gradient-to-b from-[#10131d] via-[#0c0d14] to-[#07080c] border border-neutral-800 p-5 sm:p-8 shadow-2xl text-center space-y-6">
      {/* Badge Header */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/60 border border-lime-800/60 text-lime-400 text-xs font-tech uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-lime-400 fill-lime-400/30" />
          <span>Apoie o Projeto Guru Tóxico</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black font-display text-white">
          Contribua para Manter a Fábrica de Insanidade no Ar
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-xl mx-auto">
          Se o nosso veneno motivacional alegrou seu dia ou salvou você de cair no papo de algum coach, deixe um trocado via Pix para pagar o café amargo do desenvolvedor!
        </p>
      </div>

      {/* Image Container - Mobile Compatible Width */}
      <div className="flex justify-center items-center py-2">
        <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm rounded-2xl overflow-hidden border-2 border-neutral-800 hover:border-lime-500/60 shadow-2xl bg-black/60 transition-all duration-300">
          <img
            src={imageUrl}
            alt="Contribuição Pix Guru Tóxico"
            className="w-full h-auto object-contain block mx-auto hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>

      {/* Pix Copy Button & Details */}
      <div className="max-w-md mx-auto space-y-3">
        <button
          onClick={handleCopyPix}
          className={`w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm font-tech uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
            copied
              ? 'bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-[1.02]'
              : 'bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:scale-[1.01]'
          }`}
          title="Copiar código Pix Copia e Cola"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 shrink-0 stroke-[3]" />
              <span>Chave Pix Copiada com Sucesso! ✅</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 shrink-0" />
              <span>Copiar Chave Pix</span>
            </>
          )}
        </button>

        {/* Read-only Code Box for quick preview */}
        <div className="p-2.5 rounded-xl bg-black/70 border border-neutral-800 flex items-center justify-between gap-2 text-left">
          <div className="flex items-center gap-2 min-w-0">
            <QrCode className="w-4 h-4 text-lime-400 shrink-0" />
            <span className="text-[11px] font-mono text-neutral-400 truncate block">
              {pixCode}
            </span>
          </div>
          <button
            onClick={handleCopyPix}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors shrink-0 cursor-pointer"
            title="Copiar código"
            aria-label="Copiar código"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Beneficiary details note */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-tech text-neutral-400">
          <Shield className="w-3.5 h-3.5 text-lime-400/80 shrink-0" />
          <span>Favorecido: <strong className="text-neutral-300">Edson Lopes Fernandes</strong> · São Paulo / SP</span>
        </div>
      </div>
    </section>
  );
};
