<template>
  <div class="projects-container">
    <div v-if="selectedSkill" class="back-row">
      <button @click="goBack" class="back-btn chip bevel" aria-label="Back to About">
        <span aria-hidden="true">←</span> Back to About
      </button>
    </div>
    <header class="page-head">
      <div class="section-marker">
        <span class="title-plate bevel">03</span>
        <p class="eyebrow">Work</p>
      </div>
      <h1>{{ headerTitle }}</h1>
      <p v-if="!selectedSkill" class="page-intro">
        Products, prototypes, research, and experiments across intelligent systems,
        cloud infrastructure, and full-stack engineering.
      </p>
    </header>
    
    <div v-if="loading" class="loading-state">
      <p>Loading projects</p>
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
          class="search-input field bevel" 
          aria-label="Search projects"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn" aria-label="Clear search">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <span class="select-wrap"><select v-model="sortOption" class="sort-select field bevel" aria-label="Sort projects">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select></span>
    </div>
    
    <div v-if="!loading && !error && filteredProjects.length > 0" class="result-count">
      <span>{{ String(displayedProjects.length).padStart(2, '0') }} entries</span>
      <span>Case study / source</span>
    </div>

    <transition-group name="fade" tag="div" class="project-list bevel panel" v-if="filteredProjects.length > 0">
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
          <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="project-tag chip bevel">{{ tag }}</span>
          <span v-if="project.tags.length > 4" class="more-tags">+{{ project.tags.length - 4 }}</span>
        </div>
        <div class="project-actions">
          <span class="case-study">Case study <span aria-hidden="true">→</span></span>
          <a :href="project.link" target="_blank" rel="noopener noreferrer" @click.stop>
            Source <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </transition-group>
    
    <div v-if="!loading && !error && filteredProjects.length === 0" class="empty-state bevel panel">
      <h3>No projects found</h3>
      <p v-if="!selectedSkill">Nothing matches “{{ searchQuery }}”. Try a shorter search.</p>
      <p v-else>No projects use {{ selectedSkill }} yet.</p>
    </div>

    <div v-if="selectedSkill" class="related-content">
      <div v-if="filteredWorkPositions.length > 0">
        <h2>Positions where {{ selectedSkill }} was used</h2>
        <div class="work-container">
          <transition-group name="list" tag="div" class="bubble-container">
            <div v-for="position in filteredWorkPositions" :key="`${position.position}-${position.company}`" 
                 class="work-position-card bevel">
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
            <button v-for="course in filteredCourses" :key="course.name" type="button" class="skill-bubble course-bubble chip bevel" @click="openCoursePopup(course)">{{ course.name }}</button>
          </transition-group>
        </div>
      </div>
      
      <div v-if="filteredCerts.length > 0">
        <h2>Certifications using {{ selectedSkill }}</h2>
        <div class="certs-container">
          <transition-group name="list" tag="div" class="bubble-container">
            <a v-for="cert in filteredCerts" :key="cert.name" :href="cert.link" target="_blank" rel="noopener noreferrer" 
               class="skill-bubble cert-bubble chip bevel">
              {{ cert.name }}
            </a>
          </transition-group>
        </div>
      </div>
    </div>
    
    <!-- Move popup outside the container to avoid positioning constraints -->
    <teleport to="body">
      <div v-if="activeCourse" class="popup-overlay" @click="closeCoursePopup">
        <div class="popup-content bevel" role="dialog" aria-modal="true" @click.stop>
          <button class="close-button bevel" type="button" aria-label="Close course details" @click="closeCoursePopup">&times;</button>
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
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 var(--gap);
  color: var(--body);
}

.section-marker {
  display: flex;
  align-items: center;
  gap: 14px;
}

.page-head {
  padding: clamp(14px, 2.4vw, 28px) 0 clamp(26px, 3.6vw, 40px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.7fr);
  gap: 18px clamp(32px, 7vw, 96px);
  align-items: end;
}

.page-head .section-marker { grid-column: 1 / -1; }

h1 {
  max-width: 16ch;
  margin: 0;
  font-size: clamp(3.3rem, 6.4vw, 6.2rem);
  line-height: 0.9;
  text-wrap: balance;
}

