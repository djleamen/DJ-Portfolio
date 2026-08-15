<template>
  <div class="contact-container">
    <header class="contact-hero">
      <p class="eyebrow">Contact / 05</p>
      <h1>Want to talk about what you’re building?</h1>
      <a href="mailto:dilara_leamen@icloud.com" class="email-link">
        dilara_leamen@icloud.com <span>↗</span>
      </a>
    </header>

    <section class="contact-directory" aria-labelledby="elsewhere-title">
      <div>
        <p class="eyebrow">Elsewhere</p>
        <h2 id="elsewhere-title">Find me online</h2>
      </div>
      <div class="socials">
        <a href="https://linkedin.com/in/djleamen" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><small>Work / connect</small><b>↗</b></a>
        <a href="https://github.com/djleamen" target="_blank" rel="noopener noreferrer"><span>GitHub</span><small>Code / projects</small><b>↗</b></a>
        <a href="https://www.instagram.com/dejjos/" target="_blank" rel="noopener noreferrer"><span>Instagram</span><small>Life / process</small><b>↗</b></a>
        <a href="https://sessionize.com/djleamen" target="_blank" rel="noopener noreferrer"><span>Sessionize</span><small>Speaking / sessions</small><b>↗</b></a>
        <a href="https://bsky.app/profile/djleamen.substack.com" target="_blank" rel="noopener noreferrer"><span>Bluesky</span><small>Notes / conversation</small><b>↗</b></a>
        <a href="https://linktr.ee/djleamen" target="_blank" rel="noopener noreferrer"><span>Linktree</span><small>Everything else</small><b>↗</b></a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: clamp(10px, 3vw, 38px) 0 var(--gap);
  color: var(--body);
}

.contact-hero {
  padding: clamp(36px, 5vw, 64px) 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-bottom: 1px solid var(--hairline);
}

h1 {
  max-width: 10ch;
  margin: 22px 0 clamp(28px, 4vw, 48px);
  font-size: clamp(2.6rem, 4.2vw, 4.6rem);
  line-height: 0.94;
  font-weight: 480;
  letter-spacing: 0;
}

p {
  margin: 0;
  max-width: 60ch;
  font-size: clamp(1.02rem, 1.25vw, 1.18rem);
  line-height: 1.7;
  color: var(--body);
}

.email-link {
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--accent);
  color: var(--accent-bright);
  font-family: var(--mono);
  font-size: clamp(0.88rem, 1.5vw, 1.15rem);
  text-decoration: none;
}

.contact-directory {
  padding: clamp(46px, 7vw, 84px) 0;
  display: grid;
  grid-template-columns: minmax(220px, 0.55fr) minmax(0, 1.45fr);
  gap: clamp(40px, 8vw, 120px);
}

.contact-directory h2 {
  margin: 16px 0 0;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 480;
}

.socials {
  border-top: 1px solid var(--hairline);
}

.socials a {
  padding: 20px 4px;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid var(--hairline);
  color: var(--ink);
  text-decoration: none;
  transition: padding-left 0.22s var(--ease-out), background-color 0.22s ease;
}

.socials a:hover { padding-left: 12px; background: var(--accent-faint); }
.socials span { font-size: 1.08rem; }
.socials small { color: var(--muted); font-family: var(--mono); }
.socials b { color: var(--accent); font-weight: 400; }

@media (max-width: 720px) {
  .contact-hero { min-height: auto; }
  .contact-directory { grid-template-columns: 1fr; }
  .socials a { grid-template-columns: 1fr auto; }
  .socials small { grid-column: 1; grid-row: 2; }
  .socials b { grid-column: 2; grid-row: 1 / span 2; }
}
</style>

