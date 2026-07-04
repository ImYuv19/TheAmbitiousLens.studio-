# Brand Guidelines — The Ambitious Lens

## Table of Contents
1. [Visual Brand Philosophy](#1-visual-brand-philosophy)
2. [Typography & Fonts](#2-typography--fonts)
3. [Color Palette](#3-color-palette)
4. [Motion & Animation Philosophy](#4-motion--animation-philosophy)
5. [Shadows, Borders & Border Radii](#5-shadows-borders--border-radii)
6. [Cinematic Overlays (Grain & Vignette)](#6-cinematic-overlays-grain--vignette)
7. [Editorial Spacing & Layout Rules](#7-editorial-spacing--layout-rules)
8. [Voice, Tone & Copywriting](#8-voice-tone--copywriting)
9. [Safe Zones (Design Rules Never to Change)](#9-safe-zones-design-rules-never-to-change)

---

## 1. Visual Brand Philosophy

**The Ambitious Lens** brand identity is built around the concept of a **cinematic editorial catalog**. It rejects typical website colors, templates, and flashy visual triggers. 

The primary design principle is **extreme restraint**:
*   **Monochromatic Primaries:** Relies on off-black, graphite, and desaturated white tones.
*   **Structured Grids:** Grid alignments reference classical print design and widescreen video aspect ratios (16:9).
*   **Micro-Accents:** Colors are used only to highlight active states, software brand colors (e.g. After Effects purple, Premiere blue), or subtle camera status markers.

---

## 2. Typography & Fonts

The website uses a clean, modern type hierarchy combining three font families:

*   **Display Font (Outfit):**
    *   Used for section titles and primary headlines.
    *   **Rule:** Set to thin weights (`font-light`), desaturated, and tracked tightly to create an elegant, premium look.
*   **Sans Font (Inter):**
    *   Used for body copy, description lists, and navigation links.
    *   **Rule:** Set to light weights (`font-light`) for readability on high-contrast screens.
*   **Mono Font (SF Mono/monospace):**
    *   Used for index numbers, status labels, metadata, and coordinates.
    *   **Rule:** Capitalized, spaced widely (`tracking-[0.2em]` or `tracking-widest`).

---

## 3. Color Palette

Strict color hex parameters protect the desaturated look of the portfolio:

| Variable Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Obsidian** | `#070709` | Page backdrop canvas color |
| **Charcoal Deep** | `#0e0e11` | Primary component card base fill |
| **Charcoal Medium** | `#16161a` | Secondary card background & list items |
| **Platinum** | `#f4f4f7` | Dynamic high-contrast titles |
| **Bright White** | `#F2F2F2` | Navigation text and key signature links |
| **Accent Amber** | `#e5a93c` | Soft warm spot lighting |
| **Teal/Cyan** | `#06b6d4` | Live recording dot status indicators |

---

## 4. Motion & Animation Philosophy

Transitions are designed to feel confident and spring-loaded:

*   **Spring Physics:** Avoid linear animations. Use spring curves (low stiffness, high damping) to give elements realistic physical weight when moving.
*   **Staggered Reveals:** Content elements fade and slide up sequentially (e.g., titles reveal first, description second, buttons last) to guide the viewer's eye.
*   **Standard Easing:** For simple transitions, use a cubic-bezier curve (`[0.22, 1, 0.36, 1]`) over a duration of `0.25s` to `0.35s`.

---

## 5. Shadows, Borders & Border Radii

*   **Borders:** Use a transparent white tint (`border-white/[0.04]`). Never use solid gray or white borders.
*   **Radii:** Keep corners sharp or subtly rounded (`rounded-sm` or `rounded-md`, maximum of `8px`). This maintains the website's technical, editorial feel.
*   **Shadows:** Avoid drop shadows on text. Use box shadows for components (`hover:shadow-[0_0_25px_rgba(255,255,255,0.02)]`) to create a soft, clean glow.

---

## 6. Cinematic Overlays (Grain & Vignette)

*   **Vignette:** Applied to the corners of the viewport to keep the focus centered on the content, mimicking a camera lens.
*   **Film Grain:** A repeatable fractal noise SVG overlay applied to the entire page with `opacity: 0.025`. This adds a subtle, movie-theater-like texture to the dark background.

---

## 7. Editorial Spacing & Layout Rules

*   **Section Padding:** Standardize vertical padding on sections (`py-16 md:py-24`) to give content breathing room.
*   **Grid Consistency:** Align items to a 12-column grid layout on desktop, reflowing to single columns on tablet and mobile viewports.
*   **Responsive Margins:** Use standard margins (`max-w-7xl px-6`) across all viewports to ensure consistent alignment.

---

## 8. Voice, Tone & Copywriting

*   **Voice:** Confident, creative, and professional.
*   **Tone:** Minimal and direct. Avoid marketing buzzwords. Let the visual work speak for itself.
*   **Copy Rules:** Capitalize labels (e.g., `EMAIL`, `LOCATION`, `CONNECT`). Keep descriptions concise.

---

## 9. Safe Zones (Design Rules Never to Change)

1.  **Do not add bright saturated background colors:** Saturated backdrops will break the desaturated, premium dark look.
2.  **Do not use generic font families:** Always load the custom Google Fonts (Outfit, Inter) to preserve the design hierarchy.
3.  **Do not add generic icons:** Use desaturated vector SVGs or clean monospace text blocks to label sections.
