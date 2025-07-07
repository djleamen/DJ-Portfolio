<template>
  <ProjectPage projectId="19">
    <h1>RAG Document Reader</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <p>
    A specialized large document (800k+ words) Q&A AI agent using 
    Retrieval-Augmented Generation (RAG). This system can efficiently process, 
    index, and query massive documents to provide accurate, contextual answers.
    </p>
    
    <h2>Key Features</h2>
    <ul>
        <li>Large Document Support: Handle documents up to 800k+ words efficiently</li>
        <li>Multiple Format Support: PDF, DOCX, TXT, and Markdown files</li>
        <li>Advanced RAG Pipeline: Combines retrieval and generation for accurate answers</li>
        <li>Vector Database Options: FAISS, ChromaDB, and Pinecone support</li>
        <li>Conversational Mode: Maintains context across multiple queries</li>
        <li>Web Interface: Beautiful Streamlit UI for easy interaction</li>
        <li>REST API: FastAPI-based API for integration</li>
        <li>CLI Tool: Command-line interface for batch processing</li>
        <li>Scalable Architecture: Modular design for easy extension</li>
    </ul>
    
    <h2>Architecture</h2>
    <img src="../../assets/ragdocarch.png" alt="RAG Document Reader Architecture" class="project-image">

    <h2>Key components</h2>
    <ul>
        <li>Document Processor: Extracts and chunks text from various formats</li>
        <li>Vector Store Manager: Handles embedding storage and similarity search</li>
        <li>RAG Engine: Orchestrates retrieval and generation</li>
        <li>API Layer: FastAPI for REST endpoints</li>
        <li>UI Layer: Streamlit for web interface</li>
        <li>CLI: Command-line tools for batch operations</li>
    </ul>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>
    
    <h2>Project Link</h2>
    <a href="https://github.com/djleamen/doc-reader" target="_blank" rel="noopener noreferrer">
      Visit RAG Document Reader <i class="fas fa-external-link-alt"></i>
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
      const project = projects.find(p => p.id === '19');
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
        "Python", "FastAPI", "Git", "APIs", "Debugging", "Natural Language Processing (NLP)", 
        "Vector Databases", "CSS", "Pandas", "NumPy", "Large Language Models (LLM)", 
        "Generative AI", "Machine Learning", "Artificial Intelligence (AI)", "pip", 
        "LangChain", "Uvicorn", "Docker", "UX/UI", "Data Structures & Algorithms", 
        "Software Development", "Software Engineering", "Streamlit", "Testing", "ML/AI", 
        "NLTK", "Retrieval-Augmented Generation (RAG)", "Attention to Detail", "Data Entry", 
        "Algorithms", "Data Analysis", "Data Visualization", "Problem Solving"
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
