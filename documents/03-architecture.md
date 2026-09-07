# System Architecture

## Architecture Decision

Use a serverless architecture.

No dedicated backend server is required for V1.

---

# Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

## Backend Platform

* Supabase

Use:

* PostgreSQL
* PostGIS
* Row Level Security
* Edge Functions where necessary

## Map

MapLibre GL JS.

## State

Zustand.

## Server State

TanStack Query.

## Validation

Zod.

## Hosting

Vercel.

---

# Architecture

```text
Browser
   │
   ├── React
   ├── MapLibre
   ├── Zustand
   └── TanStack Query
           │
           ▼
       Supabase
           │
      ┌────┴─────┐
      ▼          ▼
 PostgreSQL   Edge Functions
 + PostGIS
```

---

# Data Flow

## Nearby Signals

```text
Browser
 ↓
Get user coordinates
 ↓
Determine map viewport/radius
 ↓
Supabase query
 ↓
PostGIS geographic filtering
 ↓
Return active signals
 ↓
Map markers
```

---

# Create Signal

```text
User
 ↓
Signal form
 ↓
Client validation
 ↓
Supabase
 ↓
RLS validation
 ↓
Database
 ↓
Signal created
 ↓
Map refresh
```

---

# End Signal

```text
Owner
 ↓
END SIGNAL
 ↓
Authorization
 ↓
Database update
 ↓
status = ENDED
 ↓
Map refresh
```

---

# Expiration

Expiration must be enforced at query level.

Never rely exclusively on a frontend timer.

The active query must require:

```text
expires_at > current_timestamp
```

---

# Serverless Principle

Do not build:

* Express server
* Fastify server
* persistent Node server
* Docker backend

unless V2 requirements justify them.

---

# Frontend Directory

```text
src/
├── components/
├── features/
│   ├── map/
│   ├── signals/
│   ├── search/
│   └── location/
├── hooks/
├── lib/
├── stores/
├── services/
├── types/
├── pages/
└── app/
```

---

# Feature Ownership

## map

Responsible for:

* map rendering
* camera
* markers
* layers

## signals

Responsible for:

* create
* view
* update state
* expiration display
* ownership

## location

Responsible for:

* permission
* current coordinates
* error states

## search

Responsible for:

* location search
* map navigation

---

# Business Logic Rule

Map components must not directly implement database rules.

Signal lifecycle logic belongs in the signal domain layer.

---

# Performance

Use:

* debounced map queries
* viewport-based fetching
* marker clustering where needed
* query caching
* lazy loading
* limited result counts

---

# No Overengineering

Do not introduce:

* Redux
* GraphQL
* Redis
* Kafka
* microservices
* WebSockets

unless a real requirement appears.
