# Repository instructions

## Verification

- `npm run lint` (ESLint 9 flat config) and `npm run build`. There are no test, format, or typecheck scripts; use `npx tsc --noEmit` for types.

## Architecture quirks

- Next.js 16 App Router with `app/` at the repo root (no `src/`); `@/*` resolves to the repo root, not `src/`.
- Tailwind v4 is loaded via `@tailwindcss/turbopack` rules in `next.config.ts`; there is no `tailwind.config.*` or PostCSS config. Global styles live in `app/globals.css`.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Read the matching guides in `node_modules/next/dist/docs/` before changing data fetching, caching, or Suspense code.
- `app/layout.tsx` uses the Next 16 typed global `LayoutProps<"/">` — don't replace it with an explicit props type.

## UI source of truth

- `references/screens/*.dc.html` are the real screen mockups (login, feed, niños, cuenta, ...); `references/screenshots/*.png` are the visual references. `README.md` and `app/page.tsx` are create-next-app boilerplate.
- User-facing copy is Spanish with Rioplatense voseo (`Publicá`, `Ingresá`, `Compartí`), matching the mockups.
- `references/screens/support.js` is generated from `dc-runtime` — never edit it.

## Spec-driven workflow

- Large features go through the user-invoked skills in `.agents/skills/` (pinned in `skills-lock.json`): `/spec` writes `specs/NN-slug.md` as Draft and seeds `specs/.spec-config.yml`; the user approves it; `/spec-impl NN-slug` then creates branch `spec-NN-slug` and implements step by step.
- Both skills set `disable-model-invocation: true`: the user runs them. Don't auto-invoke them or invent a different `specs/` layout. `specs/` does not exist yet.

## Code rules

- Clean code
- Codificamos en inglés.
- Comentarios inline en inglés

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

<!-- BEGIN:mcp-playwright -->

- Cualquier cosa de `Playwright`, por ejemplo screenshots, deben guardarse en el directorio `.playwright-mcp`

<!-- END:mcp-playwright -->

<!-- BEGIN:mcp-context7 -->

- Usamos `Context7` para consultar documentación actualizada del framework utiliado.

<!-- END:mcp-context7 -->