.page-intro {
  max-width: 46ch;
  margin: 0 0 6px;
  color: var(--body);
  font-size: clamp(1.04rem, 1.25vw, 1.18rem);
  line-height: 1.6;
}

.back-row {
  margin: 8px 0 6px;
}

/* Search + sort */
.filter-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  gap: 8px;
}

.search-box,
.select-wrap { position: relative; }

.search-icon {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: var(--muted);
  font-size: 0.86rem;
  pointer-events: none;
}

.search-input { padding-left: 42px; padding-right: 40px; }

.sort-select {
  appearance: none;
  padding-right: 40px;
  cursor: pointer;
}

.select-wrap::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 16px;
  width: 8px;
  height: 8px;
  border: solid var(--body);
  border-width: 0 1.5px 1.5px 0;
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
}

.clear-btn {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.clear-btn:hover { color: var(--accent); }

.result-count {
  padding: 22px 2px 10px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: var(--body);
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.project-list {
  padding-block: 6px;
}

.project-card {
  text-align: left;
  padding: 24px 0;
  display: grid;
  grid-template-columns: 40px minmax(240px, 1.15fr) minmax(200px, 0.85fr) 110px;
  gap: clamp(14px, 2.4vw, 32px);
  align-items: start;
  border-bottom: 1px solid var(--hairline);
  cursor: pointer;
}

.project-card:last-child { border-bottom: 0; }

.project-index {
  padding-top: 7px;
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 500;
}

.project-main h2 {
  margin: 0 0 8px;
  font-size: clamp(1.9rem, 2.6vw, 2.3rem);
  line-height: 1;
  transition: color 0.15s ease;
}

.project-card:hover h2,
.project-card:focus-visible h2 { color: var(--accent); }

.project-main p {
  margin: 0;
  max-width: 55ch;
  color: var(--body);
  line-height: 1.55;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-top: 4px;
}

.project-tags .chip {
  min-height: 28px;
  padding: 4px 11px;
  font-size: 0.86rem;
}

.more-tags {
  padding-left: 4px;
  color: var(--body);
  font-family: var(--mono);
  font-size: 0.8rem;
}

.project-actions {
  padding-top: 7px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  white-space: nowrap;
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 500;
}

.case-study { color: var(--ink); }
.case-study span { color: var(--accent); }
.project-actions a { color: var(--body); }
.project-actions a:hover { color: var(--accent); }

.empty-state {
  margin-top: 12px;
}

.empty-state h3 {
  margin: 0 0 6px;
  font-size: 1.9rem;
  line-height: 1;
}

.empty-state p { margin: 0; }

.related-content { margin-top: 34px; }

.related-content h2 {
  margin: 0 0 14px;
  font-size: 1.9rem;
  line-height: 1;
}

.work-container,
.courses-container,
.certs-container { margin-bottom: 30px; }

.bubble-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.work-position-card {
  --cut: 10px;
  width: min(360px, 100%);
  text-align: left;
  padding: 18px 20px;
}

.work-position-card h3 {
  margin: 0 0 6px;
  font-size: 1.6rem;
  line-height: 1;
}

.work-position-card p {
  margin: 2px 0;
  font-size: 0.96rem;
}

.work-position-card .company { color: var(--ink); font-weight: 500; }
.work-position-card .duration { font-family: var(--mono); font-size: 0.86rem; }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

@media (max-width: 980px) {
  .project-card {
    grid-template-columns: 34px minmax(0, 1fr) 110px;
  }

  .project-tags { grid-column: 2; }
  .project-actions { grid-column: 3; grid-row: 1 / span 2; }
}

@media (max-width: 640px) {
  .page-head { grid-template-columns: 1fr; }
  .filter-container { grid-template-columns: 1fr; }
  .project-card {
    grid-template-columns: 28px minmax(0, 1fr);
    padding: 20px 0;
  }
  .project-main,
  .project-tags,
  .project-actions { grid-column: 2; }
  .project-actions { grid-row: auto; align-items: flex-start; flex-direction: row; gap: 18px; }
}
</style>
