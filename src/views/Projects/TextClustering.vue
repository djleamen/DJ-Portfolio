<template>
  <ProjectPage projectId="39">
    <h1>Text Clustering</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      Text Clustering finds patterns in unstructured text. Give it a pile of reviews, tickets, or notes, and it groups similar documents together, then tells you what each group is about by showing its top keywords and most representative examples.
    </p>

    <h2>Key Features</h2>
    <ul>
      <li>Loads a single file, a folder of files, or pasted text, split by line, paragraph, or document</li>
      <li>Two ways to represent text: TF-IDF for speed, or sentence embeddings for meaning</li>
      <li>Two clustering algorithms: K-Means, with an option to choose the number of clusters automatically, and DBSCAN, which also flags outliers</li>
      <li>A summary for each cluster with keywords and the documents closest to its centre</li>
      <li>An interactive 2D map of the clusters and a CSV export</li>
      <li>Usable as a Python library, a command-line tool, or a Streamlit web app</li>
    </ul>

    <h2>Technical Details</h2>
    <p>
      The pipeline is built on scikit-learn, with sentence-transformers as the optional embedding backend. Automatic cluster selection uses silhouette scores. The cluster map projects documents to two dimensions with PCA. The package installs a command-line entry point and has a pytest suite covering the pipeline.
    </p>

    <h2>What I Learned</h2>
    <p>
      Clustering is easy to run and hard to interpret, so most of the design went into explaining the result. Keywords and example documents made the clusters useful to a person in a way that a cluster number never is. Comparing K-Means and DBSCAN on the same data also made their trade-offs clear.
    </p>

    <h2>Links</h2>
    <ul>
      <li><a href="https://github.com/djleamen/cluster-unstructured-text-data" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
    </ul>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
    </div>
  </ProjectPage>
</template>

<script setup lang="ts">
import ProjectPage from '@/components/ProjectPage.vue';
import { useProjectData } from '@/composables/useProjectData';

const { formattedDate } = useProjectData('39');

const skills = [
  "Python", "Scikit-learn", "NumPy", "Pandas", "Streamlit", "Machine Learning",
  "Unsupervised Learning", "Clustering", "Natural Language Processing (NLP)", "Embeddings",
  "Sentence Transformers", "Hugging Face", "Data Preprocessing", "Data Analysis",
  "Data Visualization", "Artificial Intelligence (AI)", "Testing", "Software Engineering", "Git",
  "Version Control", "Problem Solving", "Plotly", "CI/CD", "Model Evaluation", "Data Pipelines",
  "Visual Studio Code"
];
</script>
