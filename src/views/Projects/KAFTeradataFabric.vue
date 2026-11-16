<template>
  <ProjectPage projectId="33">
    <h1>KAF for Teradata to Microsoft Fabric Migration</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      A demonstration of AI-assisted data warehouse migration, built on the Kyndryl
      Agentic Framework (KAF) at
      <a href="https://www.kyndryl.com/ca/en/artificial-intelligence/agentic-ai-framework" target="_blank" rel="noopener noreferrer">Kyndryl</a>.
      I helped build the demo and presented it live at Toronto Day of Data (SQL Saturday) 2026 as part of the public session
      <em>Kyndryl Agentic Framework (KAF): Accelerating Data Estate Modernization with
      AI-Powered Automation</em>.
    </p>
    <p>
      KAF gives organizations a repeatable way to modernize a legacy data estate, from
      the business case and cost analysis through warehouse migration, ETL modernization,
      and reporting. My part of the session showed one use case end to end: moving a
      sample retail warehouse from Teradata to Microsoft Fabric.
    </p>
    <p>
      The framework itself is proprietary. Everything on this page comes from what was
      shown in the public session.
    </p>

    <h2>Session Recording</h2>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Gjzs066__B8" title="Kyndryl Agentic Framework session at Toronto Day of Data 2026" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    <h2>The Idea</h2>
    <p>
      Most migration demos show that data moved from one system to another. We already
      know that can be done. This one set out to show why the result can be trusted.
    </p>
    <p>
      A warehouse that has run for years carries years of business decisions in its data.
      The sample had customer records with missing email addresses, for example. Before
      anything is generated, somebody has to say what that should mean in the new
      platform, and that somebody should not be the AI.
    </p>

    <h2>What the Demo Shows</h2>
    <ul>
      <li><strong>Plan.</strong> An agent reads the source warehouse and flags what it cannot resolve on its own. It stops and asks a person instead of picking a default.</li>
      <li><strong>Implement.</strong> With that decision recorded, an agent builds the target side. Nobody builds tables or mappings by hand.</li>
      <li><strong>Evaluate.</strong> A separate agent checks the result against the source. In the demo the migration completes and the validation still fails, because money columns lost precision on the way over.</li>
      <li><strong>Correct.</strong> The failed checks come back as specific, named fixes. They are not a request to try again.</li>
      <li><strong>Re-evaluate.</strong> The fix is not taken on faith. Everything is checked again from scratch.</li>
      <li><strong>Approve.</strong> Passing validation only means the result met the rules we set. A person reviews the evidence and decides whether it ships.</li>
    </ul>
    <p>
      Every decision, mapping, and validation result is recorded alongside the data model
      as the run happens, so the finished migration comes with the history of how it got
      there.
    </p>

    <h2>Screenshots</h2>
    <div class="screenshots-container">
      <img src="@/assets/t2f.png" alt="KAF Teradata to Microsoft Fabric migration demo" class="screenshot" loading="lazy" />
      <img src="@/assets/t2f_2.png" alt="Additional view of the KAF Teradata to Microsoft Fabric migration demo" class="screenshot" loading="lazy" />
    </div>

    <h2>What I Learned</h2>
    <p>
      Preparing this taught me that an AI demo is more convincing when it fails in front
      of the audience and recovers. A caught error earns more trust than a clean run.
      I also came away with a firmer view on where people belong in an agentic workflow:
      at the points of real ambiguity and at final sign-off, with accountability resting
      on the person who reviews the evidence.
    </p>
    <p>
      Building a talk track around a live demo for a public audience also meant working
      on timing, dry runs, and planning for the questions we expected.
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

const { formattedDate } = useProjectData('33');

const skills = [
  "Python", "SQL", "Generative AI", "Large Language Models (LLM)",
  "Artificial Intelligence (AI)", "Agentic Frameworks", "AI Ethics", "Microsoft Azure",
  "Cloud Computing", "Data Pipelines", "Extract, Transform, Load (ETL)", "Data Governance",
  "Data Management", "Database Management", "Relational Databases", "Data Analysis", "Testing",
  "Software Engineering", "Git", "Public Speaking", "Presentation", "Communication",
  "Collaboration", "Teamwork", "Problem Solving", "Information Technology", "Data Warehousing",
  "Data Engineering", "Critical Thinking", "Adaptability", "Attention to Detail", "Research",
  "Analytical Skills", "Professional Development", "Time Management", "Written Communication",
  "Innovation", "Leadership", "Professional Networking", "Marketing", "Data Entry", "Teaching",
  "Reliability"
];
</script>
