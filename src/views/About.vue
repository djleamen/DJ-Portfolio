<template>
  <div class="about-container">
    <header class="page-head">
      <div class="section-marker">
        <span class="title-plate bevel">02</span>
        <p class="eyebrow">Profile</p>
      </div>
      <h1>I like building things with people, for people.</h1>
      <div class="profile-intro">
        <p>
          {{ bio }}
        </p>
        <ul class="profile-note" aria-label="Roles">
          <li class="chip bevel">Developer</li>
          <li class="chip bevel">Researcher</li>
          <li class="chip bevel">Speaker</li>
        </ul>
      </div>
    </header>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <p>Loading profile</p>
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
        :class="['tab-button', 'bevel', { active: activeTab === tab.id }]"
        role="tab"
        :aria-selected="activeTab === tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content bevel panel" role="tabpanel">
      <!-- Education Tab -->
      <div v-if="activeTab === 'education'" class="tab-panel">
        <div class="section-marker">
          <span class="title-plate bevel" aria-hidden="true">{{ String(education.courses.length).padStart(2, '0') }}</span>
          <h2>Education</h2>
        </div>
        <div class="education-card">
          <div class="job-header">
            <div v-if="education.logo && logoUrl(education.logo)" class="job-logo bevel" aria-hidden="true">
              <img :src="logoUrl(education.logo)" :alt="`${education.institution} logo`" />
            </div>
            <div class="job-header-text">
              <p><strong>{{ education.degree }}</strong></p>
              <p>{{ education.institution }}</p>
              <p>{{ education.duration }} - {{ education.location }}</p>
            </div>
          </div>
        </div>
        <p class="eyebrow group-label">Courses I've taken</p>
        <div class="courses-grid">
          <button
            v-for="course in education.courses"
            :key="course.name"
            type="button"
            class="chip bevel"
            @click="openPopup(course.name)"
          >{{ course.name }}</button>
        </div>
        <p class="p2">All course descriptions taken from <a href="https://calendar.ontariotechu.ca" target="_blank" rel="noopener noreferrer">Ontario Tech University Course Calendar</a></p>
      </div>

      <!-- Work Experience Tab -->
      <div v-if="activeTab === 'work'" class="tab-panel">
        <div class="section-marker">
          <span class="title-plate bevel" aria-hidden="true">{{ String(workExperience.length).padStart(2, '0') }}</span>
          <h2>Work Experience</h2>
        </div>
        <div v-for="job in workExperience" :key="job.position" class="job-card">
          <div class="job-header">
            <div v-if="job.logo && logoUrl(job.logo)" class="job-logo bevel" aria-hidden="true">
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
        <div class="section-marker">
          <span class="title-plate bevel" aria-hidden="true">{{ String(certs.length).padStart(2, '0') }}</span>
          <h2>Certifications I've Earned</h2>
        </div>
        <div class="certifications-grid">
          <div v-for="cert in certs" :key="cert.name" class="certification-card">
            <div class="cert-header">
              <h4 class="cert-name">{{ cert.name }}</h4>
              <a v-if="cert.link" :href="cert.link" target="_blank" rel="noopener noreferrer" class="cert-link">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
            <div v-if="cert.skills && cert.skills.length > 0" class="cert-skills">
              <button v-for="skill in cert.skills.slice(0, 5)" :key="skill" type="button" class="skill-tag chip bevel" @click="filterProjects(skill)">
                {{ skill }}
              </button>
              <span v-if="cert.skills.length > 5" class="more-skills">+{{ cert.skills.length - 5 }} more</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Tab -->
      <div v-if="activeTab === 'skills'" class="tab-panel">
        <div class="section-marker">
          <span class="title-plate bevel" aria-hidden="true">{{ String(filteredSkills.length).padStart(2, '0') }}</span>
          <h2>Skills</h2>
        </div>
        <p class="hint">Psst.. try clicking on a skill bubble!</p>
        <div class="filter-container">
          <label for="skill-filter" class="eyebrow">Filter by type</label>
          <span class="select-wrap"><select id="skill-filter" class="field bevel" v-model="selectedType" @change="filterSkills">
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
          </select></span>
        </div>
        <div class="skills-section">
          <div class="skills-container">
            <button type="button" class="skill-bubble chip bevel" @click="filterProjects(skill)" v-for="skill in filteredSkills" :key="skill">{{ skill }}</button>
          </div>
        </div>
      </div>
    </div>

      <!-- Course details popup -->
      <div v-if="activeCourse" class="popup-overlay" @click="closePopup">
        <div class="popup-content bevel" role="dialog" aria-modal="true" @click.stop>
          <button class="close-button bevel" type="button" aria-label="Close course details" @click="closePopup">&times;</button>
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
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 18px clamp(32px, 7vw, 96px);
  align-items: end;
}

