<template>
  <div class="home">
    <header class="hero bevel panel">
      <span class="hero-lance lance" aria-hidden="true"></span>
      <figure class="hero-portrait">
        <svg class="frame-art" viewBox="20 20 260 260" aria-hidden="true">
          <defs>
            <linearGradient id="hero-metal" x1="0" y1="0" x2="1" y2="1">
              <stop class="metal-a" />
              <stop class="metal-b" offset=".42" />
              <stop class="metal-c" offset=".52" />
              <stop class="metal-d" offset="1" />
            </linearGradient>
            <pattern id="hero-etched" width="6" height="6" patternUnits="userSpaceOnUse">
              <path class="etch" d="M0 6L6 0" />
            </pattern>
          </defs>
          <path d="M44 20H270V256L246 280H20V44Z" fill="url(#hero-etched)" opacity=".15" />
          <path class="frame-plate" d="M64.5 40.5H259.5V235.5L235.5 259.5H40.5V64.5Z" stroke="url(#hero-metal)" />
          <path class="frame-brackets" d="M32 88V52L52 32H88M212 268H248L268 248V212" />
          <path class="frame-lance" :d="LANCE" transform="translate(150 37) scale(.17)" />
          <path class="frame-lance" :d="LANCE" transform="translate(150 263) scale(.17)" />
        </svg>
        <img src="@/assets/dj.png" alt="DJ Leamen" />
      </figure>
      <div class="hero-copy">
        <p class="hero-greeting">DJ Leamen's Portfolio</p>
        <h1>Making AI <em>useful</em>, not just impressive.</h1>
        <p class="lead">
          I’m DJ, a computer science student working across ML/AI, cloud, and full-stack systems.
          I like talking to people, understanding the problem, and creating something useful with them.
        </p>
        <div class="hero-actions">
          <router-link to="/projects" class="btn bevel">Explore the work <span aria-hidden="true">↗</span></router-link>
          <router-link to="/contact" class="btn tonal bevel">Start a conversation</router-link>
        </div>
        <div class="hero-chips">
          <span class="chip bevel"><span class="status-dot" aria-hidden="true"></span>Online, using VS Code</span>
          <span class="chip bevel">Toronto, Canada</span>
          <span class="chips-tail" aria-hidden="true"><span class="lance"></span></span>
        </div>
      </div>
    </header>

    <div class="proof-strip" aria-label="Portfolio overview">
      <div class="bevel"><strong>31</strong><span>Project stories</span></div>
      <div class="bevel"><strong>6</strong><span>Core languages</span></div>
      <div class="bevel"><strong>9</strong><span>Years coding</span></div>
    </div>

    <section class="intro bevel panel">
      <div class="section-marker">
        <span class="title-plate bevel">01</span>
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

    <section class="featured">
      <div class="section-head">
        <div class="section-marker">
          <span class="title-plate bevel">02</span>
          <p class="eyebrow">Selected work</p>
        </div>
        <h2>A few things I’ve been building.</h2>
        <router-link to="/projects" class="text-link">View all 31 projects <span aria-hidden="true">→</span></router-link>
      </div>
      <div v-if="loading" class="loading-state"><p>Loading selected work</p></div>
      <div v-else-if="error" class="error-state"><p>{{ error }}</p></div>
      <div v-else class="project-showcase">
        <router-link
          v-for="(project, index) in projects"
          :key="project._id || project.id"
          :to="projectDetailPath(project.id)"
          class="feature-project bevel panel"
        >
          <div class="feature-top">
            <span class="feature-index bevel">0{{ index + 1 }}</span>
            <span class="feature-arrow" aria-hidden="true">↗</span>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div v-if="project.tags?.length" class="feature-tags">
            <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="chip bevel">{{ tag }}</span>
          </div>
        </router-link>
      </div>
    </section>

    <section class="speaking">
      <div class="section-head">
        <div class="section-marker">
          <span class="title-plate bevel">03</span>
          <p class="eyebrow">Speaking</p>
        </div>
        <h2>I like talking about what I’m learning.</h2>
      </div>
      <div class="speaking-layout">
        <figure class="speaking-photo">
          <img src="@/assets/dj-talk.png" alt="DJ Leamen speaking at a technology event" />
        </figure>
        <div id="sessionize-widget"></div>
      </div>
    </section>

    <div class="rule-lance" aria-hidden="true"><span class="lance"></span></div>

    <section class="contact-cta bevel panel">
      <div>
        <p class="eyebrow">Want to talk?</p>
        <h2>Tell me what you’re working on.</h2>
      </div>
      <router-link to="/contact" class="btn bevel">Get in touch <span aria-hidden="true">→</span></router-link>
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

