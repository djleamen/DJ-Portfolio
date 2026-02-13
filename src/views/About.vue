<template>
  <div class="about-container">
    <h1>About Me</h1>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading profile...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <!-- Main Content -->
    <template v-else>
      <p>I'm a Computer Science student at Ontario Tech University with a passion for learning new technologies and building innovative projects. My interests include: full-stack software development, AI, and cloud computing.
        See below and click for more details about my skills, education, and courses I've taken.
      </p>

      <!-- Tab Navigation -->
    <div class="tab-container">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Education Tab -->
      <div v-if="activeTab === 'education'" class="tab-panel">
        <h2>Education</h2>
        <div class="education-card">
          <p><strong>{{ education.degree }}</strong></p>
          <p>{{ education.institution }}</p>
          <p>{{ education.duration }} - {{ education.location }}</p>
        </div>
        <h3>Courses I've Taken</h3>
        <div class="courses-grid">
          <div v-for="course in education.courses" :key="course.name" class="course-card">
            <div class="course-header">
              <h4 class="course-name" @click="openPopup(course.name)">{{ course.name }}</h4>
            </div>
          </div>
        </div>
        <p class="p2">All course descriptions taken from <a href="https://calendar.ontariotechu.ca" target="_blank" rel="noopener noreferrer">Ontario Tech University Course Calendar</a></p>
      </div>

      <!-- Work Experience Tab -->
      <div v-if="activeTab === 'work'" class="tab-panel">
        <h2>Work Experience</h2>
        <div v-for="job in workExperience" :key="job.position" class="job-card">
          <h3 class="job-title">{{ job.position }}</h3>
          <p class="company-name">{{ job.company }} - {{ job.location }}</p>
          <p class="job-duration">{{ job.duration }}</p>
          <p class="job-description">{{ job.description }}</p>
        </div>
      </div>

      <!-- Certifications Tab -->
      <div v-if="activeTab === 'certifications'" class="tab-panel">
        <h2>Certifications I've Earned</h2>
        <div class="certifications-grid">
          <div v-for="cert in certs" :key="cert.name" class="certification-card">
            <div class="cert-header">
              <h4 class="cert-name">{{ cert.name }}</h4>
              <a v-if="cert.link" :href="cert.link" target="_blank" rel="noopener noreferrer" class="cert-link">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
            <div v-if="cert.skills && cert.skills.length > 0" class="cert-skills">
              <span v-for="skill in cert.skills.slice(0, 5)" :key="skill" class="skill-tag" @click="filterProjects(skill)">
                {{ skill }}
              </span>
              <span v-if="cert.skills.length > 5" class="more-skills">+{{ cert.skills.length - 5 }} more</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Tab -->
      <div v-if="activeTab === 'skills'" class="tab-panel">
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
      </div>
    </div>

      <!-- Course details popup -->
      <div v-if="activeCourse" class="popup-overlay" @click="closePopup">
        <div class="popup-content" @click.stop>
          <button class="close-button" @click="closePopup">&times;</button>
          <h3>{{ activeCourse.name }}</h3>
          <p>{{ activeCourse.description }}</p>
        </div>
      </div>
      <p class="p2">{{ bio }}</p>
    </template>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '../services/api';

const bio = "DJ is experienced in software development, data analysis, cybersecurity, NLP, cloud computing, and system optimization. She is a strong collaborator with a proven track record in research, public speaking, operational improvements, peer mentoring, and delivering impactful projects in fast-paced environments. She is passionate about innovation and driving team success.";

const education = reactive({ courses: [] });
const certs = ref([]);
const workExperience = ref([]);
const skillsData = ref({});
const skills = ref([]);
const languages = ref([]);
const frameworks = ref([]);
const ml_ai = ref([]);
const cloud = ref([]);
const databases = ref([]);
const ides = ref([]);
const platformstools = ref([]);
const devTools = ref([]);
const methodologies = ref([]);
const coreConcepts = ref([]);
const soft = ref([]);

const loading = ref(true);
const error = ref(null);

const activeCourse = ref(null);
const router = useRouter();

const selectedType = ref('all');
const filteredSkills = ref([]);
const activeTab = ref('work');

