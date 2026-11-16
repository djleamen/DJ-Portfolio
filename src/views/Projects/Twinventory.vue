<template>
  <ProjectPage projectId="34">
    <h1>Twinventory</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      Twinventory is a virtual closet and shopping experience built at Hack the North 2026. It answers two familiar problems: standing in front of a full closet with nothing to wear, and buying something online that looks nothing like you expected.
    </p>
    <p>
      You digitize your wardrobe, browse or search for new pieces, and see a generated image of yourself wearing the outfit before you buy anything.
    </p>
    <img src="@/assets/twinventory (2000x1000px).png" alt="Twinventory virtual closet and shopping experience" class="project-image" loading="lazy" />

    <h2>Key Features</h2>
    <ul>
      <li>Profiles with saved style preferences and an uploaded wardrobe inventory</li>
      <li>Product discovery by category, text search, or voice search</li>
      <li>Outfit slots that combine pieces you own with pieces you are considering</li>
      <li>AI try-on images generated from a profile photo and the selected products</li>
      <li>3D model previews of items</li>
      <li>Links through to the source store for anything you want to buy</li>
    </ul>

    <h2>Technical Details</h2>
    <p>
      The frontend is a Next.js and React app styled with Tailwind CSS, deployed on Vercel. The backend is a FastAPI service deployed on Railway from a Docker image. Product search runs on Elasticsearch, wardrobe and profile data live in MongoDB, and OpenAI models handle try-on generation, inventory tagging, and item embeddings. Voice search uses ElevenLabs transcription. GitHub Actions validates every pull request.
    </p>

    <h2>What I Learned</h2>
    <p>
      A hackathon forces you to choose the one flow that has to work and cut everything else. Wiring several AI services into a single request path also taught me to plan for each of them being slow or unavailable, and to keep the app usable when one is.
    </p>

    <h2>Demo Video</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/WKuFW7Bb4Yc" title="Twinventory demo video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    <h2>Links</h2>
    <ul>
      <li><a href="https://devpost.com/software/project-name-s0vg5w" target="_blank" rel="noopener noreferrer">Devpost submission</a></li>
      <li><a href="https://github.com/djleamen/twinventory" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
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

const { formattedDate } = useProjectData('34');

const skills = [
  "Python", "TypeScript", "JavaScript", "FastAPI", "Next.js", "React", "Tailwind CSS",
  "Elasticsearch", "MongoDB", "Generative AI", "Large Language Models (LLM)",
  "Artificial Intelligence (AI)", "Computer Vision", "Embeddings", "Recommendation Systems",
  "Docker", "Containerization", "CI/CD", "Cloud Computing", "APIs", "Web Development",
  "Software Engineering", "UI/UX", "Git", "Version Control", "Collaboration", "Teamwork",
  "Problem Solving", "TTS/STT", "Testing", "Uvicorn", "NoSQL", "CSS", "Pydantic",
  "Audio Processing", "Image Processing", "3D Graphics", "Prompt Engineering",
  "Visual Studio Code", "Creativity", "Communication", "Adaptability", "Time Management",
  "Written Communication", "Decision Making", "Presentation", "Resilience"
];
</script>
