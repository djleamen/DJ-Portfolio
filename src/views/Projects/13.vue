<template>
    <div class = "project-container">
      <button @click="goBack" class="back-btn">⬅</button>
        <div class = "content-container">
            <h1>File Sharing System</h1>
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
                        <li>DIR – Returns a list of files in the server’s shared folder.</li>
                        <li>UPLOAD – Receives a text file from a client and saves it to the shared folder.</li>
                        <li>DOWNLOAD – Sends a requested text file from the shared folder to a client.</li>
                    </ul>
                </ul>
                <li>Client-Side:</li>
                <ul>
                    <li>User Interface: A Swing GUI with a split-screen view displaying both local and server file lists.</li>
                    <li>Operations:</li>
                    <ul>
                        <li>Upload: Transfer a file from the client’s shared folder to the server.</li>
                        <li>Download: Retrieve a file from the server to the client’s shared folder.</li>
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
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.push({ path: '/projects' });
    };
    return { goBack };
  },
  data() {
    return {
      skills: ["Java", "Swing", "Network Programming", "Git", "Visual Studio Code", 
                "Software Development", "Defensive Programming", "Teamwork", "Multi-threading",
                "Problem Solving", "Time Management", "Communication", "Collaboration"]
    };
  }
};
</script>

<style scoped>
.content-container {
  padding: 40px;
  background-color: white;
  max-width: 1000px;
  border-radius: 10px;
  margin: 0 auto;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  max-width: 200px;
  max-height: 200px;
  display: block;
  object-fit: contain; /* Maintain original aspect ratio */
}

.large-logo {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 20px;
}

.small-logo {
  margin-left: 50px;
}

h1, h2, h3 {
  color: black;
}

h1 {
  font-size: 2rem;
  text-align: center;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  background-color: transparent; /* Ensure no background color */
  border: none; /* Remove any border */
}

li {
  font-size: 1.1rem;
  color: black; /* Ensure consistent color */
  background-color: transparent; /* Ensure no background color */
  border: none; /* Remove any border */
}

p {
  font-size: 1.1rem;
  color: black;
}

code {
  background-color: #f4f4f4;
  padding: 2px 5px;
  border-radius: 5px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.back-btn {
  margin-top: 70px;
  font-size: 1.5rem;
  background-color: transparent;
  color: #61dafb;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  transition: 0.3s ease-in-out;
}

.back-btn:hover {
  background-color: #4fa3d1;
  color: white;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.skill-bubble {
  cursor: default;
  background-color: #0d1b2a; 
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  border: none;
  text-decoration: none; /* Ensure the text is not underlined */
}

.screenshots-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.screenshot {
  margin-bottom: 50px;
  max-width: 700px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

</style>