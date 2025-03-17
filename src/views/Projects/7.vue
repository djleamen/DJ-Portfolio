<template>
    <button class="back-btn" @click="goBack">Back to Projects</button>
    <div class = "project-container">
        <div class = "content-container">
        <h1>IAEA CRP on Enhancing Computer Security for Radiation Detection Systems</h1>
        <p>
            The International Atomic Energy Agency (IAEA) has a Coordinated Research Project (CRP) 
            on Enhancing Computer Security for Radiation Detection Systems. The CRP aims to 
            enhance the computer security of radiation detection systems used in nuclear 
            security applications. 
        </p>
        <p>
            Dr. Khalil El-Khatib is the Canadian representative for this CRP and is 
            leading the project at Ontario Tech University. Dr. El-Khatib has invited 
            me to participate in the project as a research assistant, where I will be:
        </p>
        <ul>
            <li>Contributing to research on securing Radiation Detection Systems (RDS) in cloud environments.</li>
            <li>Focusing on leveraging Azure for enhanced security, scalability, and reliability.</li>
            <li>Assisting in developing cloud security strategies, including secure data transmission (TLS/SSL encryption, firewall implementation), secure data storage (encryption, antivirus monitoring), and access control (multi-factor authentication, least privilege policies).</li>
            <li>Exploring challenges and solutions in cloud migration for RDS, ensuring compliance with cybersecurity best practices to protect sensitive data in transit and at rest.</li>
        </ul>
        <p>
            The project will provide me with valuable experience in cloud security,
            research, and collaboration with international partners. I am excited to
            contribute to the project and learn from experts in the field.
        </p>
        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
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
      skills: ["Microsoft Azure", "Cloud Computing", "Cybersecurity", 
              "Microsoft 365", "Research", "Physics", "Communication", "Science",
               "Problem Solving", "Critical Thinking", "Writing" ]
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