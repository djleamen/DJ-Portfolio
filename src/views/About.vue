<template>
  <div class="about-container">
    <header class="profile-hero">
      <div class="profile-heading">
        <p class="eyebrow">Profile / 02</p>
        <h1>I like building things with people, for people.</h1>
      </div>
      <div class="profile-intro">
        <p>
          {{ bio }}
        </p>
        <p class="profile-note">Developer · Researcher · Speaker</p>
      </div>
    </header>
    
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
      <!-- Tab Navigation -->
    <div class="tab-container" role="tablist" aria-label="Profile details">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        role="tab"
        :aria-selected="activeTab === tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content" role="tabpanel">
      <!-- Education Tab -->
      <div v-if="activeTab === 'education'" class="tab-panel">
        <h2>Education</h2>
        <div class="education-card">
          <div class="job-header">
            <div v-if="education.logo && logoUrl(education.logo)" class="job-logo" aria-hidden="true">
              <img :src="logoUrl(education.logo)" :alt="`${education.institution} logo`" />
            </div>
            <div class="job-header-text">
              <p><strong>{{ education.degree }}</strong></p>
              <p>{{ education.institution }}</p>
              <p>{{ education.duration }} - {{ education.location }}</p>
            </div>
          </div>
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
          <div class="job-header">
            <div v-if="job.logo && logoUrl(job.logo)" class="job-logo" aria-hidden="true">
              <img :src="logoUrl(job.logo)" :alt="`${job.company} logo`" />
            </div>
            <div class="job-header-text">
              <h3 class="job-title">{{ job.position }}</h3>
              <p class="company-name">{{ job.company }} - {{ job.location }}</p>
              <p class="job-duration">{{ job.duration }}</p>
            </div>
          </div>
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
        <p>Psst.. try clicking on a skill bubble!</p>
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
    </template>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '../services/api';

const logoModules = import.meta.glob('@/assets/*.{png,jpg,jpeg,svg,webp}', { eager: true, query: '?url', import: 'default' });
const logoIndex = Object.fromEntries(
  Object.entries(logoModules).map(([key, url]) => [key.split('/').pop(), url])
);
function logoUrl(filename) {
  return logoIndex[filename] || '';
}

const bio = "I’m focused on software development, AI, cloud computing, and system optimization. I learn best by building, sharing the work, and talking with the people a system is meant to help.";

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
  max-width: 1160px;
  margin: 0 auto;
  padding: clamp(10px, 3vw, 38px) 0 var(--gap);
  color: var(--body);
}

.profile-hero {
  padding: clamp(36px, 5vw, 64px) 0;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
  gap: clamp(36px, 9vw, 140px);
  align-items: end;
  border-bottom: 1px solid var(--hairline);
}

.profile-heading .eyebrow { margin: 0 0 24px; }

h1 {
  max-width: 11ch;
  margin: 0;
  font-size: clamp(2.6rem, 4.1vw, 4.4rem);
  line-height: 0.94;
  font-weight: 480;
  letter-spacing: 0;
  text-wrap: balance;
}

p {
  margin: 0 0 16px;
  max-width: 64ch;
  font-size: clamp(1.02rem, 1.2vw, 1.14rem);
  line-height: 1.72;
  color: var(--body);
}

.profile-intro > p:first-child {
  font-size: clamp(1.08rem, 1.4vw, 1.28rem);
  line-height: 1.65;
}

.profile-note {
  margin-top: 10px;
  color: var(--accent-bright);
  font-family: var(--mono);
  font-size: 0.8rem;
  text-transform: uppercase;
}

.p2 {
  margin-top: 18px;
  font-size: 0.96rem;
  color: var(--muted);
}

h2 {
  margin: 0 0 18px;
  font-size: clamp(1.45rem, 2.2vw, 1.8rem);
  font-weight: 480;
  letter-spacing: 0;
}

h3 {
  margin: 22px 0 12px;
  font-size: 1.3rem;
  font-weight: 500;
}

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
  margin-bottom: 14px;
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

/* Tabs — editorial underline row, not a filled pill bar */
.tab-container {
  position: sticky;
  top: 78px;
  z-index: 20;
  margin: 0 0 clamp(38px, 6vw, 68px);
  padding-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: clamp(18px, 3vw, 38px);
  border-bottom: 1px solid var(--hairline);
  background: rgba(10, 12, 17, 0.94);
  backdrop-filter: blur(12px);
}

