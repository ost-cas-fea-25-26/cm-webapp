
---

# Mumble - CAS Frontend Engineering Advanced

A modern social media platform built with Next.js 16, featuring a robust testing strategy and clean architecture.

## Table of Contents

* [Getting Started](https://www.google.com/search?q=%23getting-started)
* [Development](https://www.google.com/search?q=%23development)
* [Testing Strategy](https://www.google.com/search?q=%23testing-strategy)
* [Auth](https://www.google.com/search?q=%23auth)
* [Future Recommendations & Technical Debt](https://www.google.com/search?q=%23future-recommendations--technical-debt)
* [Resources](https://www.google.com/search?q=%23resources)

---

## Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Development

### API Schema Generation

Generate TypeScript types from the OpenAPI schema:

```bash
npx openapi-typescript https://mumble-api-prod-714602723919.europe-west6.run.app/swagger/v1/swagger.json -o ./src/lib/api/api.d.ts

```

### Code Quality

This project enforces consistent code style using EditorConfig:

* Install the **EditorConfig extension** for VS Code.
* `.editorconfig` handles indentation, line endings, and whitespace.

**Key Commands:**

```bash
npm run lint          # Run ESLint
npm run prettier      # Format code
npm run typecheck     # Check TypeScript
npm run preflight     # Run all checks (Lint, Typecheck, Test)

```

---

## Testing Strategy

### Test Types

| Type | Framework | Location | Priority |
| --- | --- | --- | --- |
| **Unit** | Vitest + RTL | Colocated | 🔴 High |
| **Component** | Vitest + RTL | Colocated | 🟡 Medium |
| **E2E** | Playwright | `tests/e2e/` | 🔴 High |

### Testing Philosophy

1. **API Layer** → Foundation
2. **Server Actions** → Business logic
3. **Interactive Components** → UI features
4. **E2E Happy Paths** → User journeys

**Note:** Async Server Components cannot be tested with Vitest/RTL; we prioritize E2E tests for these sections.

---

## Auth

This project uses **better-auth** with a **PostgreSQL** database.

### Setup

1. Start the database: `docker-compose up -d`
2. Add to `.env`: `MUMBLE_DATABASE_URL="postgres://admin:MyPassword123@localhost:5432/auth"`
3. Run migrations: `npx @better-auth/cli@latest migrate --config src/lib/auth/auth.config.ts`

---

## Future Recommendations & Technical Debt

This section documents the technical gaps and the improvements we would implement for a production-ready release.

### 🛠 Architectural Recommendation: Zod Validation Layer

Currently, the app "blindly" trusts the API. For production, we would implement a **Domain Validation Layer** using **Zod**.

* **Crash Prevention:** Catch unexpected API data at the "entrance" before it breaks UI components.
* **Data Cleanup:** Automatically convert ISO-strings into real JavaScript `Date` objects.
* **Independence:** If the API structure changes, we only update the Zod Schema in one file instead of fixing components across the project.

### 🔴 High Priority "Missing" Features

* **Robust API Client:** Refactor Server Actions, introduce Error Handling and remove the Initialization when de module is loaded.
* **User Profile Sync:** - Update settings actions to return the new user data for instant UI updates.
* Add missing fields like **First Name** and **Last Name** to the settings page.


### 🟡 Medium Priority Improvements

* **Reliable List Rendering:** Replace `key={index}` with `key={post.id}` in all maps to prevent rendering glitches.
* **UX & Error States:** - Add "Try-Catch" blocks to all data-fetching to show friendly error messages.
* Improve the "Load More" button to hide itself when the API reports no further data.


* **Testability (Decoupling):** Split components like `ProfileSection` into a **Data Helper** (Server Logic) and a **UI Component** (Synchronous/Testable).

### ⚪ Known Constraints (External Factors)

* **Media Optimization:** Lighthouse scores are limited because the external API provides fixed image sizes. In production, we would use an Image Proxy/CDN.
* **Framework Agnostic Design System:** We chose a framework-agnostic DS (`@krrli/cm-designsystem`). Consequently, we cannot use Next.js-specific optimizations like `next/image` or `next/link` inside DS components.
* **Upstream UI Issues:** A known CSS conflict in the Design System hides some buttons on mobile. We have applied a temporary CSS fix in `globals.css`.

---

## Resources

* [Next.js Documentation](https://nextjs.org/docs)
* [Better-Auth](https://www.google.com/search?q=https://www.better-auth.com/)
* [Vitest](https://vitest.dev)
* [Playwright](https://playwright.dev)

