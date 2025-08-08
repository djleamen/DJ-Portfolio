<template>
    <ProjectPage projectId="16">
        <h1>Chill Chat</h1>
        <p class="project-date">{{ formattedDate }}</p>
        <div class="logo-container">
            <img src="@/assets/chillchatlogo.png" alt="Chill Chat Logo" class="logo">
            <img src="@/assets/chillchatlogo2.png" alt="Chill Chat Logo 2" class="logo">
        </div>
        <p>Chill Chat is a social messaging application that allows you to chill and chat with your friends in a relaxed and 
            interactive environment. In Chill Chat there is Chill Vibes, Deep Convos and Great Times, where good vibes meet 
            great conversations. The app supports multi-client functionality by utilizing multi-threading and socket programming 
            within a client/server architecture, allowing multiple users to interact in real-time without interruptions. 
            The server handles multiple client connections simultaneously, ensuring smooth message exchanges between users. 
            Allowing users to join the chat, send and receive messages in real-time, and interact with each other seamlessly. 
        </p>
        <h2>Skills Developed</h2>
        <div class="skills-container">
            <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <h2>Features</h2>
        <ul>
            <li>Compiling and Running the application with multiple clients</li>
            <li>Joining the application chat with username</li>
            <li>Chatting with everyone online</li>
            <li>Private Chatting with specified individual</li>
            <li>Creating a thread</li>
            <li>Replying to a thread</li>
        </ul>
        <section>
        <h2>Screenshots</h2>
        <div class="screenshots-container">
          <img src="../../assets/cc-threads.png" alt="Screenshot of Threads" class="screenshot">
          <img src="../../assets/cc-chat.png" alt="Screenshot of Chat" class="screenshot">
      </div>
      /* fix this line
      <p>See the full demo here: <a href="https://www.youtube.com/watch?v=ccrG1b7ZdB0" target="_blank">Youtube</a></p>
    </section>
    <p>
        <i>This project was originally submitted as coursework for CSCI2020U Software Systems Development & 
        Integration at Ontario Tech University, Winter 2025.</i>
      </p>
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
      const project = projects.find(p => p.id === '16');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      skills: ["Java", "Swing", "Software Development", "Software Engineering", "Git", "Visual Studio Code", "Shell", "Agile", "Teamwork",
                "Problem Solving", "Time Management", "Communication", "Collaboration", "Creativity"]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>