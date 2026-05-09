# Voice guide

The site is called *field notes*. That's the voice. Lived-in, specific,
honest about what didn't work. Read this before you start drafting.

## Who's reading

- BC/AL developers, mid-career or senior. They've seen things.
- ERP consultants who switch between functional and technical hats.
- IT directors and CFOs who own the roadmap but don't write code.
- Recruiters and partner-channel people who skim for credentials.

The first three are the audience that matters. Write for them. Recruiters
will find you anyway.

## What the voice sounds like

**Specific over general.**
Not: "Migrations involve many challenges."
Yes: "ACME had 412 modified standard objects, and three years of nobody
maintaining them."

**Past tense, first person, when it's a story.**
"We exported every customized object" beats "One can export every customized
object". Field reports lose their punch in passive voice.

**Present tense, second person, when it's a tutorial.**
"You add the SetLoadFields call before the FindSet" beats "The developer
should add SetLoadFields…". Tutorials need a partner, not a narrator.

**Acknowledge the boring parts.** A lot of BC work is boring. Saying so
(briefly) makes the interesting parts land harder.

**Numbers earn trust.** Lines of code, project duration, downtime, user
counts, error rates. If you have the number, use it. If you don't, don't
fake one.

**Don't oversell.** "We delivered the migration" is fine. "We delivered a
transformative migration that revolutionized…" reads as a partner brochure.
The reader's already chosen to be here; you don't need to convince them.

## Things to avoid

- **"In this article we will…"** — start with the thing, not the meta.
- **"Microsoft has been a leader in ERP…"** — the reader knows who Microsoft
  is. Skip the on-ramps.
- **"Hopefully this helps!"** as a closer. The article either helped or it
  didn't. End with a thought, not a wave.
- **Emoji in body copy.** They look weird in serif type and dated in mono.
  Keep them out of articles entirely.
- **Endless caveats.** "Of course, this depends on your setup" is true of
  everything. State the recommendation; add caveats only when they change
  the recommendation.
- **AI-isms.** "It's important to note that…", "When it comes to…",
  "delve", "leverage" (as a verb), unsolicited bullet lists, mirror-image
  paragraphs. If a line could come from any blog on any topic, cut it.

## Things to do more of

- **Open with a scene.** A meeting room, a screen, a moment of confusion.
- **Name the boring decision that mattered.** "We picked per-tenant because
  the licensing math made it the only option" is gold.
- **Quote yourself talking to a client** — in italics, in dialog tags. It
  grounds an abstract topic.
- **Admit when something didn't work.** A field report with no failures is
  a brochure.
- **Sign off with the open question.** What's still unsolved? What would you
  do differently? That's where the comment thread starts.

## Format choices that match the voice

- **H2s are sentence-length, not headline-length.**
  Yes: `2. Auditing 14 years of code`
  No:  `Auditing Legacy Customizations: A Practical Approach`
- **Pull-quotes are sparing.** ~one per article, max two.
- **Code is real.** Snippets should be runnable or clearly marked as
  abbreviated. Don't paste pseudocode without saying so.
- **Lists are short.** If a list is longer than 7 items, it's probably
  prose pretending to be a list, or two lists pretending to be one.
