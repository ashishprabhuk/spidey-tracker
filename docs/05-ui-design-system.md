# SPIDEY TRACKER — UI/UX DESIGN SYSTEM

## 1. Product Identity

Build **Spidey Tracker** as a futuristic superhero intelligence terminal that combines:

- Interactive world map
- Spider-Man sighting/tracking data
- Location-based target detection
- "TN Mode" / Pani Puri mode
- Activity/sighting markers
- Real-time tracking states
- Retro arcade interface styling

The application should feel like:

> **A secret superhero tracking computer from the future, redesigned as a retro arcade command terminal.**

The interface should combine:

- Retro 8-bit arcade UI
- CRT monitor aesthetics
- Tactical command-center interfaces
- Sci-fi HUD systems
- Modern interactive maps
- Playful superhero personality

### Important

Use the provided screenshots as **visual inspiration**, not as an exact reproduction.

Do **not** copy the exact Spider-Man movie website, logos, assets, layouts, proprietary illustrations, or copyrighted UI elements.

The application should have its **own original visual identity** while achieving a similar overall feeling.

---

# 2. PRIMARY VISUAL DIRECTION

The **map is the hero**.

The application should look like a futuristic tracking terminal placed around an interactive map.

Avoid the appearance of:

- Standard SaaS dashboard
- Generic Google Maps application
- Modern rounded-card dashboard
- Corporate admin panel
- Minimal white UI

Instead, create:

```text
RETRO ARCADE
       +
SCI-FI HUD
       +
TACTICAL TRACKER
       +
INTERACTIVE MAP
```

---

# 3. VISUAL STYLE

### Core aesthetic

Use:

- Dark navy backgrounds
- Electric blue UI framing
- Cyan information text
- Warm orange/yellow highlights
- Red danger/target states
- Pixel-inspired borders
- CRT scanlines
- Subtle screen noise
- Grid overlays
- Glowing signal indicators
- Monospace/pixel typography
- Angular/chunky UI elements

The interface should look like a **physical tracking machine**, not a website.

---

# 4. COLOR SYSTEM

Create a centralized design-token system.

### Base

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

Primary Blue:
#28A9D6
#3AB7DD

Bright Cyan:
#8DEBFF

Deep Blue:
#164B8C
#1C55A0
```

### Target / danger

```text
Red:
#EF4B45

Bright Red:
#FF625A

Dark Red:
#9F2929
```

### Alert / interaction

```text
Orange:
#FF9F43

Yellow:
#FFD166
```

### Success

```text
Green:
#63D47A
```

### Text

```text
Primary:
#E8F7FF

Secondary:
#8BA9B8

Muted:
#536B78
```

Do not use every color simultaneously.

Color should communicate state.

---

# 5. TYPOGRAPHY

Use two typography families.

## Primary UI Font

Use a **pixel/arcade-inspired display font** where appropriate.

Good characteristics:

- squared
- geometric
- technical
- slightly retro
- readable

Examples of suitable font directions:

```text
Press Start 2P
Pixelify Sans
Silkscreen
VT323
```

Do not use an overly pixelated font for large amounts of body text.

---

## Technical Font

Use a monospace font for:

- coordinates
- IDs
- timestamps
- event logs
- system status
- API/debug information

Examples:

```text
JetBrains Mono
IBM Plex Mono
Space Mono
```

---

# 6. APPLICATION FRAME

Desktop application:

```text
┌────────────────────────────────────────────────────────────┐
│ SPIDEY TRACKER                 SYSTEM ONLINE       ⚙       │
├───────────────┬────────────────────────────────┬───────────┤
│               │                                │           │
│   COMMAND     │                                │  TARGET   │
│   TERMINAL    │             MAP                │  INTEL    │
│               │                                │           │
│               │                                │           │
├───────────────┴────────────────────────────────┴───────────┤
│ SYSTEM STATUS                     EVENT STREAM             │
└────────────────────────────────────────────────────────────┘
```

But the map should visually dominate.

Approximate desktop allocation:

```text
Map:          70–80%
Side panels:  20–30%
```

Panels should feel like overlays attached to the map rather than independent cards.

---

# 7. HEADER — TRACKER HEADER

Create a compact arcade/HUD header.

Example:

```text
╔══════════════════════════════════════════════╗
║  ◉ SPIDEY TRACKER        SIGNAL: ACTIVE      ║
║                        SAT: ONLINE   TN: OFF ║
╚══════════════════════════════════════════════╝
```

Display:

### Left

```text
SPIDEY
TRACKER
```

or:

```text
SPIDEY TRACKER // ST-01
```

### Center

Current tracker state:

```text
SCANNING
SIGNAL DETECTED
TARGET LOCKED
```

### Right

```text
● SYSTEM ONLINE
SAT 04
GPS ACTIVE
TN MODE OFF
```

Use small indicators instead of large text.

---

# 8. MAP PANEL

The map should occupy the majority of the screen.

Use a dark map theme.

The map should have:

- dark navy land
- subdued roads
- low-contrast labels
- blue/cyan geographic details
- subtle grid
- coordinate system
- map boundaries
- tactical overlays

The map should **not look like a normal Google Maps UI**.

Reduce visual noise.

The map itself should feel like a radar/satellite intelligence screen.

---

# 9. MAP OVERLAY

Add a subtle tactical grid over the map.

Example:

```text
      │       │       │
