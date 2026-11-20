# OpenDayCare

Guardería app: room feed for Soles, built from the screen mockups in `references/screens/`.

## Getting Started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page (`app/page.tsx`) renders the room feed.

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

There are no test or format scripts.

## Project layout

- `app/` — Next.js App Router (`app/page.tsx`, `app/components/`, `app/lib/`).
- `references/screens/*.dc.html` — source-of-truth screen mockups; `references/screenshots/*.png` — visual references.
- `specs/` — specs and `.spec-config.yml`.
- `.agents/skills/` — user-invoked `/spec` and `/spec-impl` skills.
- `.opencode/` — `/spec-verify` command and the `spec-verifier` agent.
- `.playwright-mcp/` — Playwright screenshots.

## Spec workflow

1. `/spec <short feature description>` writes `specs/NN-slug.md` as Draft.
2. You approve the spec.
3. `/spec-impl NN-slug` creates the `spec-NN-slug` branch and implements it step by step.
4. `/spec-verify NN-slug` checks the acceptance criteria against the code, Next.js docs (Context7) and the screens (Playwright), then updates the spec.

## Deploy on Vercel

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) or deploy directly with [Vercel](https://vercel.com/new).
