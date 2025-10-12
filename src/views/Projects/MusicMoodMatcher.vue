<template>
  <ProjectPage projectId="18">
    <h1>AI Music Mood Matcher</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <p>
      An intelligent music recommendation system that analyzes 
      your mood through natural language and suggests personalized
      playlists using advanced AI and machine learning techniques.
    </p>

    <h2>How It Works</h2>
    <p>
        The AI Music Mood Matcher uses a combination of natural language processing (NLP) 
        and machine learning to understand your mood based on text input. It then generates 
        personalized music playlists that match your emotional state.
    </p>
        <ul>
            <li>Input: User describes their mood in natural language.</li>
            <li>Processing: NLP techniques analyze the sentiment and context of the input.</li>
            <li>Output: A curated playlist of songs that align with the identified mood.</li>
        </ul>
    
    <h2>Key Features</h2>
    <ul>
        <li>Mood Detection: 
            <ul>
                <li>Natural Language Processing (NLP) to analyze mood descriptions</li>
                <li>Multiple AI methods for accurate sentiment analysis</li>
            </ul>
        </li>
        <li>Smart Music Recommendations:
            <ul>
                <li>AI-enhanced song analysis for mood compatibility</li>
                <li>Intelligent song selection based on track characteristics</li>
                <li>Dual recommendation modes: standard and AI-powered curation</li>
            </ul>
        </li>
        <li>Comprehensive Analytics:
            <ul>
                <li>Mood distribution visualization</li>
                <li>Music feature analysis</li>
                <li>Interactive charts for data exploration</li>
            </ul>
        </li>
        <li>Demo Data Experience:
            <ul>
                <li>Realistic music library with 200+ demo tracks</li>
                <li>Diverse moods for testing recommendations</li>
                <li>No setup required; try all features immediately</li>
            </ul>
        </li>
    </ul>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>
    
    <h2>Project Link</h2>
    <a href="https://github.com/djleamen/music-mood-matcher-demo" target="_blank" rel="noopener noreferrer">
      Visit AI Music Mood Matcher <i class="fas fa-external-link-alt"></i>
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
      const project = this.projects.find(p => p.id === '18');
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
        "Python", "FastAPI", "Git", "APIs", "Debugging", "pip", "Machine Learning", 
        "Natural Language Processing (NLP)", "Deep Learning", "Large Language Models (LLM)", 
        "Generative AI", "Artificial Intelligence (AI)", "ML/AI", "NLTK", "Seaborn", 
        "Data Structures & Algorithms", "Software Development", "Software Engineering", 
        "Creativity", "NumPy", "scikit-learn", "Pandas", "CSS", "Streamlit", 
        "Visual Studio Code", "Attention to Detail", "Data Entry", "Matplotlib", 
        "Algorithms", "Data Analysis", "Data Visualization", "UX/UI", "Programming Languages", "Testing"
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
