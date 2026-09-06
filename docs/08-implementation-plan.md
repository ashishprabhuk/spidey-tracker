# AI Implementation Roadmap

## Phase 0 — Repository Initialization

### Tasks

* initialize monorepo
* configure pnpm
* configure TypeScript
* configure ESLint
* configure Prettier
* create apps
* create packages
* configure Git
* create environment templates

### Validation

```bash
pnpm install
pnpm lint
pnpm typecheck
```

---

# Phase 1 — Backend Foundation

Build:

* Fastify server
* health endpoint
* error handling
* request IDs
* Zod validation
* Prisma
* PostgreSQL
* migrations

### Validation

```bash
pnpm test
pnpm build
```

---

# Phase 2 — Database

Implement:

* Target
* Activity
* PaniPuriLocation
* TrackerSession

Create deterministic seed data.

---

# Phase 3 — API

Implement:

```text
GET /health
POST /tracker/scan
GET /tracker/status/:sessionId
GET /targets/:id
GET /activities
GET /pani-puri
```

Add tests.

---

# Phase 4 — Frontend Foundation

Build:

* application shell
* routing
* design tokens
* typography
* global styles
* responsive layout

Do NOT build every component yet.

---

# Phase 5 — Map

Implement:

* MapLibre
* map container
* target marker
* pani puri markers
* activity markers
* camera movement

---

# Phase 6 — Tracker

Implement tracker state machine.

States:

```text
IDLE
SCANNING
SIGNAL_DETECTED
TARGET_LOCKED
ERROR
```

Build scanning animation.

---

# Phase 7 — TN Mode

Implement:

```text
TN MODE
```

When enabled:

* reveal TN features
* activate pani puri layer
* activate activity layer

---

# Phase 8 — Pani Puri

Implement:

* markers
* list
* details
* distance
* open state
* rating

---

# Phase 9 — Cinematic UI

Add:

* scan animation
* target lock
* event log
* map effects
* micro-interactions
* sound effects if appropriate

Do not sacrifice performance.

---

# Phase 10 — Error / Loading States

Implement:

* initial loading
* map loading
* tracker scanning
* tracker error
* empty pani puri state
* API failure
* retry

---

# Phase 11 — Testing

Implement:

* unit tests
* integration tests
* E2E tests

---

# Phase 12 — Performance

Check:

* bundle size
* map performance
* animation performance
* unnecessary renders
* mobile performance

---

# Phase 13 — Production

Implement:

* Docker
* health checks
* production environment
* database migration
* CI
* deployment configuration

---

# Phase 14 — Final QA

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Then manually test:

* desktop
* mobile
* slow network
* API failure
* map failure
* reduced motion

---

# Final Requirement

Do not move to the next phase while the current phase has failing tests or unresolved type errors.

Do not implement speculative features.

Do not refactor unrelated code.
