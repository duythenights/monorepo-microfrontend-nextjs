# Monorepo microfrontends (Next.js + Turborepo)

This repository is a compact, production-shaped example of a **monorepo** with **multiple Next.js applications** and a **shared UI package**. Each app can be built and deployed on its own; the **host** app can stitch public URLs together using rewrites so the product still feels unified.

---

## Live demos

| Service | Role | URL |
| -------- | ------ | --- |
| **Server Host** | Entry app; navigates to other surfaces | [https://fe-enjoyer.vercel.app/](https://fe-enjoyer.vercel.app/) |
| **Services Docs** | Documentation shell (`basePath: /docs`) | [https://frontend-enjoyer-space-docs.vercel.app/docs](https://frontend-enjoyer-space-docs.vercel.app/docs) |
| **Services Animation** | Additional surface with its own theme | [https://frontend-enjoyer-space-animation.vercel.app/animation](https://frontend-enjoyer-space-animation.vercel.app/animation) |

---

## Screenshots (production)

**Server Host** — centered landing, CTAs, and top navigation to other services.

![Server Host](https://res.cloudinary.com/dywhwi0ce/image/upload/v1774263960/host_h8pvrd.png)

**Services Docs** — distinct typography and color tokens from the host.

![Services Docs](https://res.cloudinary.com/dywhwi0ce/image/upload/v1774263960/docs_p6wgyq.png)

**Services Animation** — third app with its own global styling.

![Services Animation](https://res.cloudinary.com/dywhwi0ce/image/upload/v1774263961/animation_ropoq7.png)

---

## What “monorepo” means here

- **One Git repository** holds every app and shared library.
- **pnpm workspaces** wire local packages together without publishing to npm.
- **Turborepo** runs scripts (build, lint, typecheck) across the graph with caching.

Typical layout:

- **`apps/web`** — host Next.js app.
- **`apps/docs`** — docs Next.js app (served under `/docs` via `basePath`).
- **`apps/animation`** — animation Next.js app (served under `/animation`).
- **`packages/ui`** — shared React components (`@repo/ui`), consumed by all apps via `transpilePackages`.
- **`packages/eslint-config`**, **`packages/typescript-config`**, **`packages/tailwind-config`** — shared tooling and Tailwind setup.

---

## What “microfrontend” means in this project

There is no single definition of “microfrontend.” In this repo it means:

1. **Separate deployable Next.js apps** — each has its own `app/` tree, fonts, and `globals.css` (design tokens). You can see different themes while the header and patterns from `@repo/ui` stay consistent.
2. **Composition at the edge of the host** — `apps/web` uses **rewrites** in `next.config.ts` so paths like `/docs` and `/animation` proxy to the configured origins (`DOCS_DOMAIN`, `ANIMATION_DOMAIN`). That lets one hostname present multiple backends without iframes in the demo.
3. **Shared design system** — primitives and features from `@repo/ui` avoid duplicating structure; **theming** still lives per app so each service looks intentionally different.

The **docs** app uses Next.js `basePath: "/docs"` so it is correct when opened on the host (after rewrite) and when opened on its **own** Vercel URL.

---

## Local development

From the repository root:

```sh
pnpm install
pnpm dev
```

Convenient default ports (when running each app locally):

| App | Port | Example URL |
| --- | --- | --- |
| Host (`web`) | 3000 | `http://localhost:3000` |
| Docs | 3001 | `http://localhost:3001/docs` |
| Animation | 3002 | (per your setup) |

For rewrites and cross-links, set environment variables such as **`DOCS_DOMAIN`**, **`ANIMATION_DOMAIN`**, and **`NEXT_PUBLIC_WEB_ORIGIN`** on the host (and docs, where needed) so they point at your local or deployed origins.

---

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) · [React](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) · [Turborepo](https://turbo.build/repo) · [pnpm](https://pnpm.io/)

---

## Original Turborepo starter note

This project started from the Turborepo “with Tailwind” example. The README above describes the **microfrontend and monorepo** shape of **this** codebase; for generic Turborepo usage, see the [Turborepo documentation](https://turbo.build/repo/docs).
