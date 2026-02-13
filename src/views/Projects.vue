<template>
  <div class="projects-container">
    <div v-if="selectedSkill" class="back-row">
      <button @click="goBack" class="back-btn" aria-label="Back to About">
        <i class="fas fa-arrow-left"></i> Back to About
      </button>
    </div>
    <h1>{{ headerTitle }}</h1>
    <p class="subtitle">(Click on a project card to view details)</p>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading projects...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="!selectedSkill" class="filter-container">
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
    
    <transition-group name="fade" tag="div" class="project-list" v-if="filteredProjects.length > 0">
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
    
    <div v-if="filteredProjects.length === 0 && selectedSkill" class="empty-state">
      <div class="empty-icon">
        <i class="fas fa-search"></i>
      </div>
      <h3>No projects found</h3>
      <p>No projects use {{ selectedSkill }} yet.</p>
    </div>

    <div v-if="selectedSkill" class="related-content">
      <div v-if="filteredWorkPositions.length > 0">
        <h2>Positions where {{ selectedSkill }} was used</h2>
        <div class="work-container">
          <transition-group name="list" tag="div" class="bubble-container">
            <div v-for="position in filteredWorkPositions" :key="`${position.position}-${position.company}`" 
                 class="work-position-card">
              <h3>{{ position.position }}</h3>
              <p class="company">{{ position.company }}</p>
              <p class="duration">{{ position.duration }}</p>
              <p class="location">{{ position.location }} ({{ position.workType }})</p>
            </div>
          </transition-group>
        </div>
      </div>
      
      <div v-if="filteredCourses.length > 0">
        <h2>Courses using {{ selectedSkill }}</h2>
        <div class="courses-container">
          <transition-group name="list" tag="div" class="bubble-container">
            <div v-for="course in filteredCourses" :key="course.name" class="skill-bubble course-bubble" @click="openCoursePopup(course)">{{ course.name }}</div>
          </transition-group>
        </div>
      </div>
      
      <div v-if="filteredCerts.length > 0">
        <h2>Certifications using {{ selectedSkill }}</h2>
        <div class="certs-container">
          <transition-group name="list" tag="div" class="bubble-container">
            <a v-for="cert in filteredCerts" :key="cert.name" :href="cert.link" target="_blank" rel="noopener noreferrer" 
               class="skill-bubble cert-bubble">
              {{ cert.name }}
            </a>
          </transition-group>
        </div>
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
import { ref, computed, watch, onMounted } from 'vue';
import { apiService } from '../services/api';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const searchQuery = ref('');
    const sortOption = ref('newest');
    
    // Data from API
    const projects = ref([]);
    const courses = ref([]);
    const certs = ref([]);
    const education = ref([]);
    const workExperience = ref([]);
    const loading = ref(true);
    const error = ref(null);

    // Load data from API
    onMounted(async () => {
      try {
        const [projectsData, coursesData, certsData, workData] = await Promise.all([
          apiService.getProjects(),
          apiService.getCourses(),
          apiService.getCerts(),
          apiService.getWork()
        ]);
        
        projects.value = projectsData;
        // coursesData now contains education details with courses array
        education.value = coursesData;
        // Flatten all courses from all education records
        courses.value = coursesData.flatMap(edu => edu.courses || []);
        certs.value = certsData;
        workExperience.value = workData;
        loading.value = false;
      } catch (err) {
        console.error('Failed to load data:', err);
        error.value = 'Failed to load data. Please try again later.';
        loading.value = false;
      }
    });
    const activeCourse = ref(null);
    
    const filteredProjects = computed(() => {
      let result = [...projects.value];
      
      const skill = route.query.skill;
      if (skill) {
        result = result.filter(project => {
          return project.tags && project.tags.includes(skill);
        });
      }
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(project => 
          project.title.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)))
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

    const filteredWorkPositions = computed(() => {
      if (selectedSkill.value) {
        return workExperience.value.filter(position => position.skills && position.skills.includes(selectedSkill.value));
      }
      return [];
    });
    
    const filteredCourses = computed(() => {
      if (selectedSkill.value) {
        return courses.value.filter(course => course.skills && course.skills.includes(selectedSkill.value));
      }
      return [];
    });
    
    const filteredCerts = computed(() => {
      if (selectedSkill.value) {
        return certs.value.filter(cert => cert.skills && cert.skills.includes(selectedSkill.value));
      }
      return [];
    });
    
    
    const goToProjectDetail = (project) => {
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
        '17': '/projects/statsjam',
        '18': '/projects/doc-reader',
        '19': '/projects/music-mood-matcher',
        '20': '/projects/mp3-renamer',
        '21': '/projects/modelcules',
        '22': '/projects/mai-buddy',
        '23': '/projects/fast-track',
        '24': '/projects/mapleclear',
        '25': '/projects/devduck',
        '26': '/projects/intelligent-app',
        '27': '/projects/msft-ai-research'
      };
      
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
      const educationData = education.value[0] || {};
      const fullCourseDetails = educationData.courses?.find(c => c.name === course.name);
      
      if (fullCourseDetails) {
        activeCourse.value = fullCourseDetails;
      } else {
        activeCourse.value = { ...course, description: "No detailed description available." };
      }
      document.body.classList.add('no-scroll');
    };
    
    const closeCoursePopup = () => {
      activeCourse.value = null;
      document.body.classList.remove('no-scroll');
    };
    
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
      filteredWorkPositions,
      filteredCourses,
      filteredCerts,
      goToProjectDetail,
      goBack,
      searchQuery,
      sortOption,
      truncatedDescription,
      activeCourse,
      openCoursePopup,
      closeCoursePopup,
      loading,
      error
    };
  }
};
</script>

