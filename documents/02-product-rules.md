# Product Rules

## Rule 1 — Signals Are Temporary

Every signal must have an expiration time.

No permanent signals in V1.

---

## Rule 2 — Maximum Lifetime

A signal cannot remain active longer than 24 hours.

---

## Rule 3 — Owner Control

The creator can end their signal before expiration.

---

## Rule 4 — Anonymous by Default

Public UI must not expose:

* name
* email
* phone number
* account ID
* IP address
* exact user identity

---

## Rule 5 — No Background Tracking

Opening the application must NOT create continuous location tracking.

The application may request location when needed.

---

## Rule 6 — Explicit Publishing

The user's location must never become a public signal automatically.

A user must explicitly press:

```text
PUBLISH SIGNAL
```

---

## Rule 7 — Location Editing

Before publishing, the user may move the signal location.

---

## Rule 8 — Expired Signals

Expired signals:

* must not appear on normal maps
* must not appear in search results
* must not count as active
* may be archived internally

---

## Rule 9 — Priority

Priority is user-provided.

It does not mean the signal is verified.

---

## Rule 10 — Community Information

User-generated signals should be presented as observations.

Use:

> Community reported

when appropriate.

---

## Rule 11 — Abuse Prevention

The system must support:

* rate limiting
* signal ownership
* reporting
* moderation hooks
* duplicate detection hooks

Full moderation tooling is out of scope for V1.

---

## Rule 12 — No Illegal Surveillance

Do not implement:

* real person tracking
* covert tracking
* police database access
* license plate recognition
* facial recognition
* private location harvesting

---

## Rule 13 — Geographic Queries

Never load the entire global signal database into the frontend.

Query only the required geographic area.

---

## Rule 14 — Deterministic Demo Mode

A developer/demo mode may provide deterministic sample signals.

Demo signals must be clearly distinguishable internally from real community reports.

---

## Rule 15 — Midnight Refresh

Signals that reach their expiry time are inactive.

The application should naturally appear refreshed the next day because expired signals are no longer returned.

The system must not require a literal database wipe at midnight.

---

# Principle

The map represents:

> **temporary community knowledge, not permanent truth.**
