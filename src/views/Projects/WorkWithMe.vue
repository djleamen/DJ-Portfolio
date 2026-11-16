<template>
  <ProjectPage projectId="38">
    <h1>Work With Me</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      Work With Me is a drawing web app with an AI companion. You sketch freely on a canvas and the AI works alongside you, which makes it useful for artists, for students working through homework, and for visualizing math.
    </p>

    <h2>Key Features</h2>
    <ul>
      <li>A freehand drawing canvas in the browser</li>
      <li>An AI assistant that can see and respond to what is on the canvas</li>
      <li>Help with visualizing equations and working through problems</li>
      <li>Live updates between the browser and the server</li>
    </ul>

    <h2>Screenshots</h2>
    <div class="screenshots-container">
      <img src="@/assets/wwm-math.png" alt="Work With Me solving an integral with AI assistance" class="screenshot" loading="lazy" />
      <img src="@/assets/wwm-draw.png" alt="Work With Me drawing canvas with an AI-assisted ocean scene" class="screenshot" loading="lazy" />
      <img src="@/assets/wwm-vis.png" alt="Work With Me visualizing integration as the area under a curve" class="screenshot" loading="lazy" />
    </div>

    <h2>Technical Details</h2>
    <p>
      The client is plain JavaScript, HTML, and CSS. A Node.js server sits between the browser and the OpenAI API and keeps a WebSocket connection open to each client, so the assistant's responses arrive as they are produced.
    </p>

    <h2>What I Learned</h2>
    <p>
      The interesting problem was interaction design: deciding when an assistant should step in on a creative task and when it should stay out of the way. I also got practical experience keeping a real-time connection reliable.
    </p>

    <h2>Links</h2>
    <ul>
      <li><a href="https://github.com/djleamen/work-with-me" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
    </ul>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
    </div>
  </ProjectPage>
</template>

<script setup lang="ts">
import ProjectPage from '@/components/ProjectPage.vue';
import { useProjectData } from '@/composables/useProjectData';

const { formattedDate } = useProjectData('38');

const skills = [
  "JavaScript", "HTML", "CSS", "Node.js", "WebSockets", "Generative AI",
  "Large Language Models (LLM)", "Artificial Intelligence (AI)", "Prompt Engineering",
  "Real-time Systems", "Event-driven Programming", "APIs", "Web Development", "UI/UX",
  "Software Engineering", "Git", "Version Control", "Creativity", "Express.js", "Shell",
  "Computer Vision", "Image Processing", "Visual Studio Code", "Problem Solving", "Adaptability",
  "Communication", "Research", "Decision Making", "Innovation"
];
</script>
