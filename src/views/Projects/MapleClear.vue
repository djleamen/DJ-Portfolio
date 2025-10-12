<template>
  <ProjectPage projectId="24">
    <h1>MapleClear</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <p>
    MapleClear is a privacy-first browser extension that rewrites Canadian government 
    webpages into plain language, expands acronyms, and provides one-click translation.
    </p>
    
    <h2>Key Features</h2>
    <ul>
        <li>
        Plain Language Simplification: Convert complex government jargon into Grade 7 reading level
        </li>
        <li>
        Multi-Language Translation: Translate to French, Spanish, Chinese, Punjabi, Arabic, and more
        </li>
        <li>
        Split-Screen View: Compare original and simplified/translated content side-by-side
        </li>
        <li>
        Acronym Detection: Hover tooltips for government acronyms (CRA, EI, GST, etc.)
        </li>
        <li>
        Local AI Processing: Privacy-first approach using local inference
        </li>
        <li>
        Government Site Integration: Optimized for Canada.ca and gc.ca domains
        </li>
    </ul>

    <h2>Demo Video</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/l6j8aqHNVWY?si=okNsu5TU4h7RcDOf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>

    <h2>Project Links</h2>
    <a href="https://devpost.com/software/mapleclear" target="_blank" rel="noopener noreferrer">
      View Devpost <i class="fas fa-external-link-alt"></i>
    </a>
    <a href="https://github.com/djleamen/mapleclear" target="_blank" rel="noopener noreferrer">
      Visit MapleClear <i class="fas fa-external-link-alt"></i>
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
      const project = this.projects.find(p => p.id === '24');
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
        'JavaScript',
        'TypeScript',
        'HTML',
        'CSS',
        'FastAPI',
        'Generative AI',
        'Natural Language Processing (NLP)',
        'Large Language Models (LLM)',
        'Artificial Intelligence (AI)',
        'Prompt Engineering',
        'Visual Studio Code',
        'APIs',
        'Git',
        'npm',
        'pip',
        'Version Control',
        'Web Development',
        'Accessibility',
        'Testing',
        'Open-Source Software',
        'Debugging',
        'Problem Solving',
        'Critical Thinking',
        'Attention to Detail',
        'SQLite',
        'Hugging Face',
        'SQL'
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
