# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Epic Landing — a marketing landing page for "Epic | National Loan Payoff Clearinghouse", built as a single-page Next.js app with heavy scroll-driven animations.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint (Next.js core-web-vitals + TypeScript rules)

## Tech Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin
- **GSAP 3** + ScrollTrigger for scroll-driven animations
- **lucide-react** for icons
- Fonts: custom `EpicSans` (woff2 in `/public/woff2/`) + Geist via `next/font`

## Architecture

This is a single-page site. `app/page.tsx` is a `"use client"` component that composes all sections in order:

`FloatingCard → Nav → Hero → PartnerLogos → Enterprises → Features → Tailored → PartnerGrid → ScrollAnimation → Footer`

All section components live in `components/` and are client components (most use GSAP/ScrollTrigger or IntersectionObserver). There are no server components beyond `app/layout.tsx`.

### Key patterns

- **GSAP ScrollTrigger** is the primary animation system. Components register plugins with `gsap.registerPlugin(ScrollTrigger)` and create timelines pinned to scroll progress. See `ScrollAnimation.tsx` (the most complex — multi-phase pinned scroll) and `Hero.tsx`.
- **CSS custom properties** define the color system in `app/globals.css` under `:root` (brand colors: `--navy`, `--teal`/`--purple` which are indigo-based, neutrals, semantic tokens).
- **Static assets** are organized in `/public/` by format: `svg/`, `png/`, `webp/`, `jpg/`, `mp4/`, `woff2/`.
- `PartnerGrid.tsx` has backup/alternate versions (`*.backup.tsx`, `*.working-webgl.tsx`) — the active one is `PartnerGrid.tsx`.

### Path alias

`@/*` maps to the project root (e.g., `@/components/Nav`).

## Remote images

`next.config.ts` allows images from `cdn.prod.website-files.com` and `images.unsplash.com`.
