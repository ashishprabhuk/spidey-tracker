# API and Data Contracts

## Principle

The frontend must not scatter raw database queries across arbitrary components.

Create typed service functions.

---

# Signal Service

## getNearbySignals()

Input:

```ts
{
  latitude: number;
  longitude: number;
  radiusMeters: number;
}
```

Output:

```ts
Signal[]
```

---

# searchSignals()

Input:

```ts
{
  latitude: number;
  longitude: number;
  radiusMeters: number;
  category?: SignalCategory;
}
```

Output:

```ts
Signal[]
```

---

# createSignal()

Input:

```ts
{
  title: string;
  description: string;
  motto?: string;
  category: SignalCategory;
  priority: SignalPriority;
  icon: string;
  latitude: number;
  longitude: number;
  durationMinutes: number;
}
```

Output:

```ts
Signal
```

---

# endSignal()

Input:

```ts
{
  signalId: string;
}
```

Output:

```ts
Signal
```

---

# getMySignals()

Returns the authenticated anonymous user's signals.

---

# Signal Response

```ts
{
  id: string;

  title: string;
  description: string | null;
  motto: string | null;

  category: SignalCategory;
  priority: SignalPriority;
  icon: string;

  latitude: number;
  longitude: number;

  createdAt: string;
  expiresAt: string;
  endedAt: string | null;

  status: SignalStatus;

  distanceMeters?: number;

  isOwner: boolean;
}
```

---

# Validation

Title:

```text
1–80 characters
```

Description:

```text
0–300 characters
```

Motto:

```text
0–120 characters
```

Duration:

```text
15–1440 minutes
```

Latitude:

```text
-90 to 90
```

Longitude:

```text
-180 to 180
```

---

# Error Model

```ts
{
  code: string;
  message: string;
}
```

Examples:

```text
LOCATION_REQUIRED
INVALID_COORDINATES
SIGNAL_NOT_FOUND
NOT_SIGNAL_OWNER
SIGNAL_EXPIRED
RATE_LIMITED
VALIDATION_ERROR
DATABASE_ERROR
```