.tab-button {
  position: relative;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-family: var(--sans);
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0 0 14px;
  cursor: pointer;
  transition: color 0.18s ease;
}

.tab-button::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  background: var(--accent);
  transition: transform 0.2s ease;
}

.tab-button:hover {
  color: var(--ink);
}

.tab-button.active {
  color: var(--ink);
}

.tab-button.active::after {
  transform: scaleX(1);
}

.tab-panel {
  min-height: 420px;
  animation: fadeIn 0.3s ease;
}

/* Cards — flat, hairline, restrained */
.education-card,
.job-card {
  max-width: 900px;
  margin: 0 0 16px;
  padding: 24px 0 28px;
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid var(--hairline);
  background: transparent;
}

.education-card p {
  margin: 4px 0;
}

.job-card {
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.job-card:hover {
  border-color: var(--accent);
  transform: translateX(6px);
}

.job-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 12px;
}

.job-logo {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4px;
  box-sizing: border-box;
}

.job-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.job-header-text {
  flex: 1;
  min-width: 0;
}

.job-title {
  margin: 0 0 6px;
  color: var(--ink);
  font-size: 1.5rem;
  font-weight: 500;
}

.company-name {
  margin: 0;
  color: var(--body);
  font-size: 1.05rem;
}

.job-duration {
  margin: 4px 0 0;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.85rem;
}

.job-description {
  margin: 0;
  font-size: 1rem;
}

.filter-container {
  max-width: 760px;
  margin: 0 0 22px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-container label {
  color: var(--body);
  font-size: 0.95rem;
}

.filter-container select {
  min-width: 210px;
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid var(--hairline-strong);
  background: var(--bg-2);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 0.95rem;
}

.filter-container select:focus {
  outline: none;
  border-color: var(--accent);
}

.skills-container,
.cert-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skills-container {
  max-width: 880px;
  margin: 0 0 24px;
}

.skill-bubble,
.cert-skills .skill-tag,
.more-skills {
  border-radius: 4px;
  padding: 6px 11px;
  font-family: var(--mono);
  font-size: 0.8rem;
  border: 1px solid var(--hairline);
  background: var(--surface);
  color: var(--body);
}

.skill-bubble {
  cursor: pointer;
  transition: color 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.skill-bubble:hover,
.cert-skills .skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent-bright);
  background: var(--accent-dim);
}

.courses-grid,
.certifications-grid {
  max-width: 1050px;
  margin: 0 0 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.course-card,
.certification-card {
  padding: 16px 0;
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid var(--hairline);
  background: transparent;
  transition: border-color 0.18s ease;
}

.course-card:hover,
.certification-card:hover {
  border-color: var(--hairline-strong);
}

.certification-card {
  text-align: left;
}

.course-name {
  margin: 0;
  color: var(--accent-bright);
  font-family: var(--sans);
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.34;
  cursor: pointer;
  transition: color 0.18s ease;
}

.course-name:hover {
  color: #a9cdff;
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
  color: var(--ink);
  font-family: var(--sans);
  font-size: 0.94rem;
  font-weight: 500;
  line-height: 1.3;
}

.cert-link {
  color: var(--muted);
}

.cert-link:hover {
  color: var(--accent-bright);
}

.more-skills {
  color: var(--accent-bright);
}

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

.popup-content h3 {
  margin: 0 0 10px;
  color: var(--ink);
  font-size: 1.4rem;
}

.popup-content p {
  margin: 0;
  color: var(--body);
}

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

.close-button:hover {
  border-color: var(--accent);
  color: var(--accent-bright);
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

@media (max-width: 860px) {
  .profile-hero {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  .courses-grid,
  .certifications-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .profile-hero { padding-top: 18px; }
  .tab-container {
    top: 78px;
    gap: 18px;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  .tab-button { flex: 0 0 auto; }
  .courses-grid,
  .certifications-grid { grid-template-columns: 1fr; }
  .filter-container { flex-direction: column; align-items: stretch; }
  .filter-container select { width: 100%; }
}
</style>

