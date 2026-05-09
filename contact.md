---
layout: page
title: Get in touch
permalink: /contact/
---

{%- if site.contact_form.enabled -%}
  {%- assign contact_cols = "1fr 1.3fr" -%}
  {%- assign contact_max  = "1080px" -%}
{%- else -%}
  {%- assign contact_cols = "1fr" -%}
  {%- assign contact_max  = "640px" -%}
{%- endif -%}
<section class="contact-grid" style="grid-template-columns: {{ contact_cols }}; max-width: {{ contact_max }};">
  <div>
    <div class="eyebrow blue" style="margin-bottom:14px;">Get in touch</div>
    <h1 class="h1 serif" style="font-size:54px;line-height:1.05;">Say hello.</h1>
    <p class="lead" style="margin-top:20px;">
      Questions about an article, war stories from your own migration, ideas for things I should write about — all welcome. I read everything.
    </p>

    <div class="contact-links">
      <div class="row">
        <span class="eyebrow">Email</span>
        <a class="v" href="mailto:{{ site.data.author.links.email }}">{{ site.data.author.links.email }}</a>
        <span style="color:var(--ink-4);text-align:right;">↗</span>
      </div>
      <div class="row">
        <span class="eyebrow">LinkedIn</span>
        <a class="v" href="{{ site.data.author.links.linkedin_url }}" rel="me">{{ site.data.author.links.linkedin_handle }}</a>
        <span style="color:var(--ink-4);text-align:right;">↗</span>
      </div>
      <div class="row">
        <span class="eyebrow">GitHub</span>
        <a class="v" href="{{ site.data.author.links.github_url }}" rel="me">{{ site.data.author.links.github_handle }}</a>
        <span style="color:var(--ink-4);text-align:right;">↗</span>
      </div>
    </div>
  </div>

  {%- if site.contact_form.enabled -%}
  <div class="card" style="padding:40px 40px 32px;">
    <h2 class="h3" style="margin-bottom:6px;">Send a message</h2>
    <p class="small" style="color:var(--ink-3);margin-bottom:28px;">Replies usually within a few days.</p>

    {%- assign form_id = site.contact_form.form_id -%}
    {%- if form_id and form_id != "" -%}
      <form action="https://formspree.io/f/{{ form_id }}" method="POST" style="display:flex;flex-direction:column;gap:20px;">
        {%- if site.contact_form.redirect_after and site.contact_form.redirect_after != "" -%}
          <input type="hidden" name="_next" value="{{ site.contact_form.redirect_after }}">
        {%- endif -%}
        <input type="hidden" name="_subject" value="New message via nadiiamelnyk-bc.github.io">
        {%- comment -%} Honeypot — if a bot fills this, Formspree silently drops the submission. {%- endcomment -%}
        <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;" aria-hidden="true">

        <div class="field-grid">
          <div class="field">
            <label class="label" for="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your full name" required>
          </div>
          <div class="field">
            <label class="label" for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required>
          </div>
        </div>
        <div class="field">
          <label class="label" for="subject">Subject</label>
          <input id="subject" name="subject" type="text" placeholder="What's this about?">
        </div>
        <div class="field">
          <label class="label" for="topic">Topic</label>
          <select id="topic" name="topic">
            <option>General — say hi</option>
            <option>Question about an article</option>
            <option>Idea for a topic to cover</option>
            <option>Speaking / podcast invitation</option>
            <option>Other</option>
          </select>
        </div>
        <div class="field">
          <label class="label" for="message">Message</label>
          <textarea id="message" name="message" placeholder="Write as much or as little as you like…" required></textarea>
        </div>

        <label style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--ink-3);cursor:pointer;">
          <input type="checkbox" name="newsletter_optin" value="yes" style="margin-top:3px;">
          <span>Also subscribe me to the monthly newsletter.</span>
        </label>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;">
          <span class="micro">Won't share your email. Ever.</span>
          <button class="btn lg primary" type="submit">Send message →</button>
        </div>
      </form>
    {%- else -%}
      <div style="padding:24px 22px;border:1px dashed var(--line-2);border-radius:var(--radius);background:var(--paper-2);color:var(--ink-3);">
        <p class="body" style="margin:0 0 10px;"><strong>The form is being set up.</strong></p>
        <p class="small" style="margin:0;">In the meantime, the fastest way to reach me is by email — see the panel on the left, or click the button below.</p>
        <a class="btn primary" href="mailto:{{ site.data.author.links.email }}?subject=Hello%20from%20your%20site" style="margin-top:18px;">Email me directly →</a>
      </div>
    {%- endif -%}
  </div>
  {%- endif -%}
</section>
