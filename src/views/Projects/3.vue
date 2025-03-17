<template>
    <div class = "project-container">
      <button class="back-btn" @click="goBack">Back to Projects</button>
        <div class = "content-container">
        <h1>PurplWav</h1>
        <div class="logo-container">
          <img src="../../assets/purplwav.png" alt="PurplWav Logo" class="logo large-logo">
        </div>

        <p>Using Vue.js AWS Template.</p>

        <p>This project is a Vue.js application for the PurplWav epilepsy awareness campaign. Deployed on AWS.</p>

        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>

        <h2>Features</h2>
        <ul>
            <li>Home: Navigation home page</li>
            <li>About us: Provides information about PurplWav's history and its team.</li>
            <li>Epilepsy Facts: Information and statistics regarding Epilepsy, including types, SUDEP information, and drug resistance.</li>
            <li>Resources: Local resources for those who live with epilepsy or live with a family member with epilepsy in Durham Region</li>
            <li>First Aid: What to do when someone has a seizure.</li>
            <li>Contact us: Links to our social media.</li>
            <li>Aydin's Story: The long journey our ambassador Aydin has endured as a child with epilepsy.</li>
        </ul>
        <h3>Future Implementation</h3>
        <ul>
            <li>Newsletters</li>
            <li>Links to research and programs</li>
            <li>Donation link</li>
        </ul>
        <h2>Visit the Site</h2>
        <a href="https://purplwav.org" target="_blank">PurplWav</a>
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
        "Vue.js", "AWS", "Shell", "JavaScript", "HTML", "CSS", "Git", 
        "Cloud Computing", "Software Development", "Software Engineering",
        "Web Development", "Problem Solving", "Creativity", "Advocacy",
        "Public Speaking", "Presentation", "Writing", "Research", "Leadership",
        "npm", "Node.js", "Agile", "Microsoft 365", "Professional Development", "Visual Studio Code"
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
  max-width: 800px; /* Increase size */
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

img {
  display: block;
  margin: 0 auto;
  border-radius: 10px;
}

a {
  color: rebeccapurple;
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
  gap: 10px;
  margin-top: 20px;
}

.skill-bubble {
  cursor: default;
  background-color: rebeccapurple; 
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