# System Architecture & Technology Specification

## 1. Architecture

Use a modular monorepo.

```text
tn-spider-tracker/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── shared/
│   ├── config/
│   └── ui/
│
├── docs/
│
├── prisma/
│
├── tests/
│
├── docker/
│
├── .env.example
├── AGENTS.md
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 2. Frontend

## Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Zustand
* Zod
* React Query / TanStack Query
* OLA Maps

---

# 3. Backend

## Stack

* Node.js
* TypeScript
* Fastify
* Zod
* Prisma
* PostgreSQL

---

# 4. API Style

REST.

Base path:

```text
/api/v1
```

---

# 5. State Management

Use Zustand for UI/application state.

Use TanStack Query for server state.

Do not duplicate server state in Zustand.

---

# 6. Map Architecture

OLA Map is responsible for:

* map rendering
* markers
* layers
* camera movement
* target visualization
* activity visualization

Application state controls what appears on the map.

The map itself should not contain business logic.

---

# 7. Domain Services

Backend services:

```text
TrackerService
TargetService
ActivityService
PaniPuriService
```

---

# 8. Request Flow

```text
React UI
   ↓
TanStack Query
   ↓
REST API
   ↓
Fastify Route
   ↓
Zod Validation
   ↓
Service
   ↓
Prisma
   ↓
PostgreSQL
```

---

# 9. Error Handling

API errors must use consistent structure:

```json
{
  "error": {
    "code": "TARGET_NOT_FOUND",
    "message": "Target could not be located.",
    "requestId": "..."
  }
}
```

---

# 10. Security

Do not expose secrets to the frontend.

Never commit:

* API keys
* database passwords
* access tokens
* production credentials

All secrets must be environment variables.

---

# 11. Performance

Priorities:

1. Fast initial render
2. Lazy-load map-heavy functionality where appropriate
3. Avoid unnecessary React renders
4. Avoid unnecessary API requests
5. Cache static demo data
6. Optimize map markers/layers

---

# 12. Demo Mode

Version 1 should work without external APIs wherever possible.

Create a deterministic demo mode.

The application should still function if:

* database unavailable
* external map API unavailable
* external location provider unavailable

Map rendering may require a configured map provider, but application logic should remain testable independently.

---

# 13. Environment Modes

Support:

```text
development
test
production
```

Optional:

```text
demo
```

---

# 14. Architecture Principle

Do not create microservices.

Do not introduce GraphQL.

Do not introduce Redis unless an actual requirement appears.

Do not introduce WebSockets unless real-time behavior becomes necessary.

Keep the architecture boring underneath the cinematic UI.
