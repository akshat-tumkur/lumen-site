# LUMEN — Capture Reality

> A luxury, Apple-style interactive scrollytelling landing page showcasing the flagship LUMEN camera.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**Live Demo:** [https://lumen-site-kxrm.vercel.app/](https://lumen-site-kxrm.vercel.app/)

---

## Overview

LUMEN is an editorial digital experience built with Next.js 14 and Tailwind CSS v4. It pairs a scroll-linked HTML5 canvas image sequence with physics-driven typography, culminating in a cinematic technical specification stream.

---

## Key Features

- **Interactive Canvas Scrubber:** 200-frame WebP image sequence mapped directly to scroll progress using Framer Motion springs (`stiffness: 400`, `damping: 50`) with Retina/HiDPI canvas scaling and responsive `object-cover` geometry.
- **Scroll-Linked Text Overlays:** Key product narratives (`Precision Optics`, `Engineered From Within`, `See Beyond`) phase in and out smoothly as the camera rotates.
- **Fixed-Curtain Exit Transition:** As the interactive canvas scrubber reaches completion, the viewport fades out smoothly (`canvasOpacity` interpolation) revealing editorial narrative sections.
- **Editorial Brand Storytelling:** High-contrast minimalist black aesthetic (`#050505`) with custom typography pairing standard sans-serif with Pinyon Script cursive branding accents.
- **Cinematic Specifications Stream:** Redesigned technical data presentation replacing rigid tables with high-impact, vertical typographic statements (`62.5 MP`, `Grade 5 Titanium`, `0.80x Viewfinder`, `8K RAW`).
- **Production Static Export:** Configured for high-speed edge distribution with `output: 'export'` and unoptimized responsive images.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | React Framework, static site generation & export |
| **React 18** | UI component architecture |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Modern styling engine with `@import "tailwindcss"` |
| **Framer Motion** | Physics-based scroll springs, viewport animations, and opacity interpolation |
| **HTML5 Canvas 2D** | Real-time 60fps frame sequence rendering |
| **Pinyon Script & Inter** | Google Fonts typography pairing |

---

## Project Structure

```text
lumen-site/
├── app/
│   ├── globals.css          # Tailwind v4 configuration & root theme variables
│   ├── layout.tsx           # Metadata, fonts (Inter & Pinyon Script)
│   └── page.tsx             # Root page composing CameraScroll & LumenExperience
├── components/
│   ├── CameraScroll.tsx     # 200-frame canvas scrubber & synchronized text overlays
│   └── LumenExperience.tsx  # Editorial philosophy, brand narrative, specs & CTA
├── public/
│   └── frames/              # 200 optimized WebP animation frames (frame_000 - frame_199)
├── netlify.toml             # Netlify deployment configuration
├── next.config.mjs          # Next.js configuration (static HTML export)
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/akshat-tumkur/lumen-site.git
   cd lumen-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Generate the optimized static build:

```bash
npm run build
```

The static output is generated into the `out/` directory, ready to deploy to Netlify, Vercel, Cloudflare Pages, or AWS S3.

---

## Performance & Optimization Notes

- **WebP Compression:** All 200 animation frames are pre-converted to WebP, reducing the total payload down to ~10.8 MB across all 200 high-res frames.
- **Canvas Cover Math:** Image frames dynamically calculate aspect ratios on resize to fill the viewport seamlessly across ultrawide monitors and mobile screens without letterboxing.
- **GPU Accelerated Transitions:** Layout animations utilize opacity and transform properties via Framer Motion to prevent layout reflows during rapid scrolling.
