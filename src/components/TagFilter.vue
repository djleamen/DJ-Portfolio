<template>
  <div class="tag-filter">
    <div class="tags">
      <span v-for="tag in uniqueTags" :key="tag" class="tag" @click="filterByTag(tag)">
        {{ tag }}
      </span>
    </div>
    <div class="projects">
      <div v-for="project in filteredProjects" :key="project.id" class="project-card">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <a :href="project.link" target="_blank" class="btn">View Project</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { projects } from '../data/projects';

const selectedTag = ref(null);
const filteredProjects = computed(() => {
  if (!selectedTag.value) return projects;
  return projects.filter(project => project.tags.includes(selectedTag.value));
});

const uniqueTags = computed(() => {
  const tags = projects.flatMap(project => project.tags);
  return [...new Set(tags)];
});

const filterByTag = (tag) => {
  selectedTag.value = tag;
};
</script>

<style scoped>
.tag-filter {
  text-align: center;
}

.tags {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.tag {
  background-color: #61dafb;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.tag:hover {
  background-color: #4fa3d1;
}

.projects {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.project-card {
  background: #252542;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  transition: transform 0.3s ease-in-out;
  flex: 1 1 calc(33.333% - 40px);
  box-sizing: border-box;
}

.project-card:hover {
  transform: translateY(-5px);
}

.btn {
  background-color: #61dafb;
  color: black;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}

.btn:hover {
  background-color: #4fa3d1;
}
</style>