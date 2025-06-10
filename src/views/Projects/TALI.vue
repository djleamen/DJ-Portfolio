<template>
    <ProjectPage projectId="7">
        <h1>The Awakened Leadership Institute (TALI)</h1>
        <p class="project-date">{{ formattedDate }}</p>
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
    </ProjectPage>
</template>

<script>
import ProjectPage from '@/components/ProjectPage.vue';
import { projects } from '@/data/projects.js';

export default {
  components: {
    ProjectPage
  },
  computed: {
    formattedDate() {
      const project = projects.find(p => p.id === '7');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
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
/* Project-specific styles only */
</style>