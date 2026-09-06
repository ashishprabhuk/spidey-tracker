# Database Schema

## Database

PostgreSQL

## ORM

Prisma

---

# Entities

## Target

Represents a fictional tracked target.

Fields:

```text
id
targetCode
name
status
latitude
longitude
confidence
lastDetectedAt
createdAt
updatedAt
```

---

## Activity

Represents fictional activity near a target.

Fields:

```text
id
type
title
description
latitude
longitude
severity
occurredAt
isSimulated
createdAt
```

Activity types:

```text
POLICE
TRAFFIC
CROWD
EMERGENCY
ANOMALY
```

---

## PaniPuriLocation

Represents a pani puri location.

Fields:

```text
id
name
latitude
longitude
rating
isOpen
description
createdAt
updatedAt
```

---

## TrackerSession

Represents a user's tracker interaction.

Fields:

```text
id
sessionCode
status
startedAt
completedAt
createdAt
```

Statuses:

```text
IDLE
SCANNING
SIGNAL_DETECTED
TARGET_LOCKED
ERROR
```

---

# Relationships

```text
TrackerSession
     │
     └── Target

Target
     │
     └── Activity

PaniPuriLocation
     │
     └── independent map entity
```

---

# Constraints

## Target

`targetCode` must be unique.

## PaniPuriLocation

Latitude must be between:

```text
-90 and 90
```

Longitude:

```text
-180 and 180
```

## Activity

`isSimulated` must always be true in version 1.

---

# Important Safety Rule

The database must not contain real personally identifying information.

All tracker targets are fictional.

All activity data is simulated.

---

# Seed Data

Create deterministic seed data.

Example target:

```text
targetCode: SPDR-TN-001
name: Spider-Man
status: ACTIVE
```

Example activity:

```text
type: TRAFFIC
title: Unusual traffic buildup
severity: LOW
isSimulated: true
```

Example pani puri:

```text
name: Pani Puri Point
rating: 4.6
isOpen: true
```

Seed enough locations to make the map visually interesting.

Target coordinates should be within a configured demo area in Tamil Nadu.

Do not use fake coordinates that imply an actual real person's location.
