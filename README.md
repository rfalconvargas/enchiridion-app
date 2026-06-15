# Enchiridion

A 3D-first learning app for prehistory and other visually complex topics —
turquoise/mint "Friendly 3D Nature Lab" brand. Cinematic Spinosaurus-skull hero
flowing into a friendly landing, plus a 5-tab demo app (Home, Learn, Create,
Knowledge Tree, More) built around the Spinosaurus lesson.

## Stack
- **Next.js 15** (App Router) · React 19 · TypeScript · Tailwind v4
- **react-three-fiber** + drei for the 3D viewer
- **Static export** (`output: "export"`) — 100% static, no server runtime
- **Supabase** for the waitlist (client-side insert; RLS lets anon insert only)

## Develop
```bash
npm install
npm run dev      # http://localhost:3002
npm run build    # static export -> ./out
```

## Deploy (Vercel)
- Import this repo (root directory `./`). Framework: Next.js. No env vars
  required — the waitlist ships with working public Supabase defaults.
- Override per-environment if desired:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`  *(publishable/anon key — safe in the client)*
- Add the custom domain (e.g. `enchiridion.ailiur.com`) in Vercel → Domains.

The `waitlist` table lives in the Supabase project; only INSERT is permitted for
anonymous users, so signups work but email addresses can't be read from the client.
