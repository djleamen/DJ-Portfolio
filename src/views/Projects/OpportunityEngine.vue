<template>
  <ProjectPage projectId="32">
    <h1>Opportunity Engine</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      The Opportunity Engine is an internal AI tool I designed and built at
      <a href="https://kyndryl.com" target="_blank" rel="noopener noreferrer">Kyndryl</a>
      for the Canadian consulting practice. It takes the information a team already
      holds about a customer's technology estate and turns it into a ranked list of
      consulting opportunities, a total cost of ownership comparison, and a first
      draft of the business case that supports them.
    </p>
    <p>
      This is proprietary work, so this page stays at the level of what the tool
      does and what I took from it. The source code and design are not public.
    </p>

    <h2>What It Does</h2>
    <ul>
      <li>Reads customer inventory data and identifies where modernization work is likely to pay off</li>
      <li>Ranks those opportunities so an account team has one prioritized list to work from</li>
      <li>Compares the cost of several modernization scenarios against staying as-is</li>
      <li>Drafts the supporting documents a seller needs for a first customer conversation</li>
      <li>Works alongside the sales tools the team already uses instead of replacing them</li>
    </ul>

    <h2>My Role</h2>
    <p>
      I worked on the engine as a developer on the Data &amp; AI team, from early
      prototypes through internal demos and rollout. That covered building
      features, getting the tool running in a secured corporate cloud environment,
      preparing demos for practice leadership, and bringing new contributors up to
      speed on the codebase and our development practices.
    </p>

    <h2>Challenges Faced</h2>
    <ul>
      <li>Customer inventory data arrives in inconsistent shapes, and the tool has to cope with that without a person cleaning it first</li>
      <li>A cost comparison is only useful if a seller can explain where each number came from</li>
      <li>Deploying inside enterprise security controls took as much effort as building the features</li>
      <li>The audience is sellers, not engineers, so the output had to read like something they would write themselves</li>
    </ul>

    <h2>What I Learned</h2>
    <p>
      Most of what made this tool useful was not the AI. It was understanding how a
      consulting sale actually moves, what an account executive needs in hand before a
      first meeting, and where an automated draft helps versus where it gets in the way.
      I also learned how much of enterprise software delivery is access, security review,
      and alignment between teams.
    </p>
    <p>
      Learn more about Kyndryl: <a href="https://kyndryl.com" target="_blank" rel="noopener noreferrer">Kyndryl</a>
    </p>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
    </div>
  </ProjectPage>
</template>

<script setup lang="ts">
import ProjectPage from '@/components/ProjectPage.vue';
import { useProjectData } from '@/composables/useProjectData';

const { formattedDate } = useProjectData('32');

const skills = [
  "Python", "TypeScript", "Generative AI", "Large Language Models (LLM)",
  "Artificial Intelligence (AI)", "Agentic Frameworks", "Prompt Engineering", "Microsoft Azure",
  "Cloud Computing", "Docker", "APIs", "Data Analysis", "Software Engineering", "Testing",
  "Debugging", "Git", "Version Control", "Agile", "Cybersecurity", "Requirement Gathering",
  "Communication", "Collaboration", "Teamwork", "Leadership", "Presentation", "Problem Solving",
  "Information Technology", "FastAPI", "Pydantic", "PostgreSQL", "SQLAlchemy", "Pandas",
  "Infrastructure as Code (IaC)", "Containerization", "Microservices", "JWT auth", "LangChain",
  "Scikit-learn", "NumPy", "Uvicorn", "Machine Learning", "Clustering", "Unsupervised Learning",
  "SQL", "Relational Databases", "NoSQL", "Extract, Transform, Load (ETL)", "Data Pipelines",
  "Concurrency", "Event-driven Programming", "OIDC federated auth", "Shell", "YAML",
  "Visual Studio Code", "CI/CD", "Written Communication", "Decision Making", "Innovation",
  "Time Management", "Research", "Professional Development", "Analytical Skills",
  "Attention to Detail", "Adaptability", "Creativity", "Resilience", "Professional Networking",
  "Stress Management", "Data Entry", "Conflict Resolution", "Organization", "Teaching",
  "Reliability"
];
</script>
