<template>
    <button class="back-btn" @click="goBack">Back to Projects</button>
    <div class = "project-container">
        <div class = "content-container">
            <h1>Spam Detector</h1>
            <p>
                First assignment for Software Systems Development & Integration course, to create a spam detector using Naive Bayes spam detection system.
                Creates a model of the probability of each word occurring in a spam or non-spam email, then classifies each email as spam or non-spam.
                Shows the data in a Swing GUI.
            </p>
            <h3>Functionality</h3>
            <p>
                The spam detector reads in a set of training data and uses it to build a model of the probability of each word occurring in a spam or non-spam email.
                It then reads in a set of test data and uses the model to classify each email as spam or non-spam.
            </p>
            <h2>Skills Developed</h2>
            <div class="skills-container">
                <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
            </div>
            <h3>Accuracy</h3>
            <p>
                The spam detector achieves an accuracy of <strong>81.24%</strong> on the test data, with a precision of <strong>99.89%</strong>.
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
      skills: ["Java", "Data Analysis", "Data Visualization", "Software Development", "Software Engineering", "Problem Solving",
                "Critical Thinking", "Creativity", "Swing", "Maven", "Mathematics"]
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