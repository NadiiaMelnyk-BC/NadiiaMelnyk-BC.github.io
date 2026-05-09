---
layout: page
title: About
permalink: /about/
---

<section class="about-hero">
  <div>
    <div class="eyebrow blue" style="margin-bottom:14px;">About</div>
    <h1 class="h1 serif" style="font-size:60px;">
      Ten years of Dynamics, one focused practice.
    </h1>
    <p class="lead" style="margin-top:20px;max-width:560px;">
      I've spent a decade inside Microsoft Dynamics — first NAV, now Business Central. I write about what I learn so the next person facing the same problem has a head start.
    </p>
    <div class="ctas">
      <a class="btn lg primary" href="{{ site.data.author.cv_path | relative_url }}" download>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download CV (PDF)
      </a>
      <a class="btn lg ghost" href="{{ site.data.author.links.linkedin_url }}" rel="me">View on LinkedIn →</a>
    </div>
  </div>
  <div class="placeholder portrait"><span class="ph-tag">portrait</span></div>
</section>

<section class="about-bio">
  <div class="inner">
    <div>
      <h2 class="h3" style="margin-bottom:16px;">A quick bio</h2>
      <p class="body" style="margin-bottom:14px;">
        I started with Dynamics NAV 2009 R2 at a Microsoft Gold Partner in Kyiv, working on a manufacturing implementation that ran for three years and taught me everything I still believe about ERP work: the system is the easy part, the people are the work.
      </p>
      <p class="body" style="margin-bottom:14px;">
        From 2018 to 2023 I led BC migration work at a mid-sized Nordic partner, delivering 11 projects across manufacturing, food production, and logistics. Since 2024 I've been independent.
      </p>
      <p class="body">
        I write extensively about what I learn. The newsletter goes out monthly to BC professionals.
      </p>
    </div>
    <div>
      <div class="eyebrow" style="margin-bottom:14px;">At a glance</div>
      <div class="about-facts">
        <div class="row"><span class="k">Based in</span><span class="v">{{ site.data.author.location }}</span></div>
        <div class="row"><span class="k">Working hours</span><span class="v">{{ site.data.author.hours }}</span></div>
        <div class="row"><span class="k">Languages</span><span class="v">{{ site.data.author.languages }}</span></div>
      </div>
    </div>
  </div>
</section>

<section class="timeline">
  <div class="eyebrow blue" style="margin-bottom:12px;">Path</div>
  <h2 class="h2 serif" style="margin-bottom:36px;">How I got here</h2>
  {%- for stop in site.data.timeline -%}
    <div class="row">
      <div class="when">{{ stop.when }}</div>
      <div>
        <div class="h4" style="margin-bottom:6px;">{{ stop.role }}</div>
        <p class="small" style="color:var(--ink-3);margin:0;">{{ stop.desc }}</p>
      </div>
    </div>
  {%- endfor -%}
</section>

<section class="certs">
  <div class="eyebrow blue" style="margin-bottom:12px;">Credentials</div>
  <h2 class="h2 serif" style="margin-bottom:10px;">Microsoft Certifications</h2>
  <p class="small" style="color:var(--ink-3);max-width:560px;margin-bottom:32px;">
    Each certification links to its public verification page on Microsoft Learn.
  </p>
  <div class="grid">
    {%- for cert in site.data.certifications -%}
      <div class="cert">
        <span class="code">{{ cert.code }}</span>
        <div>
          <div class="name">{{ cert.name }}</div>
          <div class="year">Issued {{ cert.year }}</div>
        </div>
        {%- if cert.verify_url and cert.verify_url != "" -%}
          <a class="btn sm ghost" href="{{ cert.verify_url }}" rel="noopener" target="_blank" style="white-space:nowrap;">
            Verify
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;">
              <path d="M7 17L17 7"/><path d="M8 7h9v9"/>
            </svg>
          </a>
        {%- else -%}
          <span class="micro" style="white-space:nowrap;">Verify link soon</span>
        {%- endif -%}
      </div>
    {%- endfor -%}
  </div>
</section>
