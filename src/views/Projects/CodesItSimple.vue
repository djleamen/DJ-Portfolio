<template>
    <ProjectPage projectId="5">
        <h1>🌟 DJ Codes it Simple</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <p>Your beginner-friendly guide to mastering Shell Scripting, SQL, and beyond!</p>
        <p><strong>DJ Codes it Simple</strong> is a resource designed to break down coding concepts into simple, digestible lessons. No matter if you're starting your coding journey or brushing up on the basics, this repository offers essential concepts, hands-on examples, and best practices to help you succeed.</p>
        <h2>🚀 What You'll Learn</h2>
            <ul>
            <li>Shell Scripting: Learn to automate tasks and enhance productivity with easy-to-follow scripts.</li>
            <li>SQL: Master database queries and data manipulation techniques with practical examples.</li>
            <li>More coming soon!</li>
        </ul>
        <h2>🌟 Features</h2>
        <ul>
            <li>Beginner-Friendly Explanations: Simplified concepts for those just starting out</li>
            <li>Step-by-Step Examples: Practical examples to reinforce learning.</li>
            <li>Best Practices: Tips and tricks to write efficient, maintainable code.</li>
            <li>Resources: Curated links to deepen your understanding.</li>
        </ul>
        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <h2>Link</h2>
        <a href="https://github.com/djleamen/codes-it-simple" target="_blank">View on GitHub</a>
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
      const project = this.projects.find(p => p.id === '5');
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
      skills: ["Shell", "Linux", "SQL", "Git", "Python",
                "Creativity", "Writing", "Problem Solving", "Research", "Communication"
              ]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>