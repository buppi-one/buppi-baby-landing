import type { CampaignMessages } from "../../campaignTypes";

export const campaignsPtBR: CampaignMessages = {
  more: {
    eyebrow: "E tem mais",
    title: "O Buppi vai da gestação ao primeiro ano.",
    lead: "Tudo no mesmo app, grátis pra sempre e sem anúncios.",
    cta: "Ver tudo que o Buppi faz",
    items: {
      pregnancy: { title: "Gestação semana a semana", sub: "Tamanho do bebê, pré-natal e contrações." },
      logging: { title: "Registro em um toque", sub: "Mamadas, fraldas e sono, com uma mão só." },
      sleep: { title: "Previsão de soneca", sub: "Pela rotina do seu bebê, com o motivo à vista." },
      food: { title: "Introdução alimentar", sub: "O controle de alergênicos se monta sozinho." },
      health: { title: "Saúde e consultas", sub: "Vacinas, crescimento e a pauta do pediatra." },
      family: { title: "Família junto", sub: "Cada pessoa com o papel certo, sem limite de pessoas." },
      book: { title: "Livro do bebê", sub: "Registros e fotos viram o livro, por idade." },
      guides: { title: "Marcos e guias", sub: "O que esperar em cada fase." },
    },
  },
  privacy: {
    eyebrow: "Privacidade",
    title: "As fotos do seu bebê ficam com a sua família.",
    items: [
      {
        title: "Você escolhe quem vê",
        sub: "Cada pessoa entra com um papel: cuidar, acompanhar ou ver só o livro. Dá para mudar ou tirar o acesso a qualquer hora.",
      },
      {
        title: "Um link só do livro",
        sub: "Quem recebe o link vê o livro e comenta. A rotina, a saúde e o resto do app não aparecem.",
      },
      {
        title: "Sem anúncios, sem venda de dados",
        sub: "As fotos ficam em armazenamento privado. O Buppi não mostra anúncios e não vende dados.",
      },
    ],
  },
  pages: {
    pregnancy: {
      metaTitle: "Buppi Baby: a gestação semana a semana, com pré-natal e contrações",
      metaDescription:
        "O tamanho do bebê em cada semana com a fonte à vista, o pré-natal organizado pela sua semana e o contador de contrações. Grátis e sem anúncios.",
      eyebrow: "Para a gravidez",
      titleBefore: "A gravidez traz mil dúvidas. O Buppi organiza ",
      titleHighlight: "semana a semana",
      titleAfter: ".",
      lead: "O tamanho do bebê, o exame da vez e o intervalo das contrações: cada coisa na semana certa, com a fonte à vista. Você decide o que a família acompanha.",
      imageAlt: "A gestante deitada para o ultrassom, sorrindo para o monitor, de mão dada com o companheiro",
      toasts: [
        { title: "Semana 12: do tamanho de um limão", sub: "5,4 cm da cabeça ao bumbum" },
        { title: "Ultrassom morfológico", sub: "é agora: semanas 20 a 24" },
      ],
      closing: {
        eyebrow: "Da primeira semana ao parto",
        title: "Comece hoje, em qualquer semana.",
        lead: "O Buppi monta o pré-natal pela sua semana. Quando o bebê nascer, ele continua com vocês.",
      },
    },
    sleep: {
      metaTitle: "Buppi Baby: previsão de soneca e rotina de sono do bebê",
      metaDescription:
        "O Buppi aprende a rotina do seu bebê pelos registros, prevê a próxima soneca e mostra cada noite da semana. Grátis e sem anúncios.",
      eyebrow: "Para o sono do bebê",
      titleBefore: "Ninguém dorme direito com um bebê. O Buppi mostra ",
      titleHighlight: "a hora da soneca",
      titleAfter: ".",
      lead: "Ele aprende a rotina do seu bebê pelos registros, prevê a próxima soneca e mostra cada noite da semana. Você para de adivinhar, e quem cuida junto vê a mesma coisa.",
      imageAlt: "Bebê dormindo no peito do pai, no sofá",
      toasts: [
        { title: "Soneca ~11:40", sub: "em 25min · pela rotina dela" },
        { title: "Domingo: 2 despertares", sub: "na quarta foram 5" },
      ],
      closing: {
        eyebrow: "Uma noite de cada vez",
        title: "Sono de bebê muda toda hora. Dá para acompanhar.",
        lead: "Comece a registrar hoje. O Buppi prevê pela rotina do seu bebê, e não por uma tabela.",
      },
    },
    memories: {
      metaTitle: "Buppi Baby: as memórias do bebê num livro, só para a família",
      metaDescription:
        "Fotos e registros viram o livro do bebê, organizado por idade. Você escolhe quem vê, e a família de longe acompanha por um link só do livro.",
      eyebrow: "Memórias e livro do bebê",
      titleBefore: "O primeiro ano passa voando. O Buppi guarda cada momento, ",
      titleHighlight: "só para a família",
      titleAfter: ".",
      lead: "Seus registros e fotos viram o livro do bebê, organizado por idade. Você escolhe quem vê cada coisa, e os avós acompanham e comentam de longe, sem rede social.",
      imageAlt: "Mãe, pai e a bebê no sofá, com fotos do primeiro ano penduradas na parede",
      toasts: [
        { title: "Novo capítulo no livro", sub: "A primeira risada" },
        { title: "Vó Diva comentou", sub: "ela vê só o livro" },
      ],
      closing: {
        eyebrow: "Do primeiro dia ao primeiro passo",
        title: "Essa história só acontece uma vez.",
        lead: "Comece hoje. O livro vai se montando com o que você registra.",
      },
    },
  },
};
