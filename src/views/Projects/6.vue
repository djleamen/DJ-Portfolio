<template>
    <button class="back-btn" @click="goBack">Back to Projects</button>
    <div class = "project-container">
        <div class = "content-container">
        <h1>DJ Leamen's Personal Portfolio</h1>
        <p>
            My personal portfolio, built using Vue.js and AWS Amplify. The portfolio showcases my projects, experience, links to my social media, information about the classes I've taken, what I'm currently learning, and more.
        </p>
        <h2>Overview</h2>
        <p>
            This portfolio is designed to provide a comprehensive view of my skills and experiences. It is integrated with AWS Amplify to leverage cloud services for authentication, API, and database capabilities.
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
            <li><strong>Contact</strong>: Links to my GitHub and LinkedIn profiles.</li>
        </ul>
        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <h2>Technologies Used</h2>
        <ul>
            <li><strong>Vue.js</strong>: Frontend framework for building the user interface.</li>
            <li><strong>AWS Amplify</strong>: Cloud services for authentication, API, and database.</li>
            <li><strong>HTML/CSS</strong>: Markup and styling for the portfolio.</li>
            <li><strong>JavaScript</strong>: Programming language for dynamic content.</li>
        </ul>
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
      skills: ["Vue.js", "AWS", "JavaScript", "HTML", "CSS", "Shell",
               "Git", "Cloud Computing", "Web Development", "Software Development",
              "Software Engineering", "Problem Solving", "Creativity", "Time Management", 
                "Writing", "Professional Development", "Communication"]
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
  margin-left: -60px; /* Remove gap between logos */
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
  color: #007bff;
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

</style>