──────┼───────┼───────┼──────
      │       │       │
──────┼───────┼───────┼──────
      │       │       │
```

Grid opacity should be extremely low.

Add optional:

```text
LAT 13.0827
LON 80.2707
SECTOR 07
```

in corners.

---

# 10. TARGET MARKER

The target marker is one of the most important UI elements.

Do not use a generic Google Maps pin.

Create a custom tracking marker.

### Idle

```text
       ·
    ·  ◉  ·
       ·
```

### Searching

```text
     ╲ │ ╱
      ╲│╱
   ─── ◉ ───
      ╱│╲
     ╱ │ ╲
```

### Locked

```text
╔══════════════════╗
║ TARGET LOCKED    ║
║ SPDR-TN-001      ║
╚══════════════════╝
        ◉
     ╱     ╲
```

Animation:

1. pulse
2. expand ring
3. contract
4. scan line
5. target reticle appears
6. coordinate label appears

---

# 11. SIGHTING MARKERS

Different marker types must be visually distinguishable.

### Spider sighting

Use an original spider/superhero-inspired marker.

Color:

```text
RED
```

States:

```text
UNCONFIRMED
POSSIBLE
CONFIRMED
HIGH CONFIDENCE
```

---

### User location

Use:

```text
CYAN / BLUE
```

with a pulsing location ring.

Example:

```text
      ◉
   ───────
  ─── YOU ───
   ───────
```

---

### Activity marker

Use:

```text
ORANGE
```

---

### Pani Puri marker

This is intentionally playful.

Do not make it look like a generic food-app pin.

Create a tiny arcade-style marker.

Example:

```text
    ◉
   / \
  PANI
  PURI
```

or a custom pixel food icon.

Color:

```text
YELLOW / ORANGE
```

---

# 12. COMMAND PANEL

The Command Panel should feel like a physical control terminal.

Do NOT create a conventional modern card.

Instead:

```text
╔══════════════════════════╗
║ COMMAND TERMINAL         ║
╠══════════════════════════╣
║                          ║
║  [ LOCATE TARGET ]       ║
║                          ║
║  [ SCAN AREA ]           ║
║                          ║
║  [ TN MODE ]             ║
║                          ║
║  [ PANI PURI ]           ║
║                          ║
║  [ RESET TRACKER ]       ║
║                          ║
╚══════════════════════════╝
```

Buttons should have:

- squared corners
- pixel borders
- subtle inner shadow
- hover glow
- pressed state
- active state

---

# 13. COMMAND BUTTON STATES

### Default

Dark panel:

```text
[ LOCATE TARGET ]
```

### Hover

Add:

- cyan border
- slight glow
- subtle horizontal movement

### Active

```text
[● LOCATING...]
```

### Disabled

Muted gray-blue.

### Danger

Red accent.

---

# 14. TARGET INTELLIGENCE PANEL

When a target is selected:

```text
╔══════════════════════════╗
║ TARGET INTELLIGENCE      ║
╠══════════════════════════╣
║                          ║
║ TARGET                   ║
║ SPDR-TN-001              ║
║                          ║
║ STATUS                   ║
║ ● LOCKED                 ║
║                          ║
║ CONFIDENCE               ║
║ ███████████████░  97%   ║
║                          ║
║ LAST SIGNAL              ║
║ 00:03 AGO                ║
║                          ║
║ COORDINATES              ║
║ 13.0827° N               ║
║ 80.2707° E               ║
║                          ║
╚══════════════════════════╝
```

Keep information dense but readable.

---

# 15. PANI PURI MODE

Pani Puri is a special feature and should have its own personality.

When activated:

```text
╔════════════════════════╗
║ PANI PURI SCANNER      ║
╠════════════════════════╣
║                        ║
║ SEARCHING SECTOR...    ║
║                        ║
║      ◉                 ║
║    ╱   ╲               ║
║   ◉     ◉              ║
║                        ║
║ 12 LOCATIONS FOUND     ║
╚════════════════════════╝
```

The map then displays nearby Pani Puri locations.

---

# 16. PANI PURI LOCATION DETAIL

On marker click:

```text
PANI PURI DETECTED

