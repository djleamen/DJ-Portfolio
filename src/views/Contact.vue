<template>
  <div class="contact-container">
    <header class="contact-hero bevel panel">
      <div class="section-marker">
        <span class="title-plate bevel">05</span>
        <p class="eyebrow">Contact</p>
      </div>
      <h1>Want to talk about what you’re building?</h1>
      <a href="mailto:dilara_leamen@icloud.com" class="btn bevel email-link">
        Email me! <span aria-hidden="true">↗</span>
      </a>
    </header>

    <section class="contact-directory bevel panel" aria-labelledby="elsewhere-title">
      <div class="section-marker">
        <span class="title-plate bevel" aria-hidden="true">@</span>
        <h2 id="elsewhere-title">Find me online</h2>
      </div>
      <div class="socials">
        <a href="https://linkedin.com/in/djleamen" target="_blank" rel="noopener noreferrer"><span class="name">LinkedIn</span><span class="note">Work / connect</span><span class="arrow" aria-hidden="true">↗</span></a>
        <a href="https://github.com/djleamen" target="_blank" rel="noopener noreferrer"><span class="name">GitHub</span><span class="note">Code / projects</span><span class="arrow" aria-hidden="true">↗</span></a>
        <a href="https://www.instagram.com/dejjos/" target="_blank" rel="noopener noreferrer"><span class="name">Instagram</span><span class="note">Life / process</span><span class="arrow" aria-hidden="true">↗</span></a>
        <a href="https://sessionize.com/djleamen" target="_blank" rel="noopener noreferrer"><span class="name">Sessionize</span><span class="note">Speaking / sessions</span><span class="arrow" aria-hidden="true">↗</span></a>
        <a href="https://bsky.app/profile/djleamen.substack.com" target="_blank" rel="noopener noreferrer"><span class="name">Bluesky</span><span class="note">Notes / conversation</span><span class="arrow" aria-hidden="true">↗</span></a>
        <a href="https://linktr.ee/djleamen" target="_blank" rel="noopener noreferrer"><span class="name">Linktree</span><span class="note">Everything else</span><span class="arrow" aria-hidden="true">↗</span></a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-container {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 0 var(--gap);
  display: grid;
  gap: 12px;
}

.section-marker {
  display: flex;
  align-items: center;
  gap: 14px;
}

.contact-hero {
  padding: clamp(24px, 4vw, 48px) var(--pad);
}

h1 {
  max-width: 13ch;
  margin: 22px 0 clamp(24px, 3.4vw, 36px);
  font-size: clamp(3.3rem, 6.4vw, 6.2rem);
  line-height: 0.9;
  text-wrap: balance;
}

.email-link {
  max-width: 100%;
  font-family: var(--mono);
  font-size: clamp(0.86rem, 1.5vw, 1.06rem);
  font-weight: 500;
  white-space: normal;
  overflow-wrap: anywhere;
}

.contact-directory h2 {
  margin: 0;
  font-size: 1.9rem;
  line-height: 1;
}

.socials {
  margin-top: 14px;
}

/* Ruled rows, like the README's About block */
.socials a {
  min-height: 54px;
  padding: 10px 4px;
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr) auto;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid var(--hairline);
  color: var(--ink);
  text-decoration: none;
}

.socials a:last-child { border-bottom: 0; }
.socials .name { font-size: 1.12rem; font-weight: 500; }
.socials .note { color: var(--body); font-family: var(--mono); font-size: 0.86rem; }
.socials .arrow { color: var(--muted); font-weight: 400; transition: transform 0.2s var(--ease-out), color 0.15s ease; }
.socials a:hover .name { color: var(--accent); }
.socials a:hover .arrow { color: var(--accent); transform: translate(3px, -3px); }

@media (max-width: 720px) {
  .socials a { grid-template-columns: 1fr auto; gap: 2px 20px; }
  .socials .note { grid-column: 1; grid-row: 2; }
  .socials .arrow { grid-column: 2; grid-row: 1 / span 2; }
}
</style>
