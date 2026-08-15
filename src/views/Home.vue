<template>
  <div class="home">
    <header class="hero">
      <div class="hero-copy">
        <p class="eyebrow">DJ Leamen's Portfolio</p>
        <h1>Making AI <em>useful</em>, not just impressive.</h1>
        <p class="lead">
          I’m DJ, a computer science student working across ML/AI, cloud, and full-stack systems.
          I like talking to people, understanding the problem, and creating something useful with them.
        </p>
        <div class="hero-actions">
          <router-link to="/projects" class="btn">Explore the work <span aria-hidden="true">↗</span></router-link>
          <router-link to="/contact" class="text-link">Start a conversation <span aria-hidden="true">→</span></router-link>
        </div>
      </div>
      <div class="hero-profile">
        <figure class="hero-portrait">
          <img src="@/assets/dj.png" alt="DJ Leamen" />
        </figure>
        <div class="hero-note">
          <span class="status-dot" aria-hidden="true"></span>
          <p>Current Status: <strong>Online, using VS Code</strong></p>
        </div>
      </div>
      <div class="proof-strip" aria-label="Portfolio overview">
        <div><strong>31</strong><span>Project stories</span></div>
        <div><strong>6</strong><span>Core languages</span></div>
        <div><strong>9</strong><span>Years coding</span></div>
      </div>
    </header>

    <section class="intro">
      <div class="section-marker">
        <span>01</span>
        <p class="eyebrow">Practice</p>
      </div>
      <div class="intro-body">
        <h2>Talk to people.<br />Find the problem.<br /><em>Build the thing.</em></h2>
        <div class="intro-copy">
          <p>
            I enjoy the technical work, but I also want to be in the room 
            asking questions, explaining tradeoffs, and learning from the people using what I build.
          </p>
          <router-link to="/about" class="text-link">Read the full profile <span aria-hidden="true">→</span></router-link>
        </div>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true"></div>

    <section class="featured">
      <div class="section-head">
        <div class="section-marker">
          <span>02</span>
          <p class="eyebrow">Selected work</p>
        </div>
        <h2>A few things I’ve been building.</h2>
        <router-link to="/projects" class="text-link">View all 31 projects <span aria-hidden="true">→</span></router-link>
      </div>
      <div v-if="loading" class="state">Loading selected work&hellip;</div>
      <div v-else-if="error" class="state">{{ error }}</div>
      <div v-else class="project-showcase">
        <router-link
          v-for="(project, index) in projects"
          :key="project._id || project.id"
          :to="projectDetailPath(project.id)"
          class="feature-project"
        >
          <span class="feature-index">0{{ index + 1 }}</span>
          <div class="feature-copy">
            <div class="feature-title">
              <h3>{{ project.title }}</h3>
              <span aria-hidden="true">↗</span>
            </div>
            <p>{{ project.description }}</p>
            <div v-if="project.tags?.length" class="feature-tags">
              <span v-for="tag in project.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <div class="section-divider" aria-hidden="true"></div>

    <section class="speaking">
      <div class="section-head">
        <div class="section-marker">
          <span>03</span>
          <p class="eyebrow">Speaking</p>
        </div>
        <h2>I like talking about what I’m learning.</h2>
      </div>
      <div class="speaking-layout">
        <figure class="speaking-photo">
          <img src="@/assets/dj-talk.png" alt="DJ Leamen speaking at a technology event" />
          <figcaption>AI, cloud, responsible systems, and what I learned while building them.</figcaption>
        </figure>
        <div id="sessionize-widget"></div>
      </div>
    </section>

    <section class="contact-cta">
      <p class="eyebrow">Want to talk?</p>
      <h2>Tell me what you’re working on.</h2>
      <router-link to="/contact" class="contact-arrow" aria-label="Get in touch">→</router-link>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apiService } from '../services/api';

interface Project {
  _id?: string;
  id: string;
  title: string;
  description: string;
  link: string;
  tags?: string[];
}

const featuredProjectIds = new Set(['18', '26', '3']);

const projectPaths: Record<string, string> = {
  '3': '/projects/purplwav',
  '18': '/projects/doc-reader',
  '26': '/projects/intelligent-app'
};

