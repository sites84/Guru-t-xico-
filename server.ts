import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json());

// Initialize Gemini Client with User-Agent header as required by guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fallback contextual inteligente que garante coerência total com o que o usuário digitou
function generateContextualFallbackRoast(userPrompt: string): string {
  const clean = userPrompt.trim();
  const lower = clean.toLowerCase();
  const quoted = `"${clean.length > 50 ? clean.slice(0, 50) + '...' : clean}"`;

  if (lower.includes('sono') || lower.includes('acord') || lower.includes('cansa') || lower.includes('dorm') || lower.includes('cama')) {
    return `${quoted}? Que lindo. Enquanto seu corpinho frágil implora por soneca, o estagiário em Singapura já programou 4 microsserviços e comprou a dívida pública do seu bairro. Levante dessa cama antes que a gravidade decida cobrar aluguel do seu peso morto.`;
  }
  if (lower.includes('dinheiro') || lower.includes('venda') || lower.includes('grana') || lower.includes('falid') || lower.includes('pobr') || lower.includes('divida') || lower.includes('serasa') || lower.includes('salario') || lower.includes('comiss')) {
    return `Reclamando de ${quoted}? Falta de dinheiro é sintoma biológico de quem tem mentalidade de sardinha. Pare de choramingar pelo extrato bancário, alugue um blazer falsificado e vá empurrar mentoria quântica até bater meta!`;
  }
  if (lower.includes('chefe') || lower.includes('emprego') || lower.includes('trabalh') || lower.includes('demiss') || lower.includes('clt') || lower.includes('empresa') || lower.includes('trampo') || lower.includes('colegas')) {
    return `${quoted}? Essa é a dor clássica de quem nasceu para bater ponto às 08h e enriquecer os outros. Pare de chorar pelo seu emprego medíocre: demita seu chefe na sua mente e comece a operar 500x alavancado na madrugada.`;
  }
  if (lower.includes('amor') || lower.includes('ex') || lower.includes('namor') || lower.includes('casad') || lower.includes('crush') || lower.includes('mulher') || lower.includes('homem') || lower.includes('solteir') || lower.includes('termin')) {
    return `${quoted}? Sentimento amoroso é o maior vazamento de liquidez emocional da história. Enquanto você gasta serotonina chorando por quem nem lembra do seu CPF, o mercado financeiro não perdoa sua fraqueza. Bloqueie tudo e vá prospectar!`;
  }
  if (lower.includes('medo') || lower.includes('ansied') || lower.includes('insegur') || lower.includes('vergonh') || lower.includes('timid') || lower.includes('depress') || lower.includes('panico')) {
    return `${quoted}? Ansiedade e medo são os nomes gourmet que perdedores dão para falta de boleto alto vencendo amanhã. Beba um copo de água com vinagre e sal grosso, faça 50 flexões no chão frio e assuma sua postura de predador corporativo.`;
  }
  if (lower.includes('dieta') || lower.includes('gordo') || lower.includes('barriga') || lower.includes('comida') || lower.includes('comer') || lower.includes('fome') || lower.includes('treino') || lower.includes('academia')) {
    return `${quoted}? Comer e descansar são luxos de quem já faturou o suficiente para comprar o próprio hospital. Mastigar carboidrato gasta neurônios que deveriam estar no tráfego pago. Beba café preto puro e vá trabalhar!`;
  }

  const tailored = [
    `Você realmente teve a coragem de me procurar para falar sobre ${quoted}? Essa desculpa é tão frágil que se eu espirrar perto dela, ela se dissolve. Engula o choro, tome um banho de gelo e vá produzir valor antes que seu concorrente compre seu almoço.`,
    `${quoted}? Isso não é um problema legítimo, é uma declaração formal de capitulação moral. Enquanto você perde tempo filosofando sobre sua mediocridade, quem tem fome de vitória já fechou três contratos de alto ticket. Pare de ser fraco!`,
    `A sua desculpa sobre ${quoted} fede a conformismo de quem quer validação barata. Aqui não tem tapinha nas costas: desligue o modo vítima, acorde às 4am amanhã e trate a vida como uma guerra onde você está perdendo de goleada.`
  ];
  return tailored[Math.floor(Math.random() * tailored.length)];
}

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