DISTANCE
120 M

RATING
4.6 ★

STATUS
OPEN

TYPE
STREET VENDOR

[ NAVIGATE ]
```

Keep the interface playful but still consistent with the tracker terminal.

---

# 17. TN MODE

TN Mode should feel like a secret mode.

Activation:

```text
TN MODE

STATUS
OFF

[ ENABLE ]
```

When activated:

```text
TN MODE
████████████████

STATUS
ACTIVE

SECTOR
TAMIL NADU

SIGNALS
47
```

Use a unique but restrained accent.

Avoid making the entire UI change color.

---

# 18. SCANNING SEQUENCE

The scan interaction should tell a story.

### Stage 1

```text
> INITIALIZING TRACKER
```

Map slightly darkens.

### Stage 2

```text
> CONNECTING SATELLITE
```

Show subtle connection animation.

### Stage 3

```text
> SCANNING SECTOR
```

Scanner sweeps across map.

### Stage 4

```text
> SIGNAL DETECTED
```

A target pulse appears.

### Stage 5

```text
> ANALYZING SIGNAL
```

Target ring expands.

### Stage 6

```text
> TARGET LOCKED
```

Target marker locks.

### Stage 7

Camera smoothly moves to the target.

### Stage 8

Target intelligence panel opens.

This entire sequence should feel fast and satisfying.

Do not make users wait unnecessarily.

---

# 19. SCAN EFFECT

Create a horizontal or radial scanner.

Example:

```text
                    │
                    │
                    │
────────────────────┼────────────────────
                    │
                    │
                    │
```

Animate the scanner across the map.

Use:

- opacity
- blur
- glow
- subtle particles

Avoid excessive effects.

---

# 20. CRT EFFECT

The entire application may have a **very subtle CRT layer**.

Possible effects:

```text
horizontal scanlines
slight noise
subtle vignette
pixel glow
screen flicker
```

Example:

```text
────────────────────────────
────────────────────────────
────────────────────────────
────────────────────────────
```

Opacity should remain low.

The UI must still be comfortable to use.

---

# 21. PIXEL BORDER SYSTEM

Panels should use a custom border treatment inspired by arcade machines.

Instead of:

```css
border-radius: 16px;
```

prefer:

```text
┌────────────────────────┐
│                        │
│       TERMINAL         │
│                        │
└────────────────────────┘
```

Use:

- squared corners
- clipped corners
- stepped pixel corners
- inner borders
- subtle shadow

Avoid excessive rounded cards.

---

# 22. MAP CONTROLS

Map controls should match the tracker.

Do not use default map controls if they visually conflict with the design.

Create custom:

```text
[ + ]
[ − ]

[ ◉ LOCATE ME ]

[ ⌖ TARGET ]

