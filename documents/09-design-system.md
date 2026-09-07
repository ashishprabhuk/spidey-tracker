# SPIDEY SIGNAL — UI/UX DESIGN SYSTEM

## 1. PRODUCT IDENTITY

Build **SPIDEY SIGNAL** as a futuristic community intelligence terminal that combines:

* Interactive world map
* Anonymous temporary community signals
* Location-based signal discovery
* Real-time signal states
* Temporary event/activity reporting
* Superhero-inspired tracking technology
* Retro arcade interface styling
* Modern map interaction

The original inspiration is the fictional idea of a superhero tracking application.

However, the actual product is:

> **An anonymous, temporary community-signal network for discovering what is happening around you right now.**

The interface should feel like:

> **A secret intelligence terminal from the future, redesigned as a retro arcade command system for the real world.**

The product personality should combine:

**Retro Arcade + Sci-Fi HUD + Tactical Tracker + Interactive Map + Indian Playfulness**

The design should feel immersive, mysterious, technical and fun without becoming a generic cyberpunk dashboard.

---

# 2. CORE PRODUCT CONCEPT

The central object in the application is a **SIGNAL**.

A signal represents something a person has observed at a location and temporarily shared with the community.

Examples:

* 🚓 Traffic Police
* 🚗 Vehicle Breakdown
* ⚠️ Accident
* 🚧 Road Work
* 🌧️ Heavy Rain
* 💧 Water Logging
* 🎉 Local Event
* 🏏 Cricket
* ☕ Chai
* 🥤 Pani Puri
* 📍 General Activity

Signals are:

* Anonymous
* Temporary
* Location-based
* Community-generated
* Time-limited
* Unverified unless explicitly stated otherwise

The system should communicate:

> **SEE → REPORT → DISCOVER → ACT → EXPIRE**

A signal is not a permanent place.

It is temporary community knowledge.

---

# 3. PRIMARY VISUAL DIRECTION

## Map First

The **map is the hero**.

The application should never feel like a dashboard with a map inserted into it.

Instead:

> **The interface is a tracking machine projected on top of the map.**

Target visual hierarchy:

```text
MAP
 ↓
GRID / GEO OVERLAY
 ↓
SIGNALS
 ↓
RADAR / TARGET EFFECTS
 ↓
HUD
 ↓
CONTROL MODULES
```

The map should occupy approximately:

```text
70–85% of the visual experience
```

Panels should float over the map rather than permanently dividing the application into dashboard columns.

Avoid:

* Generic SaaS dashboards
* Corporate admin interfaces
* Google Maps-like presentation
* Excessive cards
* Huge gradients
* Excessive glassmorphism
* Excessive rounded corners
* Decorative animations with no purpose

---

# 4. DESIGN LANGUAGE

The visual language is:

### RETRO ARCADE

* Pixel-inspired borders
* Chunky controls
* Arcade typography
* CRT influence
* Technical status indicators

### SCI-FI HUD

* Thin information lines
* Coordinates
* Target reticles
* Scan indicators
* Technical metadata
* Geometric overlays

### TACTICAL TRACKER

* Priority states
* Signal detection
* Radar
* Search
* Lock-on interactions
* Status indicators

### MODERN MAP

* Smooth pan
* Pinch zoom
* Search
* Clustering
* Accurate geographic interaction
* Responsive controls

### INDIAN COMMUNITY PERSONALITY

Use subtle local references:

* Pani Puri
* Chai
* Cricket
* Traffic
* Monsoon
* Local events
* Indian streets and activity

Indian identity should feel clever and natural.

Do not turn every component into an India stereotype.

---

# 5. COLOR SYSTEM

Create a centralized design-token system.

## Base

```text
Background:
#07111F
#0B1728
#101D2D

Panel:
#0D2235
#102B40

Map:
Dark navy / blue-black
```

## Primary UI

```text
Primary Blue:
#28A9D6
#3AB7DD

Bright Cyan:
#8DEBFF

Deep Blue:
#164B8C
#1C55A0
```

## Signal States

```text
Red:
#EF4B45
#FF625A

Dark Red:
#9F2929
```

Use red primarily for:

* High priority
* Danger
* Accident
* Critical signal states
* Target-style interactions

## Interaction

```text
Orange:
#FF9F43

Yellow:
#FFD166
```

Use for:

* Medium priority
* Activity
* Warnings
* Pani Puri
* Attention states

