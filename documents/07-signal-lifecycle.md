# Signal Lifecycle

## Lifecycle

```text
DRAFT
  ↓
PUBLISHED
  ↓
ACTIVE
  ↓
       ┌──────────────┐
       ↓              ↓
     ENDED          EXPIRED
```

---

# DRAFT

Exists only in client state.

Not visible publicly.

---

# PUBLISHED

Signal successfully inserted into database.

Immediately becomes:

```text
ACTIVE
```

---

# ACTIVE

Signal appears on the map.

Conditions:

```text
status = ACTIVE
expires_at > NOW()
```

---

# ENDED

Creator manually ends signal.

Set:

```text
status = ENDED
ended_at = NOW()
```

---

# EXPIRED

Signal reaches:

```text
expires_at
```

It is no longer active.

---

# Important

Expiration does not require an immediate database mutation.

The public query can determine inactivity from time.

A cleanup job may later mark:

```text
ACTIVE → EXPIRED
```

for historical consistency.

---

# Remaining Time

Calculate:

```text
expiresAt - currentTime
```

Frontend should update the visible countdown periodically.

---

# Countdown

Examples:

```text
EXPIRES IN 2h 14m
```

```text
EXPIRES IN 42m
```

```text
EXPIRES IN 8m
```

```text
EXPIRES SOON
```

---

# Signal Stability

Optional visual representation:

```text
████████░░ 78%
```

This is calculated from remaining lifetime.

It is a UI metaphor, not a factual confidence measurement.

---

# Expiration UI

When a signal expires:

```text
SIGNAL EXPIRED
```

Then remove it from the map.

---

# Manual End

Owner clicks:

```text
END SIGNAL
```

Confirmation:

```text
END THIS SIGNAL?

It will immediately disappear
from the community map.

[ CANCEL ] [ END SIGNAL ]
```

---

# Race Conditions

The backend must reject attempts to modify a signal that:

* does not exist
* has expired
* is not owned by the current anonymous identity

---

# Refresh

When the app refreshes:

1. load active signals
2. exclude expired signals
3. restore own active signals
4. continue countdowns
