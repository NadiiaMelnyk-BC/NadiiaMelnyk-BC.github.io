# Authoring kit

Everything you need to write, tag, and ship articles on this site.

This folder is **not published** — Jekyll skips it (excluded in `_config.yml`),
and the underscore prefix tells Jekyll not to copy it to `_site/`. It's purely
your workspace for writing.

## Where things live

```
_posts/                Published articles (visible on the site after build)
_drafts/               Work-in-progress articles (local-only — not published)
_data/tags.yml         Tag definitions (the source of truth for the filter bar)
_data/author.yml       Your bio, links, CV path
_data/certifications.yml   Certs shown on the About page
_data/timeline.yml     Career timeline on About
_authoring/            ← you are here. Templates, guides, checklists.
assets/files/          Drop your CV PDF and other downloads here
assets/images/posts/   Per-post cover images go here (one folder per post slug)
```

## How to start a new article

1. Copy `_authoring/post-template.md` to `_drafts/<slug>.md` to work on it
   privately, or directly to `_posts/YYYY-MM-DD-<slug>.md` to publish.
2. Fill in the front-matter (title, lead, tags, date, cover).
3. Read `_authoring/voice-guide.md` before you write the first paragraph.
4. Write the body in Markdown. Use H2 for major sections, H3 for sub-sections —
   they auto-populate the sticky table of contents.
5. Run through `_authoring/seo-checklist.md` before promoting from draft to post.
6. Move from `_drafts/` to `_posts/` (and rename to `YYYY-MM-DD-<slug>.md`)
   when ready to publish.

## How to add a new tag

Open `_data/tags.yml` and add a new entry. Then update
`_authoring/tag-taxonomy.md` so the definition stays canonical. The filter
bar on `/writing/` and the `/tags/` index pick it up automatically.

Don't reuse a slug for two different concepts — the URL `?tag=<slug>` becomes
ambiguous if you do.

## Local preview

```powershell
bundle install            # one-time
bundle exec jekyll serve  # http://localhost:4000
```

If you don't have Ruby on Windows, install via
[RubyInstaller](https://rubyinstaller.org/) (pick the latest "with DevKit"
version), then `gem install bundler`.

## Publishing

Push to `main`. GitHub Pages renders the site automatically — no Action needed.
Live at https://nadiiamelnyk-bc.github.io within ~60 seconds.
