# nadiiamelnyk-bc.github.io

Personal site for Nadiia Melnyk — Microsoft Dynamics 365 Business Central
developer & migration specialist. Live at
https://nadiiamelnyk-bc.github.io.

Built with Jekyll, served natively by GitHub Pages from `main`.

## Repository layout

```
_config.yml          Jekyll config — site metadata, plugins, defaults
_data/               YAML data driving nav, author bio, tags, certs, timeline
_includes/           Reusable Liquid partials (head, nav, footer, article-card)
_layouts/            Page templates (default, page, post)
_posts/              Published articles (Jekyll convention: YYYY-MM-DD-slug.md)
_drafts/             Local-only drafts (not built into the site)
_authoring/          Writing kit: templates, voice guide, SEO checklist, tag taxonomy
assets/              CSS, JS, images, downloadable files (CV)
index.html           Homepage
writing/index.html   Article archive with tag filter
about.md             About page
contact.md           Contact form
tags.md              Tag index
404.html             Not-found page
robots.txt           Robots directives
Gemfile              Ruby dependencies (github-pages gem)
```

## Writing a new article

See `_authoring/README.md` for the full workflow. Short version:

1. Copy `_authoring/post-template.md` to `_drafts/<slug>.md`.
2. Fill in front-matter (title, tags, lead, cover) and write the body.
3. Run through `_authoring/seo-checklist.md`.
4. Move to `_posts/YYYY-MM-DD-<slug>.md` to publish.
5. Push to `main`. GitHub Pages renders within ~60 seconds.

## Local preview

```powershell
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

Requires Ruby. On Windows install via [RubyInstaller with DevKit](https://rubyinstaller.org/),
then `gem install bundler`.

## What's intentionally simple

- **No build action.** GitHub Pages renders Jekyll natively from `main`, so a
  push is a deploy. The previous `node build.js` workflow was removed.
- **No Node toolchain.** No webpack, no Vite, no PostCSS. CSS is hand-written
  with custom properties; JS is small enough to live as `<script>` tags.
- **No CMS.** Articles are markdown files. Drafts go in `_drafts/`, published
  posts go in `_posts/`. Front-matter handles all metadata.
- **Comments via Giscus** — wired in `_config.yml` but disabled by default.
  Enable once you've set up GitHub Discussions and run the Giscus configurator
  at https://giscus.app.

## Wiring later

A few things ship as graceful placeholders — they show "coming soon" copy
until you fill in one ID per service. All IDs live in `_config.yml`.

### Newsletter (Buttondown)

1. Sign up at https://buttondown.email (free up to 100 subscribers).
2. Your username is the slug at the end of your dashboard URL, e.g.
   `https://buttondown.email/<username>`.
3. Open `_config.yml` and set:
   ```yaml
   newsletter:
     username: "your-username"
   ```
4. Push. The form on the homepage hero and the footer subscribe widget
   switch from "Coming soon" to functional automatically. Subscribers from
   the homepage are tagged `homepage-hero` and from the footer `footer`,
   so you can see source attribution in Buttondown.

### Contact form (Formspree)

1. Sign up at https://formspree.io (free 50 submissions/month, spam-filtered).
2. Create a new form named "Contact". Copy the form ID — the bit after
   `/f/` in the form's endpoint, e.g. `https://formspree.io/f/xyzabcde`
   → `xyzabcde`.
3. Open `_config.yml` and set:
   ```yaml
   contact_form:
     form_id: "xyzabcde"
   ```
4. (Optional) Set `redirect_after` to a URL on this site, e.g.
   `"https://nadiiamelnyk-bc.github.io/contact/?sent=1"`, so submitters
   land back on the contact page instead of Formspree's default thank-you.
5. The form on `/contact/` switches from a "form is being set up" panel
   (with a `mailto:` fallback) to the full contact form automatically.

The form already includes a honeypot field (`_gotcha`) which Formspree uses
to silently drop bot submissions.

### Other placeholders

- **CV download** — drop the file at `assets/files/Nadiia_Melnyk_CV.pdf`
  (the path in `_data/author.yml` already points there).
- **Comments** — fill `giscus.repo_id` and `giscus.category_id` in
  `_config.yml` and set `giscus.enabled: true`.
- **Cert verification links** — fill `verify_url` in `_data/certifications.yml`
  for each cert.
