# Database Schema

## Database

PostgreSQL

## Extensions

Enable:

```text
PostGIS
```

---

# Entity: Anonymous User

Represents an anonymous application identity.

```text
anonymous_users
```

Fields:

```text
id UUID PRIMARY KEY
created_at TIMESTAMPTZ
last_seen_at TIMESTAMPTZ
status
```

The ID is internal.

It must never be displayed publicly.

---

# Entity: Signal

```text
signals
```

Fields:

```text
id UUID PRIMARY KEY

anonymous_user_id UUID

category TEXT
title TEXT
description TEXT
motto TEXT

icon TEXT
priority TEXT

location GEOGRAPHY(POINT, 4326)

created_at TIMESTAMPTZ
expires_at TIMESTAMPTZ
ended_at TIMESTAMPTZ

status TEXT

is_demo BOOLEAN DEFAULT FALSE

created_by_session UUID
```

---

# Signal Status

```text
ACTIVE
ENDED
EXPIRED
```

---

# Category

Recommended enum:

```text
SAFETY
TRAFFIC
WEATHER
ENVIRONMENT
COMMUNITY
FOOD
FUN
OTHER
```

---

# Priority

```text
LOW
MEDIUM
HIGH
```

---

# Signal Ownership

Only the anonymous owner can:

* end their signal
* modify their signal where permitted

Other users cannot modify it.

---

# Indexes

Create indexes for:

```text
anonymous_user_id
status
expires_at
created_at
```

Create a spatial index on:

```text
location
```

using PostGIS.

---

# Geographic Query

Nearby signals should use PostGIS.

Conceptually:

```sql
ST_DWithin(
  location,
  user_location,
  radius
)
```

---

# Active Signal Rule

Every public signal query must enforce:

```text
status = ACTIVE
AND expires_at > NOW()
```

---

# Signal Ordering

Default ordering:

1. distance
2. priority
3. recency

Do not allow old signals to dominate newer observations.

---

# Signal History

V1 may retain expired records for:

* analytics
* abuse investigation
* debugging

But expired records must not be exposed through the normal public signal query.

---

# Recommended RLS Rules

Users may:

### SELECT

Read active public signals.

### INSERT

Create a signal associated with their anonymous identity.

### UPDATE

Only update their own signal.

### DELETE

Only delete/end their own signal where permitted.

---

# Privacy

Never store unnecessary personal information.

Do not store:

* phone number
* name
* email
* precise continuous location history

---

# Seed Data

Development seed data should include:

* traffic police
* traffic jam
* road work
* water logging
* pani puri
* event
* crowd
* road hazard

All development signals must use:

```text
is_demo = true
```
