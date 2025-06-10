<template>
    <ProjectPage projectId="11">
        <h1>Spam Detector</h1>
        <p class="project-date">{{ formattedDate }}</p>
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
      const project = projects.find(p => p.id === '11');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
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
/* Project-specific styles only */
</style>