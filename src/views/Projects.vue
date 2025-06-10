<template>
  <div class="projects-container">
    <button v-if="selectedSkill" @click="goBack" class="back-btn" aria-label="Back to skills">
      <i class="fas fa-arrow-left"></i> Back to About
    </button>
    <h1>{{ headerTitle }}</h1>
    <p class="subtitle">(Click on a project card to view details)</p>
    
    <div class="filter-container" v-if="!selectedSkill">
      <div class="search-box">
        <i class="fas fa-search search-icon"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search projects..." 
          class="search-input" 
          aria-label="Search projects"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn" aria-label="Clear search">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <select v-model="sortOption" class="sort-select" aria-label="Sort projects">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
    
    <transition-group name="fade" tag="div" class="project-list">
      <div v-for="(project, index) in displayedProjects" :key="index" 
           class="project-card elevation-3" 
           @click="goToProjectDetail(project)">
        <h3>{{ project.title }}</h3>
        <div class="project-description">
          <p>{{ truncatedDescription(project.description) }}</p>
        </div>
        <div class="project-tags">
          <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="project-tag">{{ tag }}</span>
          <span v-if="project.tags.length > 3" class="more-tags">+{{ project.tags.length - 3 }}</span>
        </div>
        <div class="project-footer">
          <a :href="project.link" target="_blank" rel="noopener noreferrer" 
             class="btn" @click.stop aria-label="View project">View Project</a>
        </div>
      </div>
      <!-- Add empty divs to ensure proper grid layout -->
      <div v-for="n in emptySlots" :key="'empty-' + n" class="project-card empty"></div>
    </transition-group>
    
    <div v-if="filteredProjects.length === 0" class="empty-state">
      <div class="empty-icon">
        <i class="fas fa-search"></i>
      </div>
      <h3>No projects found</h3>
      <p>Try adjusting your search criteria or check back later for new projects.</p>
    </div>
    
    <div v-if="selectedSkill" class="related-content">
      <h2>Courses using {{ selectedSkill }}</h2>
      <div class="courses-container">
        <transition-group name="list" tag="div" class="bubble-container">
          <div v-for="course in filteredCourses" :key="course.name" class="skill-bubble course-bubble" @click="openCoursePopup(course)">{{ course.name }}</div>
          <div v-if="filteredCourses.length === 0" class="empty-message">No related courses yet</div>
        </transition-group>
      </div>
      
      <h2>Certifications using {{ selectedSkill }}</h2>
      <div class="certs-container">
        <transition-group name="list" tag="div" class="bubble-container">
          <a v-for="cert in filteredCerts" :key="cert.name" :href="cert.link" target="_blank" rel="noopener noreferrer" 
             class="skill-bubble cert-bubble">
            {{ cert.name }}
          </a>
          <div v-if="filteredCerts.length === 0" class="empty-message">No related certifications yet</div>
        </transition-group>
      </div>
    </div>
    
    <!-- Move popup outside the container to avoid positioning constraints -->
    <teleport to="body">
      <div v-if="activeCourse" class="popup-overlay" @click="closeCoursePopup">
        <div class="popup-content" @click.stop>
          <button class="close-button" @click="closeCoursePopup">&times;</button>
          <h3>{{ activeCourse.name }}</h3>
          <p>{{ activeCourse.description || 'No description available' }}</p>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { projects } from '../data/projects';
import { courses } from '../data/courses';
import { certs } from '../data/certs';
import { education } from '../data/education';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const searchQuery = ref('');
    const sortOption = ref('newest');
    const activeCourse = ref(null);
    
    const filteredProjects = computed(() => {
      let result = [...projects];
      
      const skill = route.query.skill;
      if (skill) {
        result = result.filter(project => project.tags.includes(skill));
      }
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(project => 
          project.title.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return result;
    });
    
    const sortedProjects = computed(() => {
      const sorted = [...filteredProjects.value];
      
      switch (sortOption.value) {
        case 'newest':
          return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'oldest':
          return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'az':
          return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'za':
          return sorted.sort((a, b) => b.title.localeCompare(a.title));
        default:
          return sorted;
      }
    });
    
    const displayedProjects = computed(() => {
      return sortedProjects.value;
    });
    
    const emptySlots = computed(() => {
      const remainder = filteredProjects.value.length % 3;
      return remainder === 0 ? 0 : 3 - remainder;
    });
    
    const headerTitle = computed(() => {
      const skill = route.query.skill;
      return skill ? `Projects using ${skill}` : 'Projects';
    });
    
    const selectedSkill = computed(() => {
      return route.query.skill;
    });
    
    const filteredCourses = computed(() => {
      if (selectedSkill.value) {
        return courses.filter(course => course.skills && course.skills.includes(selectedSkill.value));
      }
      return [];
    });
    
    const filteredCerts = computed(() => {
      if (selectedSkill.value) {
        return certs.filter(cert => cert.skills && cert.skills.includes(selectedSkill.value));
      }
      return [];
    });
    
    const goToProjectDetail = (project) => {
      // Map project IDs to their corresponding routes
      const idToPathMap = {
        '1': '/projects/sustain',
        '2': '/projects/scrozam',
        '3': '/projects/purplwav',
        '4': '/projects/nanonest',
        '5': '/projects/codes-it-simple',
        '6': '/projects/portfolio',
        '7': '/projects/tali',
        '8': '/projects/pure-canuck',
        '9': '/projects/wolves-and-sheep',
        '10': '/projects/bunnies',
        '11': '/projects/spam-detector',
        '12': '/projects/screecher',
        '13': '/projects/file-sharing',
        '14': '/projects/daily-journal',
        '15': '/projects/chess-bot',
        '16': '/projects/chill-chat',
        '17': '/projects/statsjam'
      };
      
      // Use the route that corresponds to the project ID
      const path = idToPathMap[project.id] || '/projects';
      router.push({ path });
    };
    
    const goBack = () => {
      router.push({ path: '/about' });
    };
    
    const truncatedDescription = (description) => {
      return description.length > 120 ? `${description.substring(0, 120)}...` : description;
    };
    
    const openCoursePopup = (course) => {
      // Find the course with full details from education data
      const fullCourseDetails = education.courses.find(c => c.name === course.name);
      
      if (fullCourseDetails) {
        activeCourse.value = fullCourseDetails;
      } else {
        // Just use the basic course info we already have
        activeCourse.value = { ...course, description: "No detailed description available." };
      }
      document.body.classList.add('no-scroll');
    };
    
    const closeCoursePopup = () => {
      activeCourse.value = null;
      document.body.classList.remove('no-scroll');
    };
    
    // Reset search when navigating between different skills
    watch(() => route.query.skill, () => {
      searchQuery.value = '';
    });

    return { 
      projects, 
      filteredProjects, 
      displayedProjects: sortedProjects,
      emptySlots, 
      headerTitle,
      selectedSkill,
      filteredCourses,
      filteredCerts,
      goToProjectDetail,
      goBack,
      searchQuery,
      sortOption,
      truncatedDescription,
      activeCourse,
      openCoursePopup,
      closeCoursePopup
    };
  }
};
</script>

