/** Section 05 copy (Figma: Section 05 — Como funciona · Desktop 1440). */
export const GETTING_STARTED_HEADER = {
  eyebrow: 'Como funciona',
  title: 'Começar a organizar sua vida financeira é simples.',
  description:
    'Em poucos passos, você registra suas movimentações, acompanha seus dados e passa a tomar decisões com mais clareza.',
} as const

export interface GettingStartedStep {
  number: string
  title: string
  description: string
  /** Peak opacity of the violet light in the card's top-left corner; it grows from step 1 to 3. */
  lightOpacity: number
}

export const GETTING_STARTED_STEPS: GettingStartedStep[] = [
  {
    number: '1',
    title: 'Crie sua conta',
    description: 'Cadastre-se para acessar sua área financeira e começar a organizar sua rotina.',
    lightOpacity: 0.14,
  },
  {
    number: '2',
    title: 'Registre suas movimentações',
    description: 'Adicione receitas, despesas e cartões para manter suas informações organizadas.',
    lightOpacity: 0.18,
  },
  {
    number: '3',
    title: 'Acompanhe e decida',
    description: 'Visualize seus dados, entenda seus gastos e tome decisões com mais confiança.',
    lightOpacity: 0.24,
  },
]
