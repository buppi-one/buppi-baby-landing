import type { Messages } from "../types";

export const ptBR: Messages = {
  meta: {
    title: "Buppi Baby - Cuidado Completo para o seu Bebê",
    description:
      "Registre sono, amamentação, fraldas e marcos do desenvolvimento do seu bebê. Simples, bonito e gratuito.",
    ogTitle: "Buppi Baby",
    ogDescription:
      "O melhor app para acompanhar a rotina do seu bebê. Amamentação, sono, fraldas e marcos em um só lugar.",
  },
  nav: {
    features: "Funcionalidades",
    sharing: "Família",
    stats: "Estatísticas",
    blog: "Blog",
    download: "Baixar grátis",
    signIn: "Entrar",
    themeAria: "Alternar tema",
    languageAria: "Alternar idioma",
    theme: { light: "Claro", dark: "Escuro", system: "Sistema" },
  },
  hero: {
    badge: "NOVO",
    badgeText: "Live Activity na tela de bloqueio",
    titlePrefix: "O companheiro de rotina mais ",
    titleHighlight: "inteligente",
    titleSuffix: " do bebê.",
    description:
      "Registre amamentação, sono e fraldas em 1 toque. O Buppi aprende o ritmo do seu bebê e prevê a próxima soneca.",
    badgesNote: "Grátis para começar • iOS e Android",
    imageAlt: "Bebê sorrindo",
    bullets: [
      "Grátis para começar",
      "iOS e Android",
      "Sem anúncios",
    ],
    metrics: [
      { value: "< 2s", label: "pra registrar um evento" },
      { value: "12+", label: "tipos de registro" },
      { value: "6", label: "pessoas no plano família" },
      { value: "iOS · Android", label: "iPhone, iPad e Android" },
    ],
    card: { tag: "TARDE", title: "Amamentação", subtitle: "Esquerdo • 44min" },
  },
  features: {
    tag: "FUNCIONALIDADES",
    title: "Construído para os primeiros mil dias.",
    description:
      "Desde o primeiro dia, acompanhe cada detalhe da jornada do seu pequeno com cards intuitivos e uma linha do tempo organizada.",
    blocks: [
      { tag: "Sono", title: "Janelas previstas", desc: "O Buppi observa o histórico e diz quando o bebê provavelmente vai cansar." },
      { tag: "Amamentação", title: "Cronômetro com lados", desc: "Sabe qual seio começou da última vez. Live Activity sempre à mão." },
      { tag: "Fraldas", title: "Registro em 1 toque", desc: "Xixi, cocô, mista. 2 segundos do desbloqueio até feito." },
      { tag: "Marcos", title: "Sem perder nenhum", desc: "Cada conquista entra com data, foto e idade exata do bebê." },
    ],
    smallCards: [
      { title: "Mamadeira", desc: "Volume e fórmula" },
      { title: "Crescimento", desc: "Peso, altura, percentil" },
      { title: "Banho", desc: "Higiene e temperatura" },
      { title: "Passeios", desc: "Tempo ao ar livre" },
    ],
    timeline: [
      {
        title: "Amamentação",
        subtitle: "Direito • 26min",
        time: "17:50 - 18:16",
        tag: "agora",
      },
      {
        title: "Amamentação",
        subtitle: "Esquerdo • 44min",
        time: "16:13 - 16:57",
        tag: "1h atrás",
      },
      {
        title: "Troca de Fralda",
        subtitle: "Xixi",
        time: "16:10",
        tag: "2h atrás",
      },
      {
        title: "Sono",
        subtitle: "Duração: 3h 26min",
        time: "12:35 - 16:01",
        tag: "2h atrás",
      },
    ],
    cards: [
      { title: "Banho", subtitle: "Higiene diária" },
      { title: "Vacinas", subtitle: "Calendário OK" },
      { title: "Remédios", subtitle: "Alertas e doses" },
      { title: "Passeios", subtitle: "Ar livre" },
    ],
  },
  sharing: {
    tag: "EM TEMPO REAL",
    title: "A família toda na mesma página.",
    description:
      "Quando você troca uma fralda, todo mundo vê. Quando o pai dá mamadeira, todo mundo reage. Sem grupos de WhatsApp, sem planilhas.",
    bullets: [
      "Múltiplos perfis de bebês",
      "Sincronização instantânea na nuvem",
      "Reações nos eventos da família",
      "Permissões e privacidade por pessoa",
    ],
    feedTitle: "Atividade · Lina",
    online: "{n} online",
    reactQuick: "Reagir rápido",
    feedItems: [
      { who: "Marina", role: "mãe", action: "iniciou soneca", detail: "14:18 · janela esperada" },
      { who: "Bruno", role: "pai", action: "amamentou Lina", detail: "D 7min · E 8min · 13:16" },
      { who: "Babá Carol", role: "cuidadora", action: "trocou fralda", detail: "xixi · 13:00" },
      { who: "Vó Alice", role: "avó", action: "deu banho", detail: "11:30 · 36°C" },
    ],
    card: {
      title: "Meus Bebês",
      activeName: "Maria Clara",
      activeDob: "17 de dezembro de 2024",
      sharedName: "Caio",
      sharedTag: "Compartilhado",
      inviteTitle: "Usar código de convite",
      inviteSubtitle: "Recebeu um código? Entre aqui",
    },
  },
  stats: {
    tag: "ESTATÍSTICAS",
    title: "Padrões claros, decisões mais leves.",
    description:
      "Entenda os padrões de sono, alimentação e desenvolvimento do seu bebê através de estatísticas detalhadas e fáceis de ler.",
    tabs: ["7 dias", "30 dias", "3 meses"],
    sleep: {
      title: "Resumo de Sono",
      mapTitle: "SONO · MAPA DE 7 DIAS",
      mapTotal: "Total 13h54m",
      avgValue: "2h 44m",
      avgLabel: "Média por dia",
      totalValue: "10",
      totalLabel: "Total sonos",
      compareLabel: "Noturno vs Diurno",
      night: "Noturno: 44%",
      day: "Diurno: 56%",
      legendSleeping: "Dormindo",
      legendNap: "Soneca",
    },
    diaper: {
      title: "Trocas de Fralda",
      todayLabel: "TROCAS · HOJE",
      legend: [
        { label: "Xixi", pct: "4" },
        { label: "Cocô", pct: "1" },
        { label: "Mista", pct: "4" },
      ],
    },
    nursing: {
      title: "AMAMENTAÇÕES · MÉDIA",
      value: "6,2",
      desc: "vezes por dia · 14 min cada",
    },
    milestones: {
      title: "MARCOS · ÚLTIMOS 90 DIAS",
      items: ["Sorriu", "Cabeça", "Sentou", "Engatinhou", "Andou"],
    },
  },
  faq: {
    tag: "FAQ",
    title: "Perguntas frequentes",
    items: [
      { q: "É realmente grátis?", a: "Sim. O plano gratuito tem registro completo (sono, mama, fralda, marcos), linha do tempo e estatísticas básicas — tudo armazenado localmente no aparelho. Não tem cuidadores adicionais nem backup na nuvem." },
      { q: "Como funcionam os planos Duo e Circle?", a: "O Duo libera você + 1 pessoa (parceiro, parceira) e o Circle libera você + 5 pessoas (família estendida, avós, babá, pediatra). Os dois planos pagos sincronizam tudo na nuvem com backup automático." },
      { q: "O que tem de iPhone-exclusivo?", a: "No iPhone você tem Live Activity na Dynamic Island (cronômetros e alertas mostrados sempre na tela), widgets na tela inicial e na tela de bloqueio. Ainda não temos no Android — está no roadmap." },
      { q: "Funciona offline?", a: "Sim. No plano grátis, todo o registro acontece local, sem internet. Nos planos pagos você ganha sincronização e backup na nuvem além disso." },
      { q: "Meus dados estão seguros?", a: "Sim. Criptografia em trânsito e em repouso, servidores no Brasil, conformidade com LGPD." },
      { q: "Posso cancelar quando quiser?", a: "Pode. Sem multa, sem fidelidade. Você mantém acesso até o fim do período pago e os dados continuam disponíveis no plano grátis." },
    ],
  },
  cta: {
    tag: "COMECE AGORA",
    title: "O Buppi te espera na próxima soneca.",
    description:
      "Grátis para começar. Funciona em iOS e Android. Sem anúncios, sem letras miúdas.",
    cardTag: "HOJE · LINA, 4 MESES",
    cardTitle: "3 sonecas, 6 mamas, 9 trocas.",
    cardSub: "Um dia bonito.",
  },
  footer: {
    description:
      "O aplicativo mais completo e intuitivo para o acompanhamento do desenvolvimento do seu bebê. Feito por pais para pais.",
    quickLinks: "Links Rápidos",
    home: "Início",
    privacy: "Privacidade",
    terms: "Termos",
    support: "Suporte",
    deleteAccount: "Excluir conta",
    copyright: "© 2026 Buppi Baby. Todos os direitos reservados.",
  },
  privacy: {
    badge: "🔒 PRIVACIDADE",
    title: "Política de Privacidade",
    updated: "Última atualização: 12 de Fevereiro de 2026",
    intro:
      "A sua privacidade é importante para nós. Esta Política de Privacidade explica como o Buppi Baby coleta, usa e protege suas informações pessoais.",
    sections: [
      {
        heading: "1. Informações que Coletamos",
        intro: "Coletamos as seguintes informações quando você usa o Buppi Baby:",
        items: [
          {
            bold: "Informações da conta:",
            text: "Email e nome (quando você cria uma conta)",
          },
          { bold: "Dados do bebê:", text: "Nome, data de nascimento, gênero" },
          {
            bold: "Registros de atividades:",
            text: "Amamentação, sono, fraldas, alimentação e outros eventos que você registra",
          },
          { bold: "Dados de uso:", text: "Como você interage com o aplicativo" },
        ],
      },
      {
        heading: "2. Como Usamos suas Informações",
        intro: "Utilizamos suas informações para:",
        items: [
          { text: "Fornecer e manter o serviço do aplicativo" },
          { text: "Sincronizar seus dados entre dispositivos" },
          {
            text: "Permitir o compartilhamento com outros cuidadores (quando autorizado por você)",
          },
          { text: "Melhorar nosso aplicativo e desenvolver novos recursos" },
          { text: "Enviar notificações relacionadas ao aplicativo (lembretes, etc.)" },
        ],
      },
      {
        heading: "3. Compartilhamento de Dados",
        intro:
          "Não vendemos suas informações pessoais. Podemos compartilhar dados apenas:",
        items: [
          { text: "Com outros cuidadores que você convidar para acompanhar seu bebê" },
          {
            text: "Com provedores de serviço que nos ajudam a operar o aplicativo (Supabase, Google Cloud)",
          },
          { text: "Quando exigido por lei" },
        ],
      },
      {
        heading: "4. Armazenamento e Segurança",
        intro: "Seus dados são armazenados de forma segura utilizando:",
        items: [
          {
            text: "Supabase (PostgreSQL) com criptografia em trânsito e em repouso",
          },
          { text: "Autenticação segura via Google ou Apple" },
          {
            text: "Acesso restrito apenas a usuários autorizados via Row Level Security",
          },
        ],
      },
      {
        heading: "5. Seus Direitos",
        intro: "Você tem o direito de:",
        items: [
          { bold: "Acessar", text: "seus dados pessoais" },
          { bold: "Corrigir", text: "informações incorretas" },
          { bold: "Excluir", text: "sua conta e todos os dados associados" },
          { bold: "Exportar", text: "seus dados em formato legível" },
          {
            bold: "Revogar",
            text: "o acesso de outros cuidadores a qualquer momento",
          },
        ],
      },
      {
        heading: "6. Dados de Crianças",
        intro:
          "O Buppi Baby é destinado a pais e cuidadores adultos. Não coletamos intencionalmente informações de crianças menores de 13 anos como usuários do aplicativo. Os dados dos bebês são fornecidos e controlados pelos pais/responsáveis.",
      },
      {
        heading: "7. Cookies e Tecnologias Similares",
        intro: "Utilizamos tecnologias de armazenamento local para:",
        items: [
          { text: "Manter você conectado" },
          { text: "Salvar suas preferências" },
          { text: "Permitir funcionamento offline" },
        ],
      },
      {
        heading: "8. Alterações nesta Política",
        intro:
          "Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através do aplicativo ou por email.",
      },
    ],
    contact: {
      heading: "9. Contato",
      text: "Para dúvidas sobre privacidade ou para exercer seus direitos, entre em contato pelo email ",
      email: "privacidade@buppi.baby",
    },
  },
  support: {
    badge: "💬 SUPORTE",
    title: "Central de Suporte",
    intro: {
      before:
        "Precisa de ajuda? Estamos aqui. Para dúvidas, sugestões ou para reportar problemas, fale com a gente pelo email ",
      emailLabel: "suporte@buppi.baby",
      after: ".",
    },
    faqHeading: "Perguntas Frequentes",
    faq: [
      {
        q: "Como compartilho o bebê com meu parceiro(a)?",
        a: "Vá em Ajustes → Compartilhar Bebê e envie o código de 6 dígitos.",
      },
      {
        q: "Meus dados estão seguros?",
        a: "Sim! Usamos Supabase com criptografia em trânsito e em repouso, e seus dados são privados via Row Level Security.",
      },
      {
        q: "Posso usar em mais de um dispositivo?",
        a: "Sim, faça login com a mesma conta e tudo sincroniza automaticamente.",
      },
      {
        q: "O app funciona offline?",
        a: "Sim! Registros são salvos localmente e sincronizam quando houver internet.",
      },
    ],
  },
  deleteAccount: {
    badge: "🗑️ EXCLUIR CONTA",
    title: "Excluir sua conta no Buppi Baby",
    updated: "Última atualização: 19 de abril de 2026",
    intro:
      "Você pode solicitar a exclusão da sua conta do Buppi Baby a qualquer momento. Esta página explica como solicitar a exclusão e quais dados são removidos ou mantidos.",
    sections: [
      {
        heading: "1. Como excluir pelo aplicativo (recomendado)",
        intro:
          "A forma mais rápida é diretamente no app. A exclusão é processada imediatamente:",
        items: [
          { text: "Abra o aplicativo Buppi Baby" },
          { text: "Vá em Configurações" },
          { text: 'Role até o final e toque em "Excluir conta"' },
          { text: "Confirme a exclusão no diálogo" },
        ],
      },
      {
        heading: "2. Como excluir por email (alternativa)",
        intro:
          "Se você não tem mais acesso ao aplicativo, envie um email para o endereço abaixo com o assunto \"Excluir minha conta\". Inclua o email cadastrado para que possamos identificar sua conta. Processamos solicitações por email em até 7 dias úteis.",
      },
      {
        heading: "3. Dados que serão excluídos",
        intro:
          "Ao excluir sua conta, removemos permanentemente os seguintes dados:",
        items: [
          { bold: "Conta:", text: "email, nome, foto de perfil" },
          {
            bold: "Perfis de bebês:",
            text: "nome, data de nascimento, gênero e foto",
          },
          {
            bold: "Eventos registrados:",
            text: "amamentação, sono, fraldas, alimentação, banho, medicamentos e todos os outros tipos",
          },
          {
            bold: "Cronogramas e preferências:",
            text: "lembretes, agendamentos e configurações pessoais",
          },
          {
            bold: "Compartilhamentos:",
            text: "convites enviados ou recebidos são revogados; outros cuidadores perdem acesso aos seus bebês",
          },
          {
            bold: "Tokens de notificação:",
            text: "dispositivos cadastrados para push são removidos",
          },
        ],
      },
      {
        heading: "4. Dados que mantemos por um período",
        intro:
          "Por exigência legal e por motivos de segurança, alguns registros mínimos são retidos:",
        items: [
          {
            bold: "Backups do banco de dados:",
            text: "podem conter cópias dos seus dados por até 30 dias após a exclusão. Após esse período, são apagados definitivamente.",
          },
          {
            bold: "Logs de auditoria:",
            text: "registros mínimos (ex: data da exclusão, IP, evento de segurança) são mantidos por até 90 dias para prevenção de fraude e abuso. Não contêm dados pessoais do bebê.",
          },
          {
            bold: "Registros de pagamento:",
            text: "se você teve assinatura paga, dados fiscais necessários para cumprimento de obrigações tributárias são retidos pelo prazo exigido pela legislação aplicável (até 5 anos).",
          },
        ],
      },
      {
        heading: "5. Prazo de processamento",
        intro:
          "Exclusões pelo app são processadas imediatamente. Solicitações por email são processadas em até 7 dias úteis. Você receberá confirmação por email após a conclusão.",
      },
      {
        heading: "6. Esta ação não pode ser desfeita",
        intro:
          "Antes de excluir, considere exportar seus dados. Após a exclusão, não é possível recuperar nem o histórico, nem o acesso compartilhado pelos cuidadores convidados.",
      },
    ],
    contact: {
      heading: "7. Contato",
      text: "Para solicitar a exclusão por email ou tirar dúvidas, escreva para ",
      email: "privacidade@buppi.baby",
    },
  },
  terms: {
    badge: "📜 EULA",
    title: "Contrato de Licença de Usuário Final",
    updated: "Última atualização: 22 de abril de 2026",
    intro:
      "Este Contrato de Licença de Usuário Final (\"Contrato\") é um acordo legal entre você (\"Usuário\") e Buppi (\"Desenvolvedor\") que rege o uso do aplicativo móvel Buppi (\"App\").",
    sections: [
      {
        heading: "1. Licença",
        intro:
          "O App é licenciado, não vendido, a você. O Desenvolvedor concede a você uma licença limitada, não exclusiva, intransferível e revogável para usar o App para fins pessoais e não comerciais, sujeita a este Contrato.",
      },
      {
        heading: "2. Assinaturas",
        intro: "O App pode oferecer assinaturas com renovação automática.",
        items: [
          { text: "O pagamento será cobrado na sua conta do Apple ID na confirmação da compra." },
          { text: "As assinaturas são renovadas automaticamente a menos que sejam canceladas com pelo menos 24 horas de antecedência ao final do período vigente." },
          { text: "Você pode gerenciar e cancelar assinaturas nas configurações da sua conta." },
        ],
      },
      {
        heading: "3. Responsabilidade",
        intro:
          "O App e seu conteúdo são fornecidos pelo Desenvolvedor. A Apple Inc. não é responsável pelo App, seu conteúdo, nem por quaisquer serviços de manutenção ou suporte.",
      },
      {
        heading: "4. Manutenção e Suporte",
        intro:
          "O Desenvolvedor é o único responsável por fornecer manutenção e suporte para o App. A Apple não tem qualquer obrigação de fornecer serviços de manutenção ou suporte.",
      },
      {
        heading: "5. Garantia",
        intro:
          "O App é fornecido \"NO ESTADO EM QUE SE ENCONTRA\" e \"CONFORME DISPONÍVEL\", sem garantias de qualquer tipo. Na máxima extensão permitida por lei, o Desenvolvedor renuncia a todas as garantias, expressas ou implícitas.",
      },
      {
        heading: "6. Limitação de Responsabilidade",
        intro:
          "Na medida permitida por lei, o Desenvolvedor não será responsável por quaisquer danos indiretos, incidentais ou consequentes decorrentes do uso do App.",
      },
      {
        heading: "7. Conformidade Legal",
        intro:
          "Você concorda em usar o App em conformidade com todas as leis e regulamentações aplicáveis.",
      },
      {
        heading: "8. Rescisão",
        intro:
          "Esta licença é válida até ser rescindida. Seus direitos serão rescindidos automaticamente caso você deixe de cumprir qualquer disposição deste Contrato.",
      },
      {
        heading: "9. Beneficiário Terceiro",
        intro:
          "A Apple Inc. e suas subsidiárias são beneficiárias terceiras deste Contrato e, mediante sua aceitação deste Contrato, terão o direito de fazer cumprir este Contrato contra você.",
      },
      {
        heading: "10. Lei Aplicável",
        intro: "Este Contrato é regido pelas leis do Brasil.",
      },
    ],
    contact: {
      heading: "11. Contato",
      text: "Em caso de dúvidas, entre em contato: ",
      email: "suporte@buppi.baby",
    },
  },
  blog: {
    title: "Blog",
    description: "Conteúdo prático sobre gestação, sono, alimentação e desenvolvimento do bebê.",
    readingTime: (minutes) => `${minutes} min de leitura`,
    publishedOn: "Publicado em",
    updatedOn: "Atualizado em",
    backToBlog: "← Voltar para o blog",
    categoryLabel: "Categoria",
    relatedPosts: "Artigos relacionados",
    empty: "Nenhum artigo publicado ainda.",
    faqHeading: "Perguntas frequentes",
    referencesHeading: "Referências",
  },
};
