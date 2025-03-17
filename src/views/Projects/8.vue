<template>
    <button class="back-btn" @click="goBack">Back to Projects</button>
    <div class = "project-container">
        <div class = "content-container">
            <h1>The Awakened Leadership Institute (TALI)</h1>
            <p>
              The Awakened Leadership Institute (TALI) is a science-based leadership development 
              space that offers online courses, workshops, and coaching services to help individuals
              and organizations cultivate cognitive resilience, emotional intelligence, and transformational leadership skills.
            </p>
            <h2>My Role</h2>
            <p>
              Developing and optimizing a WordPress-based LMS platform, for TALI, 
              enhancing sales funnel efficiency, checkout flow, and email automation, 
              while implementing SEO and analytics to improve user engagement and conversion rates.
            </p>
            <h2>Breakdown</h2>
            <ul>
                <li>Designed and optimized a WordPress-based LMS platform (TutorLMS), improving course purchase and enrollment flow.</li>
                <li>Developed a conversion-driven sales funnel that enhanced customer acquisition and retention for the TALI online course.</li>
                <li>Integrated Mailchimp email automation, implementing lead nurturing sequences to increase student engagement.</li>
                <li>Optimized checkout and payment processes, ensuring a seamless Stripe/PayPal transaction experience.</li>
                <li>Implemented Google Analytics and SEO best practices, boosting website performance and tracking user behavior.</li>
                <li>Provided ongoing technical support and content updates, maintaining optimal website functionality.</li>
            </ul>
            <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
            <h2>Technologies Used</h2>
            <ul>
                <li>WordPress</li>
                <li>TutorLMS</li>
                <li>Mailchimp</li>
                <li>Stripe</li>
                <li>PayPal</li>
                <li>Google Analytics</li>
                <li>SEO</li>
            </ul>
            <h2>View the Website</h2>
            <p>
                <a href="https://celinacc.ca/tali/" target="_blank">Visit TALI</a>
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
      skills: ["WordPress", "Mailchimp", "Google Analytics", "SEO", "UX/UI",
              "Software Development", "Web Development", "Problem Solving", "Creativity",
              "Adaptability", "Time Management", "Networking", "Communication",
               "Collaboration", "Visual Studio Code" ]
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