// Lance ornament from the README's chrome skin (drawn in a 200-unit box around 0,0)
const LANCE = 'M0 -100C4 -35 7 -12 15 -15L48 -48L22 -8C35 -4 62 -2 100 0C62 2 35 4 22 8L48 48L15 15C7 12 4 35 0 100C-4 35 -7 12 -15 15L-48 48L-22 8C-35 4 -62 2 -100 0C-62 -2 -35 -4 -22 -8L-48 -48L-15 -15C-7 -12 -4 -35 0 -100Z';

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
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
            <style>
              :root {
                color-scheme: light dark;
                --surface: #f7f8f9;
                --hairline: #a8b5bd;
                --hairline-strong: #637580;
                --ink: #14191c;
                --body: #45535c;
                --accent: #245e68;
                --accent-bright: #163c44;
                --tonal: #dbe2e6;
                --on-tonal: #27363e;
              }

              @media (prefers-color-scheme: dark) {
                :root {
                  --surface: #101316;
                  --hairline: #3d4951;
                  --hairline-strong: #7a8993;
                  --ink: #f0f3f5;
                  --body: #b1bdc5;
                  --accent: #a5e3eb;
                  --accent-bright: #c6f2f6;
                  --tonal: #232b30;
                  --on-tonal: #d9e3e8;
                }
              }

              * {
                box-sizing: border-box;
              }

              /* The Sessionize mark ships in black; flip it on the dark scheme */
              @media (prefers-color-scheme: dark) {
                img[src*="sessionize" i][src*="logo" i],
                img[src*="sessionize" i][src$=".svg" i],
                img[alt*="sessionize" i],
                :is(h1, h2, h3, h4) :is(img, svg),
                a[href*="sessionize.com"] > svg {
                  filter: invert(1) brightness(1.6);
                }
              }

              html {
                background: transparent !important;
              }

              body {
                margin: 0;
                padding: 0 0 12px;
                background: transparent !important;
                color: var(--body) !important;
                font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                font-size: 18px;
                line-height: 1.6;
              }

              a {
                color: var(--accent) !important;
                text-decoration: none !important;
                font-weight: 600;
              }

              a:hover {
                color: var(--accent-bright) !important;
                text-decoration: underline !important;
              }

              .sessionize-host,
              .sessionize-host > div,
              [id*="sessionize"],
              [class*="sessionize"] {
                background: transparent !important;
              }

              /* Same bevelled plate as the rest of the site */
              .sessionize-host > div:first-child {
                --cut: 18px;
                border-radius: 0 !important;
                border: 1px solid var(--hairline) !important;
                background:
                  linear-gradient(to bottom right, transparent 50%, var(--hairline) 50% calc(50% + 1px), transparent calc(50% + 1px)) top left / var(--cut) var(--cut) no-repeat border-box,
                  linear-gradient(to top left, transparent 50%, var(--hairline) 50% calc(50% + 1px), transparent calc(50% + 1px)) bottom right / var(--cut) var(--cut) no-repeat border-box,
                  var(--surface) !important;
                clip-path: polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut));
                box-shadow: none !important;
                padding: 26px !important;
                margin: 0 !important;
              }

              .sessionize-host > div:first-child > div {
                background: transparent !important;
                border: 0 !important;
                box-shadow: none !important;
                margin: 0 !important;
                padding: 0 !important;
              }

              h1, h2, h3, h4, h5, h6 {
                margin: 0 0 10px !important;
                font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif !important;
                font-weight: 700 !important;
                font-size: 1.7rem !important;
                line-height: 1.1 !important;
                color: var(--ink) !important;
              }

              p, span, li, div, section, article {
                color: var(--body) !important;
              }

              p {
                margin: 0 0 10px !important;
              }

              time, .date, [class*="date"], [class*="time"] {
                color: var(--body) !important;
                font-family: 'IBM Plex Mono', ui-monospace, monospace !important;
                font-size: 0.86rem !important;
                font-weight: 500 !important;
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
                padding: 9px 16px !important;
                border-radius: 0 !important;
                border: 1px solid var(--hairline-strong) !important;
                background: var(--tonal) !important;
                color: var(--on-tonal) !important;
                font-weight: 600 !important;
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
}