## Success

```text
Green:
#63D47A
```

Use for:

* Active
* Successfully published
* GPS available
* Connected states

## Text

```text
Primary:
#E8F7FF

Secondary:
#8BA9B8

Muted:
#536B78
```

Do not use every color simultaneously.

**Color communicates state.**

---

# 6. TYPOGRAPHY

Use two typography systems.

## Display / Arcade Font

Use an arcade-inspired font for:

* Application branding
* Major section headings
* Tracker states
* Special modes
* Large labels

Characteristics:

* Squared
* Geometric
* Technical
* Slightly retro
* Readable

Suitable directions:

```text
Press Start 2P
Pixelify Sans
Silkscreen
VT323
```

Do not use heavily pixelated fonts for long body text.

## Technical Font

Use a clean monospace font for:

* Coordinates
* IDs
* Timestamps
* Signal metadata
* Status
* Event logs
* Countdown
* Technical information

Suitable directions:

```text
JetBrains Mono
IBM Plex Mono
Space Mono
```

---

# 7. APPLICATION FRAME

## Desktop

The interface should be spatially arranged like:

```text
┌──────────────────────────────────────────────────────┐
│ SPIDEY SIGNAL       SCANNING      ● GPS    TN MODE  │
├──────────────────────────────────────────────────────┤
│                                                      │
│   SEARCH                                             │
│   ┌──────────────────────────────┐                   │
│   │ Search this area...          │                   │
│   └──────────────────────────────┘                   │
│                                                      │
│                         MAP                          │
│                                                      │
│              🚓                                      │
│                         ◉                            │
│                                                      │
│                         🔴                           │
│                                           🟡         │
│                                                      │
│                                   RADAR              │
│                                                      │
│                         [+ REPORT SIGNAL]            │
│                                                      │
├──────────────────────────────────────────────────────┤
│ ● ONLINE    GPS ●    SIGNALS 12       ACTIVE 08     │
└──────────────────────────────────────────────────────┘
```

The map should visually dominate.

Panels should appear as **HUD windows**, **terminal modules**, or **floating overlays**.

---

# 8. HEADER

Create a compact HUD-style header.

Example:

```text
SPIDEY SIGNAL // SS-01

● SYSTEM ONLINE
GPS ACTIVE
SIGNALS 12
TN MODE OFF
```

Possible central states:

```text
READY
SCANNING
SIGNAL DETECTED
SIGNAL SELECTED
SEARCHING
PUBLISHING
```

Do not use huge headers.

The header should feel like a machine status strip.

---

# 9. PRIMARY NAVIGATION

Navigation should remain minimal.

Possible controls:

```text
MAP
MY SIGNALS
SETTINGS
```

Navigation should never compete with the map.

On mobile, use a compact bottom navigation or HUD control strip.

---

# 10. SEARCH

Search is one of the primary interactions.

Preferred placeholder:

```text
Search this area...
```

Alternative:

```text
Search nearby...
```

Search should support:

* Locations
* Areas
* Landmarks
* Nearby signals
* Categories where practical

Searching another area should move the map to that area and load active signals around it.

The application should query geographically rather than attempting to display every global signal simultaneously.

---

# 11. PRIMARY CTA

The main action is:

```text
+ REPORT SIGNAL
```

Never use:

```text
+ ADD LOCATION
```

The user is reporting an observation, not creating a permanent place.

The CTA should always remain accessible.

Desktop:

* Floating bottom-right
* HUD button
* Persistent

Mobile:

* Floating action button
* Bottom action
* Easy thumb access

---

# 12. MAP SYSTEM

The map should use a dark tactical visual treatment.

Characteristics:

* Dark navy land
* Subdued roads
* Low-contrast labels
* Cyan geographic details
* Blue road/network lines
* Subtle coordinate grid
* Tactical overlays
* Minimal map noise

The map should not visually resemble a conventional navigation app.

It should feel like:

> **A geographic intelligence screen.**

---

# 13. MAP OVERLAY

Add a very subtle tactical grid.

Example:

```text
       │       │       │
───────┼───────┼───────┼──────
       │       │       │
───────┼───────┼───────┼──────
       │       │       │
```

Keep opacity extremely low.

Optional metadata:

```text
LAT 13.0827
LON 80.2707
SECTOR CHN-07
```

Only display technical information where it adds to the experience.