<style scoped>
.projects-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: clamp(34px, 4.8vw, 62px) 16px clamp(40px, 6vw, 72px);
  color: #eef4ff;
  text-align: center;
}

h1 {
  margin: 0 0 clamp(16px, 2.2vw, 24px);
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.08;
  font-weight: 800;
  background: linear-gradient(90deg, #70e2ff, #44bff5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin: 0 auto 24px;
  color: rgba(219, 230, 255, 0.72);
  font-size: 1rem;
  font-style: italic;
}

.back-btn {
  margin: 0;
  border: 1px solid rgba(126, 232, 255, 0.5);
  background: rgba(98, 213, 255, 0.16);
  color: #a5f3ff;
  font-weight: 700;
  border-radius: 999px;
  padding: 8px 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.back-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
}

.back-btn:hover {
  transform: translateX(-2px);
  background: rgba(98, 213, 255, 0.24);
}

.filter-container {
  max-width: 960px;
  margin: 0 auto 22px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 190px;
  gap: 12px;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: rgba(219, 230, 255, 0.56);
  font-size: 0.86rem;
}

.search-input,
.sort-select {
  width: 100%;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(130, 168, 255, 0.34);
  background: rgba(16, 21, 48, 0.84);
  color: #eef4ff;
  font-size: 0.98rem;
}

.search-input {
  padding-left: 40px;
  padding-right: 36px;
}

.search-input::placeholder {
  color: rgba(219, 230, 255, 0.48);
}

.search-input:focus,
.sort-select:focus {
  outline: none;
  border-color: rgba(126, 232, 255, 0.7);
  box-shadow: 0 0 0 3px rgba(126, 232, 255, 0.18);
}

.clear-btn {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: rgba(219, 230, 255, 0.64);
  cursor: pointer;
}

.clear-btn:hover {
  color: #dff5ff;
  background: rgba(126, 232, 255, 0.14);
}

.loading-state,
.error-state {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 44px;
  height: 44px;
  margin-bottom: 12px;
  border-radius: 50%;
  border: 3px solid rgba(126, 232, 255, 0.22);
  border-top-color: #7ee8ff;
  animation: spin 0.75s linear infinite;
}

.error-state p {
  max-width: 620px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 118, 118, 0.4);
  background: rgba(255, 118, 118, 0.1);
  color: #ffd8d8;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.project-card {
  text-align: left;
  border-radius: 18px;
  border: 1px solid rgba(130, 168, 255, 0.22);
  background:
    radial-gradient(circle at 12% 12%, rgba(98, 213, 255, 0.1), transparent 38%),
    linear-gradient(150deg, rgba(27, 33, 70, 0.86), rgba(17, 22, 52, 0.88));
  box-shadow: 0 16px 34px rgba(7, 12, 36, 0.3);
  padding: 18px;
  min-height: 292px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(126, 232, 255, 0.45);
}

