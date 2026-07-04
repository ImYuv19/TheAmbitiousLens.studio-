# Content Update Guide — The Ambitious Lens

## Table of Contents
1. [Introduction](#1-introduction)
2. [Hero Section Updates](#2-hero-section-updates)
3. [Work Section Updates](#3-work-section-updates)
4. [Motion Graphics Updates](#4-motion-graphics-updates)
5. [Design Gallery Updates](#5-design-gallery-updates)
6. [Creative Process Updates](#6-creative-process-updates)
7. [About Section Updates](#7-about-section-updates)
8. [Contact Details Updates](#8-contact-details-updates)
9. [Footer Updates](#9-footer-updates)
10. [Deployment Workflow](#10-deployment-workflow)
11. [Backup & Version Protocols](#11-backup--version-protocols)
12. [Monthly Maintenance Checklist](#12-monthly-maintenance-checklist)

---

## 1. Introduction

This guide provides step-by-step instructions for updating content on the **The Ambitious Lens** portfolio. It is designed to help anyone update text, swap videos, or change images without breaking the code or layout.

Before making changes, ensure you have:
*   A code editor installed (e.g., VS Code).
*   Node.js installed locally.
*   Access to the repository.

---

## 2. Hero Section Updates

*   **File Path:** `src/sections/Hero.tsx`
*   **Slideshow Images Path:** `src/components/HeroCarousel/HeroCarousel.tsx`

### Replace Carousel Slideshow Images
1. Copy your new images to the `public/images/` folder.
2. Open `src/components/HeroCarousel/HeroCarousel.tsx`.
3. Locate the `CAROUSEL_IMAGES` array:
   ```typescript
   const CAROUSEL_IMAGES = [
     '/images/slide1.jpg',
     '/images/slide2.jpg',
     // Add or replace paths here
   ];
   ```
4. Update the image paths in the array.

### Edit Hero Text & Copy
1. Open `src/sections/Hero.tsx`.
2. Locate the text within the `motion.h1` and paragraph tags to edit the headlines and description:
   ```tsx
   <h1>Visual Storyteller & Creative Director</h1>
   ```
3. Save the file.

---

## 3. Work Section Updates

*   **Database File:** `src/data/workVideos.ts`
*   **Short Form Database:** `src/data/shortFormVideos.ts`

### Add a Main Video Project
1. Open `src/data/workVideos.ts`.
2. Locate the `WORK_VIDEOS` database array.
3. Add a new object following this schema:
   ```typescript
   {
     id: 'unique-id',
     title: 'Project Title',
     category: 'commercials', // 'documentaries', 'shorts', 'commercials'
     youtubeId: 'YouTubeVideoID', // e.g. 'dQw4w9WgXcQ'
     thumbnail: '/images/portfolio/my-thumbnail.jpg',
     duration: '3:15'
   }
   ```
4. Save the file. The portfolio tab will update automatically.

---

## 4. Motion Graphics Updates

*   **Database File:** `src/data/motionGraphics.ts`

### Add or Swap Motion Videos
1. Open `src/data/motionGraphics.ts`.
2. Update the video details inside the array:
   ```typescript
   {
     id: 'motion-1',
     title: 'Title name',
     youtubeId: 'YouTubeID', // Uses youtube-nocookie embedding
     fallbackImg: '/images/motion/fallback.jpg'
   }
   ```
3. The layout displays a 2x2 video grid on desktop and stacks vertically on mobile automatically.

---

## 5. Design Gallery Updates

*   **Database File:** `src/data/designProjects.ts`
*   **Images Folder:** `public/images/design/`

### Add Gallery Images
1. Save your graphic design posters inside `public/images/design/`.
   *   **Rule:** Use `.jpg` or `.png` formats. Recommended dimension: width of `1200px` for optimal clarity and fast loading.
2. Open `src/data/designProjects.ts`.
3. Add an entry to the database:
   ```typescript
   {
     id: 'design-new',
     title: 'Poster Project Title',
     category: 'posters', // 'posters', 'branding', 'social'
     image: '/images/design/my-new-poster.jpg'
   }
   ```
4. The masonry grid will calculate aspect ratios and display the item automatically.

---

## 6. Creative Process Updates

*   **File Path:** `src/sections/Process.tsx`

### Swap Software Icons
1. Save the new icon inside `public/icons/` in SVG format (e.g. `premiere.svg`).
2. Open `src/sections/Process.tsx`.
3. Locate the `STAGES` array definition.
4. Modify the `logo` parameter to point to your new icon:
   ```typescript
   {
     name: "Editing",
     software: "Premiere Pro",
     logo: "/icons/premiere.svg",
     brandColor: "#0000CC" // Icon glow color accent
   }
   ```

---

## 7. About Section Updates

*   **File Path:** `src/sections/About.tsx`
*   **Portrait Image:** Save as `yuvraj_portrait.png` inside the artifacts folder or configure the target path in `About.tsx`.

### Edit Biography Copy
1. Open `src/sections/About.tsx`.
2. Locate the paragraph block on the right column.
3. Update the description copy directly inside the text nodes.

### Update Skill Pills
1. Locate `PRIMARY_DISCIPLINES` or `COMPLEMENTARY_SKILLS` arrays inside `About.tsx`.
2. Add, remove, or modify text items in the array:
   ```typescript
   const COMPLEMENTARY_SKILLS = [
     "Social Media Marketing",
     "Content Strategy",
     // Add your skills here
   ];
   ```

---

## 8. Contact Details Updates

*   **File Path:** `src/data/config.ts`

To update your contact details globally across the website:
1. Open `src/data/config.ts`.
2. Modify the variables:
   ```typescript
   export const EMAIL = "theambitiouslens@gmail.com";
   export const INSTAGRAM_PROFILE = "https://instagram.com/...";
   export const LINKEDIN_PROFILE = "https://linkedin.com/...";
   export const YOUTUBE_VIDEOS = "https://youtube.com/...";
   export const LOCATION = "Mumbai";
   ```
3. Save the file.

---

## 9. Footer Updates

*   **File Path:** `src/sections/Footer.tsx`

### Update Copyright Year
1. Open `src/sections/Footer.tsx`.
2. Locate the copyright text node in the bottom row.
3. Edit the year string:
   ```tsx
   <span>© 2026 Yuvraj Singh. All Rights Reserved.</span>
   ```

---

## 10. Deployment Workflow

When content updates are complete, follow this workflow to build and deploy:

### 1. Build Verification
Run the compiler check locally to ensure there are no syntax or TypeScript warnings:
```bash
npm run build
```
Ensure the build succeeds and outputs a `dist` folder.

### 2. Deployment
Upload the generated contents of the `dist/` directory to your web host (e.g. Vercel, Netlify, Github Pages, or a custom VPS).

---

## 11. Backup & Version Protocols

*   **Branching:** Do not commit changes directly to the `main` branch. Create a feature branch (e.g. `content/update-works`) first.
*   **Pull Requests:** Verify build outputs before merging branches into `main`.
*   **Reversion:** Keep a backup of your old `src/data/` files in case you need to restore previous versions of your portfolio.

---

## 12. Monthly Maintenance Checklist

- [ ] **Dead Link Audit:** Check that all social links (Instagram, LinkedIn, YouTube) load correctly.
- [ ] **Briefs Form Check:** Verify that selecting timeline and budget options correctly pre-populates email drafts.
- [ ] **Responsive Test:** Inspect pages on mobile viewports to ensure grid cards scale cleanly.
- [ ] **Asset Size Check:** Verify that any new images added are compressed to keep page load times fast.
