# AGENTS.md

# SPIDEY SIGNAL — AI DEVELOPMENT RULES

## Mission

Build SPIDEY SIGNAL as a production-quality, privacy-conscious, anonymous temporary community-signal application.

---

# Read First

Before writing code, read:

```text
docs/00-project-context.md
docs/01-prd.md
docs/02-product-rules.md
docs/03-architecture.md
docs/04-database.md
docs/05-api-contract.md
docs/06-location-system.md
docs/07-signal-lifecycle.md
docs/08-privacy-safety.md
docs/09-design-system.md
docs/10-testing.md
docs/11-deployment.md
docs/13-content-demo.md
```

---

# Core Rules

1. TypeScript only.
2. Strict TypeScript.
3. Avoid `any`.
4. Validate external input.
5. Keep business logic out of visual components.
6. Use reusable feature modules.
7. Do not scatter database queries throughout components.
8. Respect Supabase RLS.
9. Never expose service-role keys.
10. Never implement background location tracking.
11. Never implement real-person tracking.
12. Never represent community reports as verified government information.
13. Never create permanent public location history.
14. Every signal must have an expiration time.
15. Maximum signal lifetime is 24 hours.

---

# Architecture Rules

Use:

```text
React
TypeScript
Vite
Tailwind
Zustand
TanStack Query
Supabase
PostgreSQL
PostGIS
MapLibre
Zod
```

Do not introduce:

```text
Redux
GraphQL
Redis
Kafka
microservices
Express
Fastify
```

without explicit architectural justification.

---

# Database Rules

Use Supabase RLS.

Never disable RLS as a shortcut.

Every public signal query must exclude:

```text
expired signals
ended signals
```

---

# Location Rules

Never:

* continuously track users
* store location history
* publish location without explicit action

Location is obtained only when needed.

---

# Signal Rules

Required:

```text
title
category
icon
priority
latitude
longitude
created_at
expires_at
status
owner
```

---

# UI Rules

The map is the primary interface.

Do not turn the application into a generic dashboard.

Prioritize:

* map
* signals
* search
* report action
* signal details

---

# Visual Identity

The UI should feel:

* futuristic
* cinematic
* technical
* Indian
* playful

But remain usable.

---

# Coding Process

Before each implementation task:

1. Read relevant docs.
2. Inspect existing code.
3. Identify affected modules.
4. Implement minimal change.
5. Run tests.
6. Fix errors.
7. Run typecheck.
8. Continue.

---

# Never

Do not:

* rewrite working architecture unnecessarily
* add random dependencies
* invent APIs
* invent database fields without documenting them
* silently change product rules
* remove tests to make builds pass
* hide errors
* hardcode secrets

---

# Completion Requirement

Never say:

> "Done"

unless:

```text
lint
typecheck
tests
build
```

pass.

---

# Documentation

If implementation changes:

* architecture
* database
* API
* business rules

update the corresponding documentation.

Documentation and implementation must remain synchronized.
