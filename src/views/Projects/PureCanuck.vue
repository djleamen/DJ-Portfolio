<template>
    <ProjectPage projectId="8">
        <h1>Pure Canuck</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <div class="logo-container">
            <img src="@/assets/purecanuck.png" alt="Pure Canuck Logo" class="logo">
        </div>
        <p>
            Pure Canuck is a Shopify site built for a small local Canadian business that sells customized clothing
            and drinkware. The website features the complete products listing, a straightforward payment gateway, 
            and contact information.  
        </p>
        <h2>Skills Developed</h2>
        <div class="skills-container">
      <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
      </div>
        <h2>Features</h2>
        <ul>
            <li>Home page with features products</li>
            <li>Product collections</li>
            <li>Payment system</li>
            <li>Contact information</li>
            <li>Responsive design for mobile and desktop</li>
            <li>Customizable product options</li>
            <li>Search functionality</li>
            <li>Complete documentation for setup and maintenance</li>
        </ul>
        <h2>View the Website</h2>
        <p>
            <a href="https://purecanuck.ca" target="_blank">Visit Pure Canuck</a>
        </p>
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
      const project = this.projects.find(p => p.id === '8');
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
      skills: ["Liquid", "HTML", "CSS", "JavaScript", "Web Development", "Software Development", "Shopify",
              "Problem Solving", "Creativity", "Adaptability", "Requirement Gathering",
             "Communication", "Collaboration", "Graphic Design", "SEO", "Attention to Detail"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>