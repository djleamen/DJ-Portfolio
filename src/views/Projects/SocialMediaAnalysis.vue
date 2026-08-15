<template>
  <ProjectPage projectId="28">
    <h1>Social Media Performance Analysis</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      A comprehensive data analysis project that examines social media post performance 
      across multiple content categories, providing actionable insights for optimizing 
      engagement strategies. From Clean and analyze social media usage data with Python 
      on Coursera.
    </p>
    <h2>Key Features</h2>
    <ul>
        <li>Data Generation: Creates realistic social media dataset with 500+ posts across 8 categories</li>
        <li>Data Cleaning: Handles missing values, duplicates, and data type conversions</li>
        <li>Statistical Analysis:
          <ul>
            <li>Descriptive statistics (mean, median, std deviation)</li>
            <li>ANOVA testing for statistical significance</li>
            <li>Effect size calculation (eta-squared)</li>
            <li>Outlier detection using IQR and z-scores</li>
          </ul>
        </li>
        <li>Visualizations:
          <ul>
            <li>Distribution histograms</li>
            <li>Category comparison boxplots</li>
            <li>Time series trend analysis</li>
            <li>Performance benchmarking charts</li>
          </ul>
        </li>
        <li>Business Intelligence: Actionable recommendations based on data-driven insights</li>
    </ul>
    <p>View it on GitHub:</p>
    <ul>
        <li><a href="https://github.com/djleamen/social-media-performance-analysis" target="_blank" rel="noopener noreferrer">Social Media Performance Analysis</a></li>
    </ul>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
    </div>
  </ProjectPage>
</template>

<script>
import ProjectPage from '@/components/ProjectPage.vue';
import { apiService } from '@/services/api';

export default {
  components: {
    ProjectPage
  },
  async created() {
    try {
      this.projects = await apiService.getProjects();
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  },
  computed: {
    formattedDate() {
      const project = this.projects.find(p => p.id === '28');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      projects: [],
      skills: [
            "Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook",
            "Data Analysis", "Data Visualization", "Data Preprocessing", "Data Science",
            "Mathematics", "Analytical Skills",  "Git",  "Version Control",
            "SciPy", "Statistical analysis"
    ]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>
