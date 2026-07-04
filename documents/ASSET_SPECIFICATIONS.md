# Asset Specifications — The Ambitious Lens

## Table of Contents
1. [Asset Matrix Blueprint](#1-asset-matrix-blueprint)
2. [Image Asset Specifications](#2-image-asset-specifications)
    * [Hero Portrait](#hero-portrait)
    * [About Portrait](#about-portrait)
    * [Work Thumbnails](#work-thumbnails)
    * [Design Gallery Posters](#design-gallery-posters)
3. [Vector, Icon & Metadata Assets](#3-vector-icon--metadata-assets)
    * [Software Logos & System Icons](#software-logos--system-icons)
    * [Favicons](#favicons)
    * [Social Preview (OpenGraph) Image](#social-preview-opengraph-image)
4. [Compression Guidelines & Tools](#4-compression-guidelines--tools)
5. [Naming Conventions for Assets](#5-naming-conventions-for-assets)

---

## 1. Asset Matrix Blueprint

Use the following reference chart when creating visual assets for the portfolio:

| Asset Name | Aspect Ratio | Resolution | Format | Max File Size | Destination Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Slide Image** | `3:4` or `9:16` | `1080 x 1440 px` | `.webp` | `150 KB` | `public/images/` |
| **About Biography portrait** | `4:5` | `1080 x 1350 px` | `.png` | `250 KB` | `public/images/` |
| **Work Videos Cover** | `16:9` | `1280 x 720 px` | `.jpg` | `120 KB` | `public/images/portfolio/` |
| **Design Gallery Poster** | `4:5` or Variable | `1200 x 1500 px` | `.jpg` | `180 KB` | `public/images/design/` |
| **Software Logos / Icons** | `1:1` | Vector | `.svg` | `15 KB` | `public/icons/` |
| **OpenGraph Social Image** | `1.91:1` | `1200 x 630 px` | `.jpg` | `150 KB` | `public/` |

---

## 2. Image Asset Specifications

### Hero Portrait
*   **Purpose:** Appears in the vertical scrolling slideshow on the Hero section.
*   **Format:** `.webp` (strongly recommended for transparency and fast loading).
*   **Resolution:** `1080 x 1440 px` (portrait crop).

### About Portrait
*   **Purpose:** Appears inside the camera viewfinder monitor on the About section.
*   **Format:** `.png` (supports transparency around frame corners) or compressed `.jpg`.
*   **Resolution:** `1080 x 1350 px` (portrait crop).

### Work Thumbnails
*   **Purpose:** Displays on main video showcase cards prior to playing video embeds.
*   **Format:** `.jpg` (progressive format recommended).
*   **Resolution:** `1280 x 720 px` (standard 720p HD).

### Design Gallery Posters
*   **Purpose:** Rendered in the Design Showcase masonry gallery layout.
*   **Format:** `.jpg` or `.png` (if alpha channel gradients are needed).
*   **Resolution:** `1200 x 1500 px` (maintains details on viewport zoom-in modal).

---

## 3. Vector, Icon & Metadata Assets

### Software Logos & System Icons
*   **Purpose:** Displays inside the Creative Process nodes (After Effects, Premiere, etc.).
*   **Format:** `.svg` (vector format keeps lines sharp at any scale).
*   **Rule:** Remove any inline CSS styles, ID duplicates, and unused canvas paths inside the SVG files to prevent browser render warnings.

### Favicons
*   **Purpose:** Displayed in browser tabs.
*   **Format:** `.ico` or `.png`. Include resolutions `16x16 px` and `32x32 px`.

### Social Preview (OpenGraph) Image
*   **Purpose:** Displayed when the portfolio link is shared on platforms like LinkedIn or X.
*   **Format:** `.jpg` or `.png`.
*   **Resolution:** `1200 x 630 px`.

---

## 4. Compression Guidelines & Tools

To maintain fast page load times, compress all image assets before uploading them to the project:

### Compression Recommendations
1.  **TinyPNG / TinyJPG:** Use online engines to compress `.jpg` and `.png` files. This can reduce file sizes by up to 70% with zero visible loss in quality.
2.  **Squoosh (Google):** Run custom compression logic (convert `.png`/`.jpg` to `.webp`) to optimize asset footprints.
3.  **SVGOMG:** Paste vector SVG markup to clean up unused code and paths before deploying the icons.

---

## 5. Naming Conventions for Assets

To keep files organized and clean:

*   Use **kebab-case** naming conventions (all lowercase, words separated by hyphens).
*   Structure filenames clearly: `[section]-[asset-name].[extension]`

### Examples
*   `hero-slideshow-01.webp`
*   `about-camera-portrait.jpg`
*   `portfolio-brandfilm-thumbnail.jpg`
*   `design-poster-resolve.jpg`
*   `icon-davinci.svg`
