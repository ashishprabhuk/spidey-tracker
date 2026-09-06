# DevOps & Deployment Specification

## Development

Use Docker Compose for:

* PostgreSQL
* API
* Web

---

# Production

Recommended architecture:

```text
Internet
   ↓
Reverse Proxy
   ↓
Frontend
   ↓
API
   ↓
PostgreSQL
```

---

# Health Check

API:

```text
GET /api/v1/health
```

Expected:

```json
{
  "status": "ok"
}
```

---

# Docker

Backend must provide:

```text
Dockerfile
```

Frontend must provide:

```text
Dockerfile
```

---

# Docker Compose

Development services:

```text
postgres
api
web
```

---

# Database Migration

Production deployment must execute migrations safely.

Do not use destructive database reset commands in production.

---

# CI Pipeline

On every pull request:

```text
install
↓
lint
↓
typecheck
↓
unit tests
↓
build
↓
E2E tests
```

---

# Deployment Requirements

Application must support:

* environment variables
* health checks
* graceful shutdown
* structured logs
* production build
* database migrations

---

# Logging

Logs should include:

* timestamp
* level
* request ID
* message

Do not log:

* secrets
* tokens
* passwords
* sensitive user data

---

# Failure Behavior

If database is unavailable:

* API health should report degraded/unhealthy state
* frontend should display graceful error
* application should not crash-loop indefinitely
