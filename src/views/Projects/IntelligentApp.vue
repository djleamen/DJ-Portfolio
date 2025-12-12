<template>
  <ProjectPage projectId="26">
    <h1>Habitat for Humanity Intelligent Application System</h1> 
    <p class="project-date">{{ formattedDate }}</p> 
    <p>
      The Intelligent Application System was developed by Kyndryl Canada's
      Cloud/ADAI consult intern team in partnership with Habitat for Humanity GTA. 
      This innovative solution significantly transforms the Habitat for Humanity 
      housing application process through AI-powered conversational interfaces 
      and automated document validation. The system replaces a complex 10-page 
      form with 50+ document uploads with an intuitive conversational agent that 
      guides applicants through the process while automatically extracting and 
      validating information from uploaded documents.
    </p> 
    <h2>Technical Details</h2>
    <p>
      Built on JotForm Enterprise 2.0 with custom Azure Functions integration, 
      the system features a conversational AI agent trained on Habitat's policies 
      and FAQs. The architecture includes OCR document processing with blur detection, 
      automatic data extraction into Salesforce CRM, and cross-validation capabilities 
      for credit scores, names, and identification documents. Custom JavaScript widgets 
      handle document upload and validation, while Azure Static Web Apps host the 
      processing interfaces. The system supports both mobile-native functionality with 
      camera upload capabilities and traditional desktop workflows.
    </p> 
    
    <h2>Challenges Faced</h2> 
    <p>
      The main challenges centered around platform selection and integration complexities:
    </p> 
    <ul> 
      <li>Evaluating multiple platforms (custom development, Salesforce, Power Platform, 
        JotForm) to find the optimal balance of functionality and maintainability</li> 
      <li>Implementing save-and-continue functionality across different platform 
        architectures while maintaining data security</li> 
      <li>Creating seamless document validation workflows that handle various file 
        formats, quality issues, and integration with existing Salesforce infrastructure</li> 
      <li>Balancing AI automation with human oversight requirements for sensitive housing 
        application decisions</li> 
    </ul> 
    <p>
      Through iterative platform evaluation and proof-of-concept development, the team 
      successfully identified JotForm as the optimal solution, enabling rapid deployment 
      while meeting all technical requirements.
    </p> 
    
    <h2>What I Learned</h2> 
    <p>
      This project provided deep insights into enterprise software evaluation, 
      AI ethics in sensitive applications, and the importance of maintainable 
      solutions for nonprofit organizations. I gained hands-on experience with 
      conversational AI development, OCR implementation, and complex system 
      integration challenges. The project reinforced the value of thorough 
      platform research and proof-of-concept validation before full-scale 
      development. 
      
      I'm grateful to <a href="https://kyndryl.com">Kyndryl</a> and the 
      <a href="https://habitatgta.ca">Habitat for Humanity GTA</a> team for their 
      collaboration and trust in developing this impactful solution.
    </p> 
    <p>
      Learn more about Kyndryl: <a href="https://kyndryl.com">Kyndryl</a>
    </p>
    <p>
      Learn more about Habitat GTA: <a href="https://habitatgta.ca">Habitat for Humanity GTA</a>
    </p> 
      
    <h2>Skills Developed</h2> 
      <div class="skills-container"> 
        <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div> 
      </div> 
  </ProjectPage> 
</template>

<script>
import ProjectPage from '@/components/ProjectPage.vue';
import { apiService } from '@/services/api';

export default {
  components: {
    ProjectPage
  },
  async created() {
    try {
      this.projects = await apiService.getProjects();
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  },
  computed: {
    formattedDate() {
      const project = this.projects.find(p => p.id === '26');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      projects: [],
      skills: ["Python", "JavaScript", "Microsoft Azure", "Salesforce",
      "JotForm", "Generative AI", "Natural Language Processing (NLP)",
      "Large Language Models (LLM)", "Machine Learning", "Artificial Intelligence (AI)",
      "Computer Vision", "AI Ethics", "Prompt Engineering", "Accessibility",
      "Cloud Computing", "APIs", "Extract, Transform, Load (ETL)", "Git",
      "Hugging Face", "Software Development", "Software Engineering",
      "Web Development", "Mobile Development", "Database Management", "Testing",
      "Debugging", "Version Control", "Agile", "Cybersecurity", "Attention to Detail",
      "Problem Solving", "Creativity", "Adaptability", "Requirement Gathering",
      "Communication", "Collaboration", "Teamwork", "Leadership", "Research",
      "Decision Making", "Data Analysis", "Data Visualization", "Algorithms",
      "Professional Development", "Advocacy","Information Technology"
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
