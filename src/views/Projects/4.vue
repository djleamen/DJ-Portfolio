<template>
    <div class = "project-container">
      <button class="back-btn" @click="goBack">Back to Projects</button>
        <div class = "content-container">
        <h1>NanoNest</h1>
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
      skills: ["Java", "Swing","JavaScript", "HTML", "CSS", "Python", "React.js", 
                "FastAPI", "Git", "Microsoft 365", "Shell", "Agile", 
                "Waterfall", "Kanban", "Visual Studio Code", "pip", "npm",
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
  background-color: lightblue; 
  color: black;
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