/* ---------- Hero ---------- */
.hero {
  padding: clamp(22px, 3.4vw, 44px);
  display: grid;
  grid-template-columns: minmax(200px, 0.42fr) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
  overflow: hidden;
}

.hero-lance {
  position: absolute;
  top: -150px;
  right: -110px;
  width: 340px;
  background: var(--metal);
  opacity: 0.18;
  pointer-events: none;
}

.hero-portrait {
  position: relative;
  margin: 0;
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1;
  justify-self: center;
  animation: rise 0.7s var(--ease-out) both;
}

.frame-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.metal-a { stop-color: var(--hairline-strong); }
.metal-b { stop-color: var(--ink); }
.metal-c { stop-color: var(--hairline); }
.metal-d { stop-color: var(--fill); }
.etch { stroke: var(--hairline-strong); stroke-width: 0.4; }
.frame-plate { fill: var(--bg-2); }
.frame-brackets { fill: none; stroke: var(--hairline-strong); stroke-width: 2; }
.frame-lance { fill: var(--fill); }

/* The photo sits in the 196-unit window of the 260-unit frame */
.hero-portrait img {
  --cut: 9.2%;
  position: absolute;
  top: 12.3%;
  left: 12.3%;
  width: 75.4%;
  height: 75.4%;
  object-fit: cover;
  object-position: 50% 38%;
  clip-path: polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut));
}

.hero-copy {
  position: relative;
  min-width: 0;
  padding-top: 26px;
  animation: rise 0.7s var(--ease-out) 0.08s both;
}

/* Ruled line with a 2px accent start, as on the README hero */
.hero-copy::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 22%;
  height: 2px;
  background:
    linear-gradient(var(--accent) 0 0) left / 34px 2px no-repeat,
    linear-gradient(var(--hairline) 0 0) left bottom / 100% 1px no-repeat;
}

.hero-greeting {
  margin: 0;
  color: var(--body);
  font-size: 1.3rem;
  font-weight: 500;
}

.hero h1 {
  max-width: 14ch;
  margin: 4px 0 0;
  font-size: clamp(3.3rem, 6.4vw, 6.2rem);
  line-height: 0.9;
  text-wrap: balance;
}

.lead {
  margin: 20px 0 0;
  max-width: 52ch;
  font-size: clamp(1.06rem, 1.3vw, 1.2rem);
  line-height: 1.55;
  color: var(--body);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 26px;
}

.hero-chips {
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
}

.chips-tail {
  flex: 1;
  min-width: 60px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--accent);
}

.chips-tail::before {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, var(--hairline) calc(100% - 28px), var(--accent) calc(100% - 28px));
}

.chips-tail .lance { width: 20px; opacity: 0.7; }

