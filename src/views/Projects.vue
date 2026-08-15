<template>
  <div class="projects-container">
    <div v-if="selectedSkill" class="back-row">
      <button @click="goBack" class="back-btn" aria-label="Back to About">
        <i class="fas fa-arrow-left"></i> Back to About
      </button>
    </div>
    <header class="work-header">
      <p class="eyebrow">Work / 03</p>
      <h1>{{ headerTitle }}</h1>
      <p v-if="!selectedSkill" class="work-intro">
        Products, prototypes, research, and experiments across intelligent systems,
        cloud infrastructure, and full-stack engineering.
      </p>
    </header>
    
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
    
    <div v-if="!loading && !error && filteredProjects.length > 0" class="result-count">
      <span>{{ String(displayedProjects.length).padStart(2, '0') }} entries</span>
      <span>Case study / source</span>
    </div>

    <transition-group name="fade" tag="div" class="project-list" v-if="filteredProjects.length > 0">
      <article
        v-for="(project, index) in displayedProjects"
        :key="project.id"
        class="project-card"
        role="link"
        tabindex="0"
        @click="goToProjectDetail(project)"
        @keydown.enter="goToProjectDetail(project)"
      >
        <span class="project-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="project-main">
          <h2>{{ project.title }}</h2>
          <p>{{ truncatedDescription(project.description) }}</p>
        </div>
        <div class="project-tags">
          <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="project-tag">{{ tag }}</span>
          <span v-if="project.tags.length > 4" class="more-tags">+{{ project.tags.length - 4 }}</span>
        </div>
        <div class="project-actions">
          <span class="case-study">Case study →</span>
          <a :href="project.link" target="_blank" rel="noopener noreferrer" @click.stop>
            Source ↗
          </a>
        </div>
      </article>
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
        '27': '/projects/msft-ai-research',
        '28': '/projects/social-media-performance-analysis',
        '29': '/projects/search-ad-learning',
        '30': '/projects/stroke-prediction',
        '31': '/projects/better-visualizer'
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
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(6px, 1.5vw, 18px) 0 var(--gap);
  color: var(--body);
}

h1 {
  max-width: 12ch;
  margin: 0;
  font-size: clamp(2.6rem, 4.1vw, 4.4rem);
  line-height: 1;
  font-weight: 480;
  letter-spacing: 0;
}

.work-header {
  padding: clamp(28px, 4vw, 48px) 0 clamp(32px, 4.5vw, 54px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.72fr);
  gap: 18px clamp(48px, 9vw, 132px);
  align-items: end;
  border-bottom: 1px solid var(--hairline);
}

.work-header > .eyebrow {
  grid-column: 1 / -1;
  margin: 0;
}

.work-intro {
  max-width: 46ch;
  margin: 0 0 2px;
  color: var(--body);
  font-size: clamp(1.02rem, 1.25vw, 1.18rem);
  line-height: 1.62;
}

.back-row {
  margin-bottom: 18px;
}

.back-btn {
  border: 1px solid var(--hairline-strong);
  background: transparent;
  color: var(--accent-bright);
  font-family: var(--mono);
  font-size: 0.82rem;
  border-radius: 4px;
  padding: 8px 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
}

.back-btn:hover {
  background: var(--surface);
  border-color: var(--accent);
  transform: translateX(-2px);
}

/* Search + sort */
.filter-container {
  margin: 0;
  padding: 24px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 190px;
  gap: 12px;
  border-bottom: 1px solid var(--hairline);
}

.search-box { position: relative; }

.search-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: var(--muted);
  font-size: 0.85rem;
}

.search-input,
.sort-select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 4px;
  border: 1px solid var(--hairline-strong);
  background: transparent;
  color: var(--ink);
  font-family: var(--sans);
  font-size: 0.95rem;
}

.search-input { padding-left: 40px; padding-right: 36px; }
.search-input::placeholder { color: var(--muted); }

.search-input:focus,
.sort-select:focus {
  outline: none;
  border-color: var(--accent);
}

