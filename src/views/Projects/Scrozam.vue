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
      <li>Detects songs from audio input.</li>
      <li>Reiterates detected track to user.</li>
    </ul>
    <h2>Future Improvements</h2>
    <ul>
      <li>Implement scrobbling of detected tracks to Last.fm.</li>
      <li>Add more detailed song information display.</li>
      <li>Implement more robust error handling.</li>
    </ul>
    <h2>Additional Information</h2>
    <h3>Backend</h3>
    <ul>
      <li>ACRCloud API</li>
      <li>Last.fm API</li>
      <li>Express</li>
    </ul>
    <h3>Frontend</h3>
    <ul>
      <li>React</li>
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
  <a href="https://github.com/djleamen/Scrozam" target="_blank">Scrozam!</a>
    <section>
      <h2>Screenshots</h2>
      <div class="screenshots-container">
        <img src="../../assets/scrozamweb.png" alt="Demo Screenshot" class="screenshot">
      </div>
    </section>
  </ProjectPage>
</template>

<script>
import ProjectPage from '@/components/ProjectPage.vue';
import { projects } from '@/data/projects.js';

export default {
  components: {
    ProjectPage
  },
  computed: {
    formattedDate() {
      const project = projects.find(p => p.id === '2');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      skills: [
        "React", "Express.js", "Python", "Shell", "JavaScript", 
        "HTML", "Git", "APIs", "CSS", "Node.js", "npm", "pip",
        "Software Development", "Software Engineering", "Web Development",
        "Problem Solving", "Creativity", "Innovation", "Adaptability", "Resilience"
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