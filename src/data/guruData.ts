import { ToxicAffirmation, AbsurdTask, BankruptAlpha, AbsurdSuccessCase } from '../types';

export const TOXIC_AFFIRMATIONS: ToxicAffirmation[] = [
  {
    id: 'aff-1',
    text: 'Eu sou um gado corporativo e mereço minha úlcera',
    difficulty: 'Fácil',
    insultOnSuccess: 'Digitou rápido porque a carapuça serviu feito uma luva, né perdedor?'
  },
  {
    id: 'aff-2',
    text: 'Enquanto eu dormia meu concorrente faturou sete dígitos e comprou a casa da minha mãe',
    difficulty: 'Humilhante',
    insultOnSuccess: 'Acordou? Que pena. O mercado já te engoliu antes do café.'
  },
  {
    id: 'aff-3',
    text: 'O sono é uma invenção de comunistas para me impedir de faturar',
    difficulty: 'Fácil',
    insultOnSuccess: 'Muito bem. Agora levanta antes que seu colchão absorva o resto da sua dignidade.'
  },
  {
    id: 'aff-4',
    text: 'Eu sou um beta fraco que precisa de oito horas de descanso biológico',
    difficulty: 'Humilhante',
    insultOnSuccess: 'Reconhecer que você é um verme é o primeiro passo para virar um verme produtivo.'
  },
  {
    id: 'aff-5',
    text: 'Minha zona de conforto é um chiqueiro de mediocridade e eu amo a lama',
    difficulty: 'Humilhante',
    insultOnSuccess: 'Concordou direitinho. Agora vai tomar banho na água fria do esgoto moral.'
  },
  {
    id: 'aff-6',
    text: 'Se eu piscar por meio segundo meu concorrente me ultrapassa no tráfego pago',
    difficulty: 'Espartano',
    insultOnSuccess: 'Ele já te ultrapassou faz três anos, amigão. Você só está correndo atrás do vento.'
  },
  {
    id: 'aff-7',
    text: 'Eu nasci para ser explorado e pagar mentoria de vinte mil reais em doze vezes',
    difficulty: 'Espartano',
    insultOnSuccess: 'Seu limite do cartão chora, mas seu mindset quântico brilha no escuro.'
  },
  {
    id: 'aff-8',
    text: 'Minha dopamina pertence ao algoritmo e meu rim pertence ao banco',
    difficulty: 'Humilhante',
    insultOnSuccess: 'Excelente declaração de vassalagem. Agora vá gerar valor pro seu chefe.'
  }
];

