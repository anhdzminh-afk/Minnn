# TikTok LIVE read-only connector (experimental)
This is a server component, **not an APK**. It attempts to read public LIVE comments using the unofficial `tiktok-live-connector` library. It has not been tested against a real room. It cannot post comments.

Deploy on a Node host (e.g. Render Blueprint from repo root). Set environment variable `TIKTOK_ROOM` to the broadcaster's public username (no @). `GET /health` shows connection state and `GET /events` streams chat events as Server-Sent Events.

IMPORTANT: This is an unofficial integration; TikTok may change access at any time. Obtain broadcaster permission and comply with TikTok rules. Do not use session cookies or passwords. Do not publicly expose comment data without consent. The server currently has no authentication, so restrict access before production use.
