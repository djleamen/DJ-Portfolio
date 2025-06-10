<template>
  <ProjectPage projectId="1">
    <h1>SUSTAIN</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <div class="logo-container">
      <img src="@/assets/SUSTAINOriginalBlackTransparentCropped.jpg" alt="SUSTAIN Logo" class="logo" />
    </div>
    
    <p>
      An environmentally-friendly, token-optimized AI wrapper designed to reduce compute costs and increase productivity. 
      SUSTAIN compresses prompts before sending them to the model, reducing token usage while maintaining response quality.
    </p>
    
    <h2>Key Features</h2>
    <ul>
      <li>Automatic input compression to reduce token usage</li>
      <li>Significant cost reduction for API calls</li>
      <li>Lower energy consumption compared to standard implementations</li>
      <li>Maintains response quality while using fewer tokens</li>
      <li>Easy integration with existing applications</li>
    </ul>
    
    <h2>Technologies</h2>
    <ul>
      <li>Python backend with NLP processing</li>
      <li>React.js frontend interface</li>
      <li>OpenAI API integration</li>
      <li>Microsoft Azure deployment</li>
    </ul>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>
    
    <h2>Project Link</h2>
    <a href="https://sustainai.ca" target="_blank" rel="noopener noreferrer">
      Visit SUSTAIN <i class="fas fa-external-link-alt"></i>
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
      const project = projects.find(p => p.id === '1');
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
        "Python", "Shell", "JavaScript", "Git", "APIs", 
        "Generative AI (LLMs)", "CSS", "HTML", "React.js", 
        "Microsoft Azure", "NLP", "Cloud Computing", "Leadership",
        "Data Structures & Algorithms", "Software Development", 
        "Software Engineering", "AI Ethics", "Communication",
        "Problem Solving", "Critical Thinking", "Creativity",
        "Time Management", "Decision Making", "Networking",
        "Public Speaking", "Presentation", "Writing", "Research",
        "Collaboration", "Innovation", "Resilience", "Advocacy",
        "Professional Development", "Entrepreneurship", "Teamwork", 
        "Adaptability", "Conflict Resolution", "Management", "Science",
        "Express.js", "Node.js", "Visual Studio Code", "Microsoft 365",
        "npm", "pip", "Agile", "Web Development", "Mobile Development", "Mathematics"
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