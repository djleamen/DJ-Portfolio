<template>
  <ProjectPage projectId="20">
    <h1>MP3 Renamer</h1>
    <p class="project-date">{{ formattedDate }}</p>
    
    <p>
        A Python tool that automatically renames MP3 files based on their speech 
        content using AI-powered Speech-to-Text technology.
    </p>

    <h2>How It Works</h2>
    <p>The script scans the specified directory for MP3 files</p>
    <p>For each MP3 file, it performs the following steps:</p>
    <ul>
      <li>Converts the MP3 file to WAV format using FFmpeg</li>
      <li>Uses OpenAI's Whisper model to transcribe the audio</li>
      <li>Extracts the first sentence or a specified number of words from the transcription</li>
      <li>Cleans the extracted text to create a valid filename</li>
      <li>Renames the original MP3 file with the new name</li>
      <li>Deletes the temporary WAV file created during conversion</li>
    </ul>
    
    <h2>Key Features</h2>
    <ul>
        <li>Scans a directory for MP3 files</li>
        <li>Converts each MP3 to WAV format (temporarily)</li>
        <li>Uses OpenAI's Whisper model for high-quality transcription (with Google Speech API as fallback)</li>
        <li>Extracts the first sentence or a specified number of words from the transcription</li>
        <li>Renames the MP3 file based on this extracted text</li>
        <li>Cleans filenames to ensure they are valid</li>
    </ul>
    
    <h2>Technologies</h2>
    <ul>
        <li>openai-whisper (for state-of-the-art speech recognition)</li>
        <li>torch (required for Whisper)</li>
        <li>SpeechRecognition (fallback recognition)</li>
        <li>pydub (for audio file manipulation)</li>
        <li>PyAudio (for audio processing)</li>
        <li>ffmpeg-python (for audio conversion)</li>
        <li>FFmpeg (for MP3 conversion)</li>
    </ul>


    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills.slice(0, 20)" :key="skill">{{ skill }}</div>
      <div class="skill-bubble more-skills" v-if="skills.length > 20">+{{ skills.length - 20 }} more</div>
    </div>
    
    <h2>Project Link</h2>
    <a href="https://github.com/djleamen/renamer" target="_blank" rel="noopener noreferrer">
      Visit MP3 Renamer <i class="fas fa-external-link-alt"></i>
    </a>
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
      const project = projects.find(p => p.id === '20');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      skills: [
        "Python", "Git", "Debugging", "Artificial Intelligence (AI)", "Testing",
        "Data Structures & Algorithms", "Data Entry", "Algorithms", "Data Analysis", 
        "Problem Solving", "ML/AI", "Machine Learning", "TTS/STT", "Natural Language Processing (NLP)",
        "Visual Studio Code", "APIs", "pip", "Programming Languages"
      ]
    };
  }
};
</script>

<style scoped>
.more-skills {
  background-color: #4fa3d1 !important;
  color: white !important;
  font-weight: bold;
}
</style>
