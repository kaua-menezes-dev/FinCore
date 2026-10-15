# FinCore — Project Instructions

## Product

FinCore is a personal financial management platform.

Its purpose is to help users record, visualize,
analyze, and make decisions about their finances.

Development follows three versions: MVP, V2, V3.
Only implement features explicitly approved for the MVP.

Product requirements are documented in docs/.

## Architecture

The project uses a single Git repository (monorepo).

- backend/: Java 21, Spring Boot, PostgreSQL
- frontend/: React, TypeScript, Vite
- docs/: Requirements, architecture and design
- Figma: UI/UX design and prototypes

## Responsibilities

- The developer owns backend architecture and business rules.
- Claude owns explicitly delegated frontend tasks.
- Claude may read backend code for context.
- Never modify backend files without explicit permission.
- Never invent API contracts or business rules.
- Use mock data until backend contracts are approved.

## Working Method

- Plan major features before implementation.
- Follow approved requirements and designs.
- Implement small, cohesive changes.
- Avoid unnecessary dependencies.
- Run relevant tests and quality checks.
- Explain significant architectural decisions.
- Never modify unrelated project files.

## Git & GitHub

- Use one repository for the entire FinCore project.
- Never implement features directly on main.
- Create branches using:
  - feat/
  - fix/
  - refactor/
  - chore/

- Use Conventional Commits in English.
- Scope commits to web, api, or project as appropriate.
- Stage only explicit files relevant to the task.
- Review staged changes before committing.
- Git write operations require developer approval.
- Never push or merge without explicit approval.
- Never force-push or rewrite shared history.
- Never commit secrets or credentials.

## Security

- Never expose tokens, passwords or private keys.
- Never modify production configuration without approval.
- Respect project permissions and ignored files.

## Completion Report

After implementation, report:

1. Changes implemented.
2. Files modified.
3. Tests executed.
4. Branch and commit, if created.
5. Pending issues.

## Design

- Follow approved references and Figma designs.
- Use the established design system.
- Avoid generic templates and unnecessary decoration.
- Use Impeccable when appropriate.
- Require developer approval for design decisions.

## Documentation

- Keep project documentation inside docs/.
- Create documentation files only when needed.
- Update existing documents instead of duplicating information.
- Record approved decisions, not unconfirmed assumptions.
- Treat docs/PRODUCT.md as the source of truth for product scope.
- Keep design decisions in docs/DESIGN.md.
- Keep screen definitions in docs/SCREENS.md.
- Document approved API contracts in docs/API-CONTRACTS.md.
- Never change business requirements without developer approval.