export const ABSURD_TASKS_POOL: AbsurdTask[] = [
  {
    id: 'task-1',
    title: 'Otimização Espacial do Sono',
    instruction: 'Durma em pé no canto do quarto encostado na quina da parede para economizar 3.4 segundos ao levantar.',
    hustleJustification: 'Camas horizontais foram criadas pela indústria do estofado para enfraquecer a postura da sua coluna vertebral espartana.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Concluiu é, com esse bucho aí? Vamos fingir que acreditamos. Seu colchão deve estar comemorando sua ausência temporária.'
  },
  {
    id: 'task-2',
    title: 'Café Ancestral com Geofagia',
    instruction: 'Tome 350ml de café preto sem açúcar misturado com 2 colheres de terra do quintal para se reconectar com o mindset do homem da caverna.',
    hustleJustification: 'Minerais brutos ativam a testosterona paleolítica que a água mineral filtrada destruiu.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Engoliu terra mesmo ou foi nescau com canela? Parabéns, agora seus vermes intestinais têm mentalidade de tubarão.'
  },
  {
    id: 'task-3',
    title: 'Corte Afetivo Spartan 3000',
    instruction: 'Mande um áudio de 4 segundos para sua mãe dizendo: "Não tenho tempo para almoço de domingo, estou focado em construir meu império no dropshipping".',
    hustleJustification: 'Almoço em família gera picos de oxitocina, o hormônio biológico do fracasso financeiro.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Sua mãe já respondeu perguntando se você tomou o remédio da pressão. Mandou bem, herdeiro do fracasso.'
  },
  {
    id: 'task-4',
    title: 'Jejum de Dopamina Terminal',
    instruction: 'Ligue para seu ex e diga: "Estou em um retículo de dopamina zero e você era uma distração cognitiva no meu balanço trimestral".',
    hustleJustification: 'Sentimentos amorosos são vazamentos de liquidez emocional. Seja um bloco de concreto armado.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Ligou nada, você ainda chora ouvindo sertanejo no banho morno. Mas vamos fingir que seu ego de pedra é real.'
  },
  {
    id: 'task-5',
    title: 'Osmose Literária Noturna',
    instruction: 'Venda sua cama no Mercado Livre e durma em cima de uma pilha de 8 livros sobre mentalidade milionária para absorver os capítulos por osmose.',
    hustleJustification: 'Seu cérebro absorve 480 palavras por minuto através do osso parietal se a pressão for suficiente.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Absorveu por osmose? O máximo que entrou pelo seu crânio foi um torcicolo espartano de 14 dias.'
  },
  {
    id: 'task-6',
    title: 'Duelo de Dominância no Espelho',
    instruction: 'Olhe fixamente no espelho por 12 minutos sem piscar gritando: "EU SOU UM TUBARÃO BRANCO NO AQUÁRIO DAS SARDINHAS" até a polícia bater na porta.',
    hustleJustification: 'A polícia é apenas um teste de resiliência que o universo enviou para medir seu volume vocal.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'O espelho quase rachou de desgosto. O síndico já colocou seu nome na ata do condomínio como risco biológico.'
  },
  {
    id: 'task-7',
    title: 'Banho de Gelo Testicular',
    instruction: 'Tome banho com 12 pedras de gelo dentro da cueca enquanto recita as 10 maiores taxas de conversão do funil de vendas.',
    hustleJustification: 'O frio extremo fecha os poros da fraqueza moral e acelera o metabolismo de vendas agressivas.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Aham, aguentou o gelo sim. Aposto que gritou mais fino que motorista de aplicativo na reserva.'
  },
  {
    id: 'task-8',
    title: 'Planilha no Congelador',
    instruction: 'Leve seu notebook para dentro do freezer do supermercado e edite planilhas de fluxo de caixa por 20 minutos de camiseta regata.',
    hustleJustification: 'Se você não suporta -18 graus celsius, você nunca vai suportar a pressão de ser processado pelo Procon.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'O segurança do mercado só não te expulsou porque achou que era caso de internação psiquiátrica urgente.'
  },
  {
    id: 'task-9',
    title: 'Cumprimento de Britadeira',
    instruction: 'Aperte a mão de 5 pessoas hoje com força suficiente para quebrar os metatarsos delas, mantendo o olhar nos olhos sem piscar por 8 segundos.',
    hustleJustification: 'Dominância física imediata garante 37% a mais de autoridade na reunião de condomínio.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Apertou com essa sua mão macia de quem só segura mouse pad com apoio de gel? Tá bom, campeão.'
  },
  {
    id: 'task-10',
    title: 'Biohacking do Almoço em 90 Segundos',
    instruction: 'Bata 3 ovos crus, pó de café e uma colher de azeite extra virgem no liquidificador e beba em 90 segundos sem respirar.',
    hustleJustification: 'Mastigação sólida gasta 4.2 calorias cerebrais que poderiam ser aplicadas na prospecção fria de clientes.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Bebeu tudo com essa cara de quem vai vomitar a alma no vaso sanitário? Lindo exemplo de disciplina quântica.'
  },
  {
    id: 'task-11',
    title: 'Caminhada Quântica no Asfalto',
    instruction: 'Caminhe 500 metros descalço no asfalto às 14h afirmando em voz alta que a sola dos seus pés absorve energia solar para fechar vendas.',
    hustleJustification: 'A termodinâmica do asfalto quente transfere vigor de prospecção diretamente para o meridiano do faturamento.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Queimou o calcanhar e não faturou nem um centavo de comissão. Orgulho absoluto do coach.'
  },
  {
    id: 'task-12',
    title: 'Negociação com a Torradeira',
    instruction: 'Pratique técnicas de fechamento agressivo de vendas de alto ticket com a torradeira da cozinha até ela aceitar sua proposta comercial.',
    hustleJustification: 'Se você não consegue dobrar a resistência de um eletrodoméstico de 110V, você nunca fechará contratos de 7 dígitos.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'A torradeira ainda conseguiu arrancar um desconto de 15% na sua auto-estima. Vendedor implacável!'
  },
  {
    id: 'task-13',
    title: 'Sincronização com o Semáforo',
    instruction: 'Faça 15 polichinelos em frente a um farol vermelho para não desperdiçar o tempo morto do trânsito na cidade.',
    hustleJustification: 'O motorista parado no semáforo é um investidor em potencial que precisa ver sua disciplina atlética ao vivo.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O motorista do ônibus buzinou achando que era surto psicótico. Mandou bem, garoto-propaganda do asfalto!'
  },
  {
    id: 'task-14',
    title: 'Networking com o Porteiro às 05:00',
    instruction: 'Apresente um pitch de venture capital de 2 minutos para o porteiro do prédio enquanto ele toma o café de garrafa térmica.',
    hustleJustification: 'Quem controla o portão de entrada controla o fluxo de capital de risco da vizinhança.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O seu Sebastião só queria saber se você ia pagar a taxa de lixo atrasada. Estrategista de primeira!'
  },
  {
    id: 'task-15',
    title: 'Banho de Vinagre de Maçã Quântico',
    instruction: 'Lave o couro cabeludo com 100ml de vinagre de maçã puro afirmando que o ácido corrói bloqueios mentais de proletário.',
    hustleJustification: 'O pH ácido estimula as sinapses cerebrais responsáveis pela cobrança de juros abusivos.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Agora você cheira a salada murcha de restaurante por quilo, mas com mindset de tubarão da Faria Lima.'
  },
  {
    id: 'task-16',
    title: 'Foco Sob Som de Britadeira',
    instruction: 'Coloque áudio de obra civil em volume máximo no fone de ouvido por 15 minutos enquanto lê um relatório de vendas.',
    hustleJustification: 'Se o seu cérebro não aguenta 110 decibéis de britadeira, você nunca vai aguentar a pressão de ser notificado pela Receita Federal.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Seu tímpano chiou e você não entendeu nem metade do relatório. Alta performance em sua forma mais pura!'
  },
  {
    id: 'task-17',
    title: 'Silêncio Espartano no Almoço',
    instruction: 'Almoce com a família sem dizer uma única palavra, mastigando cada garfada exatamente 42 vezes mantendo olhar fixo na parede.',
    hustleJustification: 'Conversas familiares geram oxitocina e empatia, os dois maiores venenos da acumulação primitiva de capital.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Sua tia perguntou se você engoliu a língua ou se estava em surto. Continuou firme no voto de tolice!'
  },
  {
    id: 'task-18',
    title: 'Auto-Feedback no Elevador',
    instruction: 'Grave um vídeo de 15 segundos olhando para a câmera frontal do celular no espelho do elevador dizendo: "Você está frouxo hoje, reage!".',
    hustleJustification: 'A auto-humilhação prévia imuniza seu sistema imunológico contra as broncas do seu chefe às 09:00.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O vizinho do 4º andar entrou no meio do vídeo e você fingiu que estava limpando a lente com a camisa. Covarde!'
  },
  {
    id: 'task-19',
    title: 'Jejum Hídrico de Vendas',
    instruction: 'Só tome seu primeiro gole de água do dia após enviar 15 mensagens de prospecção fria no LinkedIn ou WhatsApp.',
    hustleJustification: 'A sede biológica força seu córtex pré-frontal a fechar negócios antes da desidratação severa.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Com a boca seca igual o deserto do Saara e 14 contatos te bloqueando por spam. Belo dia de caça!'
  },
  {
    id: 'task-20',
    title: 'Substituição do Travesseiro por Tijolo',
    instruction: 'Tire seu travesseiro macio e apoie a cabeça em um objeto rígido envolto em pano fino por 25 minutos.',
    hustleJustification: 'Superfícies macias amortecem o instinto de sobrevivência e acostumam o pescoço com a derrota cotidiana.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Acordou com o pescoço duro que nem poste de concreto. O ortopedista já comprou ações da sua dor!'
  },
  {
    id: 'task-21',
    title: 'Prospecção no Cemitério',
    instruction: 'Dê uma volta de 10 minutos em volta de um cemitério ou praça vazia meditando sobre o custo de oportunidade de estar vivo e pobre.',
    hustleJustification: 'A finitude da matéria biológica é o melhor gatilho de escassez para acelerar seu lançamento digital.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Nem as almas penadas aguentaram seu papo de alavancagem de infoproduto. Volte para a planilha!'
  },
  {
    id: 'task-22',
    title: 'Corrida ao Meio-Dia de Casaco',
    instruction: 'Corra ou caminhe 1km sob o sol do meio-dia vestindo blusa de frio para suar a complacência do corpo.',
    hustleJustification: 'O calor senegalês drena a água retida da preguiça e forja uma carcaça apta para a selva corporativa.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Quase teve uma insolação de grau 2 e não faturou nem um centavo. Exemplo de disciplina inconsequente!'
  },
  {
    id: 'task-23',
    title: 'Elogio Agressivo ao Superior',
    instruction: 'Mande uma mensagem para seu superior hierárquico dizendo: "Admiro sua liderança, mas estou trabalhando para ocupar sua cadeira em 180 dias".',
    hustleJustification: 'Demarcação territorial precoce assusta a concorrência interna e te coloca no topo da lista de demissão honrosa.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'O RH já abriu processo administrativo para te desligar por justa causa. Isso sim é velocidade de carreira!'
  },
  {
    id: 'task-24',
    title: 'Wallpaper do Desespero',
    instruction: 'Mude o papel de parede do seu celular e computador para um gráfico vermelho em queda livre com a frase: "Você é o próximo".',
    hustleJustification: 'O terror psicológico constante eleva o cortisol a níveis ideais para não gastar dinheiro com lazer.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Toda vez que desbloqueia a tela toma um susto e pensa na fatura do Nubank. Terapia de choque barata!'
  },
  {
    id: 'task-25',
    title: 'Venda de Caneta no Ponto de Ônibus',
    instruction: 'Tente vender uma caneta esferográfica comum para alguém no ponto de ônibus por R$ 5,00 usando gatilho de urgência.',
    hustleJustification: 'Quem vende plástico por cinco reais na chuva vende ações de startup em Wall Street.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Acharam que você era pedinte e te ofereceram uma paçoca. O lobo de Wall Street da rodoviária!'
  },
  {
    id: 'task-26',
    title: 'Balde de Água Gelada na Nuca',
    instruction: 'Vire um balde de 5 litros de água gelada direto na nuca às 05:45 da manhã sem respirar.',
    hustleJustification: 'O choque térmico no bulbo raquiano acorda as memórias genéticas dos vikings navegadores de tempestades.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Gritou mais agudo que apito de trem e molhou o tapete da sala. Parabéns pela performance aquática!'
  },
  {
    id: 'task-27',
    title: 'Chicória Crua Contra a Preguiça',
    instruction: 'Mastigue uma folha de chicória crua ou rúcula amarga sem sal toda vez que sentir vontade de procrastinar no celular.',
    hustleJustification: 'O sabor amargo reconfigura os receptores dopaminérgicos de gratificação instantânea.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Fez careta de bebê tomando remédio, mas guardou o celular por 4 minutos. Grande vitória da agropecuária!'
  },
  {
    id: 'task-28',
    title: 'Preleção para a Samambaia',
    instruction: 'Faça uma reunião de alinhamento estratégico de 3 minutos cobrando meta de fotossíntese de 15% para a planta da sala.',
    hustleJustification: 'Se você não consegue liderar um vegetal imóvel, como pretende liderar um time de estagiários da Geração Z?',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'A planta murchou mais um pouco só de ouvir o tom da sua voz. Gerente exemplar!'
  },
  {
    id: 'task-29',
    title: 'Auditoria de Culpabilidade Noturna',
    instruction: 'Escreva em um caderno 5 momentos do dia em que você se comportou como um consumidor passivo em vez de um predador de lucros.',
    hustleJustification: 'A autoflagelação documental gera memórias traumáticas que impedem recaídas na mediocridade.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Anotou que respirou devagar demais na hora do almoço. A neurose do sucesso já tomou conta!'
  },
  {
    id: 'task-30',
    title: 'Gole de Água com Pimenta Caiena',
    instruction: 'Tome 200ml de água morna com meia colher de pimenta caiena para incinerar qualquer resquício de sono pós-almoço.',
    hustleJustification: 'A capsaicina no estômago cria a ilusão de estar pegando fogo, o que impede de sentar no sofá.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'O refluxo subiu na traqueia feito lava vulcânica. Sono zero, dor de estômago dez!'
  },
  {
    id: 'task-31',
    title: 'Caminhada com Postura de Gorila',
    instruction: 'Ande por 15 minutos com peitoral expandido, ombros travados para trás e queixo erguido como se fosse comprar o quarteirão.',
    hustleJustification: 'A linguagem corporal de primata alfa altera os níveis séricos de testosterona em até 14.8%.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Parecia que estava com torcicolo bilateral ou que tinha esquecido o cabide dentro da camisa. Puro charme!'
  },
  {
    id: 'task-32',
    title: 'Tranca do Despertador na Cozinha',
    instruction: 'Coloque o despertador programado para as 04:30 trancado dentro de uma caixa na cozinha para obrigar o deslocamento físico.',
    hustleJustification: 'Eliminar o botão soneca é o primeiro passo para eliminar o direito de escolha do seu corpo cansado.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Tropeçou no tapete no escuro, bateu o dedinho no pé da mesa e acordou a vizinhança inteira. Guerreiro!'
  },
  {
    id: 'task-33',
    title: 'Abstenção de Risadas por 24 Horas',
    instruction: 'Passe o dia inteiro sem sorrir para nenhuma piada ou comentário engraçado, mantendo olhar de cirurgião em cirurgia cardíaca.',
    hustleJustification: 'Risadas soltam endorfina barata que satisfaz o cérebro sem que você tenha batido suas metas de faturamento.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Parecia que estava prestes a depor na CPI da fraude financeira. Expressão de predador sem amigos!'
  },
  {
    id: 'task-34',
    title: 'Trabalho em Bola de Pilates Furada',
    instruction: 'Trabalhe 40 minutos sentado em uma bola de ginástica ou banqueta instável para manter o abdômen contraído.',
    hustleJustification: 'A instabilidade biomecânica impede que seu cérebro relaxe nas reuniões inúteis do Zoom.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Caiu de lado tentando pegar a caneta e quase quebrou o mouse. Foco inabalável no equilíbrio!'
  },
  {
    id: 'task-35',
    title: 'Cold Call para Parente Distante',
    instruction: 'Ligue para um parente com quem não fala há 2 anos e tente vender uma cota de investimento em criptoativo inventado.',
    hustleJustification: 'Se você não tem coragem de prospectar o próprio sangue, você é uma presa fácil para tubarões de mercado.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Seu primo achou que você tinha entrado para uma seita ou caído no golpe do Pix. Desempenho teatral impecável!'
  },
  {
    id: 'task-36',
    title: 'Almoço em Pé na Bancada',
    instruction: 'Coma sua refeição em pé ao lado da pia em no máximo 6 minutos cronometrados no cronômetro do celular.',
    hustleJustification: 'Sentar para comer é um costume decadente herdado dos banquetes aristocráticos pré-revolução industrial.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Engasgou com o arroz por pressa desnecessária e terminou a refeição em pé como um cavalo em estábulo.'
  },
  {
    id: 'task-37',
    title: 'Treino de Apneia do Sucesso',
    instruction: 'Segure a respiração por 45 segundos enquanto visualiza mentalmente o saldo da sua conta bancária multiplicado por 100.',
    hustleJustification: 'A hipóxia temporária força o cérebro a priorizar pensamentos de sobrevivência patrimonial.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Ficou roxo no segundo 32 e quase desmaiou no tapete. O universo sentiu a força da sua asfixia!'
  },
  {
    id: 'task-38',
    title: 'Oração Quântica ao Algoritmo',
    instruction: 'Agradeça publicamente nos comentários de um post de influencer bilionário pela oportunidade de ser ignorado por ele.',
    hustleJustification: 'Humildade estratégica perante os deuses do engajamento orgânico atrai bênçãos de tráfego pago.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Ganhou zero curtidas e um comentário automático de bot oferecendo criptomoedas. Comunhão digital completa!'
  },
  {
    id: 'task-39',
    title: 'Leitura de Balanço em Voz Alta',
    instruction: 'Leia 3 páginas de notas explicativas de um balanço contábil em voz alta na sacada com entonação de poesia barroca.',
    hustleJustification: 'A sonoridade dos números de provisão para créditos de liquidação duvidosa treina o vocabulário executivo.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Os vizinhos fecharam as janelas achando que era ritual de magia negra tributária. Poeta dos números!'
  },
  {
    id: 'task-40',
    title: 'Desconexão do Wi-Fi de Lazer',
    instruction: 'Desligue o Wi-Fi do celular por 4 horas consecutivas e utilize apenas papel e caneta para planejar seus próximos 3 trimestres.',
    hustleJustification: 'Notificações de redes sociais são drenos parasitários de atenção instalados pela concorrência.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Ficou olhando para a folha em branco por 3 horas e desenhou uma casinha com chaminé. Estrategista nato!'
  },
  {
    id: 'task-41',
    title: 'Subida de Escada com Peso de Arroz',
    instruction: 'Suba 5 lances de escada carregando 2 pacotes de arroz de 5kg nos braços sem parar para respirar.',
    hustleJustification: 'Coração acelerado e ácido lático são os únicos biomarcadores que comprovam que você não é uma planta de plástico.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Chegou no 5º andar com a língua de fora e o arroz caindo no chão. Mas as pernas de ferro estão prontas!'
  },
  {
    id: 'task-42',
    title: 'Post-it da Vergonha no Espelho',
    instruction: 'Cole um post-it no espelho do banheiro com o texto: "Você ainda não faturou 1 milhão porque gasta tempo escovando a língua devagar".',
    hustleJustification: 'O espelho deve ser um tribunal militar de autoavaliação diária, não um instrumento de vaidade.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'A umidade do chuveiro descolou o post-it no terceiro dia. Nem a cola aguentou tanta cobrança inútil!'
  },
  {
    id: 'task-43',
    title: 'Grito de Guerra na Catraca',
    instruction: 'Solte um som gutural de determinação de 1 segundo antes de passar pela catraca do metrô ou trabalho.',
    hustleJustification: 'A demarcação acústica de presença intimida qualquer outro profissional que esteja na mesma frequência.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O segurança te olhou com a mão no coldre pensando que era arrastão. Presença de palco 10/10!'
  },
  {
    id: 'task-44',
    title: 'Podcast em Velocidade 2.5x',
    instruction: 'Ouça um podcast sobre gestão empresarial acelerado em 2.5x sem pausar por 20 minutos consecutivos.',
    hustleJustification: 'A audição hiperacelerada expande a taxa de transferência de dados do córtex cerebral em 150%.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Parecia voz de esquilo de desenho animado e você só entendeu as palavras "sinergia" e "valuation". Aula magistral!'
  },
  {
    id: 'task-45',
    title: 'Relógio Adiantado em 43 Minutos',
    instruction: 'Adie todos os relógios da casa em 43 minutos para viver sob permanente sensação de que a reunião já começou.',
    hustleJustification: 'A ansiedade crônica induzida mantém o estado de vigília alerta que a calma biológica destrói.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Chegou na padaria antes do padeiro acordar e ficou esperando na calçada fria. Pontualidade britânica!'
  },
  {
    id: 'task-46',
    title: 'Ancoragem de Preço no Pão Francês',
    instruction: 'Tente negociar o preço do pão na padaria afirmando que tem volume comprador para fechar contrato de fornecimento trimestral.',
    hustleJustification: 'Todo balcão de varejo é uma mesa de derivativos para quem enxerga margem em cada grama de farinha.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O balconista te deu 2 centavos de troco a menos só de raiva. Negociador implacável de quitações!'
  },
  {
    id: 'task-47',
    title: 'Banho de Sol Vestindo Terno',
    instruction: 'Fique 10 minutos na sacada ou calçada tomando sol vestindo camisa social de manga longa fechada até o pescoço.',
    hustleJustification: 'A absorção de fótons através do tecido de poliéster cria um campo eletromagnético favorável a vendas B2B.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Ficou com duas pizzas de suor debaixo do braço e a cara vermelha. Imagem corporativa impecável!'
  },
  {
    id: 'task-48',
    title: 'Eliminação de Saudações Fracas',
    instruction: 'Substitua o cumprimento "Tudo bem?" por "Pronto para triturar o mercado hoje e você?".',
    hustleJustification: 'Perguntar se alguém está bem abre espaço para lamentações de quem não nasceu para o faturamento exponencial.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'A recepcionista respondeu que a mãe dela estava no hospital e o clima ficou insuportável. Diplomata do ano!'
  },
  {
    id: 'task-49',
    title: 'Minimalismo Têxtil Feroz',
    instruction: 'Tire do armário qualquer peça de roupa com estampa alegre e passe o dia vestindo apenas peças pretas ou cinza chumbo.',
    hustleJustification: 'Steve Jobs e Mark Zuckerberg não gastavam glicose decidindo cor de meia. Seja uma máquina monocromática.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Parece que vai a um funeral de startup o dia todo. Elegância gótica dos negócios!'
  },
  {
    id: 'task-50',
    title: 'Plano de Negócios no Guardanapo',
    instruction: 'Desenhe um organograma completo de empresa fictícia no guardanapo de papel durante o café e guarde na carteira.',
    hustleJustification: 'Grandes corporações nasceram em rascunhos de lanchonete; a sua só não nasceu ainda por falta de café com terra.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O guardanapo rasgou com a ponta da caneta esferográfica e manchou com manteiga. Valuation de R$ 0,00!'
  },
  {
    id: 'task-51',
    title: 'Aviso de Alta Performance na Porta',
    instruction: 'Cole um papel na porta do seu cômodo com os dizeres: "Cérebro em processamento de dados críticos. Não bata, produza".',
    hustleJustification: 'Interrupções de familiares quebram o estado de flow e custam R$ 1.400 em perda potencial de foco por segundo.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Sua mãe bateu na porta mesmo assim para perguntar se você queria um pedaço de melancia. Disciplina sob ataque!'
  },
  {
    id: 'task-52',
    title: 'Leitura de DRE em Substituição a Streaming',
    instruction: 'Em vez de assistir a um episódio de série à noite, leia 20 páginas de um demonstrativo financeiro auditado de 2018.',
    hustleJustification: 'Ficção televisiva é sedativo mental vendido para manter a classe trabalhadora anestesiada e dócil.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Dormiu na terceira linha da nota explicativa de debêntures. Mas o sono teve pedigree financeiro!'
  },
  {
    id: 'task-53',
    title: 'Contato Visual de Cobra na Webcam',
    instruction: 'Durante uma chamada de vídeo de trabalho, mantenha os olhos fixos na lente da câmera sem piscar por 90 segundos.',
    hustleJustification: 'O contato visual digital ininterrupto transmite dominância psicológica e reduz pedidos de aumento de salário.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'O colega de equipe perguntou se a sua imagem tinha congelado ou se você tinha sofrido um AVC. Predador da webcam!'
  },
  {
    id: 'task-54',
    title: 'Linha de Montagem da Louça em 60s',
    instruction: 'Lave toda a louça da pia aplicando método de produção enxuta Lean Six Sigma em menos de 1 minuto.',
    hustleJustification: 'Movimentos desnecessários na lavagem de pratos revelam incompetência logística na vida pessoal.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Quebrou uma xícara, molhou a frente da calça toda e o prato ainda ficou engordurado. Eficiência nível estatal!'
  },
  {
    id: 'task-55',
    title: 'Purga de Contatos Improdutivos',
    instruction: 'Arquive ou silencie 10 conversas no WhatsApp de contatos que não mandaram proposta comercial nos últimos 30 dias.',
    hustleJustification: 'Quem não gera pipeline de vendas está apenas consumindo sua memória RAM afetiva.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Silenciou o grupo da própria família e perdeu o aviso de que o almoço de Páscoa tinha mudado de local. Solitário no topo!'
  },
  {
    id: 'task-56',
    title: 'Stories Enigmáticos em Fundo Preto',
    instruction: 'Poste um story apenas com fundo preto e a palavra "Trabalhem." escrita em fonte minúscula sem nenhuma explicação.',
    hustleJustification: 'O mistério em torno do seu ritmo de trabalho gera especulação e temor entre concorrentes amadores.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Três pessoas responderam perguntando se você tinha terminado o namoro de novo. Enigma de quinta categoria!'
  },
  {
    id: 'task-57',
    title: 'Elixir de Gengibre com Pimenta Preta',
    instruction: 'Mastigue uma rodela de gengibre cru com pimenta do reino em jejum para inflamar o estômago com determinação.',
    hustleJustification: 'O fogo gastrointestinal atua como catalisador térmico da vontade de vencer sem anestesia.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Os olhos lacrimejaram por 10 minutos seguidos enquanto tentava engolir água da pia. Guerreiro de fogo!'
  },
  {
    id: 'task-58',
    title: 'Visualização da Queda do Concorrente',
    instruction: 'Sente-se em silêncio por 5 minutos visualizando seu maior concorrente profissional recebendo uma intimação judicial.',
    hustleJustification: 'A lei da atração reversa neutraliza a expansão de mercado dos seus adversários diretos.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Enquanto você visualizava, o concorrente fechou mais 3 clientes no Google Ads. Mentalidade quântica nota zero!'
  },
  {
    id: 'task-59',
    title: 'Prancha Isométrica Durante o Café',
    instruction: 'Faça 60 segundos de prancha no chão da cozinha enquanto espera a água esquentar para o café da manhã.',
    hustleJustification: 'Tempo de espera na cozinha é vazamento inaceitável de produtividade calórica.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'O corpo tremeu igual batedeira de bolo no segundo 25 e você caiu de cara no azulejo. Abdômen de ferro!'
  },
  {
    id: 'task-60',
    title: 'Análise SWOT do Pet Doméstico',
    instruction: 'Escreva em um papel as Forças, Fraquezas, Oportunidades e Ameaças do cachorro ou gato da casa em relação aos custos de ração.',
    hustleJustification: 'Todo ativo sob seu teto precisa justificar o Retorno sobre o Investimento (ROI) em carinho ou proteção.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'Concluiu que o gato tem custo fixo elevado e margem de contribuição nula. Demita o felino imediatamente!'
  },
  {
    id: 'task-61',
    title: 'Banco de Madeira Sem Encosto',
    instruction: 'Assista a todas as reuniões do dia sentado em um banco de madeira rígido sem encosto para a coluna.',
    hustleJustification: 'Cadeiras ergonômicas foram inventadas para adormecer o espírito combativo do trabalhador moderno.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Terminou o dia parecendo um ponto de interrogação ambulante de tanta dor na lombar. Postura espartana!'
  },
  {
    id: 'task-62',
    title: 'Incursão ao Supermercado às 06:01 AM',
    instruction: 'Esteja na porta do supermercado no exato minuto de abertura para fazer compras antes de qualquer outro ser humano.',
    hustleJustification: 'A dominância geográfica sobre o carrinho de compras define quem come a carne de primeira e quem pega as sobras.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Entrou no mercado e os funcionários ainda estavam varrendo o chão de luz apagada. O primeiro a comprar água com gás!'
  },
  {
    id: 'task-63',
    title: 'Leitura de Biografia em Pé no Transporte',
    instruction: 'Leia 25 páginas de biografia de magnata do petróleo equilibrando-se em uma perna só no transporte público em movimento.',
    hustleJustification: 'O equilíbrio vestibular forçado estimula a retenção de dados históricos sobre monopólios comerciais.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'O ônibus freou, o livro voou no colo de uma senhora e você quase caiu no chão. Aprendizado cinético avançado!'
  },
  {
    id: 'task-64',
    title: 'Pitch para o Próprio Reflexo no Supino',
    instruction: 'Entre uma série e outra de exercícios, olhe no espelho da academia e apresente sua proposta de valor com voz firme.',
    hustleJustification: 'Se você não consegue convencer a si mesmo com a musculatura inchada, nunca convencerá um comitê de compras.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O instrutor da academia veio perguntar se você estava passando mal ou precisava de água com açúcar. Oratória de elite!'
  },
  {
    id: 'task-65',
    title: 'Supressão Total de Bocejos',
    instruction: 'Toda vez que sentir vontade de bocejar ao longo do dia, aperte os lábios e segure o ar pelo nariz.',
    hustleJustification: 'O bocejo é uma confissão pública de fraqueza respiratória que destrói sua reputação no ambiente de negócios.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'Os olhos encheram d água e a cabeça quase explodiu de pressão interna. Mas ninguém viu fraqueza!'
  },
  {
    id: 'task-66',
    title: 'Moeda de R$ 0,50 no Sapato',
    instruction: 'Coloque uma moeda de 50 centavos dentro do calçado e caminhe com ela por 30 minutos para treinar tolerância ao desconforto.',
    hustleJustification: 'A dor localizada na sola do pé cria uma âncora psicológica que te lembra que o dinheiro incomoda quem não o domina.',
    difficulty: 'Desumano',
    alphaScore: 5,
    completionRoast: 'Mancou o dia todo parecendo pirata com perna de pau, mas o mindset aguentou firme. Masoquismo monetário!'
  },
  {
    id: 'task-67',
    title: 'Email Profissional em Caixa Alta',
    instruction: 'Envie um email de cobrança interna com o título em letras maiúsculas: "PRIORIDADE MÁXIMA E INEGOCIÁVEL".',
    hustleJustification: 'A tipografia em caixa alta quebra a inércia do leitor e estabelece hierarquia de emergência imediata.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O destinatário respondeu perguntando por que você estava gritando no email corporativo. Autoridade estridente!'
  },
  {
    id: 'task-68',
    title: 'Água Morna com Cravo e Sal',
    instruction: 'Tome uma caneca de água morna com 3 cravos-da-índia e uma pitada de sal grosso às 16:00 sem açúcar.',
    hustleJustification: 'Os óleos essenciais do cravo anestesiam o paladar e preparam a mucosa para engolir desaforos de clientes.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'A boca ficou amortecida que nem anestesia de dentista. Já pode receber cobrança bancária sem sentir nada!'
  },
  {
    id: 'task-69',
    title: 'Declaração de Custo de Oportunidade',
    instruction: 'Toda vez que for pagar qualquer coisa acima de R$ 10,00, diga em voz alta para o atendente: "Isso atrasou minha liberdade em 2 dias".',
    hustleJustification: 'Verbalizar a perda patrimonial ancora a aversão ao gasto supérfluo na memória episódica.',
    difficulty: 'Ridículo',
    alphaScore: 3,
    completionRoast: 'O caixa da padaria só te entregou o troco com cara de desprezo total. Educação financeira de guerrilha!'
  },
  {
    id: 'task-70',
    title: 'Voto Solene de Submissão ao Guru',
    instruction: 'Fique de pé em frente ao espelho com a mão direita no peito e recite: "Eu sou o único responsável pela minha mediocridade e renuncio a qualquer desculpa biológica".',
    hustleJustification: 'A confissão pública perante o próprio reflexo sela o pacto de insanidade com a alta performance tóxica.',
    difficulty: 'Extremo',
    alphaScore: 4,
    completionRoast: 'O reflexo concordou com cada palavra e ainda balançou a cabeça em sinal de reprovação. O pacto foi selado!'
  }
];

