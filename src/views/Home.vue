<template>
  <div class="page-container">
    <div class="home-container">
      <section class="hero">
        <h1 class="fade-in">Hi there, I'm <span class="highlight">DJ Leamen</span></h1>
        <p class="typing-animation">Full-Stack Developer | AI & Cloud Enthusiast</p>
      </section>
      <div class="about-photo-container">
        <section class="about-preview slide-in">
          <h2>About Me</h2>
          <p>I'm a passionate Computer Science student who loves creating innovative solutions, working with data, and exploring new technologies.</p>
          <p>I have experience working with a variety of programming languages and tools, and I'm always eager to learn more.</p>
          <router-link to="/about" class="btn">Learn More</router-link>
        </section>
        <div class="photo slide-in">
          <img src="@/assets/dj.png" alt="DJ Leamen" />
        </div>
      </div>
      <section class="projects-preview">
        <h2>Featured Projects</h2>
        <div class="project-list">
          <div v-for="(project, index) in projects" :key="index" class="project-card elevation-2">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn">Try it out!</a>
          </div>
        </div>
        <router-link to="/projects" class="btn btn-outline">View All Projects</router-link>
      </section>
      </div>
      <div class="home-container">
      <section class="contact-preview">
        <h2>Get in Touch</h2>
        <p>Interested in collaborating or have a question? Feel free to reach out!</p>
        <router-link to="/contact" class="btn btn-large">Contact Me</router-link>
      </section>
    </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { projects as allProjects } from '../data/projects';

const featuredProjectIds = ['18', '3', '22'];
const projects = ref(allProjects.filter(project => featuredProjectIds.includes(project.id)));
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: white;
}

.home-container {
  max-width: 1000px;
  text-align: center;
  color: white;
  margin: 0 auto;
  flex: 1;
  padding: 0 20px;
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
}

.highlight {
  background: linear-gradient(to right, #4fa3d1, #2575fc);
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
  margin: 0.5rem auto;
  animation: typing 3s steps(30, end) forwards, pause 5s forwards 3s;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes pause {
  from { width: 100% }
  to { width: 100% }
}

.btn {
  display: inline-block;
  background-color: #61dafb;
  color: #0d1b2a;
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
  background-color: #4fa3d1;
  border-color: #4fa3d1;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.btn-outline {
  background-color: transparent;
  border: 2px solid #61dafb;
  color: #61dafb;
}

.btn-outline:hover {
  background-color: #61dafb;
  color: #0d1b2a;
}

.btn-large {
  padding: 14px 30px;
  font-size: 1.1rem;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin: 20px 0 20px;
}

.project-card {
  background-color: rgba(26, 26, 46, 0.6);
  padding: 25px;
  border-radius: 20px;
  width: 300px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  flex: 1 1 calc(33.333% - 40px);
  box-sizing: border-box;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.project-card h3 {
  margin-top: 0;
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #61dafb;
}

.project-card p {
  flex-grow: 1;
  margin-bottom: 20px;
  line-height: 1.5;
}

h2 {
  font-size: 2rem;
  margin: 40px 0 20px;
  font-weight: bold;
  background: linear-gradient(to right, #4fa3d1, #2575fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.contact-preview {
  text-align: center;
  margin: 40px auto 20px;
  padding: 25px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  max-width: 600px;
}

.contact-preview h2 {
  margin-top: 0;
}

.contact-preview p {
  font-size: 1.1rem;
  margin-bottom: 20px;
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
}

.about-preview h2 {
  margin-top: 0;
  text-align: left;
}

.about-preview p {
  font-size: 1.2rem;
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
  }
  
  .about-preview {
    text-align: center;
    order: 2;
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
  }
  
  .project-card {
    min-width: 100%;
  }
}

@media (max-width: 600px) {
  .hero {
    margin-top: 60px;
    margin-bottom: 40px;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  .about-preview p {
    font-size: 1.1rem;
  }
  
  .project-card {
    padding: 20px;
  }
}
</style>
