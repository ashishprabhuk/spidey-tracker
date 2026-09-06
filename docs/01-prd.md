# Product Requirements Document

## 1. Product

TN Spider Tracker

## 2. Product Type

Interactive fictional web application / creative coding project.

---

# 3. Problem

Developers and creators often build technically functional applications that are visually uninteresting.

This project solves that by combining:

* software development
* pop culture
* interactive maps
* local Tamil Nadu references
* cinematic UI

into one interactive experience.

---

# 4. User Stories

## US-001 — Open Tracker

As a user, I want to immediately understand what the application does.

### Acceptance Criteria

* Application loads within a reasonable time.
* Tracker interface is immediately visible.
* Primary action is obvious.
* User does not need onboarding.

---

## US-002 — Locate Spider-Man

As a user, I want to activate the tracker and locate the fictional Spider-Man target.

### Acceptance Criteria

* Button exists.
* Clicking it starts scanning.
* Scanning state is visually obvious.
* A target is eventually detected.
* Map centers on the target.
* Target marker is visually distinct.
* State changes to TARGET LOCKED.

---

## US-003 — View Target

As a user, I want to inspect the detected target.

### Acceptance Criteria

Target information includes:

* Target ID
* Status
* Coordinates
* Last detected time
* Confidence value

All values are fictional/demo values.

---

## US-004 — Enable Tamil Nadu Mode

As a user, I want to enable Tamil Nadu Mode.

### Acceptance Criteria

* Toggle is visible.
* Toggle has clear ON/OFF state.
* Enabling it reveals TN-specific functionality.
* UI provides visual feedback.

---

## US-005 — View Pani Puri

As a user, I want to find nearby pani puri.

### Acceptance Criteria

* Pani puri markers appear on the map.
* User can click markers.
* Location information appears.
* Distance is displayed.
* Results are deterministic in demo mode.

---

## US-006 — View Activity

As a user, I want to see fictional activity around the target.

### Acceptance Criteria

* Activity markers can appear.
* Activity has a category.
* Activity has timestamp.
* Activity is clearly marked as simulated.
* No real law enforcement data is used.

---

# 5. Functional Requirements

## FR-001

Application must provide a tracker dashboard.

## FR-002

Application must provide an interactive map.

## FR-003

Application must maintain tracker state.

## FR-004

Application must support simulated asynchronous scanning.

## FR-005

Application must display target markers.

## FR-006

Application must support TN Mode.

## FR-007

Application must display pani puri locations.

## FR-008

Application must display fictional activity.

## FR-009

Application must handle loading states.

## FR-010

Application must handle errors gracefully.

---

# 6. State Machine

Tracker:

```text
IDLE
 ↓
SCANNING
 ↓
SIGNAL_DETECTED
 ↓
TARGET_LOCKED
```

Failure:

```text
SCANNING
 ↓
ERROR
 ↓
IDLE
```

---

# 7. Edge Cases

The application must handle:

* map loading failure
* API failure
* no pani puri results
* invalid target data
* repeated tracker clicks
* tracker activation while already scanning
* slow network
* mobile screen
* desktop screen
* browser refresh

---

# 8. Out of Scope

Version 1 excludes:

* real authentication
* real user accounts
* payments
* real police APIs
* real surveillance
* real person tracking
* real Spider-Man tracking
* social login
* admin dashboard
* complex permissions
* production-scale multi-tenancy

---

# 9. Definition of Done

A feature is complete only when:

* UI implemented
* state implemented
* validation implemented
* loading state implemented
* error state implemented
* responsive behavior implemented
* tests written
* lint passes
* type checking passes
* production build succeeds