export const INITIAL_BANKRUPT_LEADERBOARD: BankruptAlpha[] = [
  {
    id: 'loser-1',
    rank: 1,
    name: 'Thiago Finch-da-Shopee',
    alias: 'O Rei do Cold Shower 4AM',
    lossAmount: 487500,
    downfallReason: 'Comprou uma Ferrari de leilão em 84 parcelas para tirar foto na garagem alugada e tomou banho de água congelada até pegar pneumonia dupla.',
    status: 'Morando de Favor na Casa da Avó',
    badge: 'Pneumonia Alpha'
  },
  {
    id: 'loser-2',
    rank: 2,
    name: 'Enzo "Mindset Quântico" Rocha',
    alias: 'Mentor de Mentores de Mentores',
    lossAmount: 312000,
    downfallReason: 'Gastou 300 mil reais em mentoria de 3 dias em Dubai para aprender a andar com passos mais longos na calçada.',
    status: 'Nome Negativado no Serasa Quântico',
    badge: 'Passo Largo Falido'
  },
  {
    id: 'loser-3',
    rank: 3,
    name: 'Matheus "Alavancagem 500x" Prado',
    alias: 'O Lobo de Osasco',
    lossAmount: 245000,
    downfallReason: 'Vendeu o Voyage 2011 do pai para operar futuros de memecoin de cachorro raivoso às 3:45 da manhã.',
    status: 'Fugindo do Agiota de Bicicleta Caloi',
    badge: 'Trader da Madrugada'
  },
  {
    id: 'loser-4',
    rank: 4,
    name: 'Dr. Breno "Jejum Hídrico de 40 Dias"',
    alias: 'Biohacker Ancestral',
    lossAmount: 189000,
    downfallReason: 'Abriu uma startup de delivery de água da chuva purificada por pedras de ametista colhidas por monges de Guarulhos.',
    status: 'Internado com Desidratação Espartana',
    badge: 'Gota Hídrica Zero'
  },
  {
    id: 'loser-5',
    rank: 5,
    name: 'Caio "Dropshipping Sem Estoque e Sem Noção"',
    alias: 'Mestre da Conversão Invisível',
    lossAmount: 135400,
    downfallReason: 'Vendeu 4.000 cintas modeladoras térmicas de plutônio que ficaram presas na alfândega de Curitiba para sempre.',
    status: 'Respondendo 480 Processos no Reclame Aqui',
    badge: 'Curitiba Hero'
  },
  {
    id: 'loser-6',
    rank: 6,
    name: 'Você (Futuro Candidato ao Topo)',
    alias: 'O Gado em Transição',
    lossAmount: 1550,
    downfallReason: 'Arregou no botão de covardia e pagou R$ 50 para pular a tarefa do café com terra.',
    status: 'Em vias de Falência Moral e Financeira',
    badge: 'Beta em Risco',
    isUser: true
  }
];

