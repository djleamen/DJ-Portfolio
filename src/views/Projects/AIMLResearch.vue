<template>
  <ProjectPage projectId="27">
    <h1>Microsoft AI & ML Engineering Professional Certificate</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      The Microsoft AI & ML Engineering Professional Certificate is a comprehensive program 
      designed to prepare for the dynamic field of artificial intelligence and machine 
      learning. I completed this certificate to deepen my understanding of AI & ML concepts, 
      enhance my technical skills, and gain practical experience in developing AI-driven solutions.
    </p>
    <h2>What I Learned</h2>
    <p>
        Throughout the program, I acquired a solid foundation in AI & ML principles and techniques,
        including:
      <ul>
        <li>Explored foundational concepts of AI & ML, including supervised and unsupervised 
            learning, neural networks, and deep learning.</li>
        <li>Gained proficiency in Python programming for AI & ML applications, utilizing 
            libraries such as TensorFlow, Keras, and Scikit-learn.</li>
        <li>Learned to preprocess and analyze data effectively, implementing techniques 
            for data cleaning, feature engineering, and visualization.</li>
        <li>Developed skills in building, training, and evaluating machine learning models, 
            focusing on performance optimization and hyperparameter tuning.</li>
        <li>Acquired knowledge in deploying AI & ML models to production environments 
            using cloud services like Microsoft Azure.</li>
      </ul> 
      </p>

      <h2>Capstone Project</h2>
    <p>
      I also completed a Capstone Project that integrated all learned skills into a single, 
      comprehensive AI & ML solution. My project involved developing a predictive model to analyze
      customer churn for a subscription-based service, utilizing real-world datasets and
      deploying the solution on Azure. 
    </p>
    <p>
      This certificate has equipped me with the practical skills
      and theoretical knowledge to excel in AI & ML engineering roles.
    </p>

    <h2>Links</h2>
    <p>View my certificate here: <a href="https://coursera.org/share/6e2db80cea5ea0fb7f416fec2f65b79a" target="_blank" rel="noopener noreferrer">Microsoft AI & ML Engineering Professional Certificate</a></p>

    <p>
        View my GitHub repositories for projects completed during the certificate here:
        <ul>
          <li><a href="https://github.com/djleamen/ml_project" target="_blank" rel="noopener noreferrer">AI and Machine Learning Algorithms and Techniques</a></li>
          <li><a href="https://github.com/djleamen/troubleshoot-agent" target="_blank" rel="noopener noreferrer">Building Intelligent Troubleshooting Agents</a></li>
          <li><a href="https://github.com/djleamen/azure-for-ai-ml" target="_blank" rel="noopener noreferrer">Microsoft Azure for AI and Machine Learning</a></li>
        </ul>
    </p>
    
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
      const project = this.projects.find(p => p.id === '10');
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
      skills: ["Python", "Git", "APIs", "Debugging", "Natural Language Processing (NLP)", 
        "Vector Databases", "Pandas", "NumPy", "Large Language Models (LLM)", "Scikit-learn",
        "TensorFlow", "Keras", "Data Preprocessing", "Data Visualization",
        "Generative AI", "Machine Learning", "Artificial Intelligence (AI)", "pip", 
        "LangChain", "Data Structures & Algorithms", "Software Development", 
        "Software Engineering", "Testing", "ML/AI", "Retrieval-Augmented Generation (RAG)", 
        "Attention to Detail", "Data Entry", "Computer Vision", "Supervised Learning",
        "Unsupervised Learning", "Reinforcement Learning (RL)", "Neural Architectures", 
        "Transfer learning", "GANs", "Autoencoders", "BERT", "DistilBERT", "Fine-tuning", 
        "LoRA/QLoRA", "Pruning", "Quantization", "Embeddings", "Agentic Frameworks",
        "Algorithms", "Data Analysis", "Data Visualization", "Problem Solving"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>