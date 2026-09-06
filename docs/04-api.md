# API Contract

Base URL:

```text
/api/v1
```

---

# GET /health

Returns API health.

### Response

```json
{
  "status": "ok"
}
```

---

# POST /tracker/scan

Starts a fictional tracker scan.

### Request

```json
{}
```

### Response

```json
{
  "sessionId": "session-id",
  "status": "SCANNING"
}
```

---

# GET /tracker/status/:sessionId

Returns tracker state.

### Response

```json
{
  "sessionId": "session-id",
  "status": "TARGET_LOCKED",
  "target": {
    "id": "target-id",
    "targetCode": "SPDR-TN-001",
    "name": "Spider-Man",
    "latitude": 10.7905,
    "longitude": 78.7047,
    "confidence": 0.97
  }
}
```

All target information is fictional.

---

# GET /targets/:id

Returns target information.

### Response

```json
{
  "id": "target-id",
  "targetCode": "SPDR-TN-001",
  "name": "Spider-Man",
  "status": "ACTIVE",
  "latitude": 10.7905,
  "longitude": 78.7047,
  "confidence": 0.97,
  "lastDetectedAt": "2026-08-31T00:00:00Z"
}
```

---

# GET /activities

Query parameters:

```text
latitude
longitude
radius
```

Returns simulated activities.

### Response

```json
{
  "items": [
    {
      "id": "activity-id",
      "type": "TRAFFIC",
      "title": "Traffic anomaly",
      "severity": "LOW",
      "latitude": 10.79,
      "longitude": 78.70,
      "occurredAt": "2026-08-31T00:00:00Z",
      "isSimulated": true
    }
  ]
}
```

---

# GET /pani-puri

Query parameters:

```text
latitude
longitude
radius
```

Returns nearby pani puri locations.

### Response

```json
{
  "items": [
    {
      "id": "location-id",
      "name": "Pani Puri Point",
      "latitude": 10.79,
      "longitude": 78.70,
      "rating": 4.6,
      "isOpen": true,
      "description": "Demo pani puri location"
    }
  ]
}
```

---

# Error Format

All errors:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "requestId": "request-id"
  }
}
```

---

# Error Codes

```text
VALIDATION_ERROR
NOT_FOUND
TRACKER_BUSY
TRACKER_FAILED
DATABASE_ERROR
INTERNAL_ERROR
```

---

# HTTP Status Codes

```text
200 OK
201 CREATED
400 BAD REQUEST
404 NOT FOUND
409 CONFLICT
500 INTERNAL SERVER ERROR
```

---

# API Rules

* Validate every input.
* Never trust client-provided coordinates.
* Return typed responses.
* Never leak database errors.
* Include request IDs.
* Keep fictional/demo labeling where relevant.
