# FinCore — Product Definition

## 1. Product Overview

FinCore is a personal financial management web application designed to help users record, visualize, analyze, and make better decisions about their finances.

The application is being developed as a full-stack portfolio project, demonstrating backend engineering, REST API development, authentication, frontend integration, and product-oriented UI/UX design.

Development is incremental and divided into three versions: V1 (MVP), V2, and V3.

Only approved V1 capabilities should be implemented in the initial release.

## 2. Platform & Technology Stack

FinCore is a web application developed in a single Git repository (monorepo).

### Backend

- Java 21
- Spring Boot
- Spring Web / REST API
- Spring Data JPA
- Spring Security
- PostgreSQL
- Flyway
- Bean Validation
- Maven

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Design

- Figma
- Figma MCP
- Impeccable

### Repository Structure

- `backend/fincore-api/` — REST API, business logic, authentication, and persistence.
- `frontend/` — Web application.
- `docs/` — Product requirements, architecture, API contracts, and design documentation.

## 3. Target Audience

FinCore has two relevant audiences.

**Application users:** Individuals in Brazil who want to organize personal financial information, monitor balances, review transactions, and understand spending patterns.

**Portfolio reviewers:** Recruiters, hiring managers, and prospective clients evaluating the developer's technical capabilities.

During portfolio evaluation, fictional demonstration data may be used. The project must not claim to have real customers or fabricated usage metrics.

## 4. Product Objectives

FinCore aims to:

- Centralize financial information.
- Allow users to register and review financial movements.
- Present financial information through intuitive dashboards.
- Help users understand spending behavior and cash flow.
- Demonstrate a functional integration between a React frontend and a Spring Boot REST API.

## 5. Product Positioning

FinCore should demonstrate both engineering depth and product quality.

It should not be merely a static finance-dashboard demonstration.

The final application must demonstrate:

- Real REST API integration.
- Authentication and authorization.
- Business rules implemented in the backend.
- Persistent data.
- Consistent UI/UX.
- Loading, empty, and error states.
- Automated tests where applicable.

## 6. Version 1 — MVP Scope

### Accounts & Transactions

- Support multiple financial accounts.
- Display account balances.
- Register and visualize financial transactions.
- Organize transactions into categories.
- Search and filter financial movements.

### Reports & Insights

- Spending distribution by category.
- Cash flow visualization over time.
- Month-over-month financial comparison.

Detailed business rules, API contracts, and screen behavior must be approved before implementation.

### Out of Scope for V1

- Category-based budgets and monthly limits.
- Savings goals with targets and deadlines.

These capabilities may be evaluated for V2 or V3.

## 7. Development Strategy

Backend and frontend will be developed in parallel.

### Backend Development

The developer is responsible for the Spring Boot REST API, including:

- Domain modeling.
- Business rules.
- Persistence.
- Authentication and authorization.
- Endpoints and DTOs.
- Validation and testing.

Claude Code may assist with explicitly delegated tasks.

### Frontend Development

Claude Code will assist with:

- UI/UX design.
- Design system.
- Figma prototypes.
- React components.
- Responsive layouts.
- Frontend testing.
- Git commits under the approved workflow.

### Temporary Mock Data

During frontend development, temporary mock data may be used to implement and validate the interface before the corresponding API endpoints are available.

Mock data must:

- Be clearly identifiable as fictional.
- Remain isolated from presentation components.
- Be replaceable by API integration.
- Never be presented as real production information.

### Final MVP Integration

The final integrated MVP must consume the FinCore REST API.

The backend is the source of truth for financial data, calculations, persistence, and business rules.

Mock data must not silently replace missing API responses in the final integrated application.

## 8. UX & Design Principles

- Prioritize clarity, consistency, and usability.
- Maintain a unified visual identity across the landing page and dashboard.
- Use accessible, reusable components.
- Provide responsive layouts.
- Handle loading, empty, error, and relevant stale-data states.
- Display financial values accurately.
- Avoid unnecessary visual complexity.

Visual references must be analyzed and approved before establishing the design system.

## 9. Localization

The MVP interface will use:

- Portuguese (pt-BR).
- Brazilian Real (BRL).
- Brazilian date and numeric formats.

Internationalization is outside the initial scope.

## 10. Open Decisions

The following decisions remain open:

- Detailed authentication and authorization flows.
- Demo account or seeded demonstration environment for portfolio reviewers.
- Final deployment architecture and hosting providers.
- Detailed API contracts.
- Approved visual identity and screen flows.

Do not treat open decisions as approved requirements.

## 11. Product Documentation

Approved decisions should be documented progressively:

- `PRODUCT.md` — Product vision and approved scope.
- `DESIGN.md` — Approved visual identity and design system.
- `SCREENS.md` — Approved screen flows and interface states.
- `API-CONTRACTS.md` — Approved REST API contracts.
- `ARCHITECTURE.md` — Architectural decisions when defined.

Create supporting documentation only when needed.

## 12. Product Principles

1. Build a functional product, not only a visual demonstration.
2. Keep the backend as the source of truth.
3. Use mocks only as a temporary development strategy or an explicitly identified demo mechanism.
4. Prioritize correctness, maintainability, and clear financial information.
5. Implement the MVP before expanding into V2 and V3.
6. Never introduce unapproved business requirements.
