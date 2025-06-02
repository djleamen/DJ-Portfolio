<template>
    <div class = "project-container">
      <button @click="goBack" class="back-btn">⬅</button>
        <div class = "content-container">
            <h1>Chess Bot Challenge</h1>
            <p>
                Back in high school, to wrap up the end of my Computer Science class, we were 
                given a challenge to create a chess bot that could play against a human
                or another bot. The goal was to create a bot that could play chess at a
                reasonable level, and to do so I had to brainstorm a lot of different
                strategies and algorithms to implement. I ended up creating the best
                chess bot in the class, and I was very proud of it!
            </p>
            <h2>Skills Developed</h2>
            <div class="skills-container">
                <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
            </div>
            <h2>Features</h2>
            <ul>
                <li>Chess Board Display:</li>
                <ul>
                    <li>Displays the chess board and pieces using Java Swing.</li>
                </ul>
                <li>Chess Bot:</li>
                <ul>
                    <li>Implements a basic chess bot that can play against a human or another bot.</li>
                    <li>Uses a Minimax algorithm to determine the best move.</li>
                </ul>
                <li>Human vs. Bot Mode:</li>
                <ul>
                    <li>Allows a human player to play against the bot.</li>
                </ul>
                <li>Bot vs. Bot Mode:</li>
                <ul>
                    <li>Allows two bots to play against each other.</li>
                </ul>
                <li>Move Validation:</li>
                <ul>
                    <li>Validates moves to ensure they are legal according to chess rules.</li>
                </ul>
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
      skills: ["Java", "Swing", "Software Development", "Software Engineering", "Algorithms", "Data Structures", "Problem Solving", "Eclipse"],
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