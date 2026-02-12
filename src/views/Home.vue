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
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.minHeight = '400px';
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
              
              body { 
                margin: 0; 
                padding: 10px 20px; 
                background: transparent !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                color: white !important;
                font-size: 16px;
                line-height: 1.7;
              }
              
              div, section, article, p, span, h1, h2, h3, h4, h5, h6 {
                color: white !important;
              }
              
              a {
                color: #61dafb !important;
                text-decoration: none;
                transition: all 0.3s ease;
                font-size: 1.05rem;
                font-weight: 500;
              }
              
              a:hover {
                color: #4fa3d1 !important;
              }
              
              /* Style session cards/containers */
              .sz-widget, 
              [class*="session"],
              [class*="event"],
              .sz-card,
              div[style*="border"],
              div[style*="padding"] {
                background: linear-gradient(160deg, rgba(35, 38, 74, 0.85), rgba(20, 22, 46, 0.9)) !important;
                border-radius: 20px !important;
                padding: 30px !important;
                margin: 20px 0 !important;
                box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22) !important;
                border: 1px solid rgba(255, 255, 255, 0.05) !important;
                transition: transform 0.3s ease, box-shadow 0.3s ease !important;
              }
              
              .sz-widget:hover,
              [class*="session"]:hover,
              [class*="event"]:hover,
              .sz-card:hover {
                transform: translateY(-4px) !important;
                box-shadow: 0 18px 30px rgba(0, 0, 0, 0.28) !important;
              }
              
              h1, h2, h3, h4, h5, h6 {
                color: #61dafb !important;
                font-weight: 600 !important;
                margin-top: 0 !important;
                margin-bottom: 20px !important;
                line-height: 1.4 !important;
              }
              
              h1 {
                font-size: 1.8rem !important;
              }
              
              h2 {
                font-size: 1.5rem !important;
                margin-bottom: 25px !important;
              }
              
              h3 {
                font-size: 1.3rem !important;
                margin-bottom: 18px !important;
              }
              
              h4, h5, h6 {
                font-size: 1.2rem !important;
                margin-bottom: 15px !important;
              }
              
              p {
                margin-bottom: 16px !important;
                line-height: 1.7 !important;
                font-size: 1.05rem !important;
              }
              
              time, .date, [class*="date"], [class*="time"] {
                color: rgba(255, 255, 255, 0.78) !important;
                font-size: 1.1rem !important;
                font-weight: 600 !important;
                display: block !important;
                margin-bottom: 12px !important;
              }
              
              button, .btn, [class*="button"] {
                background-color: transparent !important;
                color: #61dafb !important;
                padding: 12px 24px !important;
                border-radius: 8px !important;
                border: 2px solid #61dafb !important;
                font-weight: 600 !important;
                transition: all 0.3s ease !important;
                cursor: pointer !important;
                font-size: 1rem !important;
              }
              
              button:hover, .btn:hover, [class*="button"]:hover {
                border-color: #4fa3d1 !important;
                color: #4fa3d1 !important;
                transform: translateY(-2px) !important;
              }
              
              img {
                border-radius: 12px;
                max-width: 100%;
              }
              
              ul, ol {
                color: white !important;
                padding-left: 20px !important;
                margin: 15px 0 !important;
              }
              
              li {
                color: white !important;
                line-height: 1.8 !important;
                margin-bottom: 10px !important;
                font-size: 1.05rem !important;
              }
              
              br {
                display: block !important;
                margin: 10px 0 !important;
                content: "" !important;
              }
              
              span {
                line-height: 1.7 !important;
              }
            </style>
          </head>
          <body>
            <script type="text/javascript" src="https://sessionize.com/api/speaker/events/m5gm58hmcl/1x1x61dafbx5"><\/script>
          </body>
        </html>
      `);
      iframeDoc.close();
      
      // Auto-resize iframe
      iframe.onload = () => {
        try {
          const body = iframeDoc.body;
          const html = iframeDoc.documentElement;
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          iframe.style.height = `${height + 10}px`;
        } catch (e) {
          iframe.style.height = '500px';
        }
      };
    }
  }
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: white;
  overflow-x: hidden;
  width: 100%;
}

.home-container {
  max-width: 1000px;
  width: 100%;
  text-align: center;
  color: white;
  margin: 0 auto;
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
}

.hero {
  margin-top: 80px;
  margin-bottom: 60px;
  animation: fadeIn 1s ease;
}

.hero h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: -1.2rem;
}

.highlight {
  background: linear-gradient(to right, #0a6b9f, #61dafb);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.typing-animation {
  justify-content: center;
  font-size: 2rem;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  max-width: 100%;
  margin: 0.5rem auto;
  animation: typing 2s steps(30, end) forwards, pause 5s forwards 2s;
}

@keyframes typing {
  from { width: 0 }
  to { width: min(100%, 600px) }
}

@keyframes pause {
  from { width: 100% }
  to { width: 100% }
}

.btn {
  display: inline-block;
  background-color: transparent;
  color: #61dafb;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 20px 10px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid #61dafb;
  letter-spacing: 0.5px;
}

.btn:hover {
  background-color: transparent;
  border-color: #4fa3d1;
  color: #4fa3d1;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.btn-outline {
  background-color: transparent;
  border: 2px solid #61dafb;
  color: #61dafb;
}

.btn-outline:hover {
  background-color: transparent;
  color: #4fa3d1;
  border-color: #4fa3d1;
}

.btn-large {
  padding: 14px 30px;
  font-size: 1.1rem;
}

.project-list {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 24px 0 12px;
}

.project-card {
  background: linear-gradient(160deg, rgba(35, 38, 74, 0.85), rgba(20, 22, 46, 0.9));
  padding: 25px;
  border-radius: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-sizing: border-box;
  min-height: 290px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.28);
}

.project-card h3 {
  margin-top: 0;
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #61dafb;
}

.project-card p {
  flex-grow: 1;
  margin-bottom: 22px;
  line-height: 1.6;
}

.projects-preview {
  text-align: center;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background-color: rgba(26, 26, 46, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 70px;
}

.section-heading p {
  margin: 0 0 4px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.03rem;
}

.project-badge {
  display: inline-block;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(97, 218, 251, 0.65);
  background: rgba(97, 218, 251, 0.12);
  color: #7be6ff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.btn-card {
  width: 100%;
  text-align: center;
  margin: 0;
}

.btn-projects {
  margin-top: 16px;
}

h2 {
  font-size: 2rem;
  margin: 40px 0 20px;
  font-weight: bold;
  background: white;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.contact-preview {
  text-align: center;
  margin: 56px auto 24px;
  padding: 30px 25px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  max-width: 600px;
  background-color: rgba(26, 26, 46, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: -1.5rem;
}

.contact-preview h2 {
  margin-top: 0;
}

.contact-preview p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.sessions-section {
  text-align: center;
  margin: 40px auto;
  padding: 30px 25px 20px;
  max-width: 900px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background-color: rgba(26, 26, 46, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 140px;
}

.sessions-section h2 {
  margin-top: 1.9rem;
  margin-bottom: 10px;
}

.photo {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  border: 4px solid rgba(255, 255, 255, 0.1);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-photo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px auto 80px;
  gap: 40px;
  max-width: 900px;
}

.about-preview {
  flex: 1;
  text-align: left;
  padding: 30px;
  background-color: rgba(26, 26, 46, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 2rem;
}

.about-preview h2 {
  margin-top: 0;
  text-align: left;
}

.about-preview p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 15px;
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.slide-in {
  opacity: 0;
  animation: slideIn 0.8s ease-out forwards;
}

.slide-in:nth-child(1) {
  animation-delay: 0.3s;
}

.slide-in:nth-child(2) {
  animation-delay: 0.6s;
}

@keyframes slideIn {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 900px) {
  .about-photo-container {
    flex-direction: column;
    text-align: center;
    gap: 30px;
    margin: 30px auto 60px;
  }
  
  .about-preview {
    text-align: center;
    order: 2;
    padding: 25px;
  }
  
  .about-preview h2 {
    text-align: center;
  }
  
  .photo {
    order: 1;
    width: 220px;
    height: 220px;
  }
  
  .hero h1 {
    font-size: 2.3rem;
  }
  
  .typing-animation {
    font-size: 1.6rem;
    white-space: normal;
    word-wrap: break-word;
    width: 100% !important;
    animation: fadeIn 1s ease forwards;
  }
  
  .project-card {
    min-width: 100%;
    min-height: auto;
  }
  
  .project-list {
    gap: 20px;
  }
}

@media (max-width: 600px) {
  .hero {
    margin-top: 60px;
    margin-bottom: 40px;
  }
  
  .hero h1 {
    font-size: 1.8rem;
  }
  
  .typing-animation {
    font-size: 1.3rem;
    white-space: normal;
    word-wrap: break-word;
    width: 100% !important;
    animation: fadeIn 1s ease forwards;
    text-align: center;
    padding: 0 10px;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  .about-preview {
    padding: 20px;
  }
  
  .about-preview p {
    font-size: 1.05rem;
  }
  
  .photo {
    width: 180px;
    height: 180px;
  }
  
  .project-card {
    padding: 20px;
  }
  
  .project-card h3 {
    font-size: 1.3rem;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 0.95rem;
    margin: 15px 8px;
  }
  
  .btn-large {
    padding: 12px 26px;
    font-size: 1rem;
  }
  
  .contact-preview {
    padding: 20px;
    margin: 30px auto 15px;
  }
  
  .contact-preview p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .home-container {
    padding: 0 15px;
  }
  
  .hero {
    margin-top: 40px;
    margin-bottom: 30px;
  }
  
  .hero h1 {
    font-size: 1.5rem;
  }
  
  .typing-animation {
    font-size: 1.1rem;
    white-space: normal;
    word-wrap: break-word;
    width: 100% !important;
    animation: fadeIn 1s ease forwards;
    text-align: center;
    padding: 0 10px;
    line-height: 1.4;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .about-preview {
    padding: 18px;
  }
  
  .about-preview p {
    font-size: 1rem;
  }
  
  .photo {
    width: 160px;
    height: 160px;
  }
  
  .project-card {
    padding: 18px;
  }
  
  .project-card h3 {
    font-size: 1.2rem;
  }
  
  .project-card p {
    font-size: 0.95rem;
  }
  
  .btn {
    padding: 10px 18px;
    font-size: 0.9rem;
    margin: 12px 6px;
  }
  
  .btn-large {
    padding: 11px 24px;
    font-size: 0.95rem;
  }
  
  .contact-preview {
    padding: 18px;
    margin: 25px auto 10px;
  }
  
  .contact-preview h2 {
    margin-bottom: 15px;
  }
  
  .contact-preview p {
    font-size: 0.95rem;
    margin-bottom: 15px;
  }
}
</style>
