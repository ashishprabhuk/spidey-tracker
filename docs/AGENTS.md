# AGENTS.md

## Project

TN Spider Tracker

---

# Mission

Build a production-quality fictional Spider-Man tracking experience that is visually impressive, technically functional, maintainable, and easy to extend.

---

# Non-Negotiable Rules

1. Use TypeScript.
2. Maintain strict type safety.
3. Do not use `any` unless absolutely unavoidable.
4. Validate external input with Zod.
5. Keep business logic outside UI components.
6. Keep API logic outside presentation components.
7. Use reusable components.
8. Write tests for business logic.
9. Never commit secrets.
10. Never use real surveillance or police data.
11. Never represent fictional data as real-world intelligence.
12. Do not implement real-person tracking.
13. Do not create unnecessary infrastructure.

---

# Frontend Rules

Use:

* React
* TypeScript
* Tailwind
* Zustand
* TanStack Query
* MapLibre

Prefer:

```text
components/
features/
hooks/
lib/
services/
stores/
types/
```

Avoid giant components.

If a component exceeds approximately 250 lines, consider splitting it.

---

# Backend Rules

Use:

* Fastify
* TypeScript
* Zod
* Prisma

Structure:

```text
src/
├── routes/
├── services/
├── repositories/
├── schemas/
├── types/
├── plugins/
├── utils/
└── server.ts
```

Routes should be thin.

Business logic belongs in services.

Database access belongs in repositories where appropriate.

---

# Naming

Components:

```text
PascalCase
```

Functions:

```text
camelCase
```

Constants:

```text
UPPER_SNAKE_CASE
```

Files:

```text
kebab-case
```

---

# UI Rules

Do not create generic dashboard UI.

The UI must maintain the fictional futuristic tracker identity.

Prefer:

* dense information hierarchy
* strong typography
* subtle glow
* technical labels
* purposeful animations
* map-first layout

Avoid:

* unnecessary cards
* excessive rounded corners
* excessive gradients
* random animations
* decorative UI without purpose

---

# Animation Rules

Animations should communicate state.

Good:

```text
scanner sweep
target lock
map pulse
signal acquisition
terminal initialization
```

Bad:

```text
random bouncing cards
constant floating elements
excessive page transitions
```

---

# API Rules

Every API request must have:

* typed input
* validation
* typed output
* consistent errors

---

# Testing

Every service must have unit tests.

Critical user flows require Playwright tests.

---

# Before Completing Work

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For E2E:

```bash
pnpm test:e2e
```

Do not claim completion if these fail.

---

# Git Rules

Use small commits.

Recommended:

```text
feat:
fix:
refactor:
test:
docs:
chore:
```

---

# AI Agent Behavior

Before modifying architecture:

1. Inspect repository.
2. Read relevant docs.
3. Understand existing implementation.
4. Make the smallest change that satisfies the requirement.
5. Run relevant tests.
6. Fix failures.
7. Only then continue.

Never rewrite working code unnecessarily.

Never introduce a new library without checking whether the existing stack already solves the problem.
