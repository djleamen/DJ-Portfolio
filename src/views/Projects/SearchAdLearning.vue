<template>
  <ProjectPage projectId="29">
    <h1>Search Ad Learning</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      Visualization demo of how search engines determine ad topics and audience segments.
      Search UI that evolves into a word cloud and audience-segment view, backed by a
      Python machine-learning taxonomy service.
    </p>
    <h2>Key Features</h2>
    <ul>
        <li>Search engine ad topic and audience segment prediction</li>
        <li>Interactive search UI with word cloud and segment view</li>
        <li>Online learning with user feedback loops</li>
        <li>Per-user state isolation with shared global knowledge</li>
        <li>Full-stack ML system design (UI → API → model → persistence)</li>
        <li>Cloud-ready architecture (Azure target)</li>
    </ul>

    <h2>Architecture</h2>
    <p>
      The system is designed to demonstrate a full-stack machine learning workflow, 
      from user interaction to model training and persistence. The architecture consists 
      of the following components:
    </p>
    <p>High-level flow:</p>
    <ul>
      <li>User submits a search query</li>
      <li>Backend predicts category probabilities</li>
      <li>UI updates segment view + word cloud</li>
      <li>User provides feedback or conversion signals</li>
      <li>Model updates incrementally (online learning)</li>
      <li>State persists per-user while global signals accumulate</li>
      <li>The system supports both:</li>
      <ul>
        <li>Backend ML mode (FastAPI + PostgreSQL)</li>
        <li>Local fallback learning (browser-only simulation)</li>
      </ul>
    </ul>
    <p>View it on GitHub:</p>
    <ul>
        <li><a href="https://github.com/djleamen/search-ad-learning" target="_blank" rel="noopener noreferrer">Search Ad Learning</a></li>
    </ul>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
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
      const project = this.projects.find(p => p.id === '29');
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
    "Python", "JavaScript", "HTML", "CSS", "SQL", "Shell", "YAML", "FastAPI",
    "Uvicorn", "NumPy", "Scikit-learn", "Hugging Face", "Machine Learning",
    "ML/AI", "Artificial Intelligence (AI)", "Natural Language Processing (NLP)",
    "Embeddings", "Neural Architectures", "Supervised Learning", "Deep Learning",
    "Transfer learning", "Recommendation Systems", "Data Preprocessing",
    "Microsoft Azure", "Cloud Computing", "Docker", "Containerization", "CI/CD",
    "DevOps", "Infrastructure as Code (IaC)","Serverless", "APIs", "PostgreSQL",
    "SQLite", "Relational Databases","Database Management", "Data Management",
    "Data Visualization", "Data Analysis", "Data Pipelines", "MLOps",
    "Data Governance", "Cybersecurity", "Defensive Programming", "Software Engineering",
    "Software Development", "Software Architecture", "Web Development",
    "Data Structures & Algorithms", "Scalability", "UX/UI", "Git", "Version Control",
    "SQLAlchemy", "Pydantic", "JWT auth",  "Sentence Transformers","OIDC federated auth"
    ]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>
