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

### Cards Management — MVP V1

Cards in FinCore are manually registered financial instruments used to organize transactions.

FinCore does not issue cards and does not connect directly to financial institutions.

#### Card Registration

| Field | Required | Description |
|---|---|---|
| Nickname | Yes | User-defined name to identify the card |
| Card Type | Yes | `CREDIT` or `DEBIT` |
| Financial Institution | No | Optional institution identification |
| Last Four Digits | No | Optional card identification |
| Visual Theme / Color | No | Optional card appearance |

#### Business Rules

1. Each card belongs to a specific authenticated user.
2. Users may view and manage only their own cards.
3. A card must have a nickname and type.
4. Card types are `CREDIT` and `DEBIT`.
5. Financial institution information is optional.
6. The last four digits are optional. If provided, they must contain exactly four numeric digits.
7. The visual theme is optional. The system may suggest a visual style based on the selected institution.
8. Users may edit their registered card information.
9. Users may remove their registered cards.
10. Removing a card must never delete its associated financial transactions.
11. When a card is removed, its associated transactions must remain in the user's financial history and become unlinked from that card.
12. Card removal is permanent in MVP V1, but does not affect transaction records.
13. Card-related financial totals must be calculated exclusively from manually registered transactions.
14. Financial totals must respect the selected period and applicable transaction status.
15. Cards must not display real bank balances, available credit limits, automatically generated invoices, or installment information.
16. FinCore must not request or store full card numbers, CVV, PINs, or banking credentials.

#### Card Removal Behavior (Approved)

When a user removes a registered card, all financial transactions previously associated with that card must remain in the system. The transactions simply become unlinked from the removed card.

Expected behavior:

- Remove the card registration.
- Preserve every associated transaction.
- Remove the active association between those transactions and the deleted card.
- Keep transaction amounts, dates, categories, descriptions, and statuses unchanged.
- Maintain the user's financial history and reports.

The removal confirmation must make clear that the card is removed permanently, that its transactions are preserved, and that they will no longer be linked to the card.

> **Backend implementation note:** the transaction–card association must be optional, and removing a card must clear the association instead of cascading the deletion (for example, a nullable foreign key with `ON DELETE SET NULL`, and no cascade removal or orphan removal in the persistence mapping). No card or transaction entities exist yet; this must be respected when they are modeled.

#### Card Institution and Visual Identity

The user may optionally select a financial institution, such as Nubank, Itaú, Bradesco, or another institution. FinCore may suggest a corresponding card color or visual theme.

- Card designs must remain original visual representations.
- FinCore must not imply that it issues cards, maintains partnerships with these institutions, or accesses their banking systems.
- Institution identification is informational only.

#### Open Questions — Cards

The following points are not yet defined and must not be treated as approved requirements:

- Which transaction statuses count toward each card total (for example, effective totals versus planned amounts shown separately).
- How institution-based visual theme suggestions are defined, and the list of supported institutions.
- Whether card nicknames must be unique per user.
- Whether cards are related to financial accounts.

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
