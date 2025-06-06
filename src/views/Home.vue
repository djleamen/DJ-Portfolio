<template>
  <div class="page-container">
    <div class="home-container">
      <section class="hero">
        <h1 class="fade-in">Hi there, I'm <span class="highlight">DJ Leamen</span></h1>
        <p class="typing-animation">Full-Stack Developer | AI & Cloud Enthusiast</p>
      </section>
      <div class="about-photo-container">
        <section class="about-preview">
          <h2>About Me</h2>
          <p>I'm a passionate Computer Science student who loves creating innovative solutions, working with data, and exploring new technologies. </p>
          <p> I have experience working with a variety of programming languages and tools, and I'm always eager to learn more. 
          </p>
          <router-link to="/about" class="btn">Learn More</router-link>
        </section>
        <div class="photo">
          <img src="@/assets/dj.png" alt="DJ Leamen" />
        </div>
      </div>
      <section class="projects-preview">
        <h2>Featured Projects</h2>
        <div class="project-list">
          <div v-for="(project, index) in projects" :key="index" class="project-card">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.link" target="_blank" class="btn">Try it out!</a>
          </div>
        </div>
        <router-link to="/projects" class="btn">View All Projects</router-link>
      </section>
      </div>
      <div class="home-container">
      <section class="contact-preview">
        <h2>Get in Touch</h2>
        <p>Interested in collaborating or have a question? Feel free to reach out!</p>
      </section>
    </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { projects as allProjects } from '../data/projects';

const projects = ref(allProjects.slice(0, 3));
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1a2e; /* Ensure strong contrast */
  color: white; /* Ensure strong contrast */
}

.home-container {
  max-width: 850px;
  text-align: center;
  color: white;
  margin-bottom: 100px; /* Add margin to ensure footer is at the bottom */
  margin: 0 auto; /* Center the container */
  flex: 1;
}

.hero {
  margin-top: 70px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.7rem;
  font-weight: bold;
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
  width: 0; /* Start with width 0 */
  margin: 0 auto; /* Center the text */
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
  /* Create space around button */
  display: inline-block;
  background-color: #61dafb;
  color: black;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  margin-bottom: 30px;
  margin-top: 20px;
  font-weight: 500; /* Medium weight for buttons */
}

.btn:hover {
  background-color: #4fa3d1;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.project-card {
  background: #252542;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Add transition for shadow */
  flex: 1 1 calc(33.333% - 40px); /* 3 projects per line */
  box-sizing: border-box;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhance shadow on hover */
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-top: 50px;
  font-weight: bold; /* Bold for headings */
}

.recent-activities {
  text-align: center;
  margin: 0 auto; /* Center the container */
  margin-top: 20px;
  max-width: 1000px;
  font-weight: bold; /* Bold for section label */
}

.recent-activities p {
  font-size: 1.2rem;
  margin-bottom: -40px;
  color: #252542;
}

.recent-activities h2 {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

.taggbox-widget {
  display: flex;
  justify-content: center;
  margin-top: -60px;
  background-color: transparent; /* Ensure no background color */
  border-radius: 15px;
}

/* Style the photo to crop in a circle */
.photo {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  width: 250px;
  height: 250px;
  border-radius: 50%; /* Change to 50% to make it a circle */
  overflow: hidden;
  margin: 0 auto;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the container */
}

.about-photo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px; /* Increase spacing between sections */
  font-size: 1.2rem; /* Increase font size for readability */
  
}

.about-preview {
  flex: 1;
  text-align: left;
  margin-right: 20px;
  font-weight: 400; /* Regular weight for body text */
}

.photo {
  flex: 0 0 250px;
}
</style>
