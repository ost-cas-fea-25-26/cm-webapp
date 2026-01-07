# Mumble - CAS Frontend Engineering Advanced

A modern social media platform built with Next.js 16, featuring a robust testing strategy and clean architecture.

## Table of Contents

- [Getting Started](#getting-started)
- [Development](#development)
  - [API Schema Generation](#api-schema-generation)
  - [Code Quality](#code-quality)
- [Testing Strategy](#testing-strategy)
  - [Test Types](#test-types)
  - [Testing Philosophy](#testing-philosophy)
  - [Running Tests](#running-tests)
- [Resources](#resources)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

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

- Install the [EditorConfig extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) for VS Code
- `.editorconfig` handles indentation, line endings, and trailing whitespace
- `.vscode/settings.json` provides additional VS Code-specific settings

**Key Commands:**

```bash
npm run lint          # Run ESLint
npm run prettier      # Format code
npm run typecheck     # Check TypeScript
npm run build         # Build for production
npm run preflight     # Run all checks
```

---

---

## Testing Strategy

Multi-layered testing approach with clear priorities and guidelines.

### Test Types

| Type          | Framework    | Location     | Files        | Priority  |
| ------------- | ------------ | ------------ | ------------ | --------- |
| **Unit**      | Vitest + RTL | Colocated    | `*.test.ts`  | 🔴 High   |
| **Component** | Vitest + RTL | Colocated    | `*.test.tsx` | 🟡 Medium |
| **E2E**       | Playwright   | `tests/e2e/` | `*.spec.ts`  | 🔴 High   |

#### Unit Tests (`*.test.ts`)

- **Purpose:** Services, Utils, API Client, Validators, Server-only Logic
- **Why:** Isolated layers, easy to test, foundation for everything else

#### Component Tests (`*.test.tsx`)

- **Purpose:** React Client Components in isolation
- **Why:** Simple to test, good coverage for interactive UI
- **⚠️ Note:** Async Server Components cannot be tested with Vitest/RTL

#### E2E Tests (`*.spec.ts`)

- **Purpose:** Complete user flows and critical paths
- **Why:** Validates real user experience end-to-end

### Testing Philosophy

**Priority Order:**

1. API Layer → Foundation
2. Server Actions → Business logic
3. Interactive Components → UI features
4. E2E Happy Paths → User journeys

**When to Test:**

- 🔄 Before refactoring (test-first approach)
- 👁️ User-facing features (write E2E tests)
- 🐛 Bug fixes (failing test first, then fix)

**What NOT to Test:**

- Framework code (Next.js, React)
- External libraries
- Auto-generated types
- Simple pass-through components

### Running Tests

```bash
# Unit & Component Tests
npm run test

# E2E Tests (headless)
npx playwright test

# E2E Tests (interactive UI)
npx playwright test --ui
```

## Auth

This project uses **better-auth** in combination with a **PostgreSQL** database.

### Setup

Authentication requires a database to function correctly. To start the database, run the following command from the root of the project:

```bash
docker-compose up -d
```

This command initializes and runs the PostgreSQL database in detached mode.

Next, add the following database connection string to your `.env` file:

```bash
MUMBLE_DATABASE_URL="postgres://admin:MyPassword123@localhost:5432/auth"
```

After configuring the environment variable, create the required database schema by running:

```bash
npx @better-auth/cli@latest migrate --config src/lib/auth/auth.config.ts
```

Once the migration completes successfully, authentication should be fully operational.

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Playwright Documentation](https://playwright.dev)
- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com/react)