.page-head .section-marker { grid-column: 1 / -1; }

h1 {
  max-width: 17ch;
  margin: 0;
  font-size: clamp(3.3rem, 6.4vw, 6.2rem);
  line-height: 0.9;
  text-wrap: balance;
}

p {
  margin: 0 0 14px;
  max-width: 68ch;
  font-size: 1.04rem;
  line-height: 1.62;
  color: var(--body);
}

.about-container .eyebrow {
  margin: 0;
  font-size: 0.8rem;
  line-height: inherit;
}

.about-container .group-label { margin: 26px 0 12px; }

.profile-intro > p {
  font-size: clamp(1.04rem, 1.25vw, 1.18rem);
  line-height: 1.6;
}

.profile-note {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.p2 {
  margin: 20px 0 0;
  font-size: 0.94rem;
  color: var(--muted);
}

h2 {
  margin: 0;
  font-size: 1.9rem;
  line-height: 1;
}

/* Tabs — a row of plates; the current one is filled */
.tab-container {
  position: sticky;
  top: var(--nav-h);
  z-index: 20;
  margin: 0 0 12px;
  padding: 12px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background: var(--bg);
}

.tab-button {
  --cut: 8px;
  min-height: 42px;
  padding: 8px 18px;
  color: var(--body);
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease;
}

.tab-button:hover {
  --stroke: var(--hairline-strong);
  color: var(--ink);
}

.tab-button.active {
  --plate: var(--fill);
  --stroke: var(--hairline-strong);
  color: var(--on-fill);
  font-weight: 600;
}

.tab-panel {
  min-height: 380px;
  animation: fadeIn 0.3s ease;
}

/* Ruled rows */
.education-card,
.job-card {
  padding: 22px 0;
  border-bottom: 1px solid var(--hairline);
}

.job-card:last-child {
  padding-bottom: 4px;
  border-bottom: 0;
}

.education-card p {
  margin: 2px 0;
}

.education-card strong {
  color: var(--ink);
  font-size: 1.12rem;
  font-weight: 600;
}

.job-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.job-card .job-header { margin-bottom: 12px; }

/* Logos keep a white ground in both schemes so brand marks stay legible */
.job-logo {
  --cut: 8px;
  --plate: #ffffff;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
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
  margin: 0 0 4px;
  font-size: 1.9rem;
  line-height: 1;
}

.company-name {
  margin: 0;
  color: var(--ink);
  font-weight: 500;
}

.job-duration {
  margin: 4px 0 0;
  color: var(--body);
  font-family: var(--mono);
  font-size: 0.86rem;
}

.job-description {
  margin: 0;
}

.hint {
  margin: 14px 0 18px;
}

.filter-container {
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.select-wrap {
  position: relative;
  min-width: 230px;
}

.select-wrap select {
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

.skills-container,
.cert-skills,
.courses-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.courses-grid .chip {
  text-align: left;
}

.certifications-grid {
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(20px, 4vw, 48px);
}

.certification-card {
  padding: 18px 0;
  border-bottom: 1px solid var(--hairline);
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}

.cert-name {
  margin: 0;
  color: var(--ink);
  font-family: var(--sans);
  font-size: 1.06rem;
  font-weight: 500;
  line-height: 1.3;
}

.cert-link {
  color: var(--muted);
}

.cert-link:hover {
  color: var(--accent);
}

.cert-skills .chip {
  min-height: 28px;
  padding: 4px 11px;
  font-size: 0.86rem;
}

.more-skills {
  align-self: center;
  padding-left: 4px;
  color: var(--body);
  font-family: var(--mono);
  font-size: 0.8rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 860px) {
  .page-head { grid-template-columns: 1fr; }
  .certifications-grid { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .tab-container {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-inline: calc(var(--page-gutter) * -1);
    padding-inline: var(--page-gutter);
  }

  .tab-button { flex: 0 0 auto; }
  .filter-container { flex-direction: column; align-items: stretch; }
  .job-title { font-size: 1.7rem; }
}
</style>