[ ⛶ FULLSCREEN ]
```

Controls should look like physical terminal buttons.

---

# 23. EVENT LOG

Bottom area:

```text
╔══════════════════════════════════════════════════════╗
║ SYSTEM EVENT LOG                                     ║
╠══════════════════════════════════════════════════════╣
║ 22:14:03  > TRACKER INITIALIZED                     ║
║ 22:14:05  > SATELLITE CONNECTION ESTABLISHED        ║
║ 22:14:07  > SCANNING CHENNAI SECTOR                 ║
║ 22:14:10  > SIGNAL DETECTED                         ║
║ 22:14:11  > TARGET LOCKED                           ║
╚══════════════════════════════════════════════════════╝
```

Use monospace typography.

New events should animate in.

Newest event appears at the bottom.

---

# 24. STATUS BAR

Persistent bottom status:

```text
SYSTEM: ONLINE
GPS: ACTIVE
SAT: CONNECTED
SIGNAL: STRONG
TARGETS: 12
PANI PURI: 08
```

Use tiny status indicators.

Example:

```text
● ONLINE
● GPS
● SAT
○ TN
```

---

# 25. APPLICATION STATES

The UI must support these states:

```text
INITIALIZING
IDLE
SCANNING
SIGNAL_DETECTED
TARGET_LOCKED
NO_SIGNAL
ERROR
TN_MODE
PANI_PURI_SCAN
PANI_PURI_SELECTED
```

Each state should have clear visual feedback.

---

# 26. INITIAL LOADING SCREEN

On first load:

```text
             ◉

      SPIDEY TRACKER

     INITIALIZING...

     █████████░░░ 82%

     SATELLITE LINK
     GPS CONNECTION
     SIGNAL PROCESSOR
```

Then transition into the map.

Keep it short.

---

# 27. EMPTY STATE

If there are no sightings:

```text
NO SIGNALS DETECTED

CURRENT SECTOR
CHENNAI

LAST SCAN
00:42 AGO

[ SCAN AGAIN ]
```

Do not show a generic:

> "No data available."

---

# 28. ERROR STATE

Example:

```text
╔════════════════════════════╗
║ SIGNAL ERROR               ║
╠════════════════════════════╣
║                            ║
║ TRACKING CONNECTION LOST   ║
║                            ║
║ RETRY CONNECTION           ║
║                            ║
║ [ RETRY ]                  ║
╚════════════════════════════╝
```

---

# 29. RESPONSIVE DESIGN

## Desktop — 1440px+

Map dominates the interface.

```text
HEADER

COMMAND │       MAP       │ TARGET

EVENT LOG
```

Panels may float over the map.

---

## Tablet — 768–1024px

Reduce panel width.

Allow panels to collapse.

```text
HEADER

        MAP

COMMAND / TARGET
    COLLAPSIBLE

EVENT LOG
```

---

## Mobile — 375 / 390px

The map remains the primary visual.

```text
┌───────────────────────┐
│ SPIDEY TRACKER        │
├───────────────────────┤
│                       │
│                       │
│         MAP           │
│                       │
│                       │
├───────────────────────┤
│ TARGET                │
│ SPDR-TN-001           │
│ LOCKED       97%      │
├───────────────────────┤
│ COMMAND               │
│ [LOCATE] [SCAN]       │
│ [TN]     [PANI PURI]  │
├───────────────────────┤
│ SYSTEM ONLINE         │
└───────────────────────┘
```

Use bottom sheets/drawers for detailed information.

Never create horizontal scrolling.

---

# 30. MOBILE MAP INTERACTION

Must support:

- pinch zoom
- drag
- marker tap
- target selection
- locate user
- recenter map
- fullscreen map

Touch targets should be at least approximately:

```text
44 × 44px
```

---

# 31. ANIMATION SYSTEM

Animations should reinforce the tracking narrative.

### High priority

1. Initial boot
2. Satellite connection
3. Map scan
4. Scanner sweep
5. Signal detection
6. Target pulse
7. Target lock
8. Camera movement
9. TN Mode activation
10. Pani Puri scan

### Secondary

- button hover
- panel transitions
- event log entry
- status indicator pulse

---

# 32. MOTION CHARACTER

Animations should feel:

```text
TECHNICAL
FAST
PRECISE
MECHANICAL
```

Avoid:

```text
bouncy
soft
playful SaaS animations
large spring animations
```

Pani Puri can be slightly more playful than the rest of the system.

---

# 33. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- disable scanner animations
- disable pulsing
- disable screen flicker
- disable excessive transitions
- use instant state changes
- preserve all information/functionality

---

# 34. ACCESSIBILITY

Must include:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- accessible buttons
- ARIA labels
- accessible map controls
- screen-reader-friendly status updates

For dynamic events, use an appropriate live region.

Example:

```text
aria-live="polite"
```

for non-critical tracker updates.

---

# 35. UI SOUND DESIGN

If sound is implemented, make it optional.

Default:

```text
SOUND: ON
```

Allow:

```text
SOUND: OFF
```

Possible sounds:

```text
BOOT
SCAN
SIGNAL DETECTED
TARGET LOCK
BUTTON PRESS
TN MODE ACTIVATED
PANI PURI DETECTED
```

Sounds should be short and subtle.

Never require sound for understanding the interface.

---

# 36. MICROCOPY

All UI copy should be short.

### Good

```text
SCANNING...
SIGNAL DETECTED
TARGET LOCKED
NO SIGNAL
SEARCHING
TN MODE ACTIVE
PANI PURI DETECTED
GPS ACTIVE
SAT LINK OK
```

### Avoid

```text
We have successfully completed the process of finding the target.
```

---

# 37. TECHNICAL METADATA

Use compact technical labels.

Examples:

```text
TARGET // SPDR-TN-001
SECTOR // CHN-07
SIGNAL // 97%
LAT // 13.0827
LON // 80.2707
SAT // 04
STATUS // LOCKED
```

This creates the intelligence-terminal feeling.

---

# 38. VISUAL DEPTH

Use layered surfaces:

```text
MAP
 ↓
