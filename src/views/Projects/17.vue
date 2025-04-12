<template>
    <div class = "project-container">
      <button @click="goBack" class="back-btn">⬅</button>
        <div class = "content-container">
            <h1>Chill Chat</h1>
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
        </section>
        <p>
            <i>This project was originally submitted as coursework for CSCI2020U Software Systems Development & 
            Integration at Ontario Tech University, Winter 2025.</i>
          </p>
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
      skills: ["Java", "Swing", "Software Development", "Software Engineering", "Git", "Visual Studio Code", "Shell", "Agile", "Teamwork",
                "Problem Solving", "Time Management", "Communication", "Collaboration", "Creativity"]
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