// Load data from API
onMounted(async () => {
  try {
    // Fetch all data in parallel
    const [coursesData, certsData, workData, skillsDataResponse] = await Promise.all([
      apiService.getCourses(),
      apiService.getCerts(),
      apiService.getWork(),
      apiService.getSkills()
    ]);

    // Set education (from courses endpoint which now contains education details)
    if (coursesData.length > 0) {
      Object.assign(education, coursesData[0]);
    }

    // Set certifications and sort alphabetically
    certs.value = certsData.sort((a, b) => a.name.localeCompare(b.name));

    // Set work experience
    workExperience.value = workData;

    // Set skills
    skillsData.value = skillsDataResponse;
    skills.value = skillsDataResponse.skills || [];
    languages.value = skillsDataResponse.languages || [];
    frameworks.value = skillsDataResponse.frameworks || [];
    ml_ai.value = skillsDataResponse.ml_ai || [];
    cloud.value = skillsDataResponse.cloud || [];
    databases.value = skillsDataResponse.databases || [];
    ides.value = skillsDataResponse.ides || [];
    platformstools.value = skillsDataResponse.platformstools || [];
    devTools.value = skillsDataResponse.devTools || [];
    methodologies.value = skillsDataResponse.methodologies || [];
    coreConcepts.value = skillsDataResponse.coreConcepts || [];
    soft.value = skillsDataResponse.soft || [];
    filteredSkills.value = skills.value;

    loading.value = false;
  } catch (err) {
    console.error('Failed to load data:', err);
    error.value = 'Failed to load data. Please try again later.';
    loading.value = false;
  }
});

const tabs = [
  { id: 'work', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' }
];

function openPopup(courseName) {
  activeCourse.value = education.courses.find(course => course.name === courseName);
  document.body.classList.add('no-scroll');
}

function closePopup() {
  activeCourse.value = null;
  document.body.classList.remove('no-scroll');
}

function filterProjects(skill) {
  router.push({ path: '/projects', query: { skill } });
}

function filterSkills() {
  switch (selectedType.value) {
    case 'languages':
      filteredSkills.value = languages.value;
      break;
    case 'frameworks':
      filteredSkills.value = frameworks.value;
      break;
    case 'ml_ai':
      filteredSkills.value = ml_ai.value;
      break;
    case 'cloud':
      filteredSkills.value = cloud.value;
      break;
    case 'databases':
      filteredSkills.value = databases.value;
      break;
    case 'ides':
      filteredSkills.value = ides.value;
      break;
    case 'platformstools':
      filteredSkills.value = platformstools.value;
      break;
    case 'devTools':
      filteredSkills.value = devTools.value;
      break;
    case 'methodologies':
      filteredSkills.value = methodologies.value;
      break;
    case 'coreConcepts':
      filteredSkills.value = coreConcepts.value;
      break;
    case 'soft':
      filteredSkills.value = soft.value;
      break;
    default:
      filteredSkills.value = skills.value;
  }
}
</script>

<style scoped>
.about-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(34px, 4.8vw, 62px) 16px clamp(40px, 6vw, 72px);
  text-align: center;
  color: #eef4ff;
}

