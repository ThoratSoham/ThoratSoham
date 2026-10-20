# Soham Thorat — Personal Portfolio Website

The official portfolio website for **Soham Thorat**: video editor, graphic designer, and full-stack developer who builds with modern AI-assisted workflows.

Designed with a heavy royal matte dark purple, black, and gold aesthetic, fluid typography, and zero framework build steps.

Live at: [https://thoratsoham.github.io/](https://thoratsoham.github.io/)

---

## 🎨 Tech Stack & Architecture

- **Architecture**: 100% Vanilla HTML5, CSS3, and JavaScript (ES Modules).
- **Build Tooling**: Zero build step, zero npm dependencies required to run or deploy.
- **Styling**: Vanilla CSS Design System with strict 8px spacing, CSS custom properties, and WCAG AA contrast.
- **Typography**: Google Fonts — *Archivo Black* (display) and *Space Grotesk* (body), with on-demand *Dela Gothic One* and *Noto Sans JP* for Japanese.
- **Internationalization**: Client-side EN/JP translation engine with persisted preferences.
- **Accessibility**: Skip links, visible focus indicators, min 44px tap targets, full keyboard navigation, and Calm mode / prefers-reduced-motion fallbacks.

---

## 📁 Repository Structure

```text
ThoratSoham.github.io/
├── index.html                  # Main story-scroll application
├── thumbnails.html             # Interactive Before/After Thumbnail Portfolio (Hooksmith)
├── 404.html                    # Branded not-found error page
├── README.md                   # Project documentation & deployment guide
├── CONTENT.md                  # Guide to editing data without touching code
├── sitemap.xml                 # Search engine sitemap
├── robots.txt                  # Web crawler policies
├── css/
│   ├── tokens.css              # Color tokens, fluid type scale, spacing
│   ├── base.css                # Reset, typography, grain overlay, accessibility
│   ├── components.css          # Buttons, badges, stickers, stamps, cursor
│   └── sections.css            # Gate, hero, chapters, studio, lab, stats, about
├── js/
│   ├── main.js                 # Modular coordination entrypoint
│   ├── gate.js                 # Real preloading counter & scalloped wipe
│   ├── i18n.js                 # EN/JP engine & dynamic font loader
│   ├── calm.js                 # Motion reducer & Calm mode controller
│   ├── cursor.js               # Interactive gold dot cursor
│   ├── parallax.js             # Mouse & device orientation tilt + glint
│   ├── reveal.js               # In-viewport video play/pause & scroll canvas
│   ├── instagram.js            # Click-to-load embeds & filters
│   ├── stats.js                # Snappy count-up animation
│   └── journal.js              # Markdown-ready post renderer
├── data/
│   ├── instagram.json          # 7 featured video/graphic design items
│   ├── projects.json           # Tech Lab builds
│   ├── stats.json              # Verified statistics
│   ├── posts.json              # Journal articles and public drafts
│   └── about.json              # Timeline, education, certificates
└── assets/
    ├── images/                 # Portrait cutout, card, covers (01-07), favicon, OG
    ├── video/                  # Black hole and flame motion clips + posters
    ├── svg/                    # Sunflowers, paisley, stamp frames
    ├── scene/                  # Scroll-scrubbing studio canvas frames
    └── Soham-Thorat-CV.pdf      # Curriculum Vitae
```

---

## 🚀 Running Locally

Because the project is 100% static ES modules, you can serve it with `npm` or any local static HTTP server:

```bash
# Using npm:
npm run dev

# Using Node directly:
npx -y serve . -l 3000

# Using Python:
python -m http.server 8000
```

Open [http://localhost:3000](http://localhost:3000) (or port 8000 if using Python) in your browser.

---

## 🚢 Deploying to GitHub Pages

1. Push all files to the `main` branch of the repository `ThoratSoham/ThoratSoham.github.io` (or `Portfolio`).
2. Navigate to **Settings** > **Pages** in the GitHub repository.
3. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
4. Set branch to `main` and folder to `/ (root)`.
5. Click **Save**. The website will be live in ~60 seconds at `https://thoratsoham.github.io/`.