Do not clutter the map.

---

# 14. RADAR SYSTEM

The radar is a signature visual element.

Place it as a subtle floating HUD element, preferably near the lower-right area.

The radar may contain:

* Circular grid
* Sweep line
* Signal blips
* Distance rings
* User location
* Active signal indicators

Example:

```text
        ╭───────────╮
      ╱      │       ╲
     │    ·  │  ·     │
     │───────●───────│
     │       │     · │
      ╲      │      ╱
        ╰───────────╯
```

The radar is primarily a visual metaphor.

It should not imply that the system can physically detect people or objects.

---

# 15. USER LOCATION

The user's location should use:

```text
CYAN / BLUE
```

with a subtle pulsing ring.

Example:

```text
       ◉
    ───────
  ──── YOU ────
    ───────
```

Location permission should be requested only when needed.

Do not continuously broadcast or track the user's location in the background.

---

# 16. SIGNAL MARKERS

Every signal marker should contain:

* Icon
* Category identity
* Priority indication
* Subtle pulse
* Optional expiry ring

Example:

```text
🚓
```

with a surrounding technical indicator.

Markers should never look like generic map pins.

They should feel like **detected signals**.

---

# 17. SIGNAL VISUAL STATES

## LOW

Subtle presence.

Minimal glow.

Small marker.

## MEDIUM

More noticeable.

Stronger marker treatment.

## HIGH

Prominent.

Strong visual emphasis.

However:

> **HIGH PRIORITY does not mean VERIFIED.**

Never visually imply that a community signal is official emergency information simply because it has high priority.

---

# 18. SIGNAL EXPIRY

Time is fundamental to the product.

Every active signal should communicate its remaining lifetime.

Examples:

```text
● ACTIVE
Expires in 42m
```

or:

```text
ACTIVE // 00:42:17
```

Use:

* Countdown
* Expiry ring
* Subtle fading near expiration

Possible states:

```text
ACTIVE
EXPIRING SOON
ENDED
EXPIRED
```

Expiration should be server-controlled.

The frontend countdown is a visual representation of the actual expiry timestamp.

---

# 19. SELECTED SIGNAL

When a signal is selected, open a floating HUD panel.

Example:

```text
╔══════════════════════════════╗
║ SIGNAL // TRAFFIC POLICE     ║
╠══════════════════════════════╣
║                              ║
║ 🚓                           ║
║                              ║
║ TRAFFIC POLICE               ║
║ HIGH PRIORITY                ║
║                              ║
║ "Checking vehicles ahead."   ║
║                              ║
║ 400m                         ║
║                              ║
║ ● ACTIVE                     ║
║ Expires in 1h 48m            ║
║                              ║
║ Anonymous Reporter           ║
║                              ║
║ COMMUNITY SIGNAL             ║
║ NOT VERIFIED                 ║
╚══════════════════════════════╝
```

Information hierarchy:

1. Icon
2. Title
3. Priority
4. Description
5. Distance
6. Expiry
7. Anonymous reporter
8. Verification disclaimer

---

# 20. SIGNAL COMPOSER

Creating a signal should feel like operating a compact field terminal.

Desktop:

```text
Floating side panel
```

Mobile:

```text
Bottom sheet
```

Sections:

```text
ICON
CATEGORY
TITLE
DESCRIPTION
MOTTO
PRIORITY
DURATION
LOCATION
```

The form should remain fast.

A user should be able to report something in seconds.

---

# 21. ICON PICKER

Initial icon system:

```text
🚓
🚗
⚠️
🚧
🔥
💧
🌧️
🎉
🏏
🥤
☕
📍
```

The architecture should support adding more icons/categories later.

Icons should be treated as part of the signal identity rather than decorative emojis scattered throughout the UI.

---

# 22. CATEGORY SYSTEM

Initial categories:

### SAFETY

```text
Traffic Police
Accident
Road Hazard
Checkpoint
Emergency
```

### TRAFFIC

```text
Traffic Jam
Heavy Traffic
Road Work
Diversion
Vehicle Breakdown
```

### WEATHER / ENVIRONMENT

```text
Heavy Rain
Water Logging
Flooding
Fallen Tree
Poor Road Condition
```

### COMMUNITY

```text
Event
Crowd
Parking
Local Activity
Lost & Found
```

### FOOD / FUN

```text
Pani Puri
Chai
Food
Cricket
Celebration
```

