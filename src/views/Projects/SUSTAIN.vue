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
      <li>Python desktop interface, with a separate React.js web app</li>
      <li>OpenAI API integration</li>
      <li>Microsoft Azure deployment</li>
    </ul>
    
    <h2>Demo Video</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/HyiEJe4slO8" title="SUSTAIN demo video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>

    <h2>Project Links</h2>
    <a href="https://devpost.com/software/sustain-gq25w9" target="_blank" rel="noopener noreferrer">
      View Devpost <i class="fas fa-external-link-alt"></i>
    </a>
    <a href="https://github.com/djleamen/SUSTAIN" target="_blank" rel="noopener noreferrer">
      Visit SUSTAIN <i class="fas fa-external-link-alt"></i>
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
      const project = this.projects.find(p => p.id === '1');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
      }
      return '';
    }
  },
  data() {
    return {
      projects: [],
      skills: [
        "Python", "Shell", "JavaScript", "Git", "APIs", "Generative AI",
        "Large Language Models (LLM)", "CSS", "HTML", "React", "Microsoft Azure",
        "Natural Language Processing (NLP)", "Cloud Computing", "Leadership",
        "Data Structures & Algorithms", "Software Engineering", "AI Ethics", "Communication",
        "Problem Solving", "Critical Thinking", "Creativity", "Time Management",
        "Decision Making", "Professional Networking", "Public Speaking", "Presentation",
        "Written Communication", "Research", "Collaboration", "Innovation", "Resilience",
        "Advocacy", "Professional Development", "Teamwork", "Adaptability", "Management",
        "Science", "Express.js", "Node.js", "Visual Studio Code", "npm", "pip", "Agile",
        "Web Development", "Mobile Development", "Mathematics", "spaCy", "Prompt Engineering",
        "Open-Source Software", "CI/CD", "Artificial Intelligence (AI)", "Version Control",
        "Attention to Detail", "Mentorship"
      ]
    };
  }
};
</script>

<style scoped>
.logo {
  background-color: #fff;
}

.more-skills {
  background: var(--tonal) !important;
  color: var(--on-tonal) !important;
  font-weight: bold;
}
</style>