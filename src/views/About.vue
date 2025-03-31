<template>
  <div class="about-container">
    <h1>About Me</h1>
    <p>I'm a Computer Science student at Ontario Tech University with a passion for learning new technologies and building innovative projects. My interests include: full-stack software development, AI, and cloud computing.
      See below and click for more details about my skills, education, and courses I've taken.
    </p>
    <p2>{{ bio }}</p2>
    <h2>Skills</h2>
    <div class="filter-container">
      <label for="skill-filter">Filter by type:</label>
      <select id="skill-filter" v-model="selectedType" @change="filterSkills">
        <option value="all">All</option>
        <option value="languages">Languages</option>
        <option value="frameworks">Frameworks</option>
        <option value="ml_ai">ML/AI</option>
        <option value="cloud">Cloud</option>
        <option value="databases">Databases</option>
        <option value="ides">IDEs</option>
        <option value="platformstools">Platforms & Tools</option>
        <option value="devTools">Development Tools</option>
        <option value="methodologies">Methodologies</option>
        <option value="coreConcepts">Core Concepts</option>
        <option value="soft">Soft Skills</option>
      </select>
    </div>
    <div class="skills-section">
      <div class="skills-container">
        <span class="skill-bubble" @click="filterProjects(skill)" v-for="skill in filteredSkills" :key="skill">{{ skill }}</span>
      </div>
    </div>
    <h2>Education</h2>
    <p><strong>{{ education.degree }}</strong> <br />
    {{ education.institution }} <br />
    {{ education.duration }} - {{ education.location }}</p>
    <h3>Courses I've Taken</h3>
    <div class="skills-container">
      <div v-for="course in education.courses" :key="course.name">
        <button class="skill-bubble" @click="openPopup(course.name)">
          {{ course.name }}
        </button>
      </div>
    </div>
    <p2>All course descriptions taken from <a href="https://calendar.ontariotechu.ca" target="_blank" rel="noopener noreferrer">Ontario Tech University Course Calendar</a></p2>

    <div v-if="activeCourse" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <h3>{{ activeCourse.name }}</h3>
        <p>{{ activeCourse.description }}</p>
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { education as educationData } from '../data/education';
import { skills, languages, frameworks, ml_ai, cloud, databases, ides, platformstools, devTools, methodologies, coreConcepts, soft } from '../data/skills';

const bio = "DJ is experienced in software development, data analysis, cybersecurity, NLP, cloud computing, and system optimization. She is a strong collaborator with a proven track record in research, public speaking, operational improvements, peer mentoring, and delivering impactful projects in fast-paced environments. She is passionate about innovation and driving team success.";

const education = reactive(educationData);

const activeCourse = ref(null);
const router = useRouter();

const selectedType = ref('all');
const filteredSkills = ref(skills);

function openPopup(courseName) {
  activeCourse.value = education.courses.find(course => course.name === courseName);
}

function closePopup() {
  activeCourse.value = null;
}

function filterProjects(skill) {
  router.push({ path: '/projects', query: { skill } });
}

function filterSkills() {
  switch (selectedType.value) {
    case 'languages':
      filteredSkills.value = languages;
      break;
    case 'frameworks':
      filteredSkills.value = frameworks;
      break;
    case 'ml_ai':
      filteredSkills.value = ml_ai;
      break;
    case 'cloud':
      filteredSkills.value = cloud;
      break;
    case 'databases':
      filteredSkills.value = databases;
      break;
    case 'ides':
      filteredSkills.value = ides;
      break;
    case 'platformstools':
      filteredSkills.value = platformstools;
      break;
    case 'devTools':
      filteredSkills.value = devTools;
      break;
    case 'methodologies':
      filteredSkills.value = methodologies;
      break;
    case 'coreConcepts':
      filteredSkills.value = coreConcepts;
      break;
    case 'soft':
      filteredSkills.value = soft;
      break;
    default:
      filteredSkills.value = skills;
  }
}
</script>

<style scoped>
.about-container {
  text-align: center;
  padding: 50px;
  color: white;
  background-color: #1a1a2e;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style-type: none;
  padding: 0;
  color: #1f2d4d;
}

li {
  margin: 10px 0;
}

p {
  margin: 10px 0;
}

p2 {
  margin: 10px 0;
  font-style: italic;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #4fa3d1, #2575fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.skills-section {
  text-align: left;
  width: 100%;
  max-width: 800spx;
  margin: 0 auto;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  padding: 10px 0;
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 20px;
}

.skill-bubble {
  background-color: #2a3d66;
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: none;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  max-width: 800px;
  background: white;
  color: #0d1b2a;
  padding: 30px;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.popup-content h3 {
  margin-top: 0;
}

.filter-container {
  margin-bottom: 20px;
  text-align: center;
}

.filter-container label {
  margin-right: 10px;
}

.filter-container select {
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #2a3d66;
  background-color: #1a1a2e;
  color: white;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.filter-container select:hover {
  background-color: #2a3d66;
  color: #ffffff;
}

.filter-container select:focus {
  border-color: #4fa3d1;
  box-shadow: 0 0 5px #4fa3d1;
}
</style>