<template>
  <ProjectPage projectId="40">
    <h1>Neural Network Playground</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      Neural Network Playground is a web app for teaching how neural networks work. I built it to walk a beginner through the whole idea in one sitting, with nothing to install beyond Python.
    </p>

    <h2>How It Teaches</h2>
    <ul>
      <li><strong>Build.</strong> Choose the hidden layers, neurons, activation function, optimizer, and learning rate.</li>
      <li><strong>Train.</strong> Train on real handwritten digits and watch loss and accuracy change live.</li>
      <li><strong>Predict.</strong> Draw your own digit and watch each layer of the network light up.</li>
      <li><strong>Experiment.</strong> Make the network bigger and see accuracy improve, or raise the learning rate and watch training fall apart.</li>
    </ul>

    <h2>Technical Details</h2>
    <p>
      The interface is a Streamlit app with a drawable canvas. Models are built and trained with TensorFlow and Keras on the MNIST dataset. Matplotlib draws the network diagram, the training curves, and the prediction chart, using activations read from each layer of the trained model.
    </p>

    <h2>What I Learned</h2>
    <p>
      Teaching a topic shows you which parts you understand and which you have only memorized. Deciding what a beginner should see first, and what to leave out, was harder than writing the code.
    </p>

    <h2>Links</h2>
    <ul>
      <li><a href="https://github.com/djleamen/neural-network-example" target="_blank" rel="noopener noreferrer">GitHub repository</a></li>
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

const { formattedDate } = useProjectData('40');

const skills = [
  "Python", "TensorFlow", "Keras", "NumPy", "Pandas", "Matplotlib", "Streamlit",
  "Machine Learning", "Deep Learning", "Neural Architectures", "Supervised Learning",
  "Computer Vision", "Artificial Intelligence (AI)", "Data Visualization", "Teaching",
  "Communication", "Software Engineering", "Git", "Version Control", "Image Processing",
  "Data Preprocessing", "Visual Studio Code", "Written Communication"
];
</script>
