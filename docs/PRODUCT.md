# FinCore — Product Definition

This document is the single source of truth for FinCore product scope and business rules.

## 1. Product Overview

FinCore is a personal finance management platform built around three principles:

**Registrar. Visualizar. Decidir.**

It helps users organize their financial information, understand their financial behavior, and make more informed decisions. It is intended both for beginners and for users who want to organize the transactions associated with their cards.

### Core Product Principles

- Simple and intuitive financial organization.
- Manual financial transaction registration.
- Clear financial visualization.
- Useful information for financial decision-making.
- Accessible and professional user experience.
- No mandatory banking integration.

FinCore does not operate as a bank, issue payment cards, or execute financial transfers.

### Audiences

**Application users:** individuals in Brazil who want to organize personal financial information, review transactions, and understand spending patterns.

**Portfolio reviewers:** recruiters, hiring managers, and prospective clients evaluating the developer's technical capabilities.

During portfolio evaluation, fictional demonstration data may be used. The project must not claim to have real customers or fabricated usage metrics.

### Positioning

FinCore is a full-stack portfolio project and must demonstrate both engineering depth and product quality, not a static finance-dashboard demonstration. The final application must demonstrate:

- Real REST API integration between the React frontend and the Spring Boot backend.
- Authentication and authorization.
- Business rules implemented in the backend.
- Persistent data.
- Consistent UI/UX with loading, empty, and error states.
- Automated tests where applicable.

## 2. Platform & Technology Stack

FinCore is a web application developed in a single Git repository (monorepo).

- **Backend:** Java 21, Spring Boot, Spring Web (REST API), Spring Data JPA, Spring Security, PostgreSQL, Flyway, Bean Validation, Maven.
- **Frontend:** React, TypeScript, Vite, Tailwind CSS.
- **Design:** Figma, Figma MCP, Impeccable.

Repository structure:

- `backend/fincore-api/` — REST API, business logic, authentication, and persistence.
- `frontend/` — Web application.
- `docs/` — Product requirements, architecture, API contracts, and design documentation.

## 3. Product Roadmap

Development is incremental. Only V1 capabilities belong to the initial release; V2 and V3 features must not be presented as available in V1.

### V1 — MVP

- User registration and authentication.
- `USER` and `ADMIN` roles.
- Account activation and deactivation.
- Income and expense management.
- Planned and completed transaction statuses.
- Predefined and custom categories.
- Transaction filtering.
- Manual payment method registration.
- Basic card registration and management.
- Initial financial dashboard.
- Financial visualization by period and category.

### V2 — Financial Planning

- Monthly category budgets.
- Category spending limits.
- Financial planning tools.
- More detailed debit and Pix management.

### V3 — Advanced Credit Card Management

- Credit card billing cycles.
- Invoice management.
- Installment purchases.
- More complete credit card expense tracking.
- Advanced debit card functionality.

### Outside the Current Roadmap

- Savings goals with targets and deadlines are out of scope for V1 and are not part of the V2 or V3 plans.

## 4. MVP Functional Requirements

Detailed API contracts and screen behavior must be approved before implementation.

### 4.1 Users and Authentication

Users authenticate with **email and password**.

User information:

- Unique identifier.
- Name.
- Email.
- Password credential.
- Role: `USER` or `ADMIN`.
- Account status: `ACTIVE` or `INACTIVE`.

Regular users can:

- Register an account.
- Authenticate.
- Access their own information.
- View and update supported profile information.
- Deactivate their own account.
- Reactivate their account through the approved reactivation mechanism (pending, see §11).

Administrators can:

- List registered users.
- Search for users by ID.
- Activate users.
- Deactivate users.

### 4.2 Transactions

Users manually register financial transactions.

| Field | Required | Notes |
|---|---|---|
| Type | Yes | `INCOME` or `EXPENSE` |
| Amount | Yes | BRL |
| Date | Yes | Past, current, or future dates are allowed |
| Category | Yes | Predefined or custom, of the same type |
| Status | Yes | `PLANNED` (Prevista) or `COMPLETED` (Efetivada), defined manually by the user |
| Description | No | |
| Notes | No | |
| Card | No | Association with a registered card, when applicable |

Users can register, view, update, and permanently delete their transactions.

Transaction listings support pagination and filtering by:

- Period.
- Transaction type.
- Category.
- Status.

### 4.3 Categories

