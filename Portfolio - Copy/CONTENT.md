# Content Guide: Managing Soham Thorat's Portfolio

All content on this website is driven by JSON files located in the `data/` directory. You can add or edit projects, Instagram posts, statistics, or journal articles without writing or modifying any HTML or CSS code.

---

## 1. Adding or Updating Instagram Posts (`data/instagram.json`)

To add a new work, append an object to `data/instagram.json`:

```json
{
  "id": 8,
  "url": "https://www.instagram.com/reel/EXAMPLE/",
  "type": "reel",
  "title": "Nike Brand Concept Video",
  "role": "Lead Video Editor",
  "category": "video",
  "year": "2026",
  "cover": "assets/images/cover-08.webp"
}
```

- **`type`**: `"reel"` or `"post"`.
- **`title`**: Name of work. If left `null`, defaults to "Work 0X".
- **`category`**: `"video"`, `"poster"`, `"thumbnail"`, or `"design"`.
- **`cover`**: Image path (recommended 1080x1350 4:5 WebP).
- **`url`**: Official Instagram link.

---

## 2. Managing Tech Lab Projects (`data/projects.json`)

To add a project, append an entry to `data/projects.json`:

```json
{
  "id": "project-slug",
  "title": "Project Title",
  "description": "One-line accurate description of what the project does.",
  "tags": ["Python", "FastAPI", "React"],
  "status": "Complete",
  "statusKey": "status.done",
  "repo": "https://github.com/ThoratSoham/your-repo",
  "demo": null,
  "stars": null
}
```

---

## 3. Updating Verified Stats (`data/stats.json`)

Only real numbers are displayed. Any statistic with a `value` of `null` is automatically hidden from the public stats strip:

```json
[
  {"key": "works", "value": 7, "label": {"en": "Works Featured", "ja": "制作実績"}},
  {"key": "github_stars", "value": 18, "label": {"en": "GitHub Stars", "ja": "GitHubスター"}},
  {"key": "instagram_followers", "value": 140, "label": {"en": "Followers", "ja": "フォロワー"}}
]
```

---

## 4. Writing & Publishing Journal Posts (`data/posts.json`)

Each entry in `data/posts.json` represents a blog/journal note:

```json
{
  "slug": "new-post-title",
  "date": "2026-10-18",
  "draft": false,
  "title": {
    "en": "English Post Title",
    "ja": "日本語タイトル"
  },
  "body": {
    "en": "English post markdown/text.",
    "ja": "日本語本文。"
  }
}
```

- Set `"draft": true` to mark it as a draft with a badge.
- Set `"draft": false` when ready for final public reading.
