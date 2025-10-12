<template>
  <ProjectPage projectId="23">
    <h1>Tidal Accelerator FastTrack Report Microservice</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <p>
      The Tidal Accelerator FastTrack Report Microservice streamlines the report generation process for Tidal's client-facing 
      modernization assessment reports. It automates the generation of reports based on client data and formats
      them into a pre-templated user-friendly PowerPoint presentation.
    </p>
    
    <h2>Technical Details</h2>
    <p>
      The microservice is built with TypeScript and React using the reactpptx library to generate PowerPoint presentations dynamically 
      as a lambda function. It leverages the Tidal Accelerator API to fetch client workspace data and uses the data to populate 
      the PowerPoint slides. The generated PowerPoint presentations are stored in an S3 bucket as a pre-signed URL, 
      allowing clients to view and download them securely and efficiently.
    </p>

    <h2>Challenges Faced</h2>
    <p>
      The main challenges were ensuring the microservice could:
    </p>
    <ul>
      <li>Handle large datasets efficiently while maintaining performance</li>
      <li>Generate PowerPoint presentations that are both visually appealing and informative</li>
      <li>Integrate seamlessly with the existing Tidal Accelerator API and infrastructure</li>
    </ul>

    <p>
      Through careful planning and testing, these challenges were successfully addressed, resulting in a robust and scalable solution.
    </p>

    <h2>What I Learned</h2>
    <p>
      This project provided valuable insights into the challenges of report generation and the importance of user-friendly design.
      I gained hands-on experience with TypeScript, React, and AWS services, which enhanced my technical skills and understanding of cloud-based solutions.
      I'm grateful to the <a href="https://www.tidalcloud.com">Tidal</a> team for their support and collaboration throughout this project.
    </p>

    <p>View Tidal Accelerator here: <a href="https://www.tidalcloud.com/accelerator">Tidal Accelerator</a></p>

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
      const project = this.projects.find(p => p.id === '23');
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
      skills: ["React", "JavaScript", "APIs", "TypeScript", "CSS", "HTML", "Git", "Problem Solving", "Docker",
              "Data Analysis", "Software Development", "Software Engineering", "Version Control",
              "AWS", "Cloud Computing", "Node.js", "npm", "Critical Thinking", "Creativity", "Adaptability",
              "Time Management", "Decision Making", "Networking", "Graphic Design", "Attention to Detail",
              "Presentation", "Writing", "Research", "Collaboration", "Communication", "Requirement Gathering",
              "Testing", "Debugging", "UI/UX", "Web Development", "Database Management"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>