The system must remain extensible.

---

# 23. PRIORITY

Three levels:

```text
LOW
MEDIUM
HIGH
```

Visual language:

```text
LOW     → subtle
MEDIUM  → noticeable
HIGH    → prominent
```

Priority is user-provided metadata.

It does not represent system verification.

---

# 24. DURATION

Signal duration should be obvious during creation.

Suggested presets:

```text
15 MIN
30 MIN
1 HOUR
2 HOURS
4 HOURS
UNTIL MIDNIGHT
```

Maximum:

```text
24 HOURS
```

The creator can manually end their signal before expiration.

Avoid requiring users to delete signals manually.

The system automatically expires them.

---

# 25. LOCATION SELECTION

Default behavior:

```text
Current location
        ↓
Map centers on user
        ↓
Pin appears
        ↓
User can adjust location
        ↓
Publish signal
```

The user should always be able to adjust the location before publishing.

This is important because the observation location may differ slightly from the user's current GPS coordinate.

---

# 26. MY SIGNALS

"My Signals" should display the user's currently active and recent signals without exposing their identity publicly.

Example:

```text
MY SIGNALS

● ACTIVE
TRAFFIC POLICE
Expires in 38m

● ACTIVE
HEAVY RAIN
Expires in 1h 12m

ENDED
ROAD HAZARD
Ended 24m ago
```

Active signals should provide:

```text
END SIGNAL
```

The user must be able to manually end their own signal.

---

# 27. ANONYMOUS IDENTITY

Public identity should remain:

```text
Anonymous Reporter
```

or:

```text
Unknown Signal
```

Do not display:

* Name
* Email
* Profile
* Phone number
* Personal identity

Internally, the system may associate a signal with an anonymous session/user identity for ownership and abuse prevention.

That identity must never become public UI.

---

# 28. SIGNAL LIFECYCLE

The visual system should represent:

```text
DRAFT
   ↓
PUBLISHED
   ↓
ACTIVE
   ↓
 ┌───────┐
 ↓       ↓
ENDED   EXPIRED
```

The UI should respond to real application state.

For example:

```text
CREATE
 ↓
PUBLISHING
 ↓
SIGNAL ACTIVE
 ↓
COUNTDOWN
 ↓
EXPIRING SOON
 ↓
EXPIRED
```

---

# 29. SCANNING EXPERIENCE

The application may retain the fictional tracker feeling through a fast scanning sequence.

Use:

```text
> INITIALIZING
> CONNECTING
> SCANNING SECTOR
> SIGNALS DETECTED
> ANALYZING
> MAP UPDATED
```

Do not make users wait through a long cinematic animation.

The sequence should feel:

```text
FAST
TECHNICAL
PRECISE
MECHANICAL
```

The actual underlying operation should be a real signal query.

---

# 30. TARGET LOCK

The old fictional "target lock" concept should be adapted carefully.

Instead of implying that the application has found a person, use target-lock visuals when selecting a **signal**.

Example:

```text
SIGNAL DETECTED

      ◉

SIGNAL SELECTED
```

Use:

* Expanding ring
* Reticle
* Coordinate label
* Camera movement
* Signal panel opening

Do not imply human surveillance or real-person tracking.

---

# 31. PANI PURI MODE

Pani Puri can remain as a playful signature feature.

When activated:

```text
╔══════════════════════════╗
║ PANI PURI SCANNER        ║
╠══════════════════════════╣
║                          ║
║ SEARCHING SECTOR...      ║
║                          ║
║       ◉                  ║
║     ╱   ╲                ║
║    ◉     ◉               ║
║                          ║
║ 12 SIGNALS FOUND         ║
╚══════════════════════════╝
```

The map displays relevant Pani Puri signals/locations.

The experience should feel like a humorous secret tracker mode.

It should still use the same visual language as the main system.

---

# 32. PANI PURI DETAIL

Example:

```text
PANI PURI DETECTED

DISTANCE
120 M

STATUS
ACTIVE

TYPE
STREET VENDOR

[ VIEW SIGNAL ]
```

If real business information such as ratings or opening hours is shown, it must come from actual data rather than fictional tracker data.

---

# 33. TN MODE

TN Mode should feel like a secret regional mode.

Activation:

```text
TN MODE
STATUS // OFF

[ ENABLE ]
```

Active:

