<template>
    <ProjectPage projectId="3">
        <h1>PurplWav</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <div class="logo-container">
          <img src="../../assets/purplwav.png" alt="PurplWav Logo" class="logo large-logo">
        </div>

        <p>Using Vue.js AWS Template.</p>

        <p>This project is a Vue.js application for the PurplWav epilepsy awareness campaign. Deployed on AWS.</p>

        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>

        <h2>Features</h2>
        <ul>
            <li>Home: Navigation home page</li>
            <li>About us: Provides information about PurplWav's history and its team.</li>
            <li>Epilepsy Facts: Information and statistics regarding Epilepsy, including types, SUDEP information, and drug resistance.</li>
            <li>Resources: Local resources for those who live with epilepsy or live with a family member with epilepsy in Durham Region</li>
            <li>First Aid: What to do when someone has a seizure.</li>
            <li>Contact us: Links to our social media.</li>
            <li>Aydin's Story: The long journey our ambassador Aydin has endured as a child with epilepsy.</li>
        </ul>
        <h3>Future Implementation</h3>
        <ul>
            <li>Newsletters</li>
            <li>Links to research and programs</li>
            <li>Donation link</li>
        </ul>
        <h2>Visit the Site</h2>
        <a href="https://purplwav.org" target="_blank">PurplWav</a>
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
      const project = projects.find(p => p.id === '3');
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
        "Vue.js", "AWS", "Shell", "JavaScript", "HTML", "CSS", "Git", 
        "Cloud Computing", "Software Development", "Software Engineering",
        "Web Development", "Problem Solving", "Creativity", "Advocacy",
        "Public Speaking", "Presentation", "Writing", "Research", "Leadership",
        "npm", "Node.js", "Agile", "Microsoft 365", "Professional Development", "Visual Studio Code"
      ]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>