h1 {
  margin: 0 0 clamp(16px, 2.2vw, 24px);
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.01em;
  background: linear-gradient(90deg, #70e2ff, #44bff5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

p {
  margin: 0 auto 16px;
  max-width: 860px;
  font-size: 1.08rem;
  line-height: 1.72;
  color: rgba(230, 240, 255, 0.92);
}

.p2 {
  margin-top: 14px;
  font-size: 0.92rem;
  color: rgba(214, 228, 255, 0.74);
}

h2 {
  margin: 8px 0 16px;
  font-size: clamp(1.5rem, 3.2vw, 2.3rem);
  color: #7ee8ff;
}

h3 {
  margin: 18px 0 12px;
  font-size: 1.45rem;
  color: #f5f9ff;
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
  margin-bottom: 14px;
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

.tab-container {
  max-width: 720px;
  margin: 28px auto 24px;
  padding: 6px;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
  background: rgba(22, 29, 65, 0.75);
  border: 1px solid rgba(130, 168, 255, 0.22);
  box-shadow: 0 12px 28px rgba(7, 12, 36, 0.34);
}

.tab-button {
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: rgba(214, 228, 255, 0.75);
  font-size: 0.98rem;
  font-weight: 600;
  padding: 12px 14px;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.tab-button:hover {
  color: #dff5ff;
  background: rgba(98, 213, 255, 0.12);
}

.tab-button.active {
  color: #92f0ff;
  background: rgba(98, 213, 255, 0.22);
  box-shadow: inset 0 0 0 1px rgba(126, 232, 255, 0.4);
}

.tab-content {
  width: 100%;
}

.tab-panel {
  animation: fadeIn 0.28s ease;
}

.education-card,
.job-card,
.filter-container,
.course-card,
.certification-card {
  border-radius: 18px;
  border: 1px solid rgba(130, 168, 255, 0.22);
  background:
    radial-gradient(circle at 12% 12%, rgba(98, 213, 255, 0.1), transparent 38%),
    linear-gradient(150deg, rgba(27, 33, 70, 0.86), rgba(17, 22, 52, 0.88));
  box-shadow: 0 16px 34px rgba(7, 12, 36, 0.3);
}

.education-card {
  max-width: 740px;
  margin: 0 auto 22px;
  padding: 22px 24px;
}

.education-card p {
  margin: 4px 0;
}

.job-card {
  max-width: 760px;
  margin: 0 auto 16px;
  padding: 20px 22px;
  text-align: center;
}

.job-title {
  margin: 0 0 8px;
  color: #7ee8ff;
  font-size: 1.95rem;
}

.company-name {
  margin: 0;
  color: #eef4ff;
  font-size: 1.18rem;
}

.job-duration {
  margin: 4px 0 10px;
  color: rgba(214, 228, 255, 0.74);
  font-style: italic;
}

.job-description {
  margin: 0;
  font-size: 1.03rem;
}

.filter-container {
  max-width: 760px;
  margin: 0 auto 20px;
  padding: 16px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.filter-container label {
  color: rgba(227, 239, 255, 0.86);
  font-weight: 600;
}

.filter-container select {
  min-width: 210px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(130, 168, 255, 0.35);
  background: rgba(15, 20, 47, 0.9);
  color: #eef4ff;
  font-size: 0.98rem;
}

.filter-container select:focus {
  outline: none;
  border-color: rgba(126, 232, 255, 0.65);
  box-shadow: 0 0 0 3px rgba(126, 232, 255, 0.2);
}

.skills-section,
.skills-container {
  width: 100%;
}

.skills-container,
.cert-skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.skills-container {
  max-width: 960px;
  margin: 0 auto 24px;
}

.skill-bubble,
.cert-skills .skill-tag,
.more-skills {
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 0.84rem;
  border: 1px solid rgba(126, 232, 255, 0.22);
  background: rgba(67, 95, 164, 0.48);
  color: #e5f3ff;
}

.skill-bubble {
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.skill-bubble:hover,
.cert-skills .skill-tag:hover {
  transform: translateY(-1px);
  border-color: rgba(126, 232, 255, 0.52);
}

.courses-grid {
  max-width: 960px;
  margin: 0 auto 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.course-card {
  padding: 12px;
}

.course-header {
  display: flex;
  align-items: center;
}

.course-name {
  margin: 0;
  width: 100%;
  color: #90efff;
  font-size: 0.93rem;
  line-height: 1.32;
  cursor: pointer;
  transition: color 0.2s ease;
}

.course-name:hover {
  color: #d6f8ff;
}

.certifications-grid {
  max-width: 960px;
  margin: 0 auto 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.certification-card {
  padding: 14px;
  text-align: left;
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
}

.cert-name {
  margin: 0;
  color: #90efff;
  font-size: 0.94rem;
  line-height: 1.3;
}

.cert-link {
  color: rgba(214, 228, 255, 0.66);
  text-decoration: none;
}

.cert-link:hover {
  color: #c8f8ff;
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .tab-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .courses-grid,
  .certifications-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .about-container {
    padding: 24px 10px 36px;
  }

  p {
    font-size: 1rem;
  }

  .tab-container {
    grid-template-columns: 1fr;
  }

  .tab-button {
    font-size: 0.92rem;
  }

  .courses-grid,
  .certifications-grid {
    grid-template-columns: 1fr;
  }

  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-container select {
    width: 100%;
  }

  .job-title {
    font-size: 1.7rem;
  }

  .company-name {
    font-size: 1.05rem;
  }
}
</style>
