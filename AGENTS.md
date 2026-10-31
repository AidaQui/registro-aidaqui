<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Support WhatsApp

Every landing's support WhatsApp link comes from `SOPORTE_WHATSAPP` in `lib/soporte.ts`. Import it; never paste a WhatsApp support link (`wa.link/…`, `wa.me/…`) by hand, and never reuse a link copied from an older landing.

# CSS per landing family

`styles/globals.css` is loaded by every page (Pages Router imports it in `_app`), so it holds only what all landings share: Tailwind, `@theme`, `@keyframes`, `@property`, and element-level base rules. Never add landing styles there.

- `styles/av4.module.css`: the v4 family (`/activacion-v4`, its four variants and both gracias pages). Each of those pages imports it.
- `styles/legacy.module.css`: every landing before v4. Each of those pages imports it.
- A new landing family gets its own `styles/<family>.module.css`, imported by each of its pages.

These are CSS Modules used as global CSS. To keep that working:

- Wrap every selector in `:global(...)`, one selector per rule. A list inside `:global(a, b)` does not compile, and `:global(a), :global(b)` gets merged into `:is(...)`, which drops any rule with a pseudo-element.
- Any `@keyframes` used by `animation`/`animation-name` in a module must also be defined inside that module: CSS Modules rename keyframes, so a reference to a keyframe defined elsewhere breaks. Keyframes used through `var(...)` are not renamed and come from `globals.css`.

Before this split every landing shipped ~500 KB of CSS that blocked the render on mobile.
