# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + TypeScript single-page app. It consumes the author's own FinCore backend API, a separate project that is not part of this folder. Nothing has been scaffolded yet.

## Users

There are two audiences, and they matter in different ways:

- **The audience that decides (primary):** recruiters, hiring managers, and prospective clients reviewing the author's portfolio. They come to judge the author's engineering ability and usually spend only a few minutes exploring.
- **The audience the app depicts:** an individual managing their personal finances in Brazil. They track money across their accounts, review their transactions, and want to understand where their money goes. These users are fictional. FinCore is a showcase, not a product with real customers.

## Product Purpose

FinCore is a personal finance web app. People use it to see their accounts and transactions in one place and to understand their spending and cash flow through reports. As a portfolio piece, it succeeds when a reviewer leaves convinced the author can build a real, production-shaped application, not just a pretty dashboard mockup.

## Positioning

FinCore stands out through engineering depth. Most finance-dashboard demos are static screens with hardcoded numbers. FinCore is a real client for a real API, with authentication, a proper API integration layer, deliberate state management, tests, and complete loading, empty, and error states. Its credibility rests on everything behaving like a shipped product.

## Operating Context

- Reviewers usually arrive from a portfolio link or a résumé, often on desktop and sometimes on a phone. They explore quickly, with no onboarding and no real account.
- The app runs against the author's FinCore API, so latency, failures, and empty datasets are real conditions the interface must handle.

## Capabilities and Constraints

**v1 scope:**
- **Accounts & transactions:** multiple accounts with balances; a transaction list with categories, search, and filters.
- **Reports & insights:** spending by category, cash flow over time, and month-over-month comparison.

**Out of scope for v1:** budgets and savings goals.

**Constraints:**
- The interface is in Portuguese (pt-BR) only, using BRL currency (`R$ 1.234,56`) and Brazilian date and number formats. There is no i18n layer for v1.
- All data comes from the FinCore API. The web app must not invent data it doesn't receive.

**Open decisions:**
- Authentication method, and whether reviewers get a demo login or a pre-seeded account.
- Deploy target.

## Evidence on Hand

None yet. There are no screenshots, metrics, testimonials, or users. Any data shown must be seeded through the API and clearly fictional. Do not fabricate user counts, testimonials, or real-world usage claims.

## Product Principles

1. **Behave like shipped software.** Every view handles loading, empty, error, and stale states. A missing state is a defect, not a polish item.
2. **The API is the source of truth.** The UI reflects what the backend returns and never papers over gaps with hardcoded values.
3. **Numbers must be exact and readable.** Money is formatted consistently in BRL, aligned for comparison, and never ambiguous about sign or period.
4. **Respect the reviewer's few minutes.** Key capabilities should be reachable and legible quickly, without setup friction.
