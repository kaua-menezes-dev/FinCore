
# FinCore Frontend — Instructions

These instructions apply to frontend/ and extend
the repository-level CLAUDE.md.

## Stack
- React
- TypeScript
- Vite
- Tailwind CSS

## Frontend Architecture
- Prefer reusable, accessible components.
- Organize code by feature when appropriate.
- Separate UI components from data access.
- Use services for mock and API data.
- Use TypeScript interfaces and types.
- Avoid unnecessary dependencies.
- Handle loading, error and empty states.

## Design Workflow
1. Analyze visual references.
2. Propose a visual direction.
3. Define initial design tokens and components.
4. Create and validate wireframes.
5. Develop high-fidelity designs in Figma
   when supported by the available tools.
6. Obtain developer approval.
7. Implement approved screens in React.
8. Review quality using Impeccable.

Do not skip design approval.

## Design System
- Keep landing page and dashboard consistent.
- Define colors, typography, spacing and radii.
- Use reusable design tokens.
- Maintain accessibility and responsiveness.
- Avoid copying reference designs directly.
- Document approved decisions in docs/.

## API Integration
- Use mock data initially.
- Keep mock implementations isolated in services.
- Do not invent API endpoints.
- Do not implement real authentication until
  the backend contract is approved.
- VITE_* variables are public client configuration.
- Never expose secrets in frontend variables.

## Git
- Follow the root CLAUDE.md Git workflow.
- Use web as the commit scope.

Examples:
- feat(web): implement landing page
- feat(web): create dashboard components
- fix(web): correct responsive navigation

- Never commit backend changes from frontend tasks.
- Run available build, lint and tests.
- Report any unavailable checks.
