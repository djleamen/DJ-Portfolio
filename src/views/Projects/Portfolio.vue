<template>
    <ProjectPage projectId="6">
        <h1>DJ Leamen's Personal Portfolio</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <p>
            My personal portfolio, built using Vue.js from AWS Amplify template. Deployed on Azure. The portfolio 
            showcases my projects, experience, links to my social media, information about the classes I've taken, what I'm currently learning, and more.
        </p>
        <h2>Overview</h2>
        <p>
            This portfolio is designed to provide a comprehensive view of my skills and experiences. It is integrated with 
            Azure to leverage cloud services for hosting and deployment. The portfolio includes detailed information 
            about my projects, technical skills, and professional experience. It also serves as a platform to 
            showcase my work and connect with other professionals in the industry.
        </p>
        <h2>Features</h2>
        <ul>
            <li><strong>About</strong>:
                <ul>
                    <li>My technical skills and proficiencies</li>
                    <li>Detailed information about my professional and extracurricular experience.</li>
                    <li>Information about the courses I've taken, including descriptions and details.</li>
                </ul>
            </li>
            <li><strong>Projects</strong>: A showcase of my software development projects with descriptions and links.</li>
            <li><strong>Services</strong>: A comprehensive list of the various services I provide.</li>
            <li><strong>Contact</strong>: Links to my GitHub and LinkedIn profiles.</li>
            <li><strong>Blog</strong>: External link to my Medium page.</li>
        </ul>
        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <h2>Technologies Used</h2>
        <ul>
            <li><strong>Vue.js</strong>: Frontend framework for building the user interface.</li>
            <li><strong>AWS Amplify</strong>: Template used for the initial setup and deployment.</li>
            <li><strong>Azure</strong>: Cloud platform used for hosting and deployment.</li>
            <li><strong>HTML/CSS</strong>: Markup and styling for the portfolio.</li>
            <li><strong>JavaScript</strong>: Programming language for dynamic content.</li>
        </ul>
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
      const project = this.projects.find(p => p.id === '6');
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
      skills: ["Vue.js", "Microsoft Azure", "AWS", "JavaScript", "HTML", "CSS", "Shell",
               "Git", "Cloud Computing", "Web Development", "Software Development",
              "Software Engineering", "Problem Solving", "Creativity", "Time Management", 
                "Writing", "Professional Development", "Communication"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>