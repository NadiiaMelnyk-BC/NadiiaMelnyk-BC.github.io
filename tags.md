---
layout: page
title: Tags
permalink: /tags/
---

<section class="page-hero">
  <div class="eyebrow blue" style="margin-bottom:14px;">Topics</div>
  <h1 class="h1 serif" style="font-size:54px;max-width:780px;">
    Browse by topic.
  </h1>
  <p class="lead" style="max-width:600px;margin-top:20px;">
    Each tag links to the writing archive, pre-filtered for that topic.
  </p>
</section>

<section class="tag-grid">
  {%- for tag in site.data.tags -%}
    {%- assign matched = site.posts | where_exp: 'p', 'p.tags contains tag.slug' -%}
    <a class="tag-card" href="{{ '/writing/' | relative_url }}?tag={{ tag.slug }}">
      <div class="head">
        <h2 class="h3">{{ tag.label }}</h2>
        <span class="count">{{ matched.size }} {% if matched.size == 1 %}essay{% else %}essays{% endif %}</span>
      </div>
      <p class="small" style="color:var(--ink-3);margin:0;">{{ tag.description }}</p>
    </a>
  {%- endfor -%}
</section>