FinCore supports predefined and user-created categories. Each category has a name, a type (`INCOME` or `EXPENSE`), a color, and an icon.

- FinCore provides a set of predefined categories available to all users. The official list must be confirmed before implementation.
- Users can create, edit, and delete their own custom categories.
- Users can associate transactions with predefined or custom categories of the matching type.

### 4.4 Cards

Cards are manually registered financial instruments used to organize transactions. FinCore does not issue cards or integrate directly with financial institutions.

| Field | Required | Description |
|---|---|---|
| Nickname | Yes | User-defined name to identify the card |
| Card Type | Yes | `CREDIT` or `DEBIT` |
| Financial Institution | No | Optional, informational identification |
| Last Four Digits | No | Optional card identification |
| Visual Theme / Color | No | Optional card appearance |

Users can register, view, edit, and permanently remove their cards, and inspect the transactions associated with each card.

### 4.5 Payment Methods

Initial payment methods:

- Pix.
- Registered cards.

Manual transaction registration remains the primary mechanism. There are no banking integrations or automatic payment processing. Detailed distinctions between Pix, debit, and credit card accounting follow the roadmap (V2 and V3).

### 4.6 Dashboard

The dashboard presents the user's financial situation based exclusively on manually registered data.

Financial overview for the selected period:

- Total income.
- Total expenses.
- Financial result.
- Planned transactions, when relevant.

Visualization:

- Daily, weekly, and monthly views.
- Navigation between periods, including future periods.

Charts and indicators:

- Financial evolution.
- Income and expense comparison, including comparison with the previous period.
- Category distribution.
- Recent transactions.
- Registered cards, with access to their associated transactions.

### 4.7 Profile and Settings

Users access their profile through the application navigation.

- **Profile information:** name, email, and account status. Users may edit approved profile fields.
- **Security:** email and password authentication is required.
- **Account management:** reversible account deactivation that preserves the user's financial records.
- **Sign out:** users must be able to sign out.

### 4.8 Localization and Preferences

The MVP uses fixed preferences, without additional preference controls:

- Language: Brazilian Portuguese (pt-BR).
- Currency: Brazilian Real (BRL).
- Date format: DD/MM/YYYY.
- Default theme: Dark Mode.

Internationalization is outside the initial scope.

## 5. Module Business Rules

### 5.1 Users and Accounts

1. Users access only their own information; administrators manage accounts through the administrator capabilities in §4.1.
2. Account status changes must follow authorization rules.
3. Account deactivation is reversible and is not equivalent to permanent account deletion.
4. Deactivation does not delete financial records.

### 5.2 Transactions

1. The user defines the transaction status manually. The system must not determine the status solely from the transaction date.
2. Deleting a transaction is permanent in V1.
3. Users manage only their own transactions.

### 5.3 Categories

**Predefined categories**

1. Predefined categories cannot be edited or deleted by regular users.

**Custom categories**

1. Custom categories belong to the user who created them, and users manage only their own.
2. Category names must be unique within the same category type and user scope.
3. A name that conflicts with an available predefined category of the same type must be rejected.
4. The category type may be changed only when the category has no associated transactions; otherwise, the change must be blocked.

**Deleting a custom category**

- Without associated transactions: the category may be permanently deleted after confirmation.
- With associated transactions:
  1. Require a replacement category.
  2. The replacement must belong to the same transaction type.
  3. The replacement may be predefined or custom.
  4. Preserve all existing transactions.
  5. Reassign those transactions to the replacement category.
  6. Delete the original category only after a successful reassignment.

### 5.4 Cards

1. Each card belongs to a specific authenticated user, and users manage only their own cards.
2. A card must have a nickname and a type (`CREDIT` or `DEBIT`).
3. The last four digits are optional. If provided, they must contain exactly four numeric digits.
4. The financial institution is optional and may be used to suggest a visual card theme.
5. Card-related amounts must be calculated exclusively from manually registered transactions, respecting the selected period and transaction status.
6. Cards must not display real bank balances, available credit limits, automatically generated invoices, installment information, or automatically synchronized banking information.
7. FinCore must not request or store full card numbers, CVV, PINs, or banking credentials.

**Card removal (approved)**

Card removal is permanent in V1 and never deletes financial records. When a user removes a card:

- Remove the card registration.
- Preserve every associated transaction.
- Remove the association between those transactions and the card.
- Keep transaction amounts, dates, categories, descriptions, and statuses unchanged.
- Keep the user's financial history and reports intact.

