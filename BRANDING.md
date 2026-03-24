# Branding Guide (5 Minutes)

This app is white-label ready. You only need to edit one file:

- `src/branding.ts`

## 1) Update brand identity

Edit these fields in `BRANDING`:

- `appName` - product/tool name shown in app and browser title
- `subtitle` - tagline under the heading
- `logoUrl` - optional logo path (example: `/brand/logo.svg`)
- `faviconUrl` - favicon path (example: `/brand/favicon.ico`)
- `fontFamily` - optional custom font stack

## 2) Update colors

In `src/branding.ts`, change:

- `background`
- `panel`
- `surface`
- `textPrimary`
- `textSecondary`
- `accent`
- `danger`
- `warning`

These values are applied globally as CSS variables, so the UI updates automatically.

## 3) Add assets

Put brand files in `public/` (or a subfolder like `public/brand/`), then reference them in `logoUrl` and `faviconUrl`.

## 4) Run locally

```bash
npm install
npm run dev
```

## 5) Deploy (Option A)

1. Fork repo to your GitHub
2. Import that fork in Vercel
3. Set production branch to `main`
4. Push changes to trigger deploys

No calculator math changes are needed for branding.
