# Privacy, Safety & Abuse Rules

## Core Principle

SPIDEY SIGNAL is a community reporting product.

It is not an official emergency, police, surveillance or law-enforcement system.

---

# Anonymous Reporting

Public signals must not expose personal identity.

Display:

```text
Anonymous Reporter
```

---

# No Personal Tracking

The application must never:

* track users in the background
* publish user location automatically
* expose another user's location
* create location histories
* provide individual movement trails

---

# Sensitive Information

Users should be discouraged from posting:

* personal addresses
* phone numbers
* private identities
* medical information
* personally identifying information

---

# Dangerous Claims

Signals such as:

* crime
* suspicious activity
* emergency
* accident

must be treated as unverified community observations.

UI may display:

> Community reported — verify independently.

---

# Police Information

Traffic police observations may be reported.

The application must not imply:

* official police authorization
* official police intelligence
* guaranteed accuracy
* law enforcement affiliation

---

# Rate Limiting

Implement limits for signal creation.

Example starting limit:

```text
10 signals / hour / anonymous identity
```

Make this configurable.

---

# Spam Protection

Future-ready hooks for:

* duplicate signals
* abusive content
* suspicious activity
* automated reporting

---

# Reporting

V1 should support a basic:

```text
REPORT SIGNAL
```

action.

Possible reasons:

```text
Spam
False information
Abusive content
Dangerous content
Privacy violation
Other
```

---

# Moderation

V1 does not require a full moderation dashboard.

However, the schema should allow future moderation.

---

# Content Sanitization

Escape/render user-generated text safely.

Never render arbitrary HTML.

---

# Security

Never expose:

* Supabase service-role key
* database credentials
* private environment variables

The frontend may use only public client credentials.

---

# RLS

Supabase Row Level Security must be enabled.

Do not disable RLS simply to make frontend development easier.

---

# Principle

The application should make it easy to share useful temporary observations while making it difficult to misuse the system for persistent surveillance or harassment.
