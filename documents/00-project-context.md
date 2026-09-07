# SPIDEY SIGNAL

## Project Codename

`SPIDEY-SIGNAL`

## Product Category

Anonymous temporary location-signal network.

## One-Line Description

A map-based community application where people can anonymously publish temporary signals about things happening at a location, allowing other people to discover those signals nearby.

---

# The Inspiration

The original concept is inspired by the fictional Spider-Man technology associated with Ned.

In the movie concept:

> Ned develops an application to determine Spider-Man's current location.

This project takes that idea and transforms it into an Indian/community-focused product.

Instead of tracking Spider-Man, the application tracks:

> **temporary signals from the community.**

---

# Product Concept

When a user opens the application:

1. Request their location.
2. Center the map around their current location.
3. Retrieve active temporary signals around that location.
4. Display those signals anonymously.
5. Allow the user to search another location.
6. Allow the user to create a temporary signal.
7. Allow the user to choose an icon, category, title, priority, description and duration.
8. Allow the creator to manually end their own signal.
9. Automatically expire signals after their expiry time.

---

# Core Product Statement

> **See what's happening around you, right now.**

---

# Important Concept

A signal is NOT a permanent place.

A signal represents:

> **Something a community member observed at a location for a limited amount of time.**

Examples:

* Traffic police
* Traffic jam
* Road work
* Accident
* Water logging
* Event
* Crowd
* Parking availability
* Pani puri
* Road hazard
* Rain
* Checkpoint
* Local activity

---

# Product Loop

```text
OBSERVE
   ↓
REPORT
   ↓
DISCOVER
   ↓
ACT
   ↓
SIGNAL EXPIRES
   ↓
MAP REFRESHES
   ↓
NEW SIGNALS
```

---

# Primary User Experience

The map is the primary interface.

The user should not feel like they are filling out a form.

They should feel like they are opening a live intelligence/radar system.

---

# Anonymous Model

Users do not need public profiles for V1.

Other users see:

```text
Anonymous Reporter
```

or:

```text
Unknown Signal
```

The backend may maintain an anonymous internal identity for ownership and abuse prevention.

That internal identity must never expose the user's personal identity publicly.

---

# Signal

Every signal has:

* unique ID
* anonymous owner
* title
* category
* icon
* priority
* description
* motto
* latitude
* longitude
* created time
* expiry time
* status

---

# Signal States

```text
ACTIVE
ENDED
EXPIRED
```

---

# Expiration Principle

Signals are temporary by design.

When:

```text
current_time >= expires_at
```

the signal is no longer active.

Expired signals must not appear in normal map results.

---

# Global Availability

Signals are globally available.

However, the application should only load signals relevant to the current map viewport / requested geographic radius.

The user can search or navigate to another area to discover signals there.

---

# V1 Goals

## Goal 1

Create a compelling map-first experience.

## Goal 2

Allow anonymous temporary reporting.

## Goal 3

Allow nearby discovery.

## Goal 4

Make expiration a core product mechanic.

## Goal 5

Make the experience visually compelling enough for social-media recording.

---

# V1 Non-Goals

Do not build:

* permanent social profiles
* messaging
* follower system
* likes
* comments
* real-time person tracking
* government integrations
* police databases
* emergency dispatch
* surveillance
* facial recognition
* exact person tracking
* background location tracking

---

# Important Safety Principle

Community signals are user-generated observations.

The application must never represent them as verified government, police or emergency information.

Where appropriate, show:

> Community reported — verify independently.

---

# Product Personality

The product combines:

* futuristic technology
* Indian context
* community utility
* playful humor
* Spider-Man-inspired visual storytelling

The UI should feel like:

> "Ned built this, but someone in India got carried away."

---

# Brand Personality

Technical.

Cinematic.

Playful.

Local.

Slightly absurd.

Self-aware.

---

# Success Criteria

A new user should be able to:

1. Open the application.
2. Grant location access.
3. See nearby active signals.
4. Understand what each signal represents.
5. Search another area.
6. Create a signal.
7. See it appear on the map.
8. End it manually.
9. Watch it disappear automatically after expiry.

All of this should require minimal onboarding.
