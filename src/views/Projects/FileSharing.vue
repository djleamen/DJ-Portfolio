<template>
    <ProjectPage projectId="13">
        <h1>File Sharing System</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <p>
            Project for CSCI 2020U Software Systems Development and Integration. 
            The File Sharing System is a client-server application 
            that enables users to share text files between a central 
            server and multiple clients. The server exposes a shared folder, 
            and clients can upload or download files using a simple 
            Swing-based graphical interface. This project was developed 
            with an emphasis on multi-threading, network communication, 
            and responsive UI design.
        </p>
        <h3>Features</h3>
        <ul>
            <li>Server-Side:</li>
            <ul>
                <li>Multi-threaded Connection Handling: Each client connection is processed in a separate thread.</li>
                <li>Commands:</li>
                <ul>
                    <li>DIR – Returns a list of files in the server's shared folder.</li>
                    <li>UPLOAD – Receives a text file from a client and saves it to the shared folder.</li>
                    <li>DOWNLOAD – Sends a requested text file from the shared folder to a client.</li>
                </ul>
            </ul>
            <li>Client-Side:</li>
            <ul>
                <li>User Interface: A Swing GUI with a split-screen view displaying both local and server file lists.</li>
                <li>Operations:</li>
                <ul>
                    <li>Upload: Transfer a file from the client's shared folder to the server.</li>
                    <li>Download: Retrieve a file from the server to the client's shared folder.</li>
                    <li>Refresh: Manually update file listings.</li>
                </ul>
            </ul>
            <li>UI Enhancements:</li>
            <ul>
                <li>Progress bar and status messages during file transfers.</li>
                <li>File chooser integration for selecting files when none is pre-selected.</li>
                <li>Overwrite confirmation when downloading a file that already exists locally.</li>
                <li>SwingWorker to run background tasks and keep the interface responsive.</li>
            </ul>
        </ul>
        <h2>Skills Developed</h2>
        <div class="skills-container">
            <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <h3>Screenshot</h3>
        <div class="screenshots-container">
          <img src="@/assets/file-sharing-system.png" alt="File Sharing System Screenshot" class="screenshot">
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
      const project = this.projects.find(p => p.id === '13');
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
      skills: ["Java", "Swing", "Network Programming", "Git", "Visual Studio Code", 
                "Software Development", "Defensive Programming", "Teamwork", "Multi-threading",
                "Problem Solving", "Time Management", "Communication", "Collaboration"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>