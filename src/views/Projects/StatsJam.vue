<template>
  <ProjectPage projectId="17">
    <h1>StatsJam</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <p>
        StatsJam is a modern, responsive web application designed to provide fellow NHL fans with 
        comprehensive team and player statistics in an intuitive interface. Whether you're a 
        die-hard fan or just curious about the latest stats, StatsJam has you covered.
    </p>
    
    <h2>Key Features</h2>
    <ul>
        <li>Complete NHL team directory with official logos and team statistics</li>
        <li>Detailed player profiles with photos and comprehensive statistics</li>
        <li>NHL playoff bracket viewer with tournament series tracking</li>
        <li>Team roster management with player navigation and detailed roster cards</li>
        <li>Separate regular season and playoff statistics for complete player analysis</li>
        <li>Position-specific stats display - tailored metrics for goalies vs. skaters</li>
        <li>Advanced player metrics and performance analytics</li>
        <li>Team statistics dashboard with comprehensive performance metrics</li>
        <li>Smart navigation between teams, players, and playoff data</li>
        <li>Responsive design for desktop and mobile devices</li>
        <li>Fast, modern interface built with React and Material-UI</li>
    </ul>
    
    <h2>Technologies</h2>
    <ul>
        <li>React.js for dynamic user interface</li>
        <li>Material-UI for modern design components</li>
        <li>Node.js and Express.js for backend services</li>
        <li>RESTful APIs for data retrieval</li>
        <li>Axios for API requests</li>
        <li>Git for version control</li>
        <li>Visual Studio Code for development</li>
        <li>npm for package management</li>
    </ul>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>
    
    <h2>Project Link</h2>
    <a href="https://github.com/djleamen/statsjam" target="_blank" rel="noopener noreferrer">
      Visit StatsJam <i class="fas fa-external-link-alt"></i>
    </a>
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
      const project = projects.find(p => p.id === '17');
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
        "React", "Node.js", "Express.js", "JavaScript", "HTML", "CSS", 
        "TypeScript", "Git", "APIs", "Data Visualization", "Software Development", 
        "Web Development", "Problem Solving", "Creativity"
      ]
    };
  }
};
</script>

<style scoped>
.more-skills {
  background-color: #4fa3d1 !important;
  color: white !important;
  font-weight: bold;
}
</style>