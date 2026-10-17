/** Section 06 copy (Figma: Section 06 — Perguntas frequentes · Desktop 1440). */
export const FAQ_HEADER = {
  eyebrow: 'Dúvidas frequentes',
  title: 'Perguntas frequentes',
  description: 'Tudo o que você precisa saber para começar a utilizar o FinCore.',
} as const

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'o-que-e',
    question: 'O que é o FinCore?',
    answer:
      'O FinCore é uma plataforma de gestão financeira pessoal que ajuda você a registrar receitas e despesas, acompanhar suas movimentações e visualizar informações para tomar decisões mais conscientes.',
  },
  {
    id: 'conta-bancaria',
    question: 'Preciso conectar minha conta bancária?',
    answer:
      'Não. No FinCore, você registra suas movimentações manualmente, sem precisar conectar contas bancárias.',
  },
  {
    id: 'cartoes',
    question: 'Posso cadastrar meus cartões?',
    answer:
      'Sim. Você pode cadastrar cartões e associá-los às movimentações, mantendo seus registros financeiros organizados.',
  },
  {
    id: 'movimentacoes-futuras',
    question: 'Consigo acompanhar receitas e despesas futuras?',
    answer:
      'Sim. Você pode registrar movimentações previstas e efetivadas, incluindo datas futuras, e acompanhar cada uma conforme seu status.',
  },
  {
    id: 'categorias',
    question: 'Posso organizar meus gastos por categorias?',
    answer:
      'Sim. O FinCore oferece categorias predefinidas e permite criar categorias personalizadas para organizar suas movimentações.',
  },
  {
    id: 'como-comecar',
    question: 'Como começo a utilizar o FinCore?',
    answer:
      'Basta criar sua conta, acessar a aplicação e começar a registrar suas receitas e despesas. Conforme você adiciona informações, pode acompanhá-las pelo dashboard.',
  },
]

/** Items open on first render (Figma: "FAQ Item 01" uses State=Expanded). */
export const FAQ_DEFAULT_OPEN = [FAQ_ITEMS[0].id]
