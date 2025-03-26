<template>
  <div class="projects-container">
    <button v-if="selectedSkill" @click="goBack" class="back-btn">⬅</button>
    <h1>{{ headerTitle }}</h1>
    <div class="project-list">
      <div v-for="(project, index) in filteredProjects" :key="index" class="project-card" @click="goToProjectDetail(project)">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <a :href="project.link" target="_blank" class="btn">View</a>
      </div>
      <!-- Add empty divs to ensure 3 projects per line -->
      <div v-for="n in emptySlots" :key="'empty-' + n" class="project-card empty"></div>
      <div v-if="filteredProjects.length === 0" class="coming-soon">Coming soon...</div>
    </div>
    <div v-if="selectedSkill">
      <h2>Courses using {{ selectedSkill }}</h2>
      <div class="course-cert-container">
        <div v-for="course in filteredCourses" :key="course.name" class="skill-bubble">{{ course.name }}</div>
        <div v-if="filteredCourses.length === 0" class="coming-soon">Coming soon...</div>
      </div>
      <h2>Certifications using {{ selectedSkill }}</h2>
      <div class="course-cert-container">
        <a v-for="cert in filteredCerts" :key="cert.name" :href="cert.link" target="_blank" class="skill-bubble">
          {{ cert.name }}
        </a>
        <div v-if="filteredCerts.length === 0" class="coming-soon">Coming soon...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { projects } from '../data/projects';
import { courses } from '../data/courses';
import { certs } from '../data/certs';
import { useRouter, useRoute } from 'vue-router';

export default {
  data() {
    return {
      projects,
      courses,
      certs
    };
  },
  computed: {
    filteredProjects() {
      const skill = this.$route.query.skill;
      if (skill) {
        return this.projects.filter(project => project.tags.includes(skill));
      }
      return this.projects;
    },
    emptySlots() {
      const remainder = this.filteredProjects.length % 3;
      return remainder === 0 ? 0 : 3 - remainder;
    },
    headerTitle() {
      const skill = this.$route.query.skill;
      return skill ? `Projects using ${skill}` : 'Projects';
    },
    selectedSkill() {
      return this.$route.query.skill;
    },
    filteredCourses() {
      if (this.selectedSkill) {
        return this.courses.filter(course => course.skills.includes(this.selectedSkill));
      }
      return [];
    },
    filteredCerts() {
      if (this.selectedSkill) {
        return this.certs.filter(cert => cert.skills.includes(this.selectedSkill));
      }
      return [];
    }
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const goToProjectDetail = (project) => {
      router.push({ path: `/views/Projects/${project.id}` });
    };
    const goBack = () => {
      router.push({ path: '/about' });
    };
    return { goToProjectDetail, goBack, route };
  }
};
</script>

<style scoped>
.projects-container {
  text-align: center;
  padding: 50px;
  color: white;
  background-color: #1a1a2e; /* Ensure strong contrast */
  position: relative;
}

.back-btn {
  font-size: 1.5rem;
  color: #61dafb;
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: transparent;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #4fa3d1;
}

.project-list {
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
  flex: 1 1 calc(33.333% - 40px); /* 3 projects per line */
  box-sizing: border-box;
}

.project-card.empty {
  visibility: hidden;
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

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #4fa3d1, #2575fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  margin-top: 40px;
  font-size: 2rem;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
  color: white;
  background-color: #252542;
  max-width: 600px;
}

li {
  margin: 10px 0;
  background-color: #252542;
}

.skill-bubble {
  background-color: #0d1b2a; /* Darker blue */
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: none;
  text-decoration: none; /* Ensure the text is not underlined */
}

.coming-soon {
  color: #61dafb;
  font-size: 1.2rem;
  margin-top: 20px;
}

.course-cert-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>