<template>
  <ProjectPage projectId="25">
    <h1>DevDuck</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <p>
    DevDuck is a sentiment-aware chatbot paired with a physical duck.
    Developers chat with DevDuck like they would with a debugging buddy, DevDuck analyzes the tone
    and sentiment of the conversation, the physical duck reacts with movements that match the mood.
    Encouragement if you’re frustrated, celebration if you’re excited, calm nods when things make sense.
    On top of that, DevDuck can support general coding-related discussions and is designed to expand
    into deeper debugging assistance.
    </p>

    <h2>Key Features</h2>
    <ul>
        <li>
        Voice Listening Toggle - Start/stop listening with a simple button
        </li>
        <li>
        Conversation History - Track all interactions in a dropdown
        </li>
        <li>
        Basic Sentiment Analysis - Understand developer mood from text
        </li>
        <li>
        Web API - RESTful endpoints for frontend communication
        </li>
        <li>
        Electron Frontend - Clean, minimal desktop interface
        </li>
    </ul>

    <h2>Demo Video</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/lXKSQ-640c8?si=YxUSAc4UZypO4Oeh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>
    
    <h2>Project Links</h2>
    <a href="https://devpost.com/software/devduck-t3dqzc" target="_blank" rel="noopener noreferrer">
      Visit DevPost <i class="fas fa-external-link-alt"></i>
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
      const project = this.projects.find(p => p.id === '25');
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
        'Python',
        'Electron',
        'JavaScript',
        'Shell',
        'CSS',
        'HTML',
        'Arduino',
        'Git',
        'APIs',
        'Debugging',
        'Natural Language Processing (NLP)',
        'Generative AI',
        'Large Language Models (LLM)',
        'Machine Learning',
        'Artificial Intelligence (AI)',
        'ML/AI',
        'Computer Hardware',
        'FastAPI',
        'pip',
        'Software Development',
        'Software Engineering',
        'Attention to Detail',
        'Algorithms',
        'Problem Solving',
        'Creativity',
        'Adaptability',
        'Time Management',
        'Sentiment Analysis',
        'Visual Studio Code',
        'Programming Languages',
        'Testing',
        'Information Technology',
        'Communication',
        'Collaboration',
        'Innovation',
        'Resilience',
        'ngrok',
        'WebSockets',
        'C++'
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

.project-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 20px 0;
}
</style>
