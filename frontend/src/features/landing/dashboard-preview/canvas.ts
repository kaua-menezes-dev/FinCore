/** Native canvas size of the Dashboard Home design (Figma 41:118). */
export const DASHBOARD_SIZE = { width: 1440, height: 1306 } as const

/** Dashboard components that the landing page can reveal one by one. */
export type DashboardTarget = 'transaction' | 'categories' | 'result'
