export interface Pillar {
  step: string
  title: string
  description: string
}

/** FinCore's three pillars (Figma: Section 02 — Como funciona). */
export const PILLARS: Pillar[] = [
  { step: '01', title: 'Registrar', description: 'Registre suas receitas e despesas.' },
  { step: '02', title: 'Visualizar', description: 'Entenda para onde vai seu dinheiro.' },
  { step: '03', title: 'Decidir', description: 'Tome decisões financeiras mais conscientes.' },
]