```text
TN MODE
████████████████

STATUS
ACTIVE

REGION
TAMIL NADU

SIGNALS
47
```

Use a restrained regional accent.

Do not recolor the entire application.

TN Mode should primarily alter:

* Regional filtering
* Copy
* Signal examples
* Optional playful metadata
* Regional context

It should not become a completely different theme.

---

# 34. EVENT LOG

A compact event log can reinforce the terminal identity.

Example:

```text
SYSTEM EVENT LOG

22:14:03 > TRACKER INITIALIZED
22:14:05 > GPS LOCATION ACQUIRED
22:14:07 > SCANNING SECTOR
22:14:10 > 12 SIGNALS DETECTED
22:14:11 > SIGNAL SELECTED
```

The event log should describe actual application events.

Do not generate fake technical events that imply functionality the application does not perform.

Newest events appear at the bottom.

---

# 35. STATUS BAR

Persistent compact status:

```text
● ONLINE
● GPS
● SIGNALS 12
● ACTIVE 08
○ TN
```

Possible metadata:

```text
SYSTEM // ONLINE
GPS // ACTIVE
SIGNALS // 12
SECTOR // CHN-07
```

Do not claim:

```text
SATELLITE CONNECTED
```

unless the application genuinely uses a satellite connection.

Fictional language should be clearly treated as thematic UI rather than false technical claims.

---

# 36. MAP CONTROLS

Replace default controls where necessary.

Custom controls:

```text
[ + ]
[ − ]

[ ◉ LOCATE ME ]

[ ⌖ SIGNALS ]

[ ⛶ FULLSCREEN ]
```

Controls should feel like physical terminal buttons.

They must still remain accessible and understandable.

Minimum mobile touch target:

```text
44 × 44px
```

---

# 37. MOBILE EXPERIENCE

At:

```text
375px
390px
```

the map remains the primary visual.

Recommended structure:

```text
┌─────────────────────────┐
│ SPIDEY SIGNAL   ● GPS   │
├─────────────────────────┤
│ Search this area...     │
├─────────────────────────┤
│                         │
│                         │
│          MAP            │
│                         │
│      🚓                │
│                🔴       │
│                         │
│                    RADAR│
│                         │
├─────────────────────────┤
│ SIGNAL SELECTED         │
│ TRAFFIC POLICE          │
│ ACTIVE · 42m            │
├─────────────────────────┤
│ MAP   MY SIGNALS  ⚙     │
└─────────────────────────┘
```

Detailed information should use:

* Bottom sheets
* Drawers
* Expandable HUD panels

Never create horizontal scrolling.

---

# 38. TABLET

At:

```text
768–1024px
```

Use:

* Map-dominant layout
* Collapsible panels
* Floating controls
* Bottom sheets for detailed information
* Reduced panel widths

Avoid forcing the desktop three-column layout onto smaller screens.

---

# 39. DESKTOP

At:

```text
1024px+
```

Panels can float over the map.

At:

```text
1440px+
```

the map should dominate.

Possible structure:

```text
HEADER

SEARCH

              MAP

COMMAND / SIGNAL PANEL

EVENT LOG / STATUS
```

Panels should occupy approximately 20–30% of visual space at most.

---

# 40. MOTION SYSTEM

Motion communicates information.

Good:

```text
Signal appears
Signal expires
Map scans
Signal selected
Location found
Signal published
Signal ending
```

Bad:

```text
Everything constantly moves
```

Animation character:

```text
TECHNICAL
FAST
PRECISE
MECHANICAL
CONTROLLED
```

Avoid:

```text
Bouncy
Soft
Excessively playful
Large spring animations
Constant floating
```

Pani Puri may be slightly more playful.

---

# 41. SIGNAL ANIMATION

A signal can use:

```text
1. Marker appears
2. Pulse expands
3. Ring contracts
4. Icon stabilizes
5. Expiry ring begins
```

High-priority signals can have stronger emphasis.

Low-priority signals should remain quiet.

Do not allow dozens of simultaneous pulses to overwhelm the map.

---

# 42. RADAR ANIMATION

Optional radar sequence:

```text
Sweep
 ↓
Signal detected
 ↓
Blip appears
 ↓
Ring expands
 ↓
Signal marker highlighted
```

Animations should be subtle and performance-conscious.

---

# 43. CRT EFFECT

A very subtle global CRT layer may be used.

Possible effects:

