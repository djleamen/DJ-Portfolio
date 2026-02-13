<template>
  <div class="page-container">
    <div class="home-container">
      <section class="hero">
        <h1 class="fade-in"><span class="highlight">Dilara 'DJ' Leamen</span></h1>
        <p class="typing-animation">Cloud, Apps, Data & AI Developer</p>
      </section>
      <div class="about-photo-container">
        <section class="about-preview slide-in">
          <p><b>Building the AI that powers the world</b></p>
          <p>Hi there, I'm DJ! I'm a Computer Science student developer passionate about building technology for real-world impact.</p>
          <p>My expertise spans machine learning and AI, full-stack development, cloud computing, and automation consulting, with a strong focus on building scalable, efficient, and sustainable solutions.</p>
          <router-link to="/about" class="btn">Find out more...</router-link>
        </section>
        <div class="photo slide-in">
          <img src="@/assets/dj.png" alt="DJ Leamen" />
        </div>
      </div>
      <section class="projects-preview">
        <div class="section-heading">
          <h2>Featured Projects</h2>
          <p>Selected builds in AI, cloud, and product engineering.</p>
        </div>
        <div v-if="loading" class="loading">Loading projects...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="project-list">
          <div v-for="(project, index) in projects" :key="project._id || index" class="project-card elevation-2">
            <span class="project-badge">Featured</span>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn btn-card">Try it out!</a>
          </div>
        </div>
        <router-link to="/projects" class="btn btn-outline btn-projects">View All Projects</router-link>
      </section>
      </div>
      <div class="home-container">
        <section class="sessions-section">
          <h2>Speaking Engagements</h2>
          <div id="sessionize-widget"></div>
        </section>
      </div>
      <div class="home-container">
      <section class="contact-preview">
        <h2>Get in Touch</h2>
        <p>Interested in collaborating or have a question? Reach out!</p>
        <router-link to="/contact" class="btn btn-large">Contact Me</router-link>
      </section>
    </div>
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
}

