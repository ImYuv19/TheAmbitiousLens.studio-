# The Ambitious Lens — Portfolio Bible

## Table of Contents
1. [Project Overview & Vision](#1-project-overview--vision)
2. [Design & UI/UX Philosophy](#2-design--uiux-philosophy)
3. [Tech Stack & System Architecture](#3-tech-stack--system-architecture)
4. [Folder Structure Map](#4-folder-structure-map)
5. [Section-by-Section Engineering Breakdown](#5-section-by-section-engineering-breakdown)
    * [Hero](#hero)
    * [My Works (Portfolio)](#my-works-portfolio)
    * [Motion Graphics](#motion-graphics)
    * [Design Showcase](#design-showcase)
    * [Creative Process (Methodology)](#creative-process-methodology)
    * [About (Behind the Lens)](#about-behind-the-lens)
    * [Contact](#contact)
    * [Footer](#footer)
6. [Design Token Reference System](#6-design-token-reference-system)
    * [Color Palette](#color-palette)
    * [Typography Scale](#typography-scale)
    * [Spacing & Grid Layouts](#spacing--grid-layouts)
    * [Borders & Shadow Depth](#borders--shadow-depth)
    * [Cinematic overlays (Vignette & Noise)](#cinematic-overlays-vignette--noise)
7. [Hidden Personal Signatures (Easter Eggs)](#7-hidden-personal-signatures-easter-eggs)
8. [Performance Optimizations & Responsiveness](#8-performance-optimizations--responsiveness)
9. [Developer Playbook & Troubleshooting](#9-developer-playbook--troubleshooting)
10. [Roadmap & Absolute Safe Zones](#10-roadmap--absolute-safe-zones)

---

## 1. Project Overview & Vision

**The Ambitious Lens** is the high-end creative portfolio of **Yuvraj Singh (uvRaj)**, a director, video editor, and motion designer. The portfolio serves to showcase brand films, short-form editing, motion graphics, and typography designs.

The core vision is to elevate the digital resume into a premium cinematic closing credit sequence. Instead of typical website layouts, the interface operates as a unified canvas that seamlessly flows between storytelling projects, interactive vector animations, and viewfinder mockups. 

---

## 2. Design & UI/UX Philosophy

The user experience focuses on a desaturated, minimal dark aesthetic inspired by modern editorial interfaces like Apple, Framer, and Awwwards.

*   **Continuous Canvas:** No distinct visual section cuts. Sections flow into each other without hard borders, separated only by subtle negative space and 1px gradients.
*   **Tactility:** Every link, tab, and card feels responsive. Interacting with elements triggers spring-loaded transformations, glows, and coordinate shifts.
*   **The Viewfinder Metaphor:** Incorporates overlays that mimic camera viewfinders, timeline frames, and color scopes. This constantly reminds the viewer of the creator's creative tools (Premiere, After Effects, DaVinci Resolve).

---

## 3. Tech Stack & System Architecture

*   **Framework:** [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) (strict module resolution).
*   **Build Toolchain:** [Vite](https://vitejs.dev) (for hot module replacement and lightning-fast packaging).
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (utility-first system configured with dynamic theme variables).
*   **Animation System:** [Framer Motion / motion/react](https://motion.dev) (hardware-accelerated, spring-based animations).
*   **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering) (React wrapper for smooth scrolling, viewport checks, and coordinate scrolls).

---

## 4. Folder Structure Map

```
VIDEO_PORTFOLIO/
├── dist/                          # Production distribution files (bundled assets)
├── public/                        # Static assets (portraits, design posters, icons)
│   ├── icons/                     # Software logos (Premiere, AE, DaVinci, Photoshop)
│   └── images/                    # Category images (portfolio showcase & photography)
├── src/
│   ├── components/                # Shared global UI blocks
│   │   ├── Button/                # Styled CTA click components
│   │   ├── Container/             # Fluid structural wrapper
│   │   ├── Cursor/                # Custom canvas cursor component
│   │   ├── Loader/                # Fullscreen introductory countdown loader
│   │   ├── Navbar/                # Fixed glass navigation bar
│   │   └── SectionTitle/          # Branded subtitle/title module
│   ├── context/                   # Global state providers
│   │   └── CursorContext.tsx      # Cursor variant tracking context
│   ├── data/                      # Global databases / content mappings
│   │   ├── config.ts              # Global details configuration (email, social URLs)
│   │   ├── designProjects.ts      # Graphic design gallery data mapping
│   │   ├── motionGraphics.ts      # Motion design embeds data mapping
│   │   ├── shortFormVideos.ts     # YouTube Shorts portfolio mapping
│   │   └── workVideos.ts          # Categorized main works database mapping
│   ├── sections/                  # Full-page section modules
│   │   ├── About.tsx              # Viewfinder biography, disciplines, & teaser card
│   │   ├── Contact.tsx            # Details grid, Gmail/WhatsApp links, brief cards
│   │   ├── DesignShowcase.tsx     # Graphic design masonry grid & cycle lightbox
│   │   ├── Footer.tsx             # Credit tags & Sanskrit digital signatures
│   │   ├── Hero.tsx               # Opening vertical slides & desaturated labels
│   │   ├── MotionGraphics.tsx     # Aspect-video grids & nocookie player embeds
│   │   ├── Process.tsx            # Infinity loop methodology animation
│   │   └── VideoPortfolio.tsx     # My Works showcase categorizations & dynamic player
│   ├── styles/
│   │   └── global.css             # Main stylesheet declaring theme variables & film grain
│   ├── App.tsx                    # Main wrapper orchestrating Lenis scroll & sections
│   ├── main.tsx                   # React root insertion entrypoint
│   └── vite-env.d.ts              # TypeScript environment mappings
├── package.json                   # Dependencies, scripts, and package data
├── tsconfig.json                  # Global compiler options config
└── vite.config.ts                 # Dev server parameters & plugin registrations
```

---

## 5. Section-by-Section Engineering Breakdown

### Hero
*   **Path:** `src/sections/Hero.tsx`
*   **Logic:** Contains a split structure. Left column has a desaturated primary title, and right column features a spring-loaded vertical scrolling slideshow (`src/components/HeroCarousel`).
*   **Key Detail:** Logo casing is preserved as `"The Ambitious Lens by uvRaj"` in desaturated fonts.

### My Works (Portfolio)
*   **Path:** `src/sections/VideoPortfolio.tsx`
*   **Logic:** Dynamic tabbed works system importing data from `src/data/workVideos.ts` and Shorts data from `src/data/shortFormVideos.ts`.
*   **Key Detail:**
    *   Category tab headers scroll horizontally on mobile without scrollbars. Active tabs render a Framer Motion spring sliding underline.
    *   Includes a single shared YouTube player: only renders the iframe (`youtube-nocookie.com`) when a thumbnail is clicked. This prevents page load lag from multiple iframe instances.

### Motion Graphics
*   **Path:** `src/sections/MotionGraphics.tsx`
*   **Logic:** Displays a 2x2 grid (`aspect-video`) containing animated graphics.
*   **Key Detail:** Uses `youtube-nocookie.com` embedding. If an asset is missing or blocked, the card displays a fallback warning box.

### Design Showcase
*   **Path:** `src/sections/DesignShowcase.tsx`
*   **Logic:** Implements a dynamic masonry layout displaying design work, poster concepts, and social graphics.
*   **Key Detail:** Clicking an item opens a fullscreen lightbox modal. Includes arrow-key navigation, modal loop cycling, and backdrop blur close triggers. Utilizes a lock mechanism to freeze Lenis scrolling when active.

### Creative Process (Methodology)
*   **Path:** `src/sections/Process.tsx`
*   **Logic:** A dynamic mathematical infinity-loop animation.
*   **Key Detail:**
    *   Linear Speed Easing: Tracks coordinates along a figure-8 bezier path (`d={infinityPath}`).
    *   Calculates real-time coordinates inside `requestAnimationFrame` to slide a desaturated pink/purple gradient streak (`#trail-gradient`) smoothly around the curve.
    *   Node activations: Triggers software nodes (Premiere, After Effects, DaVinci Resolve) with custom glow effects and active logo scaling as the streak passes.

### About (Behind the Lens)
*   **Path:** `src/sections/About.tsx`
*   **Logic:** Left column features a camera viewfinder HUD overlay showing Yuvraj's portrait, a pulsing REC icon, standby metadata, and running timecode. Right column features biographical copy, primary disciplines, and complementary skill chips.

### Contact
*   **Path:** `src/sections/Contact.tsx`
*   **Logic:** Two-column grid. Left side lists structured information blocks (Email, WhatsApp, Location, Availability, Instagram, LinkedIn, YouTube). Right side has a selection panel for categories, budgets, and timelines.
*   **Key Detail:** Hovering over links triggers a 2.5px lift and text-shadow glow transition (`0 0 8px rgba(255,255,255,0.25)`). Mappings direct to Gmail compose URLs and prefilled WhatsApp links in new tabs.

### Footer
*   **Path:** `src/sections/Footer.tsx`
*   **Logic:** A transparent container displaying credits:
    *   **Left:** "The Ambitious Lens", "Designed • Directed • Developed by uvRaj" (with uvRaj highlighted), and copyright details.
    *   **Right:** Right-aligned copyright with low opacity.

---

## 6. Design Token Reference System

Configured directly inside `src/styles/global.css` using CSS custom properties:

### Color Palette
*   `--color-obsidian`: `#070709` (Primary background canvas)
*   `--color-charcoal-deep`: `#0e0e11` (Component panels background)
*   `--color-charcoal-medium`: `#16161a` (Hover surface tints)
*   `--color-platinum`: `#f4f4f7` (Standard high-contrast titles)
*   `#F2F2F2`: Bright white (Used for website name and links)

### Typography Scale
*   `--font-sans`: `'Inter', system-ui, -apple-system, sans-serif`
*   `--font-display`: `'Outfit', sans-serif`
*   `--font-mono`: monospace (For labels, metadata, and coordinates)

### Spacing & Grid Layouts
*   Standard sections use Tailwind `py-16 md:py-24` to ensure generous, consistent breathing room.
*   Horizontal constraints: Managed by the `Container` component (`max-w-7xl mx-auto px-6`).

### Borders & Shadow Depth
*   Dividers: `1px` height using `bg-gradient-to-r from-transparent via-white/[0.05] to-transparent`.
*   Card borders: Transparent white overlay (`border-white/[0.04]`).

### Cinematic Overlays (Vignette & Noise)
*   **Vignette:** A radial gradient (`bg-radial-vignette`) applied to section backdrops.
*   **Noise Grain:** Applied to `body::after` as a fixed viewport overlay with `opacity: 0.025`, rendering a repeatable fractal noise SVG.

---

## 7. Hidden Personal Signatures (Easter Eggs)

*   **Easter Egg 01:**
    *   **Text:** `॥ श्री गणेशाय नमः ॥`
    *   **Location:** Embedded in `src/sections/Footer.tsx` directly beneath the right copyright column.
    *   **Styles:** `text-[9px] text-white/[0.04] font-sans font-light mt-0.5 tracking-wider select-none pointer-events-none`.
*   **Easter Egg 02:**
    *   **Text:** `योगः कर्मसु कौशलम्`
    *   **Location:** Embedded within the Process infinity loop SVG (in both desktop and mobile layouts in `src/sections/Process.tsx`).
    *   **Styles:** Centered at `x="400" y="385"` inside the viewBox, styled with `fill-white/[0.04] select-none font-sans font-light tracking-[0.08em] pointer-events-none` at `9px` size.

---

## 8. Performance Optimizations & Responsiveness

1.  **Lazy Loaded YouTube Embeds:** Video cards render a lightweight thumbnail first. The actual iframe is injected only when clicked.
2.  **Hardware Acceleration:** Motion transitions utilize properties like `transform` and `opacity` to animate on the GPU.
3.  **Scroll Lock integration:** Toggles body overflow styles to freeze Lenis scroll behavior when modals are open.
4.  **Responsive Layouts:** Uses flex column stacking on mobile and shifts to multi-column grids on desktop (`md:` and `lg:` breakpoints).

---

## 9. Developer Playbook & Troubleshooting

### Development Commands
```bash
# Install dependencies
npm install

# Start local server
npm run dev

# Compile production build
npm run build

# Run TypeScript compilation checks
tsc -b
```

### Common Issues & Troubleshooting

*   **TypeError: ease value invalid:** Framer Motion spring variables require literal type constraints. Always append `as const` to transition parameters.
*   **Double Hover Lift bug:** Parent containers with translation styles should not use nested link hover attributes. Apply `y` motion transformations exclusively to child elements.
*   **Lenis scroll overlaps open modals:** Ensure the active modal state properly freezes body scrolling (`document.body.style.overflow = 'hidden'`).

---

## 10. Roadmap & Absolute Safe Zones

### Future Roadmap
*   Introduce direct integrations for video streaming APIs.
*   Add dynamic filters for portfolio video categories.
*   Enable dark/light contrast toggles while keeping desaturated brand themes.

### Absolute Safe Zones (Do NOT Modify)
1.  **Fixed Viewport Film Grain:** Do not alter the `body::after` styling in `global.css`. Changing this will break the cinematic texture of the portfolio.
2.  **Lenis Scroll Hooks:** Programmatic scroll-to-element triggers require Lenis integration. Avoid using standard browser hash overrides to prevent layout jumps.
3.  **Infinity Spline mathematical coordinates:** The path coordinates (`infinityPath` in `Process.tsx`) are mapped to match node placements. Modifying these coordinates will cause trail-tracking alignment issues.