```text
Horizontal scanlines
Subtle noise
Very light vignette
Pixel glow
Minimal flicker
```

Keep opacity low.

The CRT effect must never reduce:

* Readability
* Contrast
* Accessibility
* Map clarity

It should feel like a visual texture, not a filter.

---

# 44. PIXEL BORDER SYSTEM

Avoid default:

```css
border-radius: 16px;
```

Prefer:

* Squared corners
* Clipped corners
* Stepped corners
* Inner borders
* Thin technical lines
* Small notches
* Subtle shadows

Panels should resemble:

```text
HUD WINDOWS
TERMINALS
CONTROL MODULES
INTELLIGENCE SCREENS
```

not conventional SaaS cards.

---

# 45. DON'T OVER-CARDIFY

This is a critical rule.

Avoid:

```text
┌─────────────┐
│ Card        │
└─────────────┘

┌─────────────┐
│ Card        │
└─────────────┘
```

Instead use:

```text
HUD WINDOW
TERMINAL
OVERLAY
FLOATING MODULE
```

Cards may still be used where appropriate for mobile usability, but their styling must remain consistent with the terminal system.

---

# 46. VISUAL DEPTH

Layer the interface:

```text
MAP
 ↓
GRID
 ↓
GEOGRAPHIC DATA
 ↓
SIGNAL EFFECTS
 ↓
RADAR
 ↓
MARKERS
 ↓
HUD
 ↓
PANELS
```

Everything should feel projected over the geographic environment.

---

# 47. EMPTY STATE

If there are no active signals:

```text
NO SIGNALS DETECTED

CURRENT SECTOR
CHENNAI

LAST SCAN
00:42 AGO

[ SCAN AREA ]
```

Avoid:

```text
No data available.
```

Empty states should still feel like part of the tracking machine.

---

# 48. ERROR STATE

Example:

```text
╔══════════════════════════╗
║ SIGNAL ERROR             ║
╠══════════════════════════╣
║                          ║
║ SIGNAL QUERY FAILED      ║
║                          ║
║ CONNECTION UNAVAILABLE   ║
║                          ║
║ [ RETRY ]                ║
╚══════════════════════════╝
```

Error messages should describe actual failures.

Never fabricate technical explanations.

---

# 49. LOCATION STATES

Support:

```text
LOCATION UNKNOWN
REQUESTING LOCATION
LOCATION ACQUIRED
LOCATION DENIED
LOCATION UNAVAILABLE
```

If permission is denied:

* Do not block the application.
* Allow manual map navigation.
* Allow search.
* Explain why location is useful.
* Allow manual location selection.

---

# 50. ACCESSIBILITY

Required:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Sufficient contrast
* Accessible labels
* ARIA labels
* Accessible map controls
* Screen-reader-friendly status updates

Dynamic non-critical tracker events can use:

```html
aria-live="polite"
```

Reduced-motion support must preserve all functionality.

---

# 51. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

* Disable scanner sweeps
* Disable pulsing
* Disable screen flicker
* Reduce transitions
* Disable unnecessary camera animation
* Use instant state changes

Do not remove information.

---

# 52. SOUND

Sound is optional.

Default:

```text
SOUND // ON
```

Allow:

```text
SOUND // OFF
```

Possible sounds:

```text
BOOT
SCAN
SIGNAL DETECTED
SIGNAL SELECT
SIGNAL PUBLISHED
BUTTON PRESS
TN MODE
PANI PURI DETECTED
```

Sounds must be:

* Short
* Subtle
* Optional

The interface must never depend on sound for understanding.

---

# 53. MICROCOPY

Keep copy short.

Good:

```text
SCANNING...
SIGNALS DETECTED
SIGNAL SELECTED
NO SIGNALS
SEARCHING
REPORT SIGNAL
SIGNAL ACTIVE
EXPIRES IN 42m
LOCATION ACQUIRED
TN MODE ACTIVE
PANI PURI DETECTED
GPS ACTIVE
```

Avoid verbose system messages.

Bad:

```text
We have successfully completed the process of finding the target.
```

---

# 54. TECHNICAL METADATA

Use compact metadata:

```text
SIGNAL // SIG-0142
SECTOR // CHN-07
LAT // 13.0827
LON // 80.2707
STATUS // ACTIVE
TTL // 00:42:17
PRIORITY // HIGH
```

Metadata should enhance the intelligence-terminal aesthetic.

