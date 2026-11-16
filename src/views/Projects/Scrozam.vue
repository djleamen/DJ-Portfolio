<template>
  <ProjectPage projectId="2">
    <h1>Scrozam!</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
      <div class="description-text">
        <p><strong>Scrozam!</strong> is a web application that detects songs using the ACRCloud API and scrobbles the identified tracks to a user's Last.fm account.</p>
        <p>This project is something I always wanted for myself, as I love to track my music listening habits, but realized I was missing out on a lot of scrobbles when I 
          listen on vinyl or on the radio. Scrozam! solves this problem by detecting songs from audio input and scrobbling them to Last.fm without the need for manual input.</p>
      </div>
      <div class="logo-container">
        <img src="../../assets/scrozamlogo.png" alt="Scrozam Logo" class="logo small-logo">
      </div>
    <section>
      <h2>Skills Developed</h2>
      <div class="skills-container">
        <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
      </div>
    </section>
    <h2>Features</h2>
    <ul>
      <li>Sign in with your Google account, with no password required.</li>
      <li>Connect your Last.fm account in the app through Last.fm OAuth.</li>
      <li>Detects songs from audio input using ACRCloud.</li>
      <li>Scrobbles detected tracks to Last.fm automatically.</li>
      <li>Displays the detected track's information and album art.</li>
      <li>Continuous listening mode for uninterrupted scrobbling.</li>
    </ul>
    <h2>Additional Information</h2>
    <h3>Backend</h3>
    <ul>
      <li>ACRCloud API</li>
      <li>Last.fm API</li>
      <li>Express, with rate limiting, sessions, and CSRF protection</li>
    </ul>
    <h3>Frontend</h3>
    <ul>
      <li>React</li>
      <li>Google sign-in</li>
    </ul>
    <h3>Project Structure</h3>
    <ul>
      <li><strong>backend/</strong>: Contains server-side code and dependencies.</li>
      <ul>
        <li><strong>node_modules/</strong>: Contains project dependencies.</li>
        <li><strong>routes/</strong>: Contains song detection, scrobbling logic.</li>
      </ul>
      <li><strong>frontend/</strong>: Contains React components and frontend logic.</li>
      <ul>
        <li><strong>node_modules/</strong>: Contains project dependencies.</li>
        <li><strong>public/</strong>: Contains static assets and configuration files.</li>
        <li><strong>src/</strong>: Contains the main React components and related files.</li>
      </ul>
      <li><strong>testing/</strong>: Contains scripts and configuration files for testing.</li>
    </ul>
    <h2>View on GitHub</h2>
  <a href="https://github.com/djleamen/Scrozam" target="_blank" rel="noopener noreferrer">Scrozam!</a>
    <section>
      <h2>Screenshots</h2>
      <div class="screenshots-container">
        <img src="../../assets/scrozamweb.png" alt="Demo Screenshot" class="screenshot">
        <img src="../../assets/scrozamweb-2.png" alt="Scrozam! showing a detected song and the recently caught tracks list" class="screenshot" loading="lazy">
        <img src="../../assets/scrozam-logged.png" alt="Detected tracks scrobbled to Last.fm Recent Tracks" class="screenshot" loading="lazy">
      </div>
    </section>
  </ProjectPage>
</template>

<script>
import ProjectPage from '@/components/ProjectPage.vue';
import { apiService } from '@/services/api';

export default {
  components: {
    ProjectPage
  },
  async created() {
    try {
      this.projects = await apiService.getProjects();
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  },
  computed: {
    formattedDate() {
      const project = this.projects.find(p => p.id === '2');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
      }
      return '';
    }
  },
  data() {
    return {
      projects: [],
      skills: [
        "React", "Express.js", "Python", "Shell", "JavaScript", "HTML", "Git", "APIs", "CSS",
        "Node.js", "npm", "pip", "Software Engineering", "Web Development", "Google OAuth",
        "Cybersecurity", "Testing", "Problem Solving", "Creativity", "Innovation",
        "Adaptability", "Resilience", "ACRCloud", "CI/CD", "Audio Processing",
        "Visual Studio Code", "Version Control"
      ]
    };
  }
};
</script>

<style scoped>
.description-container {
  margin-top: -60px;
  display: flex;
  align-items: center;
  margin-bottom: -80px;
}
</style>