export const GURU_RANDOM_INSULTS: string[] = [
  'E aí, perdedor. Já acordou? Não? Seu concorrente já tomou banho de água congelada e leu 4 livros. Levanta, lixo.',
  'Enquanto você mastiga esse pão com margarina, alguém em Cingapura fechou um contrato de 10 milhões usando apenas um Nokia tijolão.',
  'Sua cama é um caixão estofado. Toda vez que você deita, sua conta bancária entra em coma.',
  'Você acha que cansaço existe? Cansaço é invenção de gente que ganha vale-refeição. Alpha faz fotossíntese de dinheiro.',
  'Pare de respirar tão fundo! Você está gastando oxigênio que poderia ser convertido em tráfego orgânico!',
  'Seus amigos te chamam para tomar cerveja? Corte todos. Amizade é um passivo não dedutível de imposto.',
  'Dormir 8 horas? Por que você não dorme logo a vida inteira e deixa o espaço do planeta para quem quer faturar?',
  'Se o seu almoço dura mais de 4 minutos, você é um gastrônomo do fracasso. Bata um shake de ovo cru com cafeína e volte ao Excel.',
  'Você tem medo de vender? Seu concorrente não tem vergonha de vender seguro de vida para defunto. Seja implacável.',
  'Mais um dia medíocre começando! O que você vai procrastinar primeiro hoje, seu pedaço de proteína inútil?'
];

