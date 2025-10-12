<template>
    <ProjectPage projectId="14">
        <h1>Daily Journal</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <p>
            Daily Journal is a Java Swing application that allows users to create 
            and manage daily journal entries. The application provides a user-friendly interface for 
            writing, editing, and deleting journal entries. Users can also view their entries in a 
            list format, making it easy to navigate through past entries.
        </p>

        <h2>Features</h2>
        <ul>
            <li>Journal Entry Management:</li>
            <ul>
                <li>Create, edit, and delete daily journal entries.</li>
                <li>Each entry includes a title, editable date, location, tags, and content.</li>
            </ul>
            <li>Persistent Storage:</li>
            <ul>
                <li>Entries are saved to and loaded from a JSON file (e.g. journal_entries.json).</li>
            </ul>
            <li>Year Overview Graph:</li>
            <ul>
                <li>A visual grid (similar to GitHub's commit graph) that displays daily entry activity throughout the year.</li>
            </ul>
            <li>Recent Entries List:</li>
            <ul>
                <li>Displays the most recent entries (with date and title) for quick access.</li>
            </ul>
            <li>Tag System and Global Tag Management:</li>
            <ul>
                <li>Add multiple tags per entry.</li>
                <li>Global tags are stored in a separate JSON file (tags.json).</li>
                <li>Manage global tags (including deletion, which removes the tag from all entries).</li>
            </ul>
            <li>Unified Filtering:</li>
            <ul>
                <li>A single "Filter" button lets you filter entries by either tag or location using a popup dialog.</li>
            </ul>
            <li>Password Protection:</li>
            <ul>
                <li>A password lock prompts the user on startup.</li>
                <li>The password is stored securely (hashed, e.g. in password.json), with an option to set a new password if needed.</li>
            </ul>
        </ul>
        <h2>Skills Developed</h2>
        <div class="skills-container">
            <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <p>Want to try it out for yourself? Download the project from my GitHub:</p>
        <a href="https://github.com/djleamen/daily-journal" target="_blank">Daily Journal</a>
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
      const project = this.projects.find(p => p.id === '14');
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
      skills: ["Java", "Swing", "Software Development", "Software Engineering", "Git", "Visual Studio Code"],
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>