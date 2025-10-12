<template>
  <ProjectPage projectId="21">
    <h1>Modelcules</h1>
    <p class="project-date">{{ formattedDate }}</p>

    <div class="screenshot-container">
      <img src="../../assets/modelcules.png" alt="Modelcules Logo" class="screenshot">
    </div>

    <p>
      Modelcules is a sophisticated web application for visualizing 3D molecular structures 
      from chemical identifiers. Built with React, Three.js, and TypeScript, it offers 
      real-time 3D rendering of molecules with an intelligent multi-database chemical lookup system.
    </p>

    <h2>How It Works</h2>
    
    <ul>
        <li>Users enter chemical identifiers (IUPAC, CAS, PubChem CID, SMILES, InChI, UNII codes)</li>
        <li>The app validates the input and checks a local database for quick lookups</li>
        <li>If not found locally, it queries the PubChem API and NCI/CACTUS with intelligent failover</li>
        <li>Once a valid structure is retrieved, it is rendered in 3D using Three.js</li>
        <li>Users can interact with the 3D model: rotate, zoom, and pan</li>
    </ul>
    
    <h2>Key Features</h2>
    <ul>
        <li>Multi-database chemical lookup with local caching</li>
        <li>Real-time 3D rendering of molecular structures</li>
        <li>Supports multiple chemical identifier formats</li>
        <li>Interactive controls for exploring molecular geometry</li>
        <li>Responsive design for desktop and mobile devices</li>
        <li>Smart caching with automatic cleanup to minimize API calls</li>
        <li>Detailed information display for atoms and bonds</li>
    </ul>
    
    <h2>Technologies</h2>
    <ul>
        <li>React</li>
        <li>Three.js</li>
        <li>TypeScript</li>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>RESTful APIs</li>
        <li>WebGL</li>
    </ul>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>

    <h2>Roadmap</h2>
    <ul>
      <li>Add support for additional chemical databases</li>
      <li>Enhance 3D visualization features</li>
      <li>Optimize performance and reduce loading times</li>
      <li>Conduct user testing and gather feedback</li>
      <li>Add export functionality for molecular structures</li>
    </ul>

    <h2>Project Link</h2>
    <a href="https://github.com/djleamen/modelcules" target="_blank" rel="noopener noreferrer">
      Visit Modelcules <i class="fas fa-external-link-alt"></i>
    </a>
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
      const project = this.projects.find(p => p.id === '21');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      projects: [],
      skills: [
        "React", "Typescript", "Node.js", "Three.js", 
        "Express.js", "JavaScript", "HTML", "CSS", "Visual Studio Code",
        "Git", "npm", "APIs", "WebGL", "Software Development", 
        "Software Engineering", "Web Development", "Problem Solving",
        "Data Visualization", "Data Analysis", "Data Structures & Algorithms",
        "Science", "Physics", "Programming Languages", "Algorithms",
        "UX/UI", "Creativity", "Research", "Data Entry", "Attention to Detail"
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