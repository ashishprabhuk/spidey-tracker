# Testing & QA

## Stack

* Vitest
* React Testing Library
* Playwright

---

# Unit Tests

Test:

* duration validation
* coordinate validation
* signal status
* expiration calculation
* remaining lifetime
* priority validation
* category validation

---

# Integration Tests

Test:

### Create signal

```text
anonymous user
→ create signal
→ database
```

### End signal

```text
owner
→ end
→ status changed
```

### Ownership

```text
user A
→ cannot end user B signal
```

### Expiration

```text
expired signal
→ not returned by active query
```

---

# E2E Tests

## E2E-001

Open application.

Expected:

* map visible
* search visible
* report button visible

---

## E2E-002

Grant location permission.

Expected:

* map centers on user
* nearby signals load

---

## E2E-003

Deny location.

Expected:

* application remains usable
* manual exploration available

---

## E2E-004

Create signal.

Expected:

```text
composer
→ validation
→ publish
→ signal appears
```

---

## E2E-005

Search location.

Expected:

```text
search
→ location selected
→ map moves
→ signals refresh
```

---

## E2E-006

End signal.

Expected:

```text
MY SIGNAL
→ END
→ disappears
```

---

## E2E-007

Expiration.

Use test-controlled time.

Expected:

```text
ACTIVE
→ expiry
→ no longer visible
```

---

# Security Tests

Verify:

* RLS
* ownership
* anonymous identity
* unauthorized modification
* invalid coordinates
* excessive duration

---

# Mobile QA

Test:

* touch map
* bottom sheet
* signal creation
* search
* marker selection

---

# Quality Gates

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

All must pass before release.
