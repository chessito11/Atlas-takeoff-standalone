# ATLAS Estimating v2.4 — iPad Add-On

This package is made for the Dropbox project:

`ATLAS-ESTIMATINGV2.4 LIBRARYASSIGNED PER PROJECT`

It does **not** replace the estimator logic. It adds an iPad-first launcher around the existing files so the working desktop/browser version stays intact.

## What this iPad version adds

- Home Screen / standalone iPad launch.
- Uses the full iPad viewport, including Safari `visualViewport` handling.
- Safe-area support for iPad edges.
- Keeps the existing pointer, pinch-zoom and touch behavior inside the original app.
- Uses the same origin as the original app, so IndexedDB saved projects remain available.
- Offline reopening after the first successful online load.
- Works in portrait and landscape; landscape is recommended for plan/detail work.
- No change to `app.js`, `quantities.js`, `door-sketch.js`, or the estimating formulas.

## Files to add to the existing project folder

Copy these files **beside** the current `index.html`, `app.js`, `style.css`, `quantities.js`, and `door-sketch.js`:

- `ipad.html`
- `manifest.webmanifest`
- `sw-ipad.js`
- `atlas-ipad-192.png`
- `atlas-ipad-512.png`

Do not delete or rename the existing files.

## Install on iPad

1. Publish the project folder over HTTPS (GitHub Pages is fine).
2. In Safari on the iPad, open:
   `.../ipad.html`
3. Tap **Share**.
4. Tap **Add to Home Screen**.
5. Launch **ATLAS Estimating** from the Home Screen.
6. Open it online once so the core files can be cached.
7. After that, the app can reopen offline using the cached build.

## Important

Opening the files directly from the iPad Files app with a `file://` address is not the installable/offline PWA path. Service workers require HTTPS.

Your actual project data still uses the existing ATLAS storage system (IndexedDB / backups). Continue using the app's Project Save / Backup controls for important jobs.

## Why this approach

The current v2.4 project already contains iPad-friendly fundamentals: touch/pointer input, pinch zoom, Safari-safe fullscreen, browser project saving, and iOS file picking. Wrapping that working build is safer than rewriting the estimating engine for Swift and risking different quantity results.