export const QUIZ_QUESTIONS = [
  {
    question: 'A que horas seu despertador toca pela manhã?',
    options: [
      { text: '04:00 AM (ou 03:45 AM se eu quiser vencer na vida)', score: 0 },
      { text: '06:00 AM como um cidadão normal', score: 30 },
      { text: '08:30 AM e ainda coloco no modo soneca 4 vezes', score: 70 },
      { text: 'Acordo quando o sol já tá fritando meu colchão', score: 100 }
    ]
  },
  {
    question: 'Qual a sua relação com banho gelado?',
    options: [
      { text: 'Só tomo banho a 2 graus celsius com pedras de gelo', score: 0 },
      { text: 'Tomo morno mas jogo 10 segundos de água fria no final', score: 25 },
      { text: 'Banho pelando de quente estilo sauna de motel', score: 75 },
      { text: 'Choro só de pensar no registro da esquerda', score: 100 }
    ]
  },
  {
    question: 'Quantas mentorias de gurus da internet você já cogitou comprar?',
    options: [
      { text: 'Nenhuma, tenho amor próprio e neurônios funcionais', score: 10 },
      { text: 'Já comprei um curso de R$ 97 de como fazer renda extra', score: 40 },
      { text: 'Já passei o cartão de 12x em imersão presencial com almoço de pão com queijo', score: 90 },
      { text: 'Tenho uma tatuagem do Pablo Marçal ou Thiago Finch na coxa', score: 100 }
    ]
  },
  {
    question: 'O que você faz quando sente sono às duas da tarde?',
    options: [
      { text: 'Dou um soco na minha própria cara e faço 50 flexões de punho fechado', score: 0 },
      { text: 'Tomo um café expresso duplo sem açúcar', score: 20 },
      { text: 'Deito a cabeça no teclado do computador e rezo para não ser demitido', score: 60 },
      { text: 'Tiro uma soneca de 2 horas e acordo sem saber que ano estamos', score: 100 }
    ]
  },
  {
    question: 'Qual a sua definição de fracasso pessoal?',
    options: [
      { text: 'Chegar aos 25 anos sem ter uma holding em Delaware', score: 0 },
      { text: 'Não conseguir pagar a fatura do cartão Nubank', score: 40 },
      { text: 'Trabalhar 44 horas semanais ouvindo piada de chefe', score: 70 },
      { text: 'Estar fazendo este teste em vez de estar produzindo', score: 100 }
    ]
  }
];

export { ALL_ABSURD_SUCCESS_CASES, getDailySuccessCases } from './absurdSuccessCases';
import { ALL_ABSURD_SUCCESS_CASES } from './absurdSuccessCases';
export const ABSURD_SUCCESS_CASES = ALL_ABSURD_SUCCESS_CASES;


