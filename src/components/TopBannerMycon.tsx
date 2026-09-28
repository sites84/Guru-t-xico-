import React from 'react';
import { ExternalLink } from 'lucide-react';

export const TopBannerMycon: React.FC = () => {
  const targetUrl = 'https://simule.mycon.com.br/?referralcode=P8tKvjN4vR%2fXk9dn%2bXx41A%3d%3d';
  const imageUrl = 'https://raw.githubusercontent.com/sites84/Gifator/main/banner%20mycon.webp';

  return (
    <div className="w-full bg-[#0a0c12] border-b border-neutral-800/80 px-2 sm:px-4 py-2 sm:py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full max-w-4xl overflow-hidden rounded-xl border border-neutral-700/80 hover:border-lime-400 shadow-lg hover:shadow-[0_0_25px_rgba(163,230,53,0.25)] transition-all duration-300"
          title="Clique para simular consórcio Mycon"
        >
          <img
            src={imageUrl}
            alt="Simule no Mycon - Consórcio com Menor Taxa"
            className="w-full h-auto object-cover max-h-[140px] sm:max-h-[180px] md:max-h-[220px] group-hover:scale-[1.01] transition-transform duration-300"
            loading="eager"
          />
          {/* Subtle badge on corner */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/20 text-[10px] font-tech text-neutral-200 group-hover:text-lime-300 transition-colors">
            <span>Simular Agora</span>
            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
          </div>
        </a>
      </div>
    </div>
  );
};
