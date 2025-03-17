<template>
    <div class = "project-container">
      <button class="back-btn" @click="goBack">Back to Projects</button>
        <div class = "content-container">
        <h1>🌟 DJ Codes it Simple</h1>
        <p>Your beginner-friendly guide to mastering Shell Scripting, SQL, and beyond!</p>
        <p><strong>DJ Codes it Simple</strong> is a resource designed to break down coding concepts into simple, digestible lessons. No matter if you're starting your coding journey or brushing up on the basics, this repository offers essential concepts, hands-on examples, and best practices to help you succeed.</p>
        <h2>🚀 What You'll Learn</h2>
            <ul>
            <li>Shell Scripting: Learn to automate tasks and enhance productivity with easy-to-follow scripts.</li>
            <li>SQL: Master database queries and data manipulation techniques with practical examples.</li>
            <li>More coming soon!</li>
        </ul>
        <h2>🌟 Features</h2>
        <ul>
            <li>Beginner-Friendly Explanations: Simplified concepts for those just starting out</li>
            <li>Step-by-Step Examples: Practical examples to reinforce learning.</li>
            <li>Best Practices: Tips and tricks to write efficient, maintainable code.</li>
            <li>Resources: Curated links to deepen your understanding.</li>
        </ul>
        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
        <h2>Link</h2>
        <a href="https://github.com/djleamen/codes-it-simple" target="_blank">View on GitHub</a>
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
      skills: ["Shell", "Linux", "SQL", "Git", "Python",
                "Creativity", "Writing", "Problem Solving", "Research"
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
  color: darkgoldenrod;
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
  background-color: darkgoldenrod; 
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