<template>
    <ProjectPage projectId="4">
        <h1>NanoNest</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <p>Furniture Catalog Management System</p>
        <p>CSCI 2040U - Software Design and Analysis</p>
        <p>Allows users to manage a list of furtiture stored in a database.</p>
        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <h2>General Functionalities</h2>
        <ul>
            <li>Database Interaction:</li>
            <ul>
                <li>Read an initial dataset from a simple database (CSV file).</li>
                <li>Save updates back to this database.</li>
            </ul>
            <li>Front-End Interface:</li>
            <ul>
                <li>Use Java Swing to create a user-friendly interface.</li>
                <li>Display a list of catalog items.</li>
                <li>Allow users to view, add, and edit items.</li>
            </ul>
            <li>Back-End Logic:</li>
            <ul>
                <li>Validate user inputs for adding or editing items.</li>
                <li>Handle the interaction between the database and the front-end interface.</li>
            </ul>
            <li>User Login; add a basic login system where users must enter a username and password.</li>
        </ul>
        <p>The goal is to create a functional prototype demonstrating these core features, with the potential to expand or refine it in future iterations.</p>
        <h3>Data Flow</h3>
        <ul>
            <li>Database (CSV file): Source of data.</li>
            <li>Back end: Logic for reading, editing, validating, and saving data.</li>
            <li>Front end: Displays the catalog and enables user interaction.</li>
        </ul>
        <h2>View on GitHub</h2>
        <a href="https://github.com/DylanJReynolds/CSCI2040" target="_blank">NanoNest Repo</a>
    </ProjectPage>
</template>

<script>
import ProjectPage from '@/components/ProjectPage.vue';
import { projects } from '@/data/projects.js';

export default {
  components: {
    ProjectPage
  },
  computed: {
    formattedDate() {
      const project = projects.find(p => p.id === '4');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      skills: ["Java", "Swing","JavaScript", "Python", "React", 
                "FastAPI", "Git", "Microsoft 365", "Shell", "Agile", 
                "Waterfall", "Kanban", "Visual Studio Code", "npm",
                "Software Development", "Software Engineering", "Web Development",
                "Database Management", "Data Analysis", "Data Visualization",
                "Problem Solving", "Adaptability", "Time Management",
                "Decision Making", "Conflict Resolution", "Networking",
                "Public Speaking", "Presentation", "Writing", "Research",
                 "Collaboration", "Innovation", "Resilience", "Teamwork", "Communication", "Maven"
      ]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>