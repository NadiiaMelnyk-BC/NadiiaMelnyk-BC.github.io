---
# === Required ===
title: "Your article title — clear, specific, no clickbait"
date: 2026-05-07 09:00:00 +0000
tags: [migration, field-report]   # Slugs from _data/tags.yml. First tag is "primary" and shown in blue.

# === Strongly recommended ===
lead: >-
  One or two sentences that show up under the title, on cards, and as the
  meta description. Treat this as the elevator pitch of the article.

# Drop the cover image at: assets/images/posts/<slug>/cover.jpg (1600x900 ideal)
# then reference it here. Leave blank to fall back to a striped placeholder.
cover: /assets/images/posts/your-slug/cover.jpg

# === Optional ===
featured: false        # true = pin to homepage hero. Only one post should be featured at a time.
toc: true              # false = hide the sticky table of contents
comments: true         # false = hide the Giscus comments block on this post
read_time:             # leave blank to auto-calculate from word count

# SEO overrides (defaults are usually fine — only set these if you need to)
# description: ""      # falls back to `lead` if unset
# image: ""            # social-share image; falls back to `cover` if unset
---

Open with a hook — a concrete scene, a number that surprises, a contrarian
claim. Don't start with "In this article we'll discuss…". Earn the reader's
attention in the first sentence.

A second paragraph that grounds the reader: who is this for, what will they
get out of it, what's the shape of what comes next.

## 1. The first major section

H2 headings auto-populate the sticky table of contents. Keep section titles
short and concrete. If a heading has more than ~7 words, it's probably two
sections.

Use real examples. Numbers, project names (anonymized if needed), code
that actually ran in production. Generic prose is the enemy.

> A pull-quote uses a blockquote. The serif treatment makes it stand out
> visually — use sparingly, ~one per article.

### A subsection

H3 for sub-sections. They show in the TOC under their parent H2 with extra
indent.

## 2. The second section, with code

Inline `code` works in any paragraph. For blocks, use fenced code with a
language tag so syntax highlighting kicks in:

```al
codeunit 50100 "NAV Customization Migrator"
{
    procedure AuditCustomizations()
    var
        ObjectMetadata: Record "Object Metadata";
    begin
        ObjectMetadata.SetRange(Modified, true);
        if ObjectMetadata.FindSet() then
            repeat
                ClassifyForMigration(ObjectMetadata);
            until ObjectMetadata.Next() = 0;
    end;
}
```

If you reference repos or specific files, use full URLs — they survive
re-publishing better than relative ones.

## 3. The closing section

End with what changed for *you* after this work. What you'd do differently.
What's still unsolved. Don't end with "thanks for reading" — end with the
hardest question the reader is left with.

If there's a follow-up post planned, link it. Otherwise, the comment thread
will pick up the conversation.