.project-card.empty {
  visibility: hidden;
  pointer-events: none;
}

.project-card h3 {
  margin: 0 0 10px;
  color: #7ee8ff;
  font-size: clamp(1.38rem, 2vw, 1.7rem);
  line-height: 1.15;
}

.project-description {
  flex: 1;
}

.project-description p {
  margin: 0;
  color: rgba(230, 240, 255, 0.9);
  line-height: 1.62;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 14px 0;
}

.project-tag,
.more-tags {
  border-radius: 999px;
  padding: 6px 11px;
  font-size: 0.78rem;
  border: 1px solid rgba(126, 232, 255, 0.24);
  background: rgba(67, 95, 164, 0.48);
  color: #e5f3ff;
}

.more-tags {
  background: rgba(126, 232, 255, 0.22);
  color: #ccf9ff;
}

.project-footer {
  margin-top: auto;
}

.btn {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  border-radius: 11px;
  border: 1px solid rgba(126, 232, 255, 0.5);
  background: rgba(98, 213, 255, 0.18);
  color: #a5f3ff;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  background: rgba(98, 213, 255, 0.24);
}

.empty-state {
  padding: 34px 12px;
  color: rgba(219, 230, 255, 0.64);
}

.empty-icon {
  font-size: 2.2rem;
  margin-bottom: 8px;
}

.related-content {
  margin-top: 26px;
}

.related-content h2 {
  margin: 0 0 14px;
  font-size: clamp(1.45rem, 2.4vw, 1.95rem);
  color: #7ee8ff;
}

.work-container,
.courses-container,
.certs-container {
  margin-bottom: 24px;
}

.bubble-container {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.skill-bubble {
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 0.84rem;
  border: 1px solid rgba(126, 232, 255, 0.24);
  background: rgba(67, 95, 164, 0.48);
  color: #e5f3ff;
  text-decoration: none;
}

.course-bubble {
  cursor: pointer;
  background: rgba(126, 232, 255, 0.2);
  color: #b5f7ff;
}

.cert-bubble:hover,
.course-bubble:hover {
  border-color: rgba(126, 232, 255, 0.54);
}

.work-position-card {
  width: min(360px, 100%);
  text-align: center;
  border-radius: 16px;
  border: 1px solid rgba(130, 168, 255, 0.22);
  background:
    radial-gradient(circle at 12% 12%, rgba(98, 213, 255, 0.1), transparent 38%),
    linear-gradient(150deg, rgba(27, 33, 70, 0.86), rgba(17, 22, 52, 0.88));
  box-shadow: 0 16px 34px rgba(7, 12, 36, 0.3);
  padding: 14px;
}

.work-position-card h3 {
  margin: 0 0 6px;
  color: #7ee8ff;
  font-size: 1.15rem;
}

.work-position-card .company,
.work-position-card .duration,
.work-position-card .location {
  margin: 2px 0;
  font-size: 0.92rem;
}

.work-position-card .duration {
  color: rgba(214, 228, 255, 0.74);
}

.work-position-card .location {
  color: rgba(214, 228, 255, 0.64);
}

.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 8, 22, 0.74);
  backdrop-filter: blur(8px);
}

.popup-content {
  position: relative;
  width: min(760px, 100%);
  max-height: min(82vh, 760px);
  overflow-y: auto;
  border-radius: 18px;
  padding: 24px;
  text-align: left;
  border: 1px solid rgba(130, 168, 255, 0.24);
  background: linear-gradient(150deg, rgba(27, 33, 70, 0.98), rgba(17, 22, 52, 0.98));
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.45);
}

.popup-content h3 {
  margin: 0 0 8px;
  color: #7ee8ff;
}

.popup-content p {
  margin: 0;
  color: rgba(230, 240, 255, 0.92);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: rgba(126, 232, 255, 0.16);
  color: #d7f9ff;
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
}

.no-scroll {
  overflow: hidden;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 980px) {
  .project-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .projects-container {
    padding: 24px 10px 36px;
  }

  .filter-container {
    grid-template-columns: 1fr;
  }

  .project-list {
    grid-template-columns: 1fr;
  }

  .project-card h3 {
    font-size: 1.65rem;
  }
}
</style>
