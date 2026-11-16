<template>
  <ProjectPage projectId="43">
    <h1>GitHub Universe Badge Apps</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      At GitHub Universe 2026 in San Francisco, attendees received a programmable hardware badge. I wrote four apps for it, and the repository is open for anyone to load them onto their own badge.
    </p>
    <img src="@/assets/githubuniversebadge.png" alt="GitHub Universe programmable badge" class="project-image" loading="lazy" />

    <h2>The Apps</h2>
    <ul>
      <li><strong>Steps.</strong> A pedometer with a daily goal ring, distance, cadence, and all-time bests.</li>
      <li><strong>Marble Maze.</strong> Ten levels of generated mazes that you solve by tilting the badge, with pits in later levels and best times for each.</li>
      <li><strong>Contrib Graph.</strong> Your GitHub contribution year on the badge, with streaks and busiest days, cached so it works offline.</li>
      <li><strong>Amazeball.</strong> Shake the badge for one of 30 developer-flavoured answers.</li>
    </ul>

    <h2>Technical Details</h2>
    <p>
      The apps use the badge's motion sensor for step counting, tilt steering, and shake detection, its lights for feedback, and its Wi-Fi for fetching contribution data without blocking the display. State is saved on the device so progress survives a restart. The mazes are generated on the badge, and the marble has its own physics and wall collision.
    </p>

    <h2>What I Learned</h2>
    <p>
      Writing for a small device is a different discipline. Memory, screen space, and battery are all limited, input is a few buttons and a sensor, and noisy sensor readings have to be turned into something that feels right in the hand.
    </p>

    <h2>Links</h2>
    <ul>
      <li><a href="https://github.com/djleamen/github-universe-2026" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
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

const { formattedDate } = useProjectData('43');

const skills = [
  "Python", "Embedded Systems", "Internet of Things (IoT)", "Sensors", "Game Development",
  "Physics", "Data Structures & Algorithms", "Real-time Systems", "Event-driven Programming",
  "APIs", "Network Programming", "UI/UX", "Software Engineering", "Git", "Version Control",
  "Creativity", "Problem Solving", "Computer Hardware", "Mathematics",
  "Professional Development", "Professional Networking"
];
</script>
