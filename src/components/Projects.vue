<template>
  <section class="projects">
    <h2>Project Summary</h2>
    <div class="grid">
      <div v-for="(project, index) in projects" :key="index" class="project-card">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  { name: "SUSTAIN", description: "A sustainability-focused tech project." },
  { name: "Scrozam!", description: "A music tagging and streaming app." },
  { name: "PurplWav", description: "Epilepsy awareness and education initiative." }
];
</script>

<style scoped>
.projects {
  padding: 2rem;
  text-align: center;
}

.grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.project-card {
  background: #2a3d66;
  padding: 1.2rem;
  width: 220px;
  border-radius: 12px;
  transition: transform 0.2s ease-in-out;
}

.project-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
}
</style>