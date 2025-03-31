<template>
    <div class = "project-container">
      <button @click="goBack" class="back-btn">⬅</button>
        <div class = "content-container">
            <h1>Daily Journal</h1>
            <p>
                <strong>Daily Journal</strong> is a Java Swing application that allows users to create 
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
                    <li>Entries are saved to and loaded from a JSON file (e.g. journal_entries.json).</li>
                </ul>
                <li>Year Overview Graph:</li>
                <ul>
                    <li>A visual grid (similar to GitHub’s commit graph) that displays daily entry activity throughout the year.</li>
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
                    <li>A single “Filter” button lets you filter entries by either tag or location using a popup dialog.</li>
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
      skills: ["Java", "Swing", "Software Development", "Software Engineering", "Git", "Visual Studio Code"],
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