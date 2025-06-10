<template>
    <ProjectPage projectId="9">
        <h1>Wolves and Sheep</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <p>
            Wolves & Sheep was my Grade 12 Computer Science final Java project, a simulation of a farm of wolves and sheep. 
            The project demonstrates proficiency in Java programming, object-oriented design, and algorithmic thinking.
        </p>
        <h2>Simulation</h2>
        <p>
            The simulation consists of a farm with a set number of wolves and sheep. The sheep move at random and eat grass to gain energy and 
            reproduce, while the wolves move towards the nearest sheep. If a wolf catches a sheep, the sheep is eaten, and the wolf reproduces. 
            If a wolf cannot catch a sheep in time, it dies. The simulation continues until all the sheep are eaten or the wolves die.
        </p>
        <p>
            The goal of this project was to attempt to balance the population of wolves and sheep to prevent either from going extinct.
            We used principles of object-oriented design to create classes for the farm, wolves, and sheep, and implemented algorithms to
            simulate the movement and interactions of the animals.
        </p>
        <h2>Skills Developed</h2>
        <div class="skills-container">
            <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
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
      const project = projects.find(p => p.id === '9');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      skills: ["Java", "Swing", "Software Development", "NetBeans", "Eclipse", "Software Engineering", "Problem Solving",
                "Critical Thinking", "Creativity", "Adaptability", "Time Management", "Teamwork", "Communication", "Innovation", "Resilience"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>