# Development Guide

All developer documentation for the [nadiiamelnyk-bc.github.io](https://nadiiamelnyk-bc.github.io) website.

## Project Structure

```
/NadiiaMelnyk-BC.github.io
├── README.md                           Personal/project description
├── DEVELOPMENT.md                      This file — dev instructions
│
├── index.html                          Website homepage
├── about.html                          About page
├── articles.html                       Articles listing page
├── links.html                          Useful links page
├── contact.html                        Contact page
│
├── posts/                              Auto-generated HTML article pages
│
├── articles/                           SOURCE articles + code examples
│   ├── articles.json                   Article manifest (source of truth)
│   └── <topic-slug>/
│       ├── index.md                    Article in Markdown + frontmatter
│       ├── code/                       Working code examples
│       │   └── README.md              Explains the code examples
│       └── images/                     Screenshots, diagrams for this article
│
├── css/
│   ├── style.css                       Global styles
│   ├── articles.css                    Articles page styles
│   └── post.css                        Single post styles
│
├── js/
│   ├── theme-toggle.js                 Dark/light mode toggle
│   └── tag-filter.js                   Article tag filtering
│
├── templates/
│   ├── post-template.html              Single article page template
│   ├── article-card.html               Article card for articles page
│   └── index-featured-card.html        Featured card for homepage
│
├── assets/
│   └── icons/
│
├── images/
│   └── .gitkeep
│
├── build.js                            Node.js build script
├── package.json                        Dependencies (marked, front-matter)
├── .github/
│   └── workflows/
│       └── build.yml                   GitHub Action: auto-build on push
└── .gitignore
```

## How to Add a New Article

### 1. Create the article folder

```bash
mkdir -p articles/your-topic-slug/code
mkdir -p articles/your-topic-slug/images
```

### 2. Write the article

Create `articles/your-topic-slug/index.md` with frontmatter:

```markdown
---
title: "Your Article Title"
date: "2026-03-01"
tags: ["AL Development", "Tips & Tricks"]
excerpt: "A short description for cards and meta tags."
readTime: "5 min"
---

Article content in standard Markdown...

## Code Example

```al
trigger OnAfterGetRecord()
begin
    // AL code here
end;
```

Full working code: [code/example.al](./code/example.al)
```

### 3. Add code examples (optional)

Place working code files in `articles/your-topic-slug/code/`.

Create `articles/your-topic-slug/code/README.md`:

```markdown
# Code Examples: Your Article Title

Working code examples from the article [Your Article Title](../index.md).

## Files

| File | Description |
|------|-------------|
| `example.al` | Description of what this code does |

## Usage

These examples are written for Business Central AL development (runtime 9.0+).
Copy into your AL project and adapt to your table/field names.

## Related

- [Read the full article](../index.md)
- [View on the blog](https://nadiiamelnyk-bc.github.io/posts/your-topic-slug.html)
```

### 4. Add images (optional)

Place images in `articles/your-topic-slug/images/`.

Reference in Markdown:
```markdown
![Alt text](./images/filename.png)
```

The build script copies images to `posts/your-topic-slug/images/`.

### 5. Register in the manifest

Add an entry to `articles/articles.json`:

```json
{
  "articles": [
    {
      "slug": "your-topic-slug",
      "title": "Your Article Title",
      "date": "2026-03-01",
      "tags": ["AL Development", "Tips & Tricks"],
      "excerpt": "A short description.",
      "featured": false,
      "readTime": "5 min"
    }
  ]
}
```

The `slug` must match the folder name under `articles/`.

### 6. Build and verify

```bash
npm install
node build.js
```

This generates:
- `posts/your-topic-slug.html` — the article page
- Updated `articles.html` — with the new card
- Updated `index.html` — with latest articles
- Updated `README.md` — with articles and code tables

### 7. Commit and push

```bash
git add -A
git commit -m "Add article: Your Article Title"
git push
```

The GitHub Action will also run `build.js` on push to `main`.

## Embedding Videos

Never store videos in the repo. Embed from YouTube:

```html
<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Demo" frameborder="0" allowfullscreen></iframe>
</div>
```

## Running Locally

```bash
npm install
node build.js
```

Then open `index.html` in a browser, or use any local server:

```bash
npx serve .
```

## GitHub Pages Publishing Guide

### Initial Setup

1. **Create the repository** on GitHub named `NadiiaMelnyk-BC.github.io`
2. **Push your code** to the `main` branch
3. **Enable GitHub Pages:**
   - Go to **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Click **Save**
4. **Enable GitHub Actions:**
   - Go to **Settings → Actions → General**
   - Ensure "Allow all actions and reusable workflows" is selected
   - Under "Workflow permissions", select "Read and write permissions"

### Custom Domain (Optional)

To use a custom domain:

1. In **Settings → Pages**, enter your custom domain
2. Add DNS records with your domain registrar:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | nadiiamelnyk-bc.github.io |

3. Enable "Enforce HTTPS" in GitHub Pages settings
4. Wait for DNS propagation (can take up to 24 hours)

## Build Script Details

`build.js` performs these steps:

1. Reads `articles/articles.json` manifest
2. For each article:
   - Reads `articles/{slug}/index.md`
   - Parses frontmatter (title, date, tags, excerpt, readTime)
   - Converts Markdown to HTML using `marked`
   - Scans `articles/{slug}/code/` for code example files
   - Copies `articles/{slug}/images/` to `posts/{slug}/images/`
   - Injects into `templates/post-template.html`
   - Writes to `posts/{slug}.html`
3. Updates `articles.html` with cards and tag buttons
4. Updates `index.html` with latest/featured articles
5. Updates `README.md` with article and code tables

The build is idempotent — running it multiple times produces the same output.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `articles/articles.json not found` | Create the file with `{"articles": []}` |
| Article not appearing | Check that the `slug` in `articles.json` matches the folder name |
| Images not loading in post | Ensure images are in `articles/{slug}/images/` and referenced as `./images/filename.png` |
| Build fails with module error | Run `npm install` to install dependencies |
| GitHub Action fails | Check Actions tab for logs; ensure workflow permissions allow write access |
| Dark mode not persisting | Check browser localStorage is not blocked |
| Tags not filtering | Ensure `data-tags` attribute on cards matches tag names |
