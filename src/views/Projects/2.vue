<template>
  <button class="back-btn" @click="goBack">Back to Projects</button>
  <div class="project-container">
    <div class="content-container">
      <h1>Scrozam!</h1>
      <div class="description-container">
        <div class="description-text">
          <p><strong>Scrozam!</strong> is a web application that detects songs using the ACRCloud API and scrobbles the identified tracks to a user's Last.fm account.</p>
          <p>This project is something I always wanted for myself, as I love to track my music listening habits, but realized I was missing out on a lot of scrobbles when I 
            listen on vinyl or on the radio. Scrozam! solves this problem by detecting songs from audio input and scrobbling them to Last.fm without the need for manual input.</p>
        </div>
        <div class="logo-container">
          <img src="../../assets/scrozamlogo.png" alt="Scrozam Logo" class="logo small-logo">
        </div>
      </div>
      <section>
        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
      </section>
      <h2>Features</h2>
      <ul>
        <li>Detects songs from audio input.</li>
        <li>Reiterates detected track to user.</li>
      </ul>
      <h2>Future Improvements</h2>
      <ul>
        <li>Implement scrobbling of detected tracks to Last.fm.</li>
        <li>Add more detailed song information display.</li>
        <li>Implement more robust error handling.</li>
      </ul>
      <h2>Additional Information</h2>
      <h3>Backend</h3>
      <ul>
        <li>ACRCloud API</li>
        <li>Last.fm API</li>
        <li>Express</li>
      </ul>
      <h3>Frontend</h3>
      <ul>
        <li>React</li>
      </ul>
      <h3>Project Structure</h3>
      <ul>
        <li><strong>backend/</strong>: Contains server-side code and dependencies.</li>
        <ul>
          <li><strong>node_modules/</strong>: Contains project dependencies.</li>
          <li><strong>routes/</strong>: Contains song detection, scrobbling logic.</li>
        </ul>
        <li><strong>frontend/</strong>: Contains React components and frontend logic.</li>
        <ul>
          <li><strong>node_modules/</strong>: Contains project dependencies.</li>
          <li><strong>public/</strong>: Contains static assets and configuration files.</li>
          <li><strong>src/</strong>: Contains the main React components and related files.</li>
        </ul>
        <li><strong>testing/</strong>: Contains scripts and configuration files for testing.</li>
      </ul>
      <h2>View on GitHub</h2>
    <a href="https://github.com/djleamen/Scrozam" target="_blank">Scrozam!</a>
      <section>
        <h2>Screenshots</h2>
        <div class="screenshots-container">
          <img src="../../assets/scrozamweb.png" alt="Demo Screenshot" class="screenshot">
        </div>
      </section>
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
      skills: [
        "React.js", "Express.js", "Python", "Shell", "JavaScript", 
        "HTML", "Git", "APIs", "CSS", "Node.js", "npm", "pip",
        "Software Development", "Software Engineering", "Web Development",
        "Problem Solving", "Creativity", "Innovation", "Adaptability",
      ]
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

.description-container {
  margin-top: -60px;
  display: flex;
  align-items: center;
  margin-bottom: -80px; /* Remove bottom margin */
}

.logo-container {
  display: flex;
  justify-content: center;
}

.logo {
  max-width: 200px;
  max-height: 200px;
  display: block;
  object-fit: contain; /* Maintain original aspect ratio */
}

.large-logo {
  max-width: 800px; /* Increase size */
  margin-left: -60px; /* Remove gap between logos */
}

.small-logo {
  max-width: 350px;
  max-height: 350px;
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

img {
  display: block;
  margin: 0 auto;
  border-radius: 10px;
}

a {
  color: rgb(153, 27, 27);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.back-btn {
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
  gap: 5px; /* Reduce gap */
  margin-top: 10px; /* Reduce top margin */
}

.skill-bubble {
  cursor: default;
  background-color: rgb(153, 27, 27); 
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