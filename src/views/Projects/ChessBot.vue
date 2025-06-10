<template>
    <ProjectPage projectId="15">
        <h1>Chess Bot Challenge</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <p>
            Back in high school, to wrap up the end of my Computer Science class, we were 
            given a challenge to create a chess bot that could play against a human
            or another bot. The goal was to create a bot that could play chess at a
            reasonable level, and to do so I had to brainstorm a lot of different
            strategies and algorithms to implement. I ended up creating the best
            chess bot in the class, and I was very proud of it!
        </p>
        <h2>Skills Developed</h2>
        <div class="skills-container">
            <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <h2>Features</h2>
        <ul>
            <li>Chess Board Display:</li>
            <ul>
                <li>Displays the chess board and pieces using Java Swing.</li>
            </ul>
            <li>Chess Bot:</li>
            <ul>
                <li>Implements a basic chess bot that can play against a human or another bot.</li>
                <li>Uses a Minimax algorithm to determine the best move.</li>
            </ul>
            <li>Human vs. Bot Mode:</li>
            <ul>
                <li>Allows a human player to play against the bot.</li>
            </ul>
            <li>Bot vs. Bot Mode:</li>
            <ul>
                <li>Allows two bots to play against each other.</li>
            </ul>
            <li>Move Validation:</li>
            <ul>
                <li>Validates moves to ensure they are legal according to chess rules.</li>
            </ul>
        </ul>
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
      const project = projects.find(p => p.id === '15');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      skills: ["Java", "Swing", "Software Development", "Software Engineering", "Algorithms", "Data Structures", "Problem Solving", "Eclipse"],
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>