The removal confirmation must make clear that the card is removed permanently, that its transactions are preserved, and that they will no longer be linked to the card.

> **Backend implementation note:** the transaction–card association must be optional, and removing a card must clear the association instead of cascading the deletion (for example, a nullable foreign key with `ON DELETE SET NULL`, and no cascade or orphan removal in the persistence mapping).

**Institution and visual identity**

- Users may optionally select a financial institution, such as Nubank, Itaú, Bradesco, or another institution.
- Card designs must remain original visual representations.
- FinCore must not imply that it issues cards, maintains partnerships with these institutions, or accesses their banking systems. Institution identification is informational only.

## 6. Data Integrity and Authorization

These rules must stay consistent across documentation, frontend behavior, backend implementation, and tests:

- Every user-specific resource respects authenticated user ownership. Users must not access or modify other users' private financial information.
- Deleting a card preserves its transactions and removes the card associations.
- Deleting a category with transactions requires reassignment to a compatible category.
- Deleting a transaction is permanent in V1.
- Deactivating a user preserves financial records.
- Financial totals reflect the applicable period and transaction status. Summaries must consistently distinguish planned from completed transactions and must not mix statuses without clearly indicating the basis of the calculation.
- The financial result must not be represented as a real bank account balance.
- All transaction registration is manual in the MVP.
- The interface must not suggest unsupported financial integrations or capabilities.

## 7. UX & Design Principles

- Prioritize clarity, consistency, and usability.
- Maintain a unified visual identity across the landing page and dashboard.
- Use accessible, reusable components and responsive layouts.
- Handle loading, empty, error, and relevant stale-data states.
- Display financial values accurately.
- Avoid unnecessary visual complexity.

Visual references must be analyzed and approved before establishing the design system.

## 8. Development Strategy

Backend and frontend are developed in parallel.

**Backend:** the developer is responsible for the Spring Boot REST API, including domain modeling, business rules, persistence, authentication and authorization, endpoints and DTOs, and validation and testing. Claude Code may assist with explicitly delegated tasks.

**Frontend:** Claude Code assists with UI/UX design, the design system, Figma prototypes, React components, responsive layouts, frontend testing, and Git commits under the approved workflow.

**Temporary mock data:** during frontend development, mock data may be used before the corresponding API endpoints are available. Mock data must be clearly identifiable as fictional, remain isolated from presentation components, be replaceable by API integration, and never be presented as real production information.

**Final MVP integration:** the integrated MVP must consume the FinCore REST API. The backend is the source of truth for financial data, calculations, persistence, and business rules. Mock data must not silently replace missing API responses.

## 9. Product Documentation

Approved decisions are documented progressively, only when needed:

- `PRODUCT.md` — Product vision, approved scope, and business rules.
- `DESIGN.md` — Approved visual identity and design system.
- `SCREENS.md` — Approved screen flows and interface states.
- `API-CONTRACTS.md` — Approved REST API contracts.
- `ARCHITECTURE.md` — Architectural decisions when defined.

## 10. Product Principles

1. Build a functional product, not only a visual demonstration.
2. Keep the backend as the source of truth.
3. Use mocks only as a temporary development strategy or an explicitly identified demo mechanism.
4. Prioritize correctness, maintainability, and clear financial information.
5. Implement the MVP before expanding into V2 and V3.
6. Never introduce unapproved business requirements.

## 11. Pending Product Decisions

The points below are unresolved and must not be treated as approved requirements.

**Product rules**

- Official list of predefined categories.
- Category name normalization (case and accents) and length limits.
- Email update verification requirements.
- Password change requirements, including whether password change is part of V1.
- Account self-reactivation flow.
- Payment method accounting details not yet approved, including how Pix and card usage are recorded on a transaction.
- Destination after sign-out (unauthenticated route).
- Financial accounts: the previous scope listed multiple financial accounts and account balances in V1, but the confirmed roadmap does not include them. Confirm whether they are removed.
- Transaction text search and filtering by card: the previous scope mentioned searching transactions, but the confirmed filters are period, type, category, and status.
- Whether card nicknames must be unique per user, and how institution-based theme suggestions are defined.

**Project decisions**

- Demo account or seeded demonstration environment for portfolio reviewers.
- Deployment architecture and hosting providers.
- Detailed API contracts.
- Approved visual identity and screen flows.