Do not expose sensitive information.

---

# 55. PRIVACY VISUAL LANGUAGE

The design must make anonymity clear.

Use:

```text
Anonymous Reporter
```

instead of user profiles.

Optional:

```text
COMMUNITY SIGNAL
NOT VERIFIED
```

This is particularly important for:

* Police observations
* Accidents
* Safety reports
* Emergency-related reports

High priority should never visually imply official verification.

---

# 56. ORIGINALITY

The interface may be inspired by superhero tracking technology, but it must remain an original product.

Do not directly reproduce:

* Spider-Man movie UI
* Marvel branding
* Logos
* Character artwork
* Proprietary interface graphics
* Exact layouts
* Exact typography
* Exact animations
* Promotional website components

Create original:

* SPIDEY SIGNAL logo
* Signal markers
* Radar
* HUD geometry
* Terminal windows
* Loading animation
* Scan animation
* Pani Puri iconography
* Signal effects
* Map overlays

The goal is:

> **"What if someone built their own underground community intelligence terminal?"**

Not:

> **"A copy of the Spider-Man promotional website."**

---

# 57. APPLICATION STATES

The application should support real states such as:

```text
INITIALIZING
READY
LOCATING
SCANNING
SIGNALS_DETECTED
SIGNAL_SELECTED
CREATING_SIGNAL
PUBLISHING
SIGNAL_ACTIVE
SIGNAL_EXPIRING
SIGNAL_ENDED
NO_SIGNALS
LOCATION_DENIED
ERROR
TN_MODE
PANI_PURI_MODE
```

Every visual state must correspond to actual application state.

---

# 58. INITIAL LOAD

Keep the initial boot sequence short.

Example:

```text
             ◉

        SPIDEY SIGNAL

        INITIALIZING...

        █████████░░ 82%

        MAP SYSTEM
        LOCATION SYSTEM
        SIGNAL NETWORK
```

Then transition into the actual application.

Do not make users sit through a fake loading screen.

---

# 59. CORE INTERACTION FLOW

The visual system should tightly connect to real functionality.

Example:

```text
USER OPENS APP
        ↓
REQUEST LOCATION
        ↓
MAP CENTERS ON USER
        ↓
LOAD ACTIVE SIGNALS
        ↓
DISPLAY SIGNAL MARKERS
        ↓
USER SELECTS SIGNAL
        ↓
TARGET / SIGNAL LOCK VISUAL
        ↓
SIGNAL INTELLIGENCE PANEL
```

Creating a signal:

```text
+ REPORT SIGNAL
        ↓
SELECT ICON
        ↓
SELECT CATEGORY
        ↓
TITLE
        ↓
DESCRIPTION
        ↓
PRIORITY
        ↓
DURATION
        ↓
CHOOSE LOCATION
        ↓
PUBLISH
        ↓
SIGNAL APPEARS
        ↓
COUNTDOWN
        ↓
EXPIRE / END
```

The animation must never exist independently from the application state.

---

# 60. DESIGN PRINCIPLES

When making any design decision, follow this hierarchy:

```text
1. MAP EXPERIENCE
2. SIGNAL DISCOVERY
3. SIGNAL CREATION
4. VISUAL IDENTITY
5. INFORMATION HIERARCHY
6. INTERACTION FEEDBACK
7. RESPONSIVENESS
8. ACCESSIBILITY
9. DECORATIVE EFFECTS
```

Usability always wins over visual effects.

---

# 61. FINAL VISUAL TARGET

The finished application should immediately communicate:

```text
             SPIDEY SIGNAL

                  │
                  ▼

        ┌─────────────────────┐
        │                     │
        │        LIVE MAP     │
        │                     │
        │    🚓        🔴     │
        │                     │
        │          ◉          │
        │                     │
        │               🟡    │
        │                     │
        └─────────────────────┘

        + REPORT SIGNAL

        RADAR

        SIGNAL ACTIVE
        EXPIRES IN 42m

        ● GPS
        ● ONLINE
        SIGNALS 12
```

Overall feeling:

> **Retro arcade × superhero intelligence × tactical map × community signal network × Indian personality.**

The application should feel:

**Immersive.
Slightly mysterious.
Technically sophisticated.
Useful.
Fast.
Playful.
Original.**

Most importantly:

> **It should feel like a real community intelligence machine, not a fictional Spider-Man website recreated as a dashboard.**
