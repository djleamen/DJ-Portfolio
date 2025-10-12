<template>
    <ProjectPage projectId="12">
        <h1>Screecher</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <p>
            Screecher was a third-person survival horror game inspired by 
            Slenderman, developed in Unity as the capstone project for a C# 
            Game Development summer camp. 
        </p>
        <h2>Gameplay</h2>
        <p>
            The player must navigate a dark, eerie forest, to
            collect 10 pages scattered throughout the 
            map while avoiding the Screecher, a monster that will chase the 
            player if they get too close. The player can run, but the 
            Screecher will catch up if they don't find a page quickly.
            This project howcases proficiency in Unity's physics engine and procedural 
            level design, emphasizing atmospheric tension and immersive gameplay.
        </p>
        <h2>Features</h2>
        <ul>
            <li>Third-person camera</li>
            <li>Player movement</li>
            <li>Enemy AI</li>
            <li>Collectibles</li>
            <li>Win/Lose conditions</li>
        </ul>
        <h2>Skills Developed</h2>
        <div class="skills-container">
            <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
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
      const project = this.projects.find(p => p.id === '12');
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
      skills: ["Unity", "C#", "Game Development", "Software Development",
              "Software Engineering", "Problem Solving", "Critical Thinking",
                 "Creativity", "Adaptability", "Time Management", "Leadership",
                    "Teamwork", "Communication", "Innovation", "Resilience"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>