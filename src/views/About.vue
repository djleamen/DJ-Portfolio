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
        <p2>All course descriptions taken from <a href="https://calendar.ontariotechu.ca" target="_blank" rel="noopener noreferrer">Ontario Tech University Course Calendar</a></p2>
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
      <p2>{{ bio }}</p2>
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
  text-align: center;
  padding: 20px 30px;
  color: white;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 60px 20px;
  color: white;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(97, 218, 251, 0.2);
  border-top-color: #61dafb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.error-state p {
  font-size: 1.1rem;
  color: #ff6b6b;
  background-color: rgba(255, 107, 107, 0.1);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

ul {
  list-style-type: none;
  padding: 0;
  color: #f8f8ff;
}

li {
  margin: 10px 0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

li:hover {
  transform: translateX(5px);
}

p {
  margin: 20px 0;
  line-height: 1.7;
  max-width: 800px;
  font-size: 1.1rem;
}

.p2 {
  margin: 15px 0;
  font-style: italic;
  display: block;
  opacity: 0.8;
  font-size: 0.9rem;
  margin-top: 20px;
}

.p2:last-of-type {
  margin-bottom: 40px;
}

h1 {
  font-size: 2.8rem;
  font-weight: bold;
  background: linear-gradient(to right, #4fa3d1, #2575fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 2rem;
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #61dafb;
}

h3 {
  font-size: 1.5rem;
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: 600;
}

.skills-section {
  text-align: center;
  width: 100%;
  max-width: 900px;
  margin: 30px auto;
}

.education-card {
  background-color: rgba(26, 26, 46, 0.6);
  padding: 25px;
  border-radius: 20px;
  max-width: 600px;
  margin: 20px auto 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.education-card p {
  margin: 5px 0;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 15px 0;
  max-width: 900px;
  margin: 0 auto 30px;
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
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

.skill-bubble:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 12px rgba(0,0,0,0.3);
  background-color: #3a4d76;
}

.course-card {
  background-color: rgba(26, 26, 46, 0.6);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

.course-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(97, 218, 251, 0.3);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.course-name {
  font-size: 0.95rem;
  color: #61dafb;
  margin: 0;
  flex: 1;
  line-height: 1.2;
  cursor: pointer;
  transition: color 0.3s ease;
}

.course-name:hover {
  color: #4fa3d1;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.popup-content {
  max-width: 800px;
  width: 90%;
  background: white;
  color: #0d1b2a;
  padding: 40px;
  border-radius: 20px;
  text-align: left;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: auto;
  max-height: 80vh;
}

.popup-content h3 {
  margin-top: 0;
  color: #2a3d66;
  font-size: 1.8rem;
}

.popup-content p {
  color: #333;
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
}

.close-button:hover {
  background-color: rgba(0,0,0,0.1);
  transform: none;
  box-shadow: none;
}

.filter-container {
  margin: 30px auto;
  text-align: center;
  background-color: rgba(26, 26, 46, 0.6);
  padding: 20px 30px;
  border-radius: 20px;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.filter-container label {
  margin-right: 15px;
  font-weight: 500;
  font-size: 1.1rem;
}

.filter-container select {
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid rgba(42, 61, 102, 0.5);
  background-color: rgba(26, 26, 46, 0.8);
  color: white;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
  min-width: 200px;
}

.filter-container select:hover {
  background-color: rgba(42, 61, 102, 0.9);
}

.filter-container select:focus {
  border-color: #4fa3d1;
  box-shadow: 0 0 0 3px rgba(79, 163, 209, 0.3);
}

.no-scroll {
  overflow: hidden;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 20px auto 30px;
  max-width: 900px;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
  margin: 20px auto 40px;
  max-width: 900px;
}

.certification-card {
  background-color: rgba(26, 26, 46, 0.6);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

.certification-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(97, 218, 251, 0.3);
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.cert-name {
  font-size: 0.95rem;
  color: #61dafb;
  margin: 0;
  flex: 1;
  padding-right: 8px;
  line-height: 1.2;
}

.cert-link {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  transition: color 0.3s ease;
  text-decoration: none;
  flex-shrink: 0;
}

.cert-link:hover {
  color: #61dafb;
}

.cert-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cert-skills .skill-tag {
  background-color: rgba(42, 61, 102, 0.7);
  color: rgba(255, 255, 255, 0.9);
  padding: 3px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.cert-skills .skill-tag:hover {
  background-color: #61dafb;
  color: #0d1b2a;
  transform: translateY(-1px);
}

.more-skills {
  background-color: rgba(97, 218, 251, 0.2);
  color: #61dafb;
  padding: 3px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
  white-space: nowrap;
}

.tab-container {
  display: flex;
  justify-content: center;
  gap: 0;
  margin: 40px auto 30px;
  max-width: 600px;
  background-color: rgba(26, 26, 46, 0.3);
  border-radius: 15px;
  padding: 5px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  border: none;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
}

.tab-button:hover {
  background-color: rgba(97, 218, 251, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

.tab-button.active {
  background-color: rgba(97, 218, 251, 0.2);
  color: #61dafb;
  box-shadow: 0 2px 8px rgba(97, 218, 251, 0.3);
}

.tab-content {
  width: 100%;
}

.tab-panel {
  animation: fadeIn 0.3s ease-in-out;
}

.job-card {
  background-color: rgba(26, 26, 46, 0.6);
  padding: 25px;
  border-radius: 20px;
  max-width: 700px;
  margin: 20px auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.job-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(97, 218, 251, 0.3);
}

.job-title {
  font-size: 1.4rem;
  color: #61dafb;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.company-name {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 5px 0;
  font-weight: 500;
}

.job-duration {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 5px 0 15px 0;
  font-style: italic;
}

.job-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 10px 0 0 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .about-container {
    padding: 40px 20px;
    margin: 20px 10px;
  }
  
  h1 {
    font-size: 2.2rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  h3 {
    font-size: 1.3rem;
  }
  
  .popup-content {
    padding: 30px 20px;
    width: 95%;
  }
  
  .filter-container {
    flex-direction: column;
    gap: 15px;
    padding: 20px 15px;
  }
  
  .filter-container label {
    display: block;
    margin-bottom: 8px;
    margin-right: 0;
  }
  
  .filter-container select {
    width: 100%;
  }
  
  .skills-container {
    gap: 10px;
  }
  
  .skill-bubble, .course-bubble {
    padding: 8px 14px;
    font-size: 13px;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .course-card {
    padding: 12px;
  }
  
  .course-name {
    font-size: 0.9rem;
  }
  
  .certifications-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .certification-card {
    padding: 12px;
  }
  
  .cert-name {
    font-size: 0.9rem;
  }
  
  .tab-container {
    flex-direction: column;
    gap: 5px;
    max-width: 300px;
  }
  
  .tab-button {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
  
  .job-card {
    padding: 20px;
    margin: 15px auto;
  }
  
  .job-title {
    font-size: 1.2rem;
  }
  
  .company-name {
    font-size: 1rem;
  }
  
  .job-duration {
    font-size: 0.9rem;
  }
  
  .job-description {
    font-size: 0.9rem;
  }
  
  .education-card {
    padding: 20px;
    margin: 15px auto 25px;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 30px 15px;
    margin: 15px 5px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.2rem;
  }
  
  .tab-container {
    max-width: 100%;
  }
  
  .tab-button {
    padding: 10px 14px;
    font-size: 0.85rem;
  }
  
  .skills-container {
    gap: 8px;
  }
  
  .skill-bubble, .course-bubble {
    padding: 7px 12px;
    font-size: 12px;
  }
  
  .filter-container {
    padding: 15px 10px;
  }
  
  .popup-content {
    padding: 25px 15px;
  }
  
  .popup-content h3 {
    font-size: 1.3rem;
  }
  
  .popup-content p {
    font-size: 0.95rem;
  }
  
  .job-card {
    padding: 18px;
  }
  
  .job-title {
    font-size: 1.1rem;
  }
  
  .company-name {
    font-size: 0.95rem;
  }
  
  .job-duration {
    font-size: 0.85rem;
  }
  
  .job-description {
    font-size: 0.85rem;
  }
  
  .education-card {
    padding: 18px;
  }
  
  .certification-card,
  .course-card {
    padding: 10px;
  }
  
  .cert-name,
  .course-name {
    font-size: 0.85rem;
  }
  
  .skill-tag {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
}
</style>