# Location System

## Goal

Provide location-aware functionality while minimizing unnecessary location collection.

---

# Initial Location

On first relevant interaction:

```text
Request browser geolocation
```

Use:

```text
navigator.geolocation
```

---

# Permission States

Handle:

```text
unknown
requesting
granted
denied
unavailable
```

---

# Granted

When granted:

* obtain current coordinates
* center map
* query nearby signals

---

# Denied

Show:

```text
LOCATION ACCESS DENIED

You can still explore the map manually.

[ EXPLORE MAP ]
```

The user must still be able to use the application.

---

# Location Accuracy

Display internally:

```text
accuracyMeters
```

Do not expose unnecessary technical details to normal users.

---

# Background Location

Not supported.

The application must not continuously track the user.

---

# Publishing Location

When creating a signal:

Default:

```text
Use my current location
```

But allow manual adjustment.

---

# Location Preview

Before publishing:

```text
SIGNAL LOCATION

[ map ]

Your signal will appear here.

[ ADJUST LOCATION ]
```

---

# Privacy

The user's current location should remain client-side unless required for:

* nearby query
* explicit signal publication

Do not maintain historical location trails.

---

# Search Location

Location search should resolve:

```text
query
→ coordinates
→ map camera
→ nearby signal query
```

---

# Map Viewport

Signal loading should be based on the visible map area where practical.

For larger zoom levels, use a bounded radius.

Never request unlimited global data.

---

# Accuracy Warning

If location accuracy is poor:

```text
LOCATION ACCURACY LOW

Your current position may be approximate.
```

---

# Failure

If geolocation fails:

* do not crash
* allow manual map navigation
* allow location search
* explain why nearby mode is unavailable
