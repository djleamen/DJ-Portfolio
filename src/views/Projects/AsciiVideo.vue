<template>
  <ProjectPage projectId="41">
    <h1>ASCII Video</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      ASCII Video turns any video file into live ASCII art, frame by frame, in your browser. Nothing is uploaded and nothing is installed. The video never leaves your machine.
    </p>

    <h2>Key Features</h2>
    <ul>
      <li>Plays any video your browser can decode as ASCII in real time</li>
      <li>Live controls for width, contrast, brightness, and inversion</li>
      <li>Optional colour, where each character takes the colour of its source pixel</li>
      <li>Several character sets for mapping brightness to text</li>
      <li>Copy the current frame to the clipboard or save it as a text file</li>
    </ul>

    <h2>Technical Details</h2>
    <p>
      Each frame of the video is drawn to a small offscreen canvas sized to the character grid. The pixels are read back, converted to luminance, adjusted, and mapped to a character. Rendering is tied to decoded video frames where the browser supports it, so the text stays in sync with playback, with an animation-frame fallback elsewhere. The grid corrects for the fact that characters are taller than they are wide.
    </p>

    <h2>What I Learned</h2>
    <p>
      This was a compact lesson in browser media APIs and in doing per-pixel work fast enough to keep up with video.
    </p>

    <h2>Demo Video</h2>
    <video :src="asciiVideo" class="project-image" controls playsinline preload="metadata" aria-label="ASCII Video demo">
      Your browser does not support embedded video. <a :href="asciiVideo">Download the ASCII Video demo</a>.
    </video>

    <h2>Links</h2>
    <ul>
      <li><a href="https://djleamen.github.io/ascii-video/" target="_blank" rel="noopener noreferrer">Live demo</a></li>
      <li><a href="https://github.com/djleamen/ascii-video" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
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
import asciiVideo from '@/assets/ascii-video.mp4';

const { formattedDate } = useProjectData('41');

const skills = [
  "JavaScript", "HTML", "CSS", "Image Processing", "Video Processing", "Real-time Systems",
  "Performance Tuning", "Data Structures & Algorithms", "Web Development", "UI/UX",
  "Software Engineering", "Git", "Version Control", "Creativity", "Event-driven Programming",
  "CI/CD", "Visual Studio Code", "Data Entry"
];
</script>