/* ---------- Stat tiles ---------- */
.proof-strip {
  margin-top: calc(var(--gap) * -1 + 12px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.proof-strip div {
  --cut: 10px;
  --plate: var(--surface);
  min-height: 84px;
  padding: 14px clamp(14px, 2vw, 24px);
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.proof-strip strong {
  color: var(--ink);
  font-family: var(--display);
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1;
}

.proof-strip span {
  color: var(--body);
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* ---------- Section furniture ---------- */
.section-marker {
  display: flex;
  align-items: center;
  gap: 14px;
}

.section-head {
  margin-bottom: clamp(22px, 3vw, 36px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 14px 24px;
}

.section-head .section-marker { grid-column: 1 / -1; }

.section-head h2,
.contact-cta h2 {
  margin: 0;
  font-size: clamp(2.3rem, 4vw, 3.8rem);
  line-height: 0.96;
}

.section-head > .text-link { padding-bottom: 6px; }

/* ---------- Practice ---------- */
.intro {
  display: grid;
  gap: clamp(18px, 2.4vw, 28px);
}

.intro-body {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
  gap: clamp(24px, 6vw, 80px);
  align-items: end;
}

.intro-body h2 {
  margin: 0;
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  line-height: 0.94;
}

.intro-copy p {
  margin: 0 0 20px;
  font-size: clamp(1.04rem, 1.25vw, 1.18rem);
  line-height: 1.62;
  color: var(--body);
}

/* ---------- Selected work ---------- */
.project-showcase {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.feature-project {
  padding: 24px;
  display: flex;
  flex-direction: column;
  color: var(--body);
  text-decoration: none;
}

.feature-project:hover {
  --stroke: var(--hairline-strong);
  color: var(--body);
}

.feature-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.feature-index {
  --plate: var(--accent-dim);
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  color: var(--ink);
  font-family: var(--display);
  font-size: 1.7rem;
  font-weight: 700;
}

.feature-arrow {
  color: var(--muted);
  font-size: 1.3rem;
  line-height: 1;
  transition: transform 0.2s var(--ease-out), color 0.15s ease;
}

.feature-project:hover .feature-arrow {
  color: var(--accent);
  transform: translate(3px, -3px);
}

.feature-project h3 {
  margin: 22px 0 0;
  font-size: 2.1rem;
  line-height: 1;
}

.feature-project > p {
  margin: 10px 0 20px;
  line-height: 1.55;
}

.feature-tags {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.feature-tags .chip {
  --plate: var(--tonal);
  min-height: 28px;
  padding: 4px 11px;
  color: var(--on-tonal);
  font-size: 0.86rem;
}

/* ---------- Speaking ---------- */
.speaking-layout {
  display: grid;
  grid-template-columns: minmax(260px, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(20px, 4vw, 48px);
  align-items: start;
}

.speaking-photo { margin: 0; }

.speaking-photo img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border: 1px solid var(--hairline);
}

.speaking-photo figcaption {
  margin-top: 10px;
  color: var(--body);
  font-family: var(--mono);
  font-size: 0.8rem;
  line-height: 1.5;
}

#sessionize-widget { min-width: 0; }

/* ---------- Contact ---------- */
.contact-cta {
  padding: clamp(26px, 4vw, 48px) var(--pad);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.contact-cta .eyebrow { margin-bottom: 10px; }

@media (max-width: 980px) {
  .intro-body { grid-template-columns: 1fr; }
  .project-showcase { grid-template-columns: 1fr; }
}

@media (max-width: 760px) {
  .hero { grid-template-columns: 1fr; }

  .hero-portrait {
    max-width: 200px;
    justify-self: start;
  }

  .hero-copy::before { right: 0; }
  .proof-strip { grid-template-columns: 1fr; gap: 8px; }
  .proof-strip div { min-height: 64px; }
  .proof-strip strong { min-width: 1.4em; font-size: 2.6rem; }
  .section-head { grid-template-columns: 1fr; }
  .speaking-layout { grid-template-columns: 1fr; }
  .speaking-photo { max-width: 440px; }
}

@media (max-width: 460px) {
  .hero-actions .btn { width: 100%; }
  .chips-tail { display: none; }
}
</style>