GRID
 ↓
SIGNAL EFFECTS
 ↓
TARGET MARKERS
 ↓
HUD
 ↓
PANELS
```

The interface should feel like information is being projected **on top of the map**.

---

# 39. DON'T OVER-CARDIFY

This is extremely important.

Do NOT make the application look like:

```text
┌──────────────┐
│ Card         │
│              │
└──────────────┘

┌──────────────┐
│ Card         │
└──────────────┘
```

Instead, panels should visually feel like:

```text
HUD WINDOWS
TERMINALS
OVERLAYS
CONTROL MODULES
```

---

# 40. ORIGINALITY REQUIREMENT

The screenshots are a **style reference only**.

Do not directly recreate:

- exact Spider-Man website layout
- exact Marvel branding
- exact character artwork
- exact typography
- exact buttons
- exact map overlays
- exact UI graphics
- exact promotional content

Create original:

- tracker logo
- target icon
- marker designs
- panel geometry
- HUD graphics
- loading animation
- scanner animation
- Pani Puri iconography

The result should feel like:

> **"What if someone built their own underground superhero tracking terminal?"**

rather than:

> **"A copy of the Spider-Man promotional website."**

---

# 41. DESIGN PRIORITY

When making design decisions, follow this hierarchy:

```text
1. MAP EXPERIENCE
2. TARGET TRACKING
3. VISUAL IDENTITY
4. INFORMATION HIERARCHY
5. INTERACTION FEEDBACK
6. RESPONSIVENESS
7. ACCESSIBILITY
8. DECORATIVE EFFECTS
```

Do not sacrifice usability for visual effects.

---

# 42. FINAL VISUAL TARGET

The finished application should immediately communicate:

```text
        SPIDEY TRACKER
              │
              ▼

      ┌─────────────────┐
      │   LIVE MAP      │
      │                 │
      │      ◉          │
      │   TARGET        │
      │                 │
      └─────────────────┘

   COMMAND TERMINAL
   ├─ LOCATE
   ├─ SCAN
   ├─ TN MODE
   └─ PANI PURI

   TARGET LOCKED
   SIGNAL 97%

   SYSTEM ONLINE
```

### Overall feeling

**Retro arcade × superhero intelligence × tactical map × futuristic terminal.**

It should feel **immersive, slightly mysterious, technically sophisticated, and fun** without becoming a generic cyberpunk dashboard.

---

# 43. IMPLEMENTATION PRINCIPLE FOR THE AI CODING AGENT

Do not treat this document as instructions to merely create static mockups.

Build the UI as a **fully functional interactive application**.

Every visual state should correspond to actual application state.

For example:

```text
User clicks LOCATE
        ↓
request geolocation
        ↓
map centers on user
        ↓
event log updates
        ↓
status changes
        ↓
target scan begins
        ↓
target appears
        ↓
target panel opens
```

Similarly:

```text
User clicks PANI PURI
        ↓
query nearby locations
        ↓
map displays Pani Puri markers
        ↓
user selects marker
        ↓
Pani Puri intelligence panel opens
```

The **visual design and application state must be tightly connected**.

---

# 44. CORE DESIGN PHILOSOPHY

Do not make the application look like a generic dashboard with a map inserted into it.

The **map, HUD, tracker states, markers, terminal panels, event log, and animations should all feel like parts of one fictional tracking machine**.

The design target is:

> **Retro 8-bit superhero tracking terminal + modern interactive map.**

This is the defining visual identity of Spidey Tracker.