.clear-btn {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.clear-btn:hover { color: var(--accent-bright); background: var(--surface); }

.loading-state,
.error-state {
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 38px;
  height: 38px;
  margin-bottom: 12px;
  border-radius: 50%;
  border: 2px solid var(--hairline-strong);
  border-top-color: var(--accent);
  animation: spin 0.75s linear infinite;
}

.error-state p {
  max-width: 620px;
  padding: 14px 16px;
  border-radius: 6px;
  border: 1px solid rgba(255, 120, 120, 0.35);
  background: rgba(255, 120, 120, 0.08);
  color: #ffc9c9;
}

.result-count {
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.66rem;
  text-transform: uppercase;
}

.project-list {
  border-top: 1px solid var(--hairline);
}

.project-card {
  position: relative;
  text-align: left;
  min-height: 190px;
  padding: 28px 10px;
  display: grid;
  grid-template-columns: 48px minmax(240px, 1.2fr) minmax(200px, 0.8fr) 118px;
  gap: clamp(16px, 3vw, 42px);
  align-items: start;
  border-bottom: 1px solid var(--hairline);
  background: transparent;
  cursor: pointer;
  transition: background-color 0.25s ease, padding-left 0.25s var(--ease-out);
}

.project-card:hover {
  background: var(--accent-faint);
  padding-left: 18px;
}

.project-index {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.72rem;
}

.project-main h2 {
  margin: 0 0 12px;
  color: var(--ink);
  font-size: clamp(1.6rem, 2.2vw, 2.2rem);
  font-weight: 480;
  line-height: 1;
  letter-spacing: 0;
  transition: color 0.18s ease;
}

.project-card:hover h2 { color: var(--accent-bright); }

.project-main p {
  margin: 0;
  max-width: 55ch;
  color: var(--muted);
  line-height: 1.62;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 2px 0 0;
}

.project-tag,
.more-tags {
  border-radius: 4px;
  padding: 0;
  font-family: var(--mono);
  font-size: 0.68rem;
  border: 0;
  background: transparent;
  color: var(--muted);
  text-transform: uppercase;
}

.more-tags { color: var(--accent-bright); border-color: var(--accent-dim); }

.project-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  white-space: nowrap;
  font-family: var(--mono);
  font-size: 0.72rem;
}

.case-study,
.project-actions a {
  color: var(--accent-bright);
}

.empty-state {
  padding: 40px 12px;
  color: var(--muted);
}

.empty-icon { font-size: 2rem; margin-bottom: 8px; }

.related-content { margin-top: 30px; }

.related-content h2 {
  margin: 0 0 16px;
  font-size: clamp(1.35rem, 2vw, 1.7rem);
  font-weight: 480;
  letter-spacing: -0.02em;
}

.work-container,
.courses-container,
.certs-container { margin-bottom: 26px; }

.bubble-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-bubble {
  border-radius: 4px;
  padding: 6px 11px;
  font-family: var(--mono);
  font-size: 0.8rem;
  border: 1px solid var(--hairline);
  background: var(--surface);
  color: var(--body);
  text-decoration: none;
  transition: color 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.course-bubble {
  cursor: pointer;
  color: var(--accent-bright);
  border-color: var(--accent-dim);
}

.cert-bubble:hover,
.course-bubble:hover {
  border-color: var(--accent);
  color: var(--accent-bright);
  background: var(--accent-dim);
}

.work-position-card {
  width: min(360px, 100%);
  text-align: left;
  border-radius: 6px;
  border: 1px solid var(--hairline);
  background: var(--surface);
  padding: 18px 18px;
}

.work-position-card h3 {
  margin: 0 0 6px;
  color: var(--ink);
  font-size: 1.15rem;
  font-weight: 500;
}

.work-position-card .company,
.work-position-card .duration,
.work-position-card .location {
  margin: 2px 0;
  font-size: 0.9rem;
}

.work-position-card .duration { color: var(--muted); font-family: var(--mono); }
.work-position-card .location { color: var(--muted); }

/* Popup */
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 5, 8, 0.78);
  backdrop-filter: blur(6px);
}

.popup-content {
  position: relative;
  width: min(720px, 100%);
  max-height: min(82vh, 720px);
  overflow-y: auto;
  border-radius: 8px;
  padding: 28px;
  text-align: left;
  border: 1px solid var(--hairline-strong);
  background: var(--surface);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
}

.popup-content h3 { margin: 0 0 10px; color: var(--ink); font-size: 1.4rem; }
.popup-content p { margin: 0; color: var(--body); }

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  border: 1px solid var(--hairline);
  border-radius: 4px;
  background: var(--surface-2);
  color: var(--ink);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease;
}

.close-button:hover { border-color: var(--accent); color: var(--accent-bright); }

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 980px) {
  .project-card {
    grid-template-columns: 36px minmax(0, 1fr) 110px;
  }

  .project-tags { grid-column: 2; }
  .project-actions { grid-column: 3; grid-row: 1 / span 2; }
}

@media (max-width: 640px) {
  .filter-container { grid-template-columns: 1fr; }
  .work-header {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 24px 0 34px;
  }
  .work-header > .eyebrow { grid-column: 1; margin-bottom: 4px; }
  h1 { font-size: clamp(2.35rem, 12vw, 3rem); }
  .work-intro { max-width: 38ch; margin-top: 4px; }
  .project-card {
    min-height: 0;
    grid-template-columns: 28px minmax(0, 1fr);
    padding: 24px 4px;
  }
  .project-main,
  .project-tags,
  .project-actions { grid-column: 2; }
  .project-actions { grid-row: auto; align-items: flex-start; flex-direction: row; }
}
</style>

