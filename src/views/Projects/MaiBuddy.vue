<template>
  <ProjectPage projectId="22">
    <h1>Mai Buddy</h1>
    <p class="project-date">{{ formattedDate }}</p>

    <p>
      Mai Buddy is a customizable, personal AI agent that runs as a desktop application.
      It is powered by Anthropic Claude, lives in the menu bar, and comes with built-in
      tools that let the assistant read files, run commands, and look things up on GitHub
      on your behalf.
    </p>
    <p>
      The first version was an Electron app. Version 2 is a rewrite in Python on pywebview,
      which is what this page describes.
    </p>

    <h2>How It Works</h2>
    
    <ul>
        <li>You chat with Mai Buddy in a small, always-on-top window</li>
        <li>A global hotkey (Cmd+Shift+M) or the menu bar icon shows and hides it</li>
        <li>Claude answers, and can call the built-in tools on its own when a task needs them</li>
        <li>Shell commands and file writes always ask for your approval in a native dialog first</li>
        <li>Conversation history is saved locally and restored on the next launch</li>
    </ul>
    
    <h2>Key Features</h2>
    <ul>
        <li>Anthropic Claude chat, with the model configurable in settings</li>
        <li>Built-in MCP-style tools for the filesystem, the shell, and GitHub</li>
        <li>Approval prompts, so text the assistant reads cannot trigger a command by itself</li>
        <li>File writes restricted to your home directory</li>
        <li>API keys stored in the macOS keychain</li>
        <li>Markdown-rendered, sanitized responses</li>
        <li>Frameless, transparent window with a draggable title bar</li>
    </ul>

    <h2>Screenshots</h2>
    <div class="screenshots-container">
      <img src="@/assets/mai-buddy.png" alt="Mai Buddy desktop assistant welcome screen" class="screenshot" loading="lazy" />
    </div>
    
    <h2>Technologies</h2>
    <ul>
        <li>Python</li>
        <li>pywebview</li>
        <li>Anthropic API (Claude)</li>
        <li>pystray and pynput for the menu bar icon and global hotkey</li>
        <li>keyring for secure secret storage</li>
        <li>HTML, CSS, and JavaScript for the chat interface</li>
    </ul>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>

    <h2>Project Link</h2>
    <a href="https://github.com/djleamen/mai-buddy" target="_blank" rel="noopener noreferrer">
      Visit Mai Buddy <i class="fas fa-external-link-alt"></i>
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
      const project = this.projects.find(p => p.id === '22');
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
        "Python", "pywebview", "JavaScript", "HTML", "CSS", "Git", "pip", "APIs",
        "Software Engineering", "Problem Solving", "Data Structures & Algorithms",
        "Artificial Intelligence (AI)", "Generative AI", "Large Language Models (LLM)",
        "Agentic Frameworks", "Prompt Engineering", "Natural Language Processing (NLP)",
        "Cybersecurity", "Defensive Programming", "Visual Studio Code", "AI Ethics",
        "Information Technology", "Testing", "Debugging", "Programming Languages", "Creativity",
        "Innovation", "Written Communication", "Shell", "CI/CD", "Multi-threading",
        "Event-driven Programming", "Version Control", "Adaptability", "Data Entry"
      ]
    };
  }
};
</script>

<style scoped>
.more-skills {
  background: var(--tonal) !important;
  color: var(--on-tonal) !important;
  font-weight: bold;
}
</style>
