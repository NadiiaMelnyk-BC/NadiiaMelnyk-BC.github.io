# Tag taxonomy

Tags are the navigation backbone of the writing archive — readers filter by
them, and the homepage shows them on every card. Treat them as a small,
stable vocabulary, not a free-for-all.

The canonical list lives in `_data/tags.yml`. This document explains *when*
to use each one — the place you go before you invent a new tag.

## Rules

1. **Two-to-four tags per article.** One is too narrow (limits discovery),
   five is noise. The first tag is "primary" and shown in blue; pick it
   carefully — it determines what the article is filed under.
2. **Tags describe the article, not the topic.** A migration tutorial is
   tagged `tutorial` first, `migration` second.
3. **Don't invent tags mid-article.** If you reach for a tag that doesn't
   exist, decide whether it's a real new category or a one-off keyword.
   New tags should be reusable across at least 5 future articles.
4. **Slugs are URL-safe** — lowercase, hyphens, no spaces. Update *both*
   `_data/tags.yml` and this file when you add one.

## Current tags

### `migration` — Migration
NAV-to-BC upgrades, version-to-version jumps, data migration runbooks,
cutover stories. The shape of the work, not the technology.
**Use when:** the article is about *moving* a system from one state to
another.

### `al-dev` — AL Dev
AL extension patterns, language features, tooling, debugging, performance.
The day-to-day of being an AL developer.
**Use when:** the article would help someone who already writes AL.

### `architecture` — Architecture
Solution design, deployment models (per-tenant vs AppSource), structural
decisions, integration patterns, multi-company setups.
**Use when:** the article changes how someone *plans* an extension or system,
not how they implement one.

### `field-report` — Field Report
First-person accounts of real projects. Specific clients (anonymized),
specific timelines, specific outcomes. The opposite of a generic best-practice
post.
**Use when:** you're writing about *one project* that actually happened.

### `tutorial` — Tutorial
Step-by-step walkthroughs of a specific technique, feature, or workflow.
The reader should be able to follow along and end with a working result.
**Use when:** there's a clear "do X, then Y, then Z" sequence at the heart.

### `opinion` — Opinion
Takes on the BC ecosystem, partner channel, industry shifts, what Microsoft
should/shouldn't do. Personal point of view, argued explicitly.
**Use when:** the article has a thesis that someone could disagree with.

### `nav` — NAV
Legacy NAV (C/AL) topics. Usually paired with `migration` when discussing the
*starting* state of a migration story, but can stand alone when the article
is about NAV itself.
**Use when:** the article is meaningful only if the reader knows NAV.

### `operations` — Operations
Telemetry, debugging, monitoring, license management, running tenants in
production. The post-go-live half of the practice.
**Use when:** the article is about keeping BC running, not building on it.

## When you're tempted to add a new tag

Ask yourself:

- Will I write 5+ articles with this tag in the next 2 years?
- Is this concept distinct from every existing tag, or could I file it under
  one of them with a sentence in the body?
- Does it describe the *article*, or the *topic*? (Topics belong in the
  title and lead, not in tags.)

If yes to all three, add it. Otherwise, file the article under the closest
existing tag and use specific language in the body.
