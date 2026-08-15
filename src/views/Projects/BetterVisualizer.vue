<template>
  <ProjectPage projectId="31">
    <h1>Better Visualizer</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      Music visualizer with real-time mood detection and 
      physics-based fluid visuals. Inspired by the Apple Music/iTunes 
      visualizer — but smarter and more customizable.
    </p>
    <h2>Key Features</h2>
    <ul>
        <li>Real-time audio – microphone input or drop any audio file</li>
        <li>Mood detection – Meyda extracts perceptual audio features (energy, spectral centroid, MFCCs, chroma, ZCR, flux) every ~512 samples; a weighted classifier maps them onto 6 mood archetypes in real time</li>
        <li>Adaptive theming – colour palette, bloom intensity, particle speed, and trail decay all smoothly transition based on detected mood</li>
        <li>Physics particle system – 2 200 particles with spring-orbit forces, frequency-band attractors, vortex, turbulence, and beat-triggered shockwaves</li>
        <li>Three.js renderer + post-processing – UnrealBloomPass gives the iconic iTunes glow; frequency ring, waveform ribbon, and pulsing center orb complete the scene</li>
    </ul>

    <h2>Mood Archetypes</h2>
    <ul>
        <li><strong>Energetic:</strong> Orange · Red · Gold – Fast, warm, high bloom</li>
        <li><strong>Euphoric:</strong> Magenta · Pink · Violet – Soaring, saturated, swirling</li>
        <li><strong>Calm:</strong> Sky · Teal · Mint – Slow, flowing, low bloom</li>
        <li><strong>Melancholic:</strong> Deep Blue · Indigo – Heavy, dark, sparse</li>
        <li><strong>Aggressive:</strong> Red · Crimson – Sharp, fast, max bloom</li>
        <li><strong>Mysterious:</strong> Dark Purple · Cyan – Sparse, shifting, deep</li>
    </ul>
    <p>Try it out or view it on GitHub:</p>
    <ul>
        <li><a href="https://djleamen.github.io/better-visualizer/" target="_blank" rel="noopener noreferrer">Better Visualizer</a></li>
        <li><a href="https://github.com/djleamen/better-visualizer" target="_blank" rel="noopener noreferrer">Better Visualizer Repo</a></li>
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
      const project = this.projects.find(p => p.id === '31');
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
    "JavaScript", "HTML", "CSS", "Three.js", "WebGL", "npm", "YAML",
    "CI/CD", "DevOps", "Web Development", "APIs", "Physics", "Mathematics",
    "Algorithms", "Data Structures & Algorithms", "Memory Management",
    "Performance Tuning", "Software Development", "Software Engineering",
    "Software Architecture", "UX/UI", "Defensive Programming",
    "Git", "Version Control", "Meyda", "Audio Processing", 
    "Digital Signal Processing (DSP)", "Real-time Systems", "Event-driven Programming"
    ]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>
