<template>
  <div class="project-container">
    <button @click="goBack" class="back-btn">
      <span class="back-icon">⬅</span>
      <span class="back-text">Back</span>
    </button>
    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';

export default {
  name: 'ProjectPage',
  props: {
    projectId: {
      type: String,
      default: null
    }
  },
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.push({ path: '/projects' });
    };
    return { goBack };
  },
  mounted() {
    // Ensure page scrolls to top when component mounts
    nextTick(() => {
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style scoped>
.project-container {
  position: relative;
}

.content-container {
  padding: 20px 40px 40px 40px;
  background-color: white;
  max-width: 1000px;
  border-radius: 12px;
  margin: 0 auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.back-btn {
  font-size: 1rem;
  background-color: transparent;
  color: #61dafb;
  padding: 8px 16px;
  border: 2px solid #61dafb;
  border-radius: 8px;
  cursor: pointer;
  position: fixed;
  top: 90px;
  left: 20px;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 100;
}

.back-btn:hover {
  background-color: #4fa3d1;
  color: white;
  transform: translateX(-3px);
}

.back-icon {
  font-size: 1rem;
}

.back-text {
  font-size: 0.9rem;
}

.project-date {
  color: #666;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 20px;
  font-style: italic;
}

/* Common project page styles */
h1, h2, h3 {
  color: black;
}

h1 {
  font-size: 2rem;
  text-align: left;
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
  background-color: transparent;
  border: none;
  line-height: 1.3;
}

li {
  font-size: 1.1rem;
  color: black;
  background-color: transparent;
  border: none;
  margin-bottom: 0;
  line-height: 1.3;
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
  background-color: transparent;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
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
  object-fit: contain;
}

.large-logo {
  max-width: 800px;
  margin-left: -60px;
}

.small-logo {
  margin-left: 50px;
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
  text-decoration: none;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.screenshot:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}
</style>
