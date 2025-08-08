<template>
  <ProjectPage projectId="22">
    <h1>Mai Buddy</h1>
    <p class="project-date">{{ formattedDate }}</p>

    <p>
      Mai Buddy is a highly customizable, personal AI agent that runs as a desktop application. 
      It features GPT integration, ElevenLabs voice synthesis, and dozens of MCP 
      (Model Context Protocol) connections for extending functionality.
    </p>

    <h2>How It Works</h2>
    
    <ul>
        <li>Users can interact with Mai Buddy via text or voice commands</li>
        <li>Supports multiple AI models including GPT-4 and GPT-3.5 Turbo</li>
        <li>Voice activation with ElevenLabs for text-to-speech capabilities</li>
        <li>Integrates with various services through MCP connections</li>
        <li>Runs in the system tray for easy access</li>
    </ul>
    
    <h2>Key Features</h2>
    <ul>
        <li>Highly customizable AI agent</li>
        <li>Supports multiple AI models</li>
        <li>Voice interaction capabilities</li>
        <li>Extensive integration options</li>
        <li>Lightweight and efficient</li>
    </ul>
    
    <h2>Technologies</h2>
    <ul>
        <li>React</li>
        <li>Node.js</li>
        <li>Electron</li>
        <li>Express.js</li>
        <li>WebSocket</li>
        <li>OpenAI API</li>
        <li>ElevenLabs API</li>
    </ul>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>

    <h2>Roadmap</h2>
    <ul>
        <li>Add support for additional AI models</li>
        <li>Enhance voice interaction capabilities</li>
        <li>Expand MCP connection options</li>
        <li>Improve user interface and experience</li>
        <li>Implement plugin system for custom extensions</li>
    </ul>

    <h2>Project Link</h2>
    <a href="https://github.com/djleamen/mai-buddy" target="_blank" rel="noopener noreferrer">
      Visit Mai Buddy <i class="fas fa-external-link-alt"></i>
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
      const project = projects.find(p => p.id === '22');
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
        "React", "Node.js", "Electron", "Express.js", "JavaScript", "HTML", "CSS", 
        "Git", "npm", "APIs", "Software Development", 
        "Software Engineering", "Problem Solving", "Data Structures & Algorithms",
        "Artificial Intelligence (AI)", "Machine Learning",
        "Natural Language Processing (NLP)", "Generative AI", "TTS/STT",
        "Large Language Models (LLM)", "ML/AI", "Prompt Engineering", "Visual Studio Code",
        "AI Ethics", "Information Technology", "Testing", "Debugging", 
        "Programming Languages", "Problem Solving", "Creativity",
        "Innovation", "Written Communication"
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