const featuredProjectIds = new Set(['18', '26', '3']);
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
                color: #eef4ff !important;
                font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 16px;
                line-height: 1.7;
              }

              a {
                color: #84ebff !important;
                text-decoration: none !important;
                font-weight: 600;
                transition: color 0.2s ease;
              }

              a:hover {
                color: #d4f9ff !important;
                text-decoration: underline !important;
              }

              .sessionize-host,
              .sessionize-host > div,
              [id*="sessionize"],
              [class*="sessionize"] {
                background: transparent !important;
              }

              .sessionize-host > div:first-child {
                border-radius: 18px !important;
                border: 1px solid rgba(130, 168, 255, 0.22) !important;
                background:
                  radial-gradient(circle at 12% 12%, rgba(98, 213, 255, 0.1), transparent 38%),
                  linear-gradient(150deg, rgba(27, 33, 70, 0.92), rgba(17, 22, 52, 0.94)) !important;
                box-shadow: 0 16px 34px rgba(7, 12, 36, 0.32) !important;
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
                font-weight: 700 !important;
                line-height: 1.3 !important;
                color: #83ebff !important;
              }

              p, span, li, div, section, article {
                color: rgba(230, 240, 255, 0.92) !important;
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
                border-radius: 10px !important;
                border: 1px solid rgba(126, 232, 255, 0.5) !important;
                background: rgba(98, 213, 255, 0.18) !important;
                color: #a5f3ff !important;
                font-weight: 700 !important;
              }

              button:hover, .btn:hover, [class*="button"]:hover {
                background: rgba(98, 213, 255, 0.24) !important;
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
.page-container {
  --vertical-gap: clamp(72px, 9vw, 112px);
  display: flex;
  flex-direction: column;
  gap: var(--vertical-gap);
  padding: clamp(34px, 4.8vw, 62px) 0 clamp(48px, 6vw, 88px);
  width: 100%;
  color: #eef4ff;
}

.home-container {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

.hero {
  text-align: center;
  margin: 0 0 34px;
  animation: fadeIn 0.5s ease;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.25rem, 5vw, 4rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.highlight {
  background: linear-gradient(90deg, #6ddfff, #41bdf5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.typing-animation {
  margin: 14px auto 0;
  width: fit-content;
  max-width: 100%;
  padding: 0 6px;
  font-size: clamp(1.08rem, 2.1vw, 1.95rem);
  font-family: "IBM Plex Mono", "Fira Code", monospace;
  color: rgba(226, 238, 255, 0.88);
  letter-spacing: 0.01em;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 1.7s steps(28, end) forwards;
}

.about-photo-container {
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(230px, 330px);
  gap: 26px;
  align-items: center;
}

.about-preview,
.projects-preview,
.sessions-section,
.contact-preview {
  border-radius: 24px;
  border: 1px solid rgba(130, 168, 255, 0.24);
  background:
    radial-gradient(circle at 12% 12%, rgba(98, 213, 255, 0.1), transparent 38%),
    linear-gradient(150deg, rgba(27, 33, 70, 0.86), rgba(17, 22, 52, 0.88));
  box-shadow: 0 20px 40px rgba(7, 12, 36, 0.34);
}

.about-preview {
  text-align: left;
  padding: 28px 30px;
}

.about-preview p {
  margin: 0 0 12px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(232, 242, 255, 0.92);
}

.photo {
  width: min(330px, 100%);
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  justify-self: center;
  border: 4px solid rgba(130, 168, 255, 0.3);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h2 {
  margin: 0 0 8px;
  font-size: clamp(1.65rem, 3.2vw, 2.6rem);
  line-height: 1.16;
  color: #f5f9ff;
}

.section-heading p {
  margin: 0;
  color: rgba(221, 233, 255, 0.76);
  font-size: 1.02rem;
}

.projects-preview {
  margin-top: var(--vertical-gap);
  padding: clamp(22px, 3vw, 36px);
  text-align: center;
}

.project-list {
  margin: 24px 0 4px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.project-card {
  text-align: left;
  padding: 18px 18px 16px;
  border-radius: 18px;
  border: 1px solid rgba(121, 163, 242, 0.23);
  background: linear-gradient(160deg, rgba(33, 41, 82, 0.94), rgba(21, 27, 58, 0.94));
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(126, 232, 255, 0.45);
}

.project-badge {
  width: fit-content;
  border-radius: 999px;
  padding: 3px 10px;
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: rgba(126, 232, 255, 0.18);
  border: 1px solid rgba(126, 232, 255, 0.45);
  color: #a2f3ff;
}

.project-card h3 {
  margin: 10px 0 8px;
  color: #7ee8ff;
  font-size: clamp(1.38rem, 2vw, 1.7rem);
  line-height: 1.15;
}

.project-card p {
  margin: 0 0 16px;
  flex: 1;
  color: rgba(229, 240, 255, 0.88);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
  padding: 11px 20px;
  border-radius: 12px;
  border: 1px solid rgba(126, 232, 255, 0.5);
  background: rgba(126, 232, 255, 0.14);
  color: #9ff3ff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  background: rgba(126, 232, 255, 0.2);
  border-color: rgba(126, 232, 255, 0.72);
}

.btn-card {
  width: 100%;
  margin-top: auto;
}

.btn-outline {
  background: rgba(98, 213, 255, 0.12);
}

.btn-projects {
  margin-top: 14px;
}

.btn-large {
  padding: 12px 24px;
  font-size: 1rem;
}

.loading,
.error {
  margin: 22px auto;
  color: rgba(229, 240, 255, 0.76);
}

.sessions-section {
  padding: 34px 28px 28px;
  margin: 0 auto;
  text-align: center;
}

.sessions-section h2 {
  margin-bottom: 16px;
}

.contact-preview {
  max-width: 680px;
  margin: 0 auto;
  padding: 32px 24px;
  text-align: center;
}

.contact-preview p {
  margin: 0;
  color: rgba(229, 240, 255, 0.9);
}

.slide-in {
  opacity: 0;
  animation: slideIn 0.55s ease forwards;
}

.slide-in:nth-child(1) {
  animation-delay: 0.08s;
}

.slide-in:nth-child(2) {
  animation-delay: 0.16s;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 980px) {
  .page-container {
    --vertical-gap: 64px;
    padding: 26px 0 60px;
  }

  .about-photo-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .about-preview {
    text-align: center;
    order: 2;
  }

  .photo {
    order: 1;
    width: min(260px, 72vw);
  }

  .project-list {
    grid-template-columns: 1fr 1fr;
  }

}

@media (max-width: 700px) {
  .page-container {
    --vertical-gap: 52px;
    padding: 24px 0 48px;
  }

  .home-container {
    padding: 0 10px;
  }

  .typing-animation {
    white-space: normal;
    width: 100%;
  }

  .about-preview,
  .projects-preview,
  .sessions-section,
  .contact-preview {
    border-radius: 18px;
  }

  .project-list {
    grid-template-columns: 1fr;
  }

  .project-card h3 {
    font-size: 1.45rem;
  }

}
</style>