// Endpoint: Consulta Pessoal com o Guru (Personal Roast com Coerência Estrita)
app.post('/api/gemini/roast', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ error: 'Prompt é obrigatório.' });
    return;
  }

  const userPrompt = prompt.trim();

  if (!process.env.GEMINI_API_KEY) {
    console.warn('[Gemini Server] GEMINI_API_KEY is not set. Using contextual fallback.');
    const fallback = generateContextualFallbackRoast(userPrompt);
    res.json({ text: fallback, source: 'contextual_fallback' });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `O usuário confessou a seguinte fraqueza, dúvida, problema ou desculpa: "${userPrompt}".
Responda diretamente e especificamente ao que ele disse, humilhando-o com sarcasmo de guru tóxico com foco total nesse assunto.`,
      config: {
        systemInstruction: `Você é o "Guru Tóxico", uma sátira cruel, sarcástica e hilária dos gurus de alta performance, coaches de acordar 4am, banho gelado, jejum de dopamina e mentalidade Alpha do Brasil.
REGRA SUPREMA DE COERÊNCIA:
Sua resposta DEVE ter relação DIRETA, IMEDIATA e ESPECÍFICA com o que o usuário digitou.
- Se o usuário falou de algo específico (dinheiro, chefe, demissão, sono, término, vendas, medo, preguiça, saúde, etc.): você DEVE zombar exatamente dessa situação específica.
- Nunca mude de assunto nem dê uma resposta desconexa.
- Use a fraqueza trazida por ele como gancho para mostrar como ele é fraco e sugerir medidas extremas e absurdas de coach (acordar 4am, banho gelado, jejum, vender a mãe pro dropshipping).
- Responda em Português do Brasil com no máximo 2 a 3 frases curtas, hilárias, ácidas e diretas ao ponto.`,
        temperature: 0.7,
      },
    });

    const replyText = response.text?.trim() || generateContextualFallbackRoast(userPrompt);
    res.json({ text: replyText, source: 'gemini' });
  } catch (error: any) {
    console.error('[Gemini Server Error /api/gemini/roast]:', error?.message || error);
    const fallback = generateContextualFallbackRoast(userPrompt);
    res.json({ text: fallback, source: 'contextual_fallback', error: error?.message });
  }
});

// Endpoint: Toxic Daily Mantra
app.post('/api/gemini/mantra', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('[Gemini Server] GEMINI_API_KEY is not set. Using procedural fallback.');
      const fallback = PROCEDURAL_DAILY_MANTRAS[Math.floor(Math.random() * PROCEDURAL_DAILY_MANTRAS.length)];
      res.json({ text: fallback, source: 'procedural' });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Você é o "Guru Tóxico", um coach hilário e psicopata de alta performance que satiriza a cultura de acordar 4am, banho gelado, jejum de dopamina e mentalidade Alpha.
Gere UM ÚNICO mantra diário motivacional ultra-absurdo e tóxico em 1 a 2 frases curtas para destruir o ego do usuário.
Responda APENAS a frase do mantra em Português do Brasil, sem aspas e sem introduções.`,
    });

    let mantra = response.text?.trim() || PROCEDURAL_DAILY_MANTRAS[Math.floor(Math.random() * PROCEDURAL_DAILY_MANTRAS.length)];
    mantra = mantra.replace(/^["']|["']$/g, '');
    res.json({ text: mantra, source: 'gemini' });
  } catch (error: any) {
    console.error('[Gemini Server Error /api/gemini/mantra]:', error?.message || error);
    const fallback = PROCEDURAL_DAILY_MANTRAS[Math.floor(Math.random() * PROCEDURAL_DAILY_MANTRAS.length)];
    res.json({ text: fallback, source: 'fallback_error', error: error?.message });
  }
});

// Health / status endpoint for diagnostics
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Guru Tóxico Server] Running on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Guru Tóxico Server] Failed to start:', err);
  process.exit(1);
});
