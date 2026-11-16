<template>
  <ProjectPage projectId="36">
    <h1>Blockgame</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      Blockgame is a small 3D block game written in Java, with heavy inspiration from the early alpha versions of Minecraft. You can walk a generated world, break and place blocks, and collect what you break.
    </p>

    <h2>Key Features</h2>
    <ul>
      <li>First-person movement with gravity, jumping, sprinting, sneaking, and block collision</li>
      <li>13 block types, including water, ores, and trees</li>
      <li>Terrain generated from a noise heightmap with hills, beaches, and seas</li>
      <li>Deterministic world seeds, so the same seed gives the same world</li>
      <li>Survival-style hotbar and a 27-slot inventory with stacking</li>
      <li>Textures generated in memory at startup, so the game ships no image files</li>
    </ul>

    <h2>Screenshots</h2>
    <div class="screenshots-container">
      <img src="@/assets/blockgame.png" alt="Blockgame gameplay" class="screenshot" loading="lazy" />
      <img src="@/assets/blockgame-2.png" alt="Another view of the Blockgame world" class="screenshot" loading="lazy" />
    </div>

    <h2>Technical Details</h2>
    <p>
      The game is built with Maven and uses LWJGL for OpenGL rendering and GLFW for windowing and input. Physics runs on delta time so movement is the same at any frame rate. Only block faces exposed to air are drawn, which keeps the frame rate reasonable without a more advanced renderer. A staged roadmap in the repository tracks the path from a flat demo world toward something closer to the original game.
    </p>

    <h2>What I Learned</h2>
    <p>
      Writing a game loop from scratch made concepts I had only read about concrete: frame-independent physics, collision resolution, face culling, and procedural generation. It also showed me how quickly a small project needs structure once features start to interact.
    </p>

    <h2>Links</h2>
    <ul>
      <li><a href="https://github.com/djleamen/blockgame" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
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

const { formattedDate } = useProjectData('36');

const skills = [
  "Java", "OpenGL", "LWJGL", "Maven", "Game Development", "3D Graphics", "Physics",
  "Mathematics", "Data Structures & Algorithms", "Object-Oriented Programming (OOP)",
  "Performance Tuning", "Memory Management", "Real-time Systems", "Testing",
  "Software Engineering", "Git", "Version Control", "Problem Solving", "CI/CD",
  "Visual Studio Code", "Creativity", "Adaptability", "Research"
];
</script>
