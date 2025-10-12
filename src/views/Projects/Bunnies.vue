<template>
  <ProjectPage projectId="10">
    <h1>Bunnies</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <p>
      Bunnies was my Programming Workshop II final C++ project, a simulation of a farm of bunnies.
      The project demonstrates proficiency in C++ programming, object-oriented design, and algorithmic thinking.
    </p>
    
    <h2>Simulation</h2>
    <p>
      The simulation consists of a farm with a set number of bunnies and radioactive mutant vampire bunnies. 
      The bunnies move at random and require empty adjacent spaces to reproduce, while the radioactive mutant vampire bunnies move towards the nearest bunny.
      If a radioactive mutant vampire bunny catches a bunny, the bunny is turned into a radioactive mutant vampire bunny.
    </p>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
    </div>
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
      const project = this.projects.find(p => p.id === '10');
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
      skills: ["C++", "Data Structures & Algorithms", "Memory Management", "Jupyter Notebook"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>