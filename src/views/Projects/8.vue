<template>
    <div class = "project-container">
      <button @click="goBack" class="back-btn">⬅</button>
        <div class = "content-container">
            <h1>Pure Canuck</h1>
            <div class="logo-container">
                <img src="@/assets/purecanuck.png" alt="Pure Canuck Logo" class="logo">
            </div>
            <p>
                Pure Canuck is a Shopify site built for a small local Canadian business that sells customized clothing
                and drinkware. The website features the complete products listing, a straightforward payment gateway, 
                and contact information.  
            </p>
            <h2>Skills Developed</h2>
            <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
          </div>
            <h2>Features</h2>
            <ul>
                <li>Home page with features products</li>
                <li>Product collections</li>
                <li>Payment system</li>
                <li>Contact information</li>
                <li>Responsive design for mobile and desktop</li>
                <li>Customizable product options</li>
                <li>Search functionality</li>
                <li>Complete documentation for setup and maintenance</li>
            </ul>
            <h2>View the Website</h2>
            <p>
                <a href="https://purecanuck.ca" target="_blank">Visit Pure Canuck</a>
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
      skills: ["Liquid", "HTML", "CSS", "JavaScript", "Web Development", "Software Development", "Shopify",
              "Problem Solving", "Creativity", "Adaptability", "Requirement Gathering",
             "Communication", "Collaboration", "Graphic Design", "SEO", "Attention to Detail"]
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
  background-color: darkred; 
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