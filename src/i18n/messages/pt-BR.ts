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
    sharing: "Compartilhamento",
    stats: "Estatísticas",
    download: "Baixar app",
    themeAria: "Alternar tema",
    languageAria: "Alternar idioma",
    theme: { light: "Claro", dark: "Escuro", system: "Sistema" },
  },
  hero: {
    badge: "✨ CUIDADO 360 PARA SEU BEBÊ",
    titlePrefix: "O melhor app para acompanhar a ",
    titleHighlight: "rotina",
    titleSuffix: " do seu bebê!",
    description:
      "Simplifique a maternidade e paternidade. Registre amamentação, sono, fraldas e muito mais em um só lugar.",
    badgesNote: "Grátis para começar • iOS e Android",
    imageAlt: "Bebê sorrindo",
    card: { tag: "TARDE", title: "Amamentação", subtitle: "Esquerdo • 44min" },
  },
  features: {
    title: "Tudo o que você precisa registrar",
    description:
      "Desde o primeiro dia, acompanhe cada detalhe da jornada do seu pequeno com cards intuitivos e uma linha do tempo organizada.",
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
    title: "Toda a família conectada",
    description:
      "Compartilhe os registros com o parceiro(a), avós ou cuidadores em tempo real. Cada pessoa pode ter seu próprio perfil e acompanhar a evolução do bebê.",
    bullets: [
      "Múltiplos perfis de bebês",
      "Sincronização instantânea na nuvem",
      "Convites rápidos via código ou link",
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
    title: "Gráficos que contam histórias",
    description:
      "Entenda os padrões de sono, alimentação e desenvolvimento do seu bebê através de estatísticas detalhadas e fáceis de ler.",
    sleep: {
      title: "Resumo de Sono",
      avgValue: "2h 44m",
      avgLabel: "Média por dia",
      totalValue: "10",
      totalLabel: "Total sonos",
      compareLabel: "Noturno vs Diurno",
      night: "Noturno: 44%",
      day: "Diurno: 56%",
    },
    diaper: {
      title: "Trocas de Fralda",
      legend: [
        { label: "4 Xixi", pct: "44%" },
        { label: "1 Cocô", pct: "12%" },
        { label: "4 Ambos", pct: "44%" },
      ],
    },
  },
  cta: {
    title: "Pronto para começar?",
    description:
      "Junte-se a milhares de famílias que transformaram a rotina de cuidados em um momento de tranquilidade.",
  },
  footer: {
    description:
      "O aplicativo mais completo e intuitivo para o acompanhamento do desenvolvimento do seu bebê. Feito por pais para pais.",
    quickLinks: "Links Rápidos",
    home: "Início",
    privacy: "Privacidade",
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
};
