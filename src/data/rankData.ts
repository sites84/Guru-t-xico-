import { GuruRank, Achievement } from '../types';

export const GURU_RANKS: GuruRank[] = [
  {
    id: 'rank-clt',
    level: 0,
    title: 'Gado Inicial / CLT Sedentário',
    minPoints: 0,
    maxPoints: 49,
    badge: '🥱',
    colorClass: 'text-neutral-400',
    borderClass: 'border-neutral-700',
    bgClass: 'bg-neutral-900',
    description: 'Acredita em descanso semanal remunerado, toma café com leite morno e acha que dormir 8 horas é um direito biológico garantido por Deus.'
  },
  {
    id: 'rank-cold-shower',
    level: 1,
    title: 'Aspirante a Espartano de Banho Gelado',
    minPoints: 50,
    maxPoints: 99,
    badge: '🧊',
    colorClass: 'text-cyan-400',
    borderClass: 'border-cyan-700',
    bgClass: 'bg-cyan-950/40',
    description: 'Já fechou o chuveiro quente por 12 segundos, quase teve uma síncope respiratória, mas postou nos stories com a legenda: "Mindset Blindado".'
  },
  {
    id: 'rank-coffee-dirt',
    level: 2,
    title: 'Biohacker de Café com Terra e Canela',
    minPoints: 100,
    maxPoints: 199,
    badge: '☕',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-700',
    bgClass: 'bg-amber-950/40',
    description: 'Mistura óleo de coco, canela, sal do Himalaia e argila do quintal na xícara às 04:15 para "otimizar a neuroplasticidade da preguiça".'
  },
  {
    id: 'rank-mentor-quantum',
    level: 3,
    title: 'Vendedor de Mentoria Quântica em 12x',
    minPoints: 200,
    maxPoints: 349,
    badge: '⚡',
    colorClass: 'text-purple-400',
    borderClass: 'border-purple-700',
    bgClass: 'bg-purple-950/40',
    description: 'Usa blazer com camiseta branca e tênis sem meia. Gesticula desenhando pirâmides invisíveis no ar enquanto fala sobre "alavancagem exponencial de infoprodutos".'
  },
  {
    id: 'rank-porsche-renter',
    level: 4,
    title: 'Alugador de Porsche por 15 Minutos',
    minPoints: 350,
    maxPoints: 549,
    badge: '🏎️',
    colorClass: 'text-yellow-400',
    borderClass: 'border-yellow-700',
    bgClass: 'bg-yellow-950/40',
    description: 'Gastou as economias do mês para gravar 80 vídeos em frente a uma 911 alugada no estacionamento de shopping dizendo: "Você ainda anda a pé porque quer!".'
  },
  {
    id: 'rank-early-bird',
    level: 5,
    title: 'Evangelista de Acordar às 03:42 AM',
    minPoints: 550,
    maxPoints: 799,
    badge: '⏰',
    colorClass: 'text-orange-400',
    borderClass: 'border-orange-700',
    bgClass: 'bg-orange-950/40',
    description: 'Posta foto do relógio no escuro às 03:42 com olheiras cadavéricas dizendo: "Enquanto eles dormem, eu já tive 3 paradas cardíacas produtivas".'
  },
  {
    id: 'rank-elevator-pitch',
    level: 6,
    title: 'Palestrante de Elevator Pitch Agressivo',
    minPoints: 800,
    maxPoints: 1099,
    badge: '📢',
    colorClass: 'text-rose-400',
    borderClass: 'border-rose-700',
    bgClass: 'bg-rose-950/40',
    description: 'Encurrala vizinhos no elevador do condomínio para apresentar um modelo de negócios disruptivo de venda de água benta encapsulada com IA.'
  },
  {
    id: 'rank-dopamine-monk',
    level: 7,
    title: 'Monge da Dopamina Zero & Frio Polar',
    minPoints: 1100,
    maxPoints: 1499,
    badge: '🧘‍♂️',
    colorClass: 'text-indigo-400',
    borderClass: 'border-indigo-700',
    bgClass: 'bg-indigo-950/40',
    description: 'Não sorri, não abraça parentes e olha fixamente para a parede cinza por 45 minutos. Afirma que sentimentos humanos são vazamentos de capital de giro.'
  },
  {
    id: 'rank-franchise-lord',
    level: 8,
    title: 'Dono de Franquia de Vento & Mindset',
    minPoints: 1500,
    maxPoints: 1999,
    badge: '🏛️',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-700',
    bgClass: 'bg-emerald-950/40',
    description: 'Vendeu 47 masterfranquias de uma consultoria que ensina outros consultores a vender consultorias para aspirantes a consultores. Um gênio da pirâmide moral.'
  },
  {
    id: 'rank-guru-supreme',
    level: 9,
    title: 'GURU SUPREMO TÓXICO / ALPHA INSUPORTÁVEL',
    minPoints: 2000,
    maxPoints: 999999,
    badge: '👑',
    colorClass: 'text-lime-400',
    borderClass: 'border-lime-500',
    bgClass: 'bg-lime-950/50',
    description: 'Estado terminal de alta performance: dorme em pé escorado na quina da sala, ingere 2kg de brita matinal e cobra R$ 50.000 para ofender empresários no palco.'
  }
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  // --- TAREFAS ABSURDAS (1-15) ---
  {
    id: 'PRIMEIRA_HUMILHACAO',
    title: 'Primeiro Passo no Lixo',
    description: 'Cumpriu a sua 1ª tarefa absurda diária sem fugir para o cobertor.',
    icon: '🦶',
    pointsReward: 2,
    category: 'tarefas',
    roastMessage: 'Parabéns, gado! Você completou sua primeira tarefa ridícula. O mercado de capitais nem percebeu sua existência medíocre, mas continue tentando!'
  },
  {
    id: 'DOIS_PASSOS_ABISMO',
    title: 'Dois Passos do Abismo',
    description: 'Concluiu 2 tarefas absurdas no mesmo prontuário.',
    icon: '🕳️',
    pointsReward: 3,
    category: 'tarefas',
    roastMessage: 'Duas tarefas concluídas! Seu cérebro já começou a derreter em busca de aprovação paterna. Excelente submissão ao protocolo.'
  },
  {
    id: 'GUERREIRO_LOUCURA',
    title: 'Guerreiro da Insanidade',
    description: 'Cumpriu 5 tarefas absurdas e sobreviveu aos deboches do Guru.',
    icon: '⚔️',
    pointsReward: 5,
    category: 'tarefas',
    roastMessage: 'Cinco tarefas? Você é mais obediente que cachorro de rico. Seu chefe agradece a mentalidade de bucha de canhão.'
  },
  {
    id: 'SETE_PECADOS_ALPHA',
    title: 'Sete Pecados do Alpha',
    description: 'Cumpriu 7 tarefas absurdas acumuladas.',
    icon: '😈',
    pointsReward: 7,
    category: 'tarefas',
    roastMessage: 'Sete tarefas no currículo da vergonha! Quem diria que um beta assalariado conseguiria seguir tantas ordens esdrúxulas sem questionar.'
  },
  {
    id: 'PROTOCOLO_SPARTAN_10X',
    title: 'Mente Blindada de Chumbo',
    description: 'Completou todas as 10 tarefas do dia! Você é 100% insano ou mentiroso compulsivo.',
    icon: '🛡️',
    pointsReward: 10,
    category: 'tarefas',
    roastMessage: 'DEZ TAREFAS NO MESMO DIA?! Ou você é um psicopata funcional desocupado ou mentiu descaradamente clicando nos botões. Nos dois casos, orgulho da firma!'
  },
  {
    id: 'DESAFIO_DESUMANO',
    title: 'Sem Limite Biológico',
    description: 'Cumpriu pelo menos uma tarefa de nível "Desumano".',
    icon: '☣️',
    pointsReward: 4,
    category: 'tarefas',
    roastMessage: 'Completou um desafio Desumano! Seus órgãos vitais estão enviando sinais de socorro em código Morse, mas o seu ego inflou 3%.'
  },
  {
    id: 'TRIPLO_DESUMANO',
    title: 'Fisiologia Destruída',
    description: 'Cumpriu 3 tarefas com classificação "Desumano".',
    icon: '💥',
    pointsReward: 8,
    category: 'tarefas',
    roastMessage: 'Três desafios desumanos? O plano de saúde já cancelou sua apólice por excesso de burrice voluntária. Parabéns!'
  },
  {
    id: 'ESPECIALISTA_RIDICULO',
    title: 'Rei do Constrangimento',
    description: 'Cumpriu 3 tarefas com dificuldade "Ridículo".',
    icon: '🤡',
    pointsReward: 4,
    category: 'tarefas',
    roastMessage: 'Se especializou no ridículo! Seus vizinhos já criaram um grupo de WhatsApp exclusivo para compartilhar gravações dos seus vexames.'
  },
  {
    id: 'MESTRE_EXTREMO',
    title: 'Masoquista Corporativo',
    description: 'Cumpriu 5 tarefas de dificuldade "Extremo".',
    icon: '🔥',
    pointsReward: 8,
    category: 'tarefas',
    roastMessage: 'Cinco extremos! Você sente prazer na autoflagelação psicológica. Perfeito para trabalhar 16 horas por dia recebendo em pizza no sábado.'
  },
  {
    id: 'MARATONISTA_15_TAREFAS',
    title: 'Vinte Mil Léguas de Vergonha',
    description: 'Completou 15 tarefas absurdas acumuladas na sua jornada.',
    icon: '🏃',
    pointsReward: 12,
    category: 'tarefas',
    roastMessage: '15 tarefas acumuladas! Seus concorrentes estão faturando 7 dígitos em Dubai enquanto você coleciona carimbos de insanidade numa tela preta.'
  },
  {
    id: 'VETERANO_25_TAREFAS',
    title: 'Alma Vendida ao Algoritmo',
    description: 'Completou 25 tarefas absurdas no seu prontuário.',
    icon: '📜',
    pointsReward: 15,
    category: 'tarefas',
    roastMessage: '25 tarefas! A sua dignidade foi liquidada na bolsa de valores a preço de centavos. Mas pelo menos você pontuou no ranking!'
  },
  {
    id: 'MONSTRO_40_TAREFAS',
    title: 'Paciente Psiquiátrico do Sucesso',
    description: 'Completou 40 tarefas absurdas. O síndico já teme pela sua sanidade.',
    icon: '🧟',
    pointsReward: 20,
    category: 'tarefas',
    roastMessage: '40 tarefas! A OMS acabou de emitir um alerta sanitário com o seu CPF. O nível de loucura é digno de fundador de startup falida.'
  },
  {
    id: 'LENDA_50_TAREFAS',
    title: 'Meio Século de Humilhação',
    description: 'Completou 50 tarefas absurdas no total. Um monumento à falta de bom senso.',
    icon: '🗿',
    pointsReward: 30,
    category: 'tarefas',
    roastMessage: 'CINQUENTA TAREFAS! Você é uma lenda viva do gado corporativo. Ninguém nunca foi tão longe na arte de passar vergonha com afinco!'
  },
  {
    id: 'INIMIGO_DO_COLCHAO',
    title: 'Inimigo da Coluna Vertebral',
    description: 'Completou a tarefa de dormir em pé ou sobre pilhas de livros.',
    icon: '🛌',
    pointsReward: 5,
    category: 'tarefas',
    roastMessage: 'Dormir em pé ou sobre livros? Seu ortopedista comprou uma lancha à vista só com as consultas que você vai precisar agendar.'
  },
  {
    id: 'TERROR_DO_MERCADO',
    title: 'Terror da Seção de Congelados',
    description: 'Fez planilhas no congelador ou negociou com a torradeira da cozinha.',
    icon: '🥶',
    pointsReward: 5,
    category: 'tarefas',
    roastMessage: 'Você tentou intimidar um eletrodoméstico ou entrou em congelador comercial. O segurança do supermercado ainda tem pesadelos com você.'
  },

  // --- AFIRMAÇÕES TÓXICAS & MANTRAS (16-23) ---
  {
    id: 'PRIMEIRO_MANTRA',
    title: 'Vassalo Consciente',
    description: 'Digitou sua 1ª afirmação tóxica perfeitamente no teste de velocidade.',
    icon: '⌨️',
    pointsReward: 2,
    category: 'mantra',
    roastMessage: 'Digitou sua humilhação sem gaguejar no teclado! Nada mais bonito do que um servo que reconhece sua condição em tempo real.'
  },
  {
    id: 'DEDOS_DE_ACO',
    title: 'Digitação Submissa',
    description: 'Concluiu 3 afirmações tóxicas diferentes sem desistir.',
    icon: '🖐️',
    pointsReward: 4,
    category: 'mantra',
    roastMessage: 'Três mantras assimilados na ponta dos dedos. A lavagem cerebral está surtindo efeito mais rápido do que o previsto!'
  },
  {
    id: 'PENTAGRAMA_TOXICO',
    title: 'Colecionador de Ofensas',
    description: 'Digitou 5 afirmações tóxicas no Mantra Diário.',
    icon: '⭐',
    pointsReward: 6,
    category: 'mantra',
    roastMessage: 'Cinco frases degradantes digitadas com entusiasmo! Você já pode pedir para gravar podcast motivacional de 4 horas.'
  },
  {
    id: 'DECALOGO_DA_VERGONHA',
    title: 'Bíblia do Gado',
    description: 'Completou 10 afirmações tóxicas no módulo de digitação.',
    icon: '📖',
    pointsReward: 10,
    category: 'mantra',
    roastMessage: 'Dez afirmações tóxicas decoradas! Você substituiu o hino nacional por ladainha de coach de tráfego pago.'
  },
  {
    id: 'VELOCIDADE_DO_DESESPERO',
    title: 'Datilógrafo do Pânico',
    description: 'Completou uma afirmação tóxica em menos de 10 segundos.',
    icon: '⚡',
    pointsReward: 5,
    category: 'mantra',
    roastMessage: 'Que velocidade! Digitou rápido assim porque já tem a frase tatuada na parte de trás da córnea, não é mesmo?'
  },
  {
    id: 'AFIRMACAO_ESPARTANA',
    title: 'Doutrinado no Sofrimento',
    description: 'Completou com sucesso uma afirmação de dificuldade "Espartano".',
    icon: '🛡️',
    pointsReward: 5,
    category: 'mantra',
    roastMessage: 'Afirmação espartana superada! Leônidas estaria rindo da sua cara se visse você digitando isso com ar-condicionado ligado.'
  },
  {
    id: 'TRIPLO_HUMILHANTE',
    title: 'Autoestima em Liquidação',
    description: 'Completou 3 afirmações de dificuldade "Humilhante".',
    icon: '📉',
    pointsReward: 6,
    category: 'mantra',
    roastMessage: 'Três afirmações humilhantes! Sua autoimagem já está em recuperação judicial, pronta para receber aportes de autoajuda barata.'
  },
  {
    id: 'MESTRE_DOS_MANTRAS',
    title: 'Papagaio do Algoritmo',
    description: 'Digitou mais de 15 afirmações tóxicas acumuladas.',
    icon: '🦜',
    pointsReward: 12,
    category: 'mantra',
    roastMessage: 'Quinze mantras! Você já não tem pensamentos próprios, apenas ecoa frases de efeito de quem nunca entregou uma DARF.'
  },

  // --- CONSULTA PESSOAL COM O GURU / IA (24-31) ---
  {
    id: 'ORACULO_CONSULTADO',
    title: 'Coice Recebido com Sucesso',
    description: 'Fez uma consulta pessoal com o Guru e teve seu ego estilhaçado pela IA.',
    icon: '🔥',
    pointsReward: 2,
    category: 'guru',
    roastMessage: 'Fez uma pergunta pro Guru e levou uma voadora no peito! Se queria carinho, contratava terapeuta ou ligava pra avó!'
  },
  {
    id: 'MASOQUISTA_REINCIDENTE',
    title: 'Pediu Bis da Voadora',
    description: 'Fez 3 perguntas na mesma consulta com o Guru Tóxico.',
    icon: '🥊',
    pointsReward: 4,
    category: 'guru',
    roastMessage: 'Três perguntas pro Guru? Você apanha na primeira resposta e ainda oferece a outra face para levar rasteira moral. Gosto assim!'
  },
  {
    id: 'CLIENTE_VIP_DO_INSULTO',
    title: 'Saco de Pancadas Oficial',
    description: 'Fez 5 consultas acumuladas com a inteligência artificial do Guru.',
    icon: '🎯',
    pointsReward: 6,
    category: 'guru',
    roastMessage: 'Cinco consultas! A IA do Guru já nem gasta eletricidade pensando em novo insulto, seu prontuário se ofende sozinho.'
  },
  {
    id: 'AUDIENCIA_COMPLETA',
    title: 'Sessão de Tortura Psicológica',
    description: 'Fez 10 perguntas profundas na Consulta Pessoal do Guru.',
    icon: '🧠',
    pointsReward: 10,
    category: 'guru',
    roastMessage: 'Dez perguntas completadas! Se cada ofensa do Guru fosse debitada em reais, seu cheque especial já estaria negativado até 2038.'
  },
  {
    id: 'PERGUNTA_DE_CLT',
    title: 'Ousadia Proletária',
    description: 'Mencionou carteira de trabalho, folga ou direitos trabalhistas na consulta.',
    icon: '💼',
    pointsReward: 3,
    category: 'guru',
    roastMessage: 'Falou em CLT e horário de almoço? O Guru quase deletou o banco de dados de desgosto. Aqui só trabalhamos no regime escravo-quântico!'
  },
  {
    id: 'PERGUNTA_DO_SONO',
    title: 'Inimigo da Insônia Lucrativa',
    description: 'Perguntou sobre descanso, sono ou cansaço para o Guru.',
    icon: '💤',
    pointsReward: 3,
    category: 'guru',
    roastMessage: 'Perguntando sobre sono? O sono é a maior artimanha de procrastinação criada pela biologia. Feche os olhos quando morrer!'
  },
  {
    id: 'PERGUNTA_DE_ELOGIO',
    title: 'Ilusão de Reconhecimento',
    description: 'Tentou pedir elogio ou validação para o Guru e foi massacrado.',
    icon: '🥺',
    pointsReward: 3,
    category: 'guru',
    roastMessage: 'Pediu biscoito e recebeu pedra brita! Aqui não tem estrelinha dourada, tem choque de realidade com taxa de juros.'
  },
  {
    id: 'VOADORA_SUPREMA',
    title: 'Fratura Exposta de Ego',
    description: 'Recebeu a resposta mais ácida e detalhada do Guru sem fechar a aba.',
    icon: '🚑',
    pointsReward: 5,
    category: 'guru',
    roastMessage: 'Sobreviveu à resposta brutal da IA sem chorar na posição fetal. Há quem diga que você tem vocação para coach de fracasso.'
  },

  // --- TERMÔMETRO DE MEDIOCRIDADE / QUIZ (32-35) ---
  {
    id: 'MEDIOCRE_CONSCIENTE',
    title: 'Diagnóstico da Vergonha',
    description: 'Respondeu ao Termômetro de Mediocridade Humana no teste inicial.',
    icon: '🌡️',
    pointsReward: 2,
    category: 'mentalidade',
    roastMessage: 'Fez o teste e descobriu o que sua família já sabia há anos: você é um monumento à zona de conforto. Parabéns pela honestidade!'
  },
  {
    id: 'BETA_CERTIFICADO',
    title: 'Lixo Biológico Oficial',
    description: 'Tirou uma nota humilhante no Termômetro de Mediocridade.',
    icon: '🗑️',
    pointsReward: 4,
    category: 'mentalidade',
    roastMessage: 'Nota de beta comprovada em cartório virtual! Nem o algoritmo esperava tanta fraqueza acumulada em um único usuário.'
  },
  {
    id: 'AVALIADOR_TEIMOSO',
    title: 'Reincidência no Exame',
    description: 'Refez o teste de mediocridade para tentar maquiar suas respostas.',
    icon: '🔄',
    pointsReward: 3,
    category: 'mentalidade',
    roastMessage: 'Refez o teste achando que mentir pro formulário ia mudar sua conta bancária? O autoengano é o esporte favorito do perdedor.'
  },
  {
    id: 'GABARITO_DA_ILUSAO',
    title: 'Mentiroso de Alta Performance',
    description: 'Marcou opções de tubarão no quiz fingindo ser o herdeiro do Elon Musk.',
    icon: '🦈',
    pointsReward: 5,
    category: 'mentalidade',
    roastMessage: 'Gabaritou fingindo que come prego no café da manhã. A gente finge que acredita e você finge que é milionário!'
  },

  // --- PONTUAÇÃO ALPHA ACUMULADA (36-43) ---
  {
    id: 'PRIMEIROS_PONTOS',
    title: 'Migalhas de Testosterona',
    description: 'Acumulou seus primeiros 25 pontos alpha no prontuário.',
    icon: '🌱',
    pointsReward: 2,
    category: 'pontuacao',
    roastMessage: '25 pontos! Mal dá para pagar a taxa de administração do seu cartão universitário, mas para quem não tinha nada, já é algo.'
  },
  {
    id: 'CINQUENTA_PONTOS',
    title: 'Meio Cento de Ilusão',
    description: 'Alcançou a marca de 50 pontos alpha acumulados.',
    icon: '🪙',
    pointsReward: 3,
    category: 'pontuacao',
    roastMessage: '50 pontos! Você já se sente pronto para dar conselhos financeiros não solicitados no churrasco de família de domingo.'
  },
  {
    id: 'CENTURIAO_ALPHA',
    title: 'Centurião da Humilhação',
    description: 'Acumulou mais de 100 pontos totais de insanidade no seu prontuário.',
    icon: '💯',
    pointsReward: 5,
    category: 'pontuacao',
    roastMessage: 'Cem pontos! Se pontos de ego pagassem boleto, você continuaria devendo o condomínio do mês passado.'
  },
  {
    id: 'DUZENTOS_PONTOS',
    title: 'Acumulador de Vergonha',
    description: 'Acumulou 200 pontos alpha na sua conta.',
    icon: '💎',
    pointsReward: 8,
    category: 'pontuacao',
    roastMessage: '200 pontos acumulados! O seu prontuário já é mais tóxico que esgoto de fábrica têxtil. Continue alimentando a fera.'
  },
  {
    id: 'QUATROCENTOS_PONTOS',
    title: 'Risco Biológico Financeiro',
    description: 'Bateu 400 pontos totais de insanidade.',
    icon: '☣️',
    pointsReward: 12,
    category: 'pontuacao',
    roastMessage: '400 pontos! Seu grau de submissão ao protocolo ultrapassou o limite do bom senso médico. Um caso clínico fascinante.'
  },
  {
    id: 'SEISCENTOS_PONTOS',
    title: 'Fatura em Débito Automático',
    description: 'Alcançou 600 pontos alpha de alta voltagem.',
    icon: '💳',
    pointsReward: 15,
    category: 'pontuacao',
    roastMessage: '600 pontos! Você passa mais tempo aqui do que olhando o saldo da conta corrente. A negação da realidade é uma arte.'
  },
  {
    id: 'MIL_PONTOS_INSANIDADE',
    title: 'Milionário de Pontos Inúteis',
    description: 'Alcançou 1000 pontos alpha acumulados.',
    icon: '👑',
    pointsReward: 25,
    category: 'pontuacao',
    roastMessage: 'MIL PONTOS ALPHA! Você acaba de conquistar a façanha de ser o mais rico em números virtuais que não valem um pão na chapa!'
  },
  {
    id: 'DOIS_MIL_PONTOS',
    title: 'Monumento à Obsessão',
    description: 'Acumulou incríveis 2000 pontos alpha no sistema.',
    icon: '🪐',
    pointsReward: 50,
    category: 'pontuacao',
    roastMessage: 'DOIS MIL PONTOS! Você ultrapassou todos os parâmetros conhecidos de obsessão. Nem a equipe de suporte esperava tanto tempo livre!'
  },

  // --- PATENTES ALCANÇADAS (44-52) ---
  {
    id: 'PATENTE_GELADA',
    title: 'Adeus Água Morna',
    description: 'Alcançou a Patente 1: Aspirante a Espartano de Banho Gelado (50+ pts).',
    icon: '🧊',
    pointsReward: 5,
    category: 'patentes',
    roastMessage: 'Subiu para Patente 1! Banhos quentes agora são proibidos sob pena de rebaixamento imediato a estagiário não-remunerado.'
  },
  {
    id: 'PATENTE_TERRA',
    title: 'Geofagia Aplicada',
    description: 'Alcançou a Patente 2: Biohacker de Café com Terra (100+ pts).',
    icon: '☕',
    pointsReward: 6,
    category: 'patentes',
    roastMessage: 'Patente 2 desbloqueada! Seus vermes intestinais agora cantam o hino da alta performance antes de cada refeição.'
  },
  {
    id: 'PATENTE_MENTORIA',
    title: 'Vendedor de Fumaça',
    description: 'Alcançou a Patente 3: Vendedor de Mentoria Quântica em 12x (200+ pts).',
    icon: '⚡',
    pointsReward: 8,
    category: 'patentes',
    roastMessage: 'Patente 3 alcançada! Já pode colocar "CEO & Founder of Disruption" na bio do Instagram e gravar reels apontando pro nada.'
  },
  {
    id: 'PATENTE_PORSCHE',
    title: 'Pose de Rico Falso',
    description: 'Alcançou a Patente 4: Alugador de Porsche por 15 Minutos (350+ pts).',
    icon: '🏎️',
    pointsReward: 10,
    category: 'patentes',
    roastMessage: 'Patente 4 no peito! O manobrista do shopping já sabe seu nome e cobra comissão dobrada para não estragar seu cenário de gravação.'
  },
  {
    id: 'PATENTE_MADRUGADA',
    title: 'Insônia Lucrativa',
    description: 'Alcançou a Patente 5: Evangelista de Acordar às 03:42 AM (550+ pts).',
    icon: '⏰',
    pointsReward: 12,
    category: 'patentes',
    roastMessage: 'Patente 5! Seu despertador agora toca o som de um tubarão devorando uma foca às 03:42 da madrugada. Descanse nunca!'
  },
  {
    id: 'PATENTE_ELEVADOR',
    title: 'Terror do Condomínio',
    description: 'Alcançou a Patente 6: Palestrante de Elevator Pitch Agressivo (800+ pts).',
    icon: '📢',
    pointsReward: 15,
    category: 'patentes',
    roastMessage: 'Patente 6! O porteiro do seu prédio já pega as escadas para não ser obrigado a ouvir você falar sobre funil de conversão perpétuo.'
  },
  {
    id: 'PATENTE_DOPAMINA',
    title: 'Monge da Geladeira Vazia',
    description: 'Alcançou a Patente 7: Monge da Dopamina Zero & Frio Polar (1100+ pts).',
    icon: '🧘‍♂️',
    pointsReward: 18,
    category: 'patentes',
    roastMessage: 'Patente 7! Você já não pisca há 3 semanas e sua família pensa que você foi substituído por um manequim em liquidação.'
  },
  {
    id: 'PATENTE_FRANQUIA',
    title: 'CEO do Vento Ensacado',
    description: 'Alcançou a Patente 8: Dono de Franquia de Vento & Mindset (1500+ pts).',
    icon: '🏛️',
    pointsReward: 22,
    category: 'patentes',
    roastMessage: 'Patente 8 conquistada! Você agora tem autorização moral para cobrar R$ 15.000 para dizer "seja você mesmo, mas melhor" em auditórios.'
  },
  {
    id: 'GURU_MAXIMO',
    title: 'Nirvana Tóxico Supremo',
    description: 'Alcançou a Patente 9: GURU SUPREMO TÓXICO / ALPHA INSUPORTÁVEL (2000+ pts).',
    icon: '👑',
    pointsReward: 35,
    category: 'patentes',
    roastMessage: 'PATENTE MÁXIMA ALCANÇADA! Você atingiu o ápice da insanidade humana. O Guru Tóxico te saúda como o parasita mais resiliente da história!'
  },

  // --- SECRETAS / AÇÕES ESPECIAIS (53-55) ---
  {
    id: 'TESTADOR_REINCIDENTE',
    title: 'Masoquismo em Loop',
    description: 'Usou a função de Zerar o Progresso para testar o sistema e sofrer tudo de novo.',
    icon: '🔄',
    pointsReward: 5,
    category: 'secretas',
    roastMessage: 'Zerou o próprio progresso só para apanhar tudo do zero outra vez? Freud passaria 30 anos estudando esse nível de masoquismo corporativo!'
  },
  {
    id: 'CORUJA_DA_PRODUTIVIDADE',
    title: 'Horário dos Insanos',
    description: 'Acessou o aplicativo ou cumpriu uma ação na madrugada espartana (entre 03:00 e 05:00).',
    icon: '🦉',
    pointsReward: 4,
    category: 'secretas',
    roastMessage: 'Acordado na madrugada caçando humilhação virtual! Enquanto seus amigos dormem como seres normais, você brilha no escuro da tela.'
  },
  {
    id: 'CERTIFICADO_COVARDIA',
    title: 'Carimbado e Registrado',
    description: 'Gerou um Certificado de Covardia Oficial no site.',
    icon: '📜',
    pointsReward: 3,
    category: 'secretas',
    roastMessage: 'Gerou o Certificado de Covardia! Imprima, plastifique e pendure na parede do quarto ao lado do diploma da faculdade esquecida.'
  },
  {
    id: 'STREAK_3_DIAS',
    title: 'Chama da Insanidade',
    description: 'Completou todas as 10 missões diárias por 3 dias consecutivos.',
    icon: '🔥',
    pointsReward: 10,
    category: 'secretas',
    roastMessage: 'Três dias seguidos completando todas as missões! Sua insistência em passar vergonha já está chamando a atenção do Ministério Público!'
  },
  {
    id: 'STREAK_7_DIAS',
    title: 'Semana Sem Desculpas',
    description: 'Alcançou uma sequência de 7 dias consecutivos completando as missões diárias.',
    icon: '⚡',
    pointsReward: 25,
    category: 'secretas',
    roastMessage: 'SETE DIAS CONSECUTIVOS! Uma semana inteira sem inventar desculpas de CLT. O Guru está quase deixando de sentir nojo de você.'
  },
  {
    id: 'STREAK_14_DIAS',
    title: 'Quinzena Espartana Inabalável',
    description: 'Manteve 14 dias de sequência diária sem falhar nenhuma missão.',
    icon: '👑',
    pointsReward: 50,
    category: 'secretas',
    roastMessage: 'QUATORZE DIAS SEGUIDOS! Seu nível de fanatismo corporativo ultrapassou o estágio clínico. Você já é sócio honorário da fábrica de úlceras!'
  }
];

export function getRankByPoints(points: number): GuruRank {
  for (let i = GURU_RANKS.length - 1; i >= 0; i--) {
    if (points >= GURU_RANKS[i].minPoints) {
      return GURU_RANKS[i];
    }
  }
  return GURU_RANKS[0];
}

export function getNextRank(currentPoints: number): { nextRank: GuruRank | null; pointsNeeded: number; progressPercent: number } {
  const current = getRankByPoints(currentPoints);
  const nextRank = GURU_RANKS.find((r) => r.level === current.level + 1) || null;

  if (!nextRank) {
    return {
      nextRank: null,
      pointsNeeded: 0,
      progressPercent: 100
    };
  }

  const range = nextRank.minPoints - current.minPoints;
  const currentInRange = currentPoints - current.minPoints;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentInRange / range) * 100)));
  const pointsNeeded = Math.max(0, nextRank.minPoints - currentPoints);

  return {
    nextRank,
    pointsNeeded,
    progressPercent
  };
}

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS_LIST.find((a) => a.id === id);
}
