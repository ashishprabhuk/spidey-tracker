# Testing & QA Plan

## Testing Stack

* Vitest
* React Testing Library
* Playwright

---

# Unit Tests

Test:

* tracker state transitions
* distance calculation
* coordinate validation
* pani puri filtering
* activity filtering
* API validation
* service behavior

---

# Integration Tests

Test:

```text
API → service → database
```

Verify:

* successful target retrieval
* invalid target
* activity retrieval
* pani puri retrieval
* tracker session creation

---

# E2E Tests

## E2E-001

Open application.

Expected:

* application renders
* tracker controls visible
* map visible

---

## E2E-002

Click Locate Spider-Man.

Expected:

```text
IDLE
→ SCANNING
→ SIGNAL DETECTED
→ TARGET LOCKED
```

---

## E2E-003

Enable TN Mode.

Expected:

* TN mode active
* TN controls visible

---

## E2E-004

Open pani puri.

Expected:

* pani puri markers visible
* selecting marker displays details

---

## E2E-005

Mobile viewport.

Expected:

* no horizontal overflow
* controls usable
* map usable
* target panel accessible

---

# Quality Gates

Before merge:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

All must pass.

---

# Coverage

Target:

* Services: 90%+
* Utilities: 90%+
* Critical UI logic: 80%+
* Overall: 80%+

Coverage is a guide, not a reason to write meaningless tests.

---

# Visual QA

Manually verify:

* desktop
* mobile
* scanning state
* target lock
* TN mode
* pani puri
* error state
* loading state
* reduced motion
