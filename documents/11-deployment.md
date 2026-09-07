# Deployment Specification

## Target

₹0 / $0 hosting for V1.

Use free tiers only.

---

# Frontend

Deploy to:

```text
Vercel
```

Source:

```text
GitHub repository
```

---

# Database

Use:

```text
Supabase
```

Services:

* PostgreSQL
* PostGIS
* Row Level Security
* optional Edge Functions

---

# Map

Use:

```text
MapLibre GL JS
```

The map rendering library itself is open source.

A map tile/geocoding provider may still have its own usage limits and terms.

Do not assume map tiles or geocoding are universally free.

---

# Environment

Frontend:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_MAP_STYLE_URL=
```

Only public client configuration belongs in VITE variables.

---

# Never expose

```text
SUPABASE_SERVICE_ROLE_KEY
DATABASE_PASSWORD
PRIVATE_API_KEYS
```

---

# Production Architecture

```text
                INTERNET
                    │
                    ▼
              ┌──────────┐
              │  Vercel  │
              │ React App│
              └────┬─────┘
                   │
                   ▼
              ┌──────────┐
              │ Supabase │
              │          │
              │ Postgres │
              │ PostGIS  │
              │ RLS      │
              └──────────┘
```

---

# No Dedicated API Server

V1 does not require:

* VPS
* Render
* Railway
* Docker
* Node server

Use Supabase APIs and Edge Functions where server-side logic is necessary.

---

# CI

GitHub:

```text
push
 ↓
Vercel build
 ↓
deploy
```

For pull requests:

```text
lint
typecheck
test
build
```

---

# Cost Safety

Do not add infrastructure that creates unexpected billing.

The AI agent must not:

* enable paid services
* create paid cloud resources
* add paid APIs without explicit approval

---

# Upgrade Path

If the product grows beyond free-tier requirements:

```text
Vercel
+
Supabase
```

can remain the foundation.

A dedicated API can be introduced later if required.
