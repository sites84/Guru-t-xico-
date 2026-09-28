import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { X, Download, Share2, Award, AlertTriangle, Check, DollarSign, Eye, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toxicAudio } from '../utils/audio';

interface CowardiceCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
  onFinePaid?: (amount: number, reason: string) => void;
}

export const CowardiceCertificateModal: React.FC<CowardiceCertificateModalProps> = ({
  isOpen,
  onClose,
  defaultReason = 'Arregou para a tarefa diária e optou pelo conforto burguês.',
  onFinePaid
}) => {
  const [name, setName] = useState('Você (O Fraco)');
  const [reason, setReason] = useState(defaultReason);
  const [stamp, setStamp] = useState<'BETA_COMPROVADO' | 'COVARDE_OFICIAL' | 'MEDIOCRE_ABSOLUTO'>('BETA_COMPROVADO');
  const [format, setFormat] = useState<'square' | 'story'>('square');
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');
  const [isCopied, setIsCopied] = useState(false);
  const [fineApplied, setFineApplied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (defaultReason) {
      setReason(defaultReason);
    }
  }, [defaultReason]);

  // Dynamic padding calculation based on format and reason character length
  // Ensures the certificate never exceeds its boundary and adapts flexibly
  const dynamicPaddingClass = useMemo(() => {
    const len = reason.length;
    if (format === 'story') {
      if (len > 120) return 'p-3 sm:p-4';
      if (len > 60) return 'p-4 sm:p-5';
      return 'p-4 sm:p-6';
    } else {
      if (len > 120) return 'p-2.5 sm:p-3.5';
      if (len > 60) return 'p-3.5 sm:p-4.5';
      return 'p-4 sm:p-5 md:p-6';
    }
  }, [reason.length, format]);

  // Stamp label text
  const stampLabel = useMemo(() => {
    switch (stamp) {
      case 'COVARDE_OFICIAL':
        return 'ARREGOU FEIO';
      case 'MEDIOCRE_ABSOLUTO':
        return 'NUNCA SERÁ ALPHA';
      case 'BETA_COMPROVADO':
      default:
        return '100% BETA COMPROVADO';
    }
  }, [stamp]);

  // Synchronized off-screen canvas generation for high-res PNG export
  const drawCertificateToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isStory = format === 'story';
    const width = 1080;
    const height = isStory ? 1920 : 1080;

    canvas.width = width;
    canvas.height = height;

    // Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#090a0f');
    bgGradient.addColorStop(0.5, '#12141e');
    bgGradient.addColorStop(1, '#07080b');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Hazard Stripes Top & Bottom
    const stripeHeight = isStory ? 32 : 24;
    ctx.save();
    for (let i = -100; i < width + 100; i += 36) {
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 20, 0);
      ctx.lineTo(i, stripeHeight);
      ctx.lineTo(i - 20, stripeHeight);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(i, height - stripeHeight);
      ctx.lineTo(i + 20, height - stripeHeight);
      ctx.lineTo(i, height);
      ctx.lineTo(i - 20, height);
      ctx.fill();
    }
    ctx.restore();

    // Outer borders
    const margin = isStory ? 45 : 36;
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 6;
    ctx.strokeRect(margin, margin + 12, width - margin * 2, height - (margin * 2 + 24));

    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin + 12, margin + 24, width - (margin + 12) * 2, height - (margin + 24) * 2);

    ctx.textAlign = 'center';

    if (isStory) {
      // 9:16 Story canvas export
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 24px "Chakra Petch", monospace, sans-serif';
      ctx.fillText('INSTITUTO GLOBAL DE DESMOTIVAÇÃO HUMANA', width / 2, 170);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 56px "Syne", sans-serif';
      ctx.fillText('CERTIFICADO OFICIAL', width / 2, 270);

      ctx.fillStyle = '#ef4444';
      ctx.font = '900 68px "Syne", sans-serif';
      ctx.fillText('DE FRACO & COVARDE', width / 2, 355);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('ESTE DOCUMENTO REGISTRA A CAPITULAÇÃO TOTAL DO INDIVÍDUO:', width / 2, 440);

      const plateY = 490;
      const plateH = 100;
      ctx.fillStyle = '#171924';
      ctx.fillRect(120, plateY, width - 240, plateH);
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.strokeRect(120, plateY, width - 240, plateH);

      ctx.fillStyle = '#fbbf24';
      const cleanName = (name.trim() || 'PERDEDOR SEM NOME').toUpperCase();
      ctx.font = cleanName.length > 22 ? 'bold 36px "Syne", sans-serif' : 'bold 46px "Syne", sans-serif';
      ctx.fillText(cleanName, width / 2, plateY + 64);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Declarou formalmente que não aguenta a pressão do mindset 24/7.', width / 2, 650);

      const reasonBoxY = 700;
      const reasonBoxH = 260;
      ctx.fillStyle = '#11131a';
      ctx.fillRect(100, reasonBoxY, width - 200, reasonBoxH);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.strokeRect(100, reasonBoxY, width - 200, reasonBoxH);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 22px "Chakra Petch", monospace, sans-serif';
      ctx.fillText('DELITO DE MEDIOCRIDADE / MOTIVO DA ARREGADA:', width / 2, reasonBoxY + 50);

      ctx.fillStyle = '#f3f4f6';
      ctx.font = 'italic 26px "Plus Jakarta Sans", sans-serif';
      drawWrappedText(ctx, `"${reason.trim() || defaultReason}"`, width / 2, reasonBoxY + 105, width - 280, 38, 4);

      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 26px "Chakra Petch", monospace, sans-serif';
      ctx.fillText('MULTA MORAL QUITADA: R$ 50,00 DE VERGONHA', width / 2, 1040);

      ctx.fillStyle = '#6b7280';
      ctx.font = '18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Código de Autenticidade: #BETA-' + Math.floor(100000 + (name.length * 1337) % 900000), width / 2, 1085);

      drawRubberStamp(ctx, width / 2, 1260, stampLabel, -15, 420, 95, 34);

      const footerY = 1530;
      drawSignatures(ctx, width, footerY, 26, 18);

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 20px "Chakra Petch", monospace, sans-serif';
      ctx.fillText('GURU TÓXICO — DESTRUA SEU EGO OU DEVOLVA SUA TESTOSTERONA', width / 2, 1840);
    } else {
      // 1:1 Square canvas export
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 18px "Chakra Petch", monospace, sans-serif';
      ctx.fillText('INSTITUTO GLOBAL DE DESMOTIVAÇÃO HUMANA', width / 2, 85);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 38px "Syne", sans-serif';
      ctx.fillText('CERTIFICADO OFICIAL', width / 2, 140);

      ctx.fillStyle = '#ef4444';
      ctx.font = '900 48px "Syne", sans-serif';
      ctx.fillText('DE FRACO & COVARDE', width / 2, 195);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('ESTE DOCUMENTO REGISTRA A CAPITULAÇÃO TOTAL DO INDIVÍDUO:', width / 2, 240);

      const plateY = 265;
      const plateH = 75;
      ctx.fillStyle = '#171924';
      ctx.fillRect(140, plateY, width - 280, plateH);
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.strokeRect(140, plateY, width - 280, plateH);

      ctx.fillStyle = '#fbbf24';
      const cleanName = (name.trim() || 'PERDEDOR SEM NOME').toUpperCase();
      ctx.font = cleanName.length > 22 ? 'bold 28px "Syne", sans-serif' : 'bold 36px "Syne", sans-serif';
      ctx.fillText(cleanName, width / 2, plateY + 48);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Declarou formalmente que não suporta a pressão do mindset 24/7.', width / 2, 375);

      const reasonBoxY = 405;
      const reasonBoxH = 175;
      ctx.fillStyle = '#11131a';
      ctx.fillRect(100, reasonBoxY, width - 200, reasonBoxH);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.strokeRect(100, reasonBoxY, width - 200, reasonBoxH);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 16px "Chakra Petch", monospace, sans-serif';
      ctx.fillText('DELITO DE MEDIOCRIDADE / MOTIVO DA ARREGADA:', width / 2, reasonBoxY + 36);

      ctx.fillStyle = '#f3f4f6';
      ctx.font = 'italic 20px "Plus Jakarta Sans", sans-serif';
      drawWrappedText(ctx, `"${reason.trim() || defaultReason}"`, width / 2, reasonBoxY + 76, width - 260, 28, 3);

      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 18px "Chakra Petch", monospace, sans-serif';
      ctx.fillText('MULTA MORAL QUITADA: R$ 50,00 DE VERGONHA', width / 2, 625);

      ctx.fillStyle = '#6b7280';
      ctx.font = '15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Código de Autenticidade: #BETA-' + Math.floor(100000 + (name.length * 1337) % 900000), width / 2, 655);

      drawRubberStamp(ctx, width - 260, 715, stampLabel, -14, 290, 68, 22);

      const footerY = 825;
      drawSignatures(ctx, width, footerY, 22, 15);

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 15px "Chakra Petch", monospace, sans-serif';
      ctx.fillText('GURU TÓXICO — DESTRUA SEU EGO OU DEVOLVA SUA TESTOSTERONA', width / 2, 1020);
    }
  }, [name, reason, stampLabel, format, defaultReason]);

  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number
  ) => {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    let linesDrawn = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        if (linesDrawn === maxLines - 1) {
          ctx.fillText(line.trim() + '...', x, curY);
          return;
        }
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
        linesDrawn++;
      } else {
        line = testLine;
      }
    }
    if (line.trim().length > 0 && linesDrawn < maxLines) {
      ctx.fillText(line.trim(), x, curY);
    }
  };

  const drawRubberStamp = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    label: string,
    angleDeg: number,
    w: number,
    h: number,
    fontSize: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angleDeg * Math.PI) / 180);

    ctx.strokeStyle = 'rgba(239, 68, 68, 0.9)';
    ctx.lineWidth = 5;
    ctx.strokeRect(-w / 2, -h / 2, w, h);

    ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    ctx.fillRect(-w / 2, -h / 2, w, h);

    ctx.fillStyle = '#ef4444';
    ctx.font = `900 ${fontSize}px "Chakra Petch", monospace, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 0, 0);

    ctx.restore();
  };

  const drawSignatures = (
    ctx: CanvasRenderingContext2D,
    width: number,
    y: number,
    nameSize: number,
    titleSize: number
  ) => {
    ctx.fillStyle = '#ffffff';
    ctx.font = `italic ${nameSize}px "Syne", cursive, sans-serif`;
    ctx.fillText('Pablo "Sem Descanso" Finch', 280, y);

    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, y + 12);
    ctx.lineTo(410, y + 12);
    ctx.stroke();

    ctx.fillStyle = '#9ca3af';
    ctx.font = `${titleSize}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText('Coach de Humilhação Sistêmica', 280, y + 36);

    ctx.fillStyle = '#ffffff';
    ctx.font = `italic ${nameSize}px "Syne", cursive, sans-serif`;
    ctx.fillText('Seu Ego Destroçado', width - 280, y);

    ctx.beginPath();
    ctx.moveTo(width - 410, y + 12);
    ctx.lineTo(width - 150, y + 12);
    ctx.stroke();

    ctx.fillStyle = '#9ca3af';
    ctx.font = `${titleSize}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText('Vítima da Zona de Conforto', width - 280, y + 36);
  };

  const handleDownload = () => {
    drawCertificateToCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;

    toxicAudio.playStampThud();
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Certificado_Covarde_${name.replace(/\s+/g, '_')}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handlePayFineAndCertify = () => {
    toxicAudio.playCashRegister();
    setFineApplied(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#71717a', '#22c55e']
    });

    if (onFinePaid) {
      onFinePaid(50, reason);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `🚨 *CERTIFICADO OFICIAL DE FRACO E COVARDE* 🚨\n\nEu, ${name}, capitulei diante da cultura Alpha.\n❌ *Motivo:* "${reason}"\n💸 *Multa moral simulada:* R$ 50,00.\n\nVeja sua taxa de mediocridade no app *GURU TÓXICO*!\n${window.location.href}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      {/* Hidden canvas for high-resolution PNG generation */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative w-full max-w-4xl bg-[#10121a] border-2 border-red-500/80 rounded-2xl brutal-shadow-danger overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-red-950/40 border-b border-red-900/50 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 animate-pulse" />
            <h2 className="text-sm sm:text-base font-bold text-red-400 font-display text-truncate truncate">
              Botão de Covardia: Certificado Oficial
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile View Switcher (Edit / Preview) */}
        <div className="lg:hidden flex border-b border-neutral-800 bg-neutral-900/80 shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2.5 text-xs font-tech font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-neutral-800 text-white border-b-2 border-lime-400'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-truncate truncate">Ver Certificado</span>
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2.5 text-xs font-tech font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'edit'
                ? 'bg-neutral-800 text-white border-b-2 border-red-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="text-truncate truncate">Editar Dados</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Controls Column */}
          <div className={`lg:col-span-5 space-y-3 sm:space-y-4 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs text-red-300">
              <span className="font-bold">Aviso do Guru:</span> Você escolheu fugir. Personalize seu atestado oficial de fraqueza antes de ser banido moralmente do mercado.
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1 font-tech text-truncate truncate">
                Nome do Indivíduo Fraco
              </label>
              <input
                type="text"
                value={name}
                maxLength={40}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Enzo Fracassado Silva"
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white font-medium focus:border-red-500 focus:outline-none text-xs sm:text-sm text-truncate"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1 font-tech text-truncate truncate">
                Motivo da Arregada
              </label>
              <textarea
                value={reason}
                maxLength={200}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-xs sm:text-sm focus:border-red-500 focus:outline-none break-words"
              />
              <div className="text-[10px] text-neutral-500 text-right font-tech text-truncate">
                {reason.length}/200 caracteres
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1 font-tech text-truncate truncate">
                  Carimbo
                </label>
                <select
                  value={stamp}
                  onChange={(e) => setStamp(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-xs font-tech focus:border-red-500 focus:outline-none text-truncate"
                >
                  <option value="BETA_COMPROVADO">100% BETA</option>
                  <option value="COVARDE_OFICIAL">ARREGOU FEIO</option>
                  <option value="MEDIOCRE_ABSOLUTO">NUNCA SERÁ ALPHA</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1 font-tech text-truncate truncate">
                  Formato
                </label>
                <div className="grid grid-cols-2 gap-1 p-0.5 bg-neutral-900 border border-neutral-700 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setFormat('square')}
                    className={`py-1 text-xs font-tech rounded transition-all cursor-pointer text-truncate ${
                      format === 'square' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    1:1 Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('story')}
                    className={`py-1 text-xs font-tech rounded transition-all cursor-pointer text-truncate ${
                      format === 'story' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    9:16 Story
                  </button>
                </div>
              </div>
            </div>

            {/* Fine simulation button */}
            <div className="pt-1">
              <button
                onClick={handlePayFineAndCertify}
                disabled={fineApplied}
                className={`w-full py-2.5 px-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer text-truncate ${
                  fineApplied
                    ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed border border-neutral-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white brutal-shadow-toxic'
                }`}
              >
                <DollarSign className="w-4 h-4 shrink-0" />
                <span className="text-truncate truncate">
                  {fineApplied ? 'Multa de R$ 50,00 Lançada na Fatura!' : 'Pagar R$ 50,00 (Simulado) para Pular'}
                </span>
              </button>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleDownload}
                className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-colors brutal-shadow cursor-pointer text-truncate"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="text-truncate truncate">Baixar Certificado em Alta Resolução (PNG)</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="w-full py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600 font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs cursor-pointer text-truncate"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-truncate truncate">Texto de Vergonha Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-truncate truncate">Copiar Declaração para WhatsApp / Redes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Certificate Live Preview Column: Flexbox with overflow-y: auto and dynamic padding */}
          <div className={`lg:col-span-7 flex flex-col items-center justify-center bg-black/60 p-2 sm:p-4 rounded-xl border border-neutral-800 ${
            activeTab === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="w-full flex items-center justify-between text-xs text-neutral-400 font-tech mb-2 px-1">
              <div className="flex items-center gap-1.5 text-truncate truncate">
                <Award className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                <span className="text-truncate truncate">Certificado Oficial (Flexbox Responsivo)</span>
              </div>
              <span className="text-[11px] text-lime-400 uppercase font-semibold text-truncate shrink-0">
                {format === 'story' ? '9:16 (Story)' : '1:1 (Feed)'}
              </span>
            </div>

            {/* THE FLEXBOX CERTIFICATE CARD:
                Uses flexbox with overflow-y: auto and dynamic padding, ensuring text never overflows borders */}
            <div
              className={`relative w-full mx-auto flex flex-col justify-between overflow-y-auto bg-[#0a0c13] text-neutral-100 border-2 border-emerald-500/80 rounded-2xl shadow-2xl transition-all ${dynamicPaddingClass} ${
                format === 'story'
                  ? 'aspect-[9/16] max-w-[340px] sm:max-w-[370px]'
                  : 'aspect-square max-w-[380px] sm:max-w-[430px]'
              }`}
              style={{
                maxHeight: format === 'story' ? '540px' : '440px',
              }}
            >
              {/* Top Hazard Strip */}
              <div className="hazard-border h-1.5 sm:h-2 w-full rounded-t shrink-0 mb-1.5 sm:mb-2" />

              {/* Certificate Header Badge */}
              <div className="text-center shrink-0 space-y-0.5 sm:space-y-1">
                <div className="text-[9px] sm:text-[10px] font-tech font-bold text-emerald-400 uppercase tracking-widest text-truncate truncate">
                  INSTITUTO GLOBAL DE DESMOTIVAÇÃO HUMANA
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-black font-display text-white tracking-tight uppercase line-clamp-1 text-truncate">
                  CERTIFICADO OFICIAL
                </h3>
                <h4 className="text-sm sm:text-lg md:text-xl font-black font-display text-red-500 tracking-tight uppercase line-clamp-1 text-truncate">
                  DE FRACO & COVARDE
                </h4>
                <p className="text-[8px] sm:text-[10px] text-neutral-400 font-sans line-clamp-1 text-truncate">
                  ESTE DOCUMENTO REGISTRA A CAPITULAÇÃO TOTAL DO INDIVÍDUO:
                </p>
              </div>

              {/* Recipient Name Plate */}
              <div className="my-1 sm:my-2 px-2.5 py-1 bg-neutral-900/90 border border-neutral-700/80 rounded-lg text-center shrink-0">
                <div className="text-xs sm:text-sm md:text-base font-black text-amber-400 font-display uppercase tracking-wider text-truncate truncate">
                  {name.trim() || 'PERDEDOR SEM NOME'}
                </div>
              </div>

              {/* Declarative statement */}
              <p className="text-[8px] sm:text-[10px] text-neutral-300 text-center line-clamp-1 text-truncate shrink-0">
                Declarou publicamente que não suporta a pressão do mindset 24/7.
              </p>

              {/* The Reason Container: flexbox with overflow-y: auto and dynamic padding, with line-clamp */}
              <div className="flex-1 my-1.5 sm:my-2 min-h-[60px] sm:min-h-[80px] flex flex-col justify-center bg-[#11131c] border border-red-500/60 rounded-lg overflow-y-auto transition-all p-2 sm:p-3">
                <div className="text-[8px] sm:text-[9px] font-tech font-bold text-red-400 uppercase tracking-wider mb-0.5 text-truncate truncate text-center shrink-0">
                  DELITO DE MEDIOCRIDADE / MOTIVO DA ARREGADA:
                </div>
                <p className="text-neutral-200 italic text-center font-sans text-[10px] sm:text-xs md:text-sm leading-relaxed break-words line-clamp-3 sm:line-clamp-4 md:line-clamp-5">
                  "{reason.trim() || defaultReason}"
                </p>
              </div>

              {/* Fine and Authentication Details */}
              <div className="text-center shrink-0 my-0.5 sm:my-1 space-y-0.5">
                <div className="text-[8px] sm:text-[10px] font-tech font-bold text-emerald-400 text-truncate truncate">
                  MULTA MORAL QUITADA: R$ 50,00 DE VERGONHA
                </div>
                <div className="text-[7px] sm:text-[8px] text-neutral-500 font-tech text-truncate truncate">
                  #BETA-749201 · AUTENTICIDADE INVIOLÁVEL DE VERGONHA
                </div>
              </div>

              {/* Rubber Stamp Badge */}
              <div className="flex justify-end shrink-0 my-0.5 pointer-events-none">
                <div className="inline-block transform -rotate-12 border-2 border-red-500/90 bg-red-950/30 px-2 py-0.5 rounded shadow-sm max-w-[210px] text-truncate">
                  <span className="font-tech font-black text-[9px] sm:text-[11px] text-red-500 tracking-wider uppercase text-truncate truncate line-clamp-1 block">
                    {stampLabel}
                  </span>
                </div>
              </div>

              {/* Signatures Row */}
              <div className="flex items-end justify-between pt-1 border-t border-neutral-800/80 gap-2 shrink-0 text-center">
                <div className="flex-1 min-w-0">
                  <p className="font-display italic text-[9px] sm:text-[10px] text-white text-truncate truncate">
                    Pablo "Sem Descanso" Finch
                  </p>
                  <div className="h-0.5 bg-neutral-700 w-full my-0.5" />
                  <p className="text-[7px] sm:text-[8px] text-neutral-400 font-tech text-truncate truncate">
                    Coach de Humilhação
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display italic text-[9px] sm:text-[10px] text-white text-truncate truncate">
                    Seu Ego Destroçado
                  </p>
                  <div className="h-0.5 bg-neutral-700 w-full my-0.5" />
                  <p className="text-[7px] sm:text-[8px] text-neutral-400 font-tech text-truncate truncate">
                    Vítima do Conforto
                  </p>
                </div>
              </div>

              {/* Bottom Hazard Strip */}
              <div className="hazard-border h-1.5 sm:h-2 w-full rounded-b shrink-0 mt-1.5 sm:mt-2" />
            </div>

            {/* Mobile quick action bar inside preview tab */}
            <div className="lg:hidden w-full pt-3 flex flex-col gap-2">
              <button
                onClick={handleDownload}
                className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 brutal-shadow cursor-pointer text-truncate"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="text-truncate truncate">Baixar Certificado (PNG)</span>
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className="w-full py-2 px-3 bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-lg border border-neutral-700 cursor-pointer text-truncate"
              >
                <span className="text-truncate truncate">Alterar Nome ou Motivo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