function projectDetailPath(id: string) {
  return projectPaths[id] || '/projects';
}
const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const allProjects = await apiService.getProjects();
    projects.value = allProjects.filter(project => featuredProjectIds.has(project.id));
  } catch (err) {
    console.error('Failed to load projects:', err);
    error.value = 'Failed to load projects. Please try again later.';
  } finally {
    loading.value = false;
  }

  const widget = document.getElementById('sessionize-widget');
  if (widget) {
    widget.style.background = 'transparent';
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.minHeight = '0';
    iframe.style.height = '0';
    iframe.style.display = 'block';
    iframe.style.background = 'transparent';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('allowtransparency', 'true');
    widget.appendChild(iframe);
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html style="background: transparent;">
          <head>
            <style>
              * {
                box-sizing: border-box;
              }

              html {
                background: transparent !important;
              }

              body {
                margin: 0;
                padding: 8px 10px 18px;
                background: transparent !important;
                color: #c6ccd6 !important;
                font-family: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 16px;
                line-height: 1.7;
              }

              a {
                color: #82b6ff !important;
                text-decoration: none !important;
                font-weight: 600;
                transition: color 0.2s ease;
              }

              a:hover {
                color: #a9cdff !important;
                text-decoration: underline !important;
              }

              .sessionize-host,
              .sessionize-host > div,
              [id*="sessionize"],
              [class*="sessionize"] {
                background: transparent !important;
              }

              .sessionize-host > div:first-child {
                border-radius: 6px !important;
                border: 1px solid rgba(233, 238, 248, 0.09) !important;
                background: #12151d !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35) !important;
                padding: 24px !important;
                margin: 18px 0 !important;
              }

              .sessionize-host > div:first-child > div {
                background: transparent !important;
                border: 0 !important;
                box-shadow: none !important;
                margin: 0 !important;
                padding: 0 !important;
              }

              h1, h2, h3, h4, h5, h6 {
                margin: 0 0 12px !important;
                font-family: 'Fraunces', Georgia, serif !important;
                font-weight: 600 !important;
                line-height: 1.3 !important;
                color: #f4f6fa !important;
              }

              p, span, li, div, section, article {
                color: rgba(198, 204, 214, 0.95) !important;
              }

              p {
                margin: 0 0 10px !important;
              }

              time, .date, [class*="date"], [class*="time"] {
                color: rgba(214, 228, 255, 0.76) !important;
                font-size: 0.96rem !important;
                margin-bottom: 8px !important;
                display: block !important;
              }

              ul, ol {
                margin: 10px 0 !important;
                padding-left: 20px !important;
              }

              li {
                margin-bottom: 6px !important;
              }

              button, .btn, [class*="button"] {
                padding: 9px 14px !important;
                border-radius: 4px !important;
                border: 1px solid rgba(79, 157, 255, 0.5) !important;
                background: rgba(79, 157, 255, 0.14) !important;
                color: #82b6ff !important;
                font-weight: 600 !important;
              }

              button:hover, .btn:hover, [class*="button"]:hover {
                background: rgba(79, 157, 255, 0.22) !important;
                transform: translateY(-1px) !important;
              }
            </style>
          </head>
          <body>
            <div class="sessionize-host">
              <script type="text/javascript" src="https://sessionize.com/api/speaker/events/m5gm58hmcl/1x1x61dafbx5"><\/script>
            </div>
          </body>
        </html>
      `);
      iframeDoc.close();

      const syncIframeHeight = () => {
        try {
          const body = iframeDoc.body;
          const host = iframeDoc.querySelector('.sessionize-host');
          const trackedNodes = host
            ? Array.from(host.children)
            : Array.from(body.children);

          let contentHeight = 0;
          trackedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              contentHeight = Math.max(contentHeight, node.offsetTop + node.offsetHeight);
            }
          });

          const height = Math.max(contentHeight, body.scrollHeight, body.offsetHeight);
          iframe.style.height = `${Math.max(height + 10, 280)}px`;
        } catch (e) {
          iframe.style.height = '320px';
        }
      };

      iframe.onload = () => {
        syncIframeHeight();
        let ticks = 0;
        const timer = window.setInterval(() => {
          syncIframeHeight();
          ticks += 1;
          if (ticks >= 24) {
            window.clearInterval(timer);
          }
        }, 250);
      };

      window.setTimeout(syncIframeHeight, 450);
      window.setTimeout(syncIframeHeight, 1000);
      window.setTimeout(syncIframeHeight, 1800);
    }
  }
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding-bottom: 0;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.6fr);
  grid-template-rows: 1fr auto;
  gap: clamp(32px, 6vw, 92px);
  align-items: center;
  padding: clamp(40px, 6vw, 76px) 0 24px;
}

.hero-copy {
  min-width: 0;
  animation: reveal 0.8s var(--ease-out) both;
}

.hero h1 {
  max-width: 13ch;
  margin: 20px 0 0;
  font-size: clamp(2.6rem, 4.2vw, 4.6rem);
  line-height: 0.96;
  font-weight: 480;
  letter-spacing: 0;
  text-wrap: balance;
}

.hero h1 em {
  font-style: italic;
  color: var(--accent);
}

.lead {
  margin: 30px 0 0;
  max-width: 46ch;
  font-size: clamp(1.02rem, 1.2vw, 1.18rem);
  line-height: 1.62;
  color: var(--body);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  margin-top: 34px;
}

.hero-profile {
  width: 100%;
  max-width: 360px;
  justify-self: end;
  align-self: center;
  animation: reveal 0.8s var(--ease-out) 0.12s both;
}

.hero-portrait {
  margin: 0;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid var(--hairline-strong);
  background: var(--surface);
}

.hero-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 38%;
}

.hero-note {
  margin: 18px 0 0 20%;
  padding: 16px 0 0;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border-top: 1px solid var(--hairline-strong);
}

.hero-note p {
  margin: 0;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.55;
}

.hero-note strong {
  color: var(--body);
  font-weight: 600;
}

.status-dot {
  flex: 0 0 auto;
  width: 7px;
  height: 7px;
  margin-top: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 5px var(--accent-dim);
}

.proof-strip {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}

.proof-strip div {
  min-height: 76px;
  padding: 15px clamp(12px, 2vw, 24px);
  display: flex;
  align-items: center;
  gap: 14px;
  border-right: 1px solid var(--hairline);
}

.proof-strip div:last-child { border-right: 0; }
.proof-strip strong { color: var(--accent); font-family: var(--serif); font-size: 1.7rem; font-weight: 500; }
.proof-strip span { color: var(--muted); font-family: var(--mono); font-size: 0.7rem; text-transform: uppercase; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  border-radius: 4px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #06080d;
  font-family: var(--sans);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.btn span { margin-left: 10px; }

.btn:hover {
  background: var(--accent-bright);
  border-color: var(--accent-bright);
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(79, 157, 255, 0.28);
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.8rem;
  text-decoration: none;
}

.text-link span {
  color: var(--accent);
  transition: transform 0.2s var(--ease-out);
}

.text-link:hover span { transform: translateX(5px); }

.section-marker {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-marker > span {
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.68rem;
}

.section-head {
  margin-bottom: clamp(28px, 4.5vw, 56px);
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr) auto;
  align-items: end;
  gap: 24px;
}

.section-head h2,
.contact-cta h2 {
  margin: 0;
  max-width: 18ch;
  font-size: clamp(1.8rem, 2.7vw, 3rem);
  line-height: 1;
  font-weight: 480;
  letter-spacing: 0;
}

.intro {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: clamp(24px, 5vw, 80px);
  padding-top: 28px;
  border-top: 1px solid var(--hairline);
}

.intro-body {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
  gap: clamp(32px, 7vw, 100px);
  align-items: end;
}

.intro-body h2 {
  margin: 0;
  font-size: clamp(2.1rem, 3.3vw, 3.6rem);
  line-height: 0.98;
  font-weight: 480;
}

.intro-body h2 em { color: var(--accent); font-weight: 480; }

.intro-copy p {
  margin: 0 0 26px;
  font-size: clamp(1.02rem, 1.25vw, 1.18rem);
  line-height: 1.72;
  color: var(--body);
}

.section-divider {
  height: 1px;
  margin-block: clamp(-30px, -2vw, -16px);
  background: var(--hairline-strong);
}

.project-showcase {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(18px, 3vw, 36px) 24px;
}

.feature-project {
  position: relative;
  grid-column: span 7;
  min-height: 190px;
  padding: clamp(24px, 3vw, 38px);
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: clamp(18px, 2.5vw, 32px);
  align-items: start;
  overflow: hidden;
  border-radius: 3px;
  color: var(--text-dark);
  text-decoration: none;
  background: var(--surface);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
}

.feature-project::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 3px;
  transform: scaleX(0);
  transform-origin: left;
  background: var(--accent);
  transition: transform 0.3s var(--ease-out);
}

.feature-project:nth-child(even) {
  grid-column: 7 / -1;
}

.feature-project:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 58px rgba(0, 0, 0, 0.3);
}

.feature-project:hover::after { transform: scaleX(1); }

.feature-index {
  padding-top: 5px;
  color: #236fcf;
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.feature-copy { min-width: 0; }

.feature-title {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: baseline;
}

.feature-title h3 {
  margin: 0;
  font-size: clamp(1.65rem, 2.6vw, 2.8rem);
  font-weight: 480;
  line-height: 1;
}

.feature-title > span {
  color: #236fcf;
  font-size: 1.3rem;
  transition: transform 0.2s var(--ease-out);
}

.feature-project:hover .feature-title > span { transform: translate(3px, -3px); }

.feature-copy > p {
  max-width: 58ch;
  margin: 12px 0 0;
  color: #4f596a;
  line-height: 1.65;
}

.feature-tags {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.feature-tags span {
  color: #4f596a;
  font-family: var(--mono);
  font-size: 0.66rem;
  text-transform: uppercase;
}

.feature-tags span:not(:last-child)::after {
  content: "/";
  margin-left: 7px;
  color: #236fcf;
}

.state {
  padding: 48px 0;
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
  color: var(--muted);
  font-family: var(--mono);
}

.speaking-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: start;
}

.speaking-photo { margin: 0; }
.speaking-photo img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border: 1px solid var(--hairline); }
.speaking-photo figcaption { margin-top: 10px; color: var(--muted); font-family: var(--mono); font-size: 0.7rem; }
#sessionize-widget { min-width: 0; }

.contact-cta {
  min-height: 260px;
  padding: clamp(32px, 5.5vw, 68px) 0;
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 24px;
  align-items: center;
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}

.contact-cta h2 { max-width: none; font-size: clamp(2.2rem, 3.6vw, 4rem); }

.contact-arrow {
  width: clamp(64px, 8vw, 104px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: 1px solid var(--accent);
  border-radius: 50%;
  color: var(--accent-bright);
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s var(--ease-out);
}

.contact-arrow:hover {
  background: var(--accent);
  color: var(--bg);
  transform: rotate(-18deg);
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: none; }
}

@media (max-width: 980px) {
  .section-head { grid-template-columns: 140px minmax(0, 1fr); }
  .section-head > .text-link { grid-column: 2; justify-self: start; }
  .intro { grid-template-columns: 140px 1fr; }
  .intro-body { grid-template-columns: 1fr; }
  .contact-cta { grid-template-columns: 140px 1fr auto; }
}

@media (max-width: 760px) {
  .hero {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    min-height: auto;
    gap: 36px;
  }

  .hero-profile {
    justify-self: start;
    max-width: 320px;
  }

  .proof-strip { grid-column: 1; }
  .proof-strip div { align-items: flex-start; flex-direction: column; gap: 3px; }

  .intro,
  .section-head,
  .contact-cta {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .section-head > .text-link { grid-column: 1; }
  .project-showcase { display: flex; flex-direction: column; }
  .feature-project,
  .feature-project:nth-child(even) { width: 100%; }
  .speaking-layout { grid-template-columns: 1fr; }
  .speaking-photo { max-width: 440px; }
  .contact-arrow { justify-self: start; }
}

@media (max-width: 460px) {
  .hero h1 { font-size: clamp(2.35rem, 10vw, 2.9rem); }
  .hero-profile { display: none; }
  .proof-strip { grid-template-columns: 1fr; }
  .proof-strip div { min-height: 58px; border-right: 0; border-bottom: 1px solid var(--hairline); }
  .proof-strip div:last-child { border-bottom: 0; }
  .contact-cta h2 { font-size: 2.5rem; }
  .hero-actions { align-items: flex-start; flex-direction: column; }
  }
</style>