<style scoped>
.projects-container {
  text-align: center;
  padding: 20px 30px;
  color: white;
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #61dafb;
  background-color: rgba(97, 218, 251, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(97, 218, 251, 0.3);
  position: absolute;
  top: 30px;
  left: 30px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-btn:hover {
  background-color: rgba(97, 218, 251, 0.2);
  transform: translateX(-3px);
}

h1 {
  font-size: 2.8rem;
  font-weight: bold;
  background: linear-gradient(to right, #4fa3d1, #2575fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  text-align: center;
}

.subtitle {
  color: var(--text-muted);
  font-style: italic;
  text-align: center;
  margin: 5px auto 30px;
  display: block;
  font-size: 1rem;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 30px;
  max-width: 900px;
  flex-wrap: wrap;
  gap: 15px;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 500px;
  min-width: 250px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(26, 26, 46, 0.6);
  color: white;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input:focus {
  outline: none;
  border-color: #61dafb;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(97, 218, 251, 0.25);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.clear-btn {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: none;
}

.clear-btn:hover {
  color: white;
  background-color: transparent;
  transform: translateY(-50%) scale(1.1);
  box-shadow: none;
}

.sort-select {
  padding: 12px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(26, 26, 46, 0.6);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 150px;
}

.sort-select:focus {
  outline: none;
  border-color: #61dafb;
  box-shadow: 0 0 0 3px rgba(97, 218, 251, 0.25);
}

.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin: 40px auto;
  max-width: 1200px;
}

.project-card {
  background-color: rgba(26, 26, 46, 0.6);
  padding: 25px;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #4fa3d1, #2575fc);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-card.empty {
  visibility: hidden;
  pointer-events: none;
}

.project-card h3 {
  font-size: 1.4rem;
  margin-top: 0;
  margin-bottom: 15px;
  color: #61dafb;
}

.project-description {
  flex-grow: 1;
  margin-bottom: 20px;
}

.project-description p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  text-align: left;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.project-tag {
  background-color: rgba(42, 61, 102, 0.7);
  color: rgba(255, 255, 255, 0.9);
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.more-tags {
  background-color: rgba(97, 218, 251, 0.2);
  color: #61dafb;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.8rem;
}

.project-footer {
  display: flex;
  justify-content: center;
}

.btn {
  background-color: #61dafb;
  color: #0d1b2a;
  padding: 10px 18px;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  border: 2px solid #61dafb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  background-color: transparent;
  color: #61dafb;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.related-content {
  margin-top: 60px;
  width: 100%;
  padding: 0;
}

.related-content h2 {
  font-size: 1.8rem;
  margin: 40px 0 20px;
  color: #61dafb;
  text-align: center;
}

.courses-container,
.certs-container {
  margin-bottom: 40px;
  width: 100%;
  padding: 0;
}

.bubble-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 15px 0;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.skill-bubble {
  background-color: #2a3d66;
  color: white;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

.course-bubble {
  background-color: #61dafb;
  color: #0d1b2a;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-bubble:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0,0,0,0.3);
  background-color: #4fa3d1;
}

.cert-bubble {
  background-color: #2a3d66;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cert-bubble:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0,0,0,0.3);
  background-color: #3a4d76;
}

.empty-message {
  color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  font-style: italic;
}

/* Animation for list transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Animation for fade transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Popup styles - ensure full viewport coverage */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
}

.popup-content {
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  background: white;
  color: #0d1b2a;
  padding: 40px;
  border-radius: 20px;
  text-align: left;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow-y: auto;
  margin: 0;
  transform: none;
}

.popup-content h3 {
  margin-top: 0;
  color: #2a3d66;
  font-size: 1.8rem;
}

.popup-content p {
  color: #333;
  line-height: 1.6;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 30px;
  color: #2a3d66;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  box-shadow: none;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(42, 61, 102, 0.1);
  transform: scale(1.1);
}

.no-scroll {
  overflow: hidden;
}
</style>