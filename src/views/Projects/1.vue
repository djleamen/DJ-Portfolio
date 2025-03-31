<template>
  <div class="project-container">
    <button @click="goBack" class="back-btn">⬅</button>
    <div class="content-container">
      <h1>🌱 SUSTAIN: The Environmentally-Friendly AI 🌱</h1>
      <div class="logo-container">
        <img src="../../assets/512x512sustain.png" alt="SUSTAIN Logo" class="logo small-logo">
        <img src="../../assets/SUSTAINOriginalBlackTransparentCropped.jpg" alt="SUSTAIN Logo" class="logo large-logo">
      </div>
      <section>
        <h2>Overview</h2>
        <p>SUSTAIN is an environmentally-friendly, token-optimized AI wrapper designed to reduce compute costs and increase productivity. By filtering out irrelevant words and phrases from prompts, SUSTAIN minimizes the number of tokens sent to and received from the AI, saving energy and boosting performance.</p>
        <p>Our mission is to deliver a sustainable, high-efficiency alternative to major large language models (LLMs) while maintaining powerful AI-driven results. 🔋</p>
      </section>
      <section>
        <h2>Skills Developed</h2>
        <div class="skills-container">
          <div class = "skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
        </div>
      </section>
      <section>
        <h2>Why SUSTAIN?</h2>
        <h3>Environmental Sustainability</h3>
        <ul>
          <li>Traditional AI systems expend significant energy processing large amounts of token data, much of which is redundant or irrelevant (e.g., greetings, fillers, politeness).</li>
          <li>SUSTAIN significantly reduces token usage, minimizing the carbon footprint of AI queries.</li>
          <li>By promoting shorter, optimized inputs and outputs, SUSTAIN contributes to a greener AI ecosystem.</li>
        </ul>
        <h3>Enhanced Productivity</h3>
        <ul>
          <li>Get results faster with condensed, actionable responses.</li>
          <li>Eliminate unnecessary verbose outputs by default, with the option to expand details when needed.</li>
          <li>Powerful, straight-to-the-point professional AI assistant.</li>
        </ul>
      </section>
      <section>
        <h2>Features</h2>
        <h3>1. Token Optimization Pipeline</h3>
        <p>Preprocesses user prompts to filter out unnecessary words (e.g., "Hello," "Thank you," etc.) and retain only the core intent.</p>
        <p>Example Conversion:</p>
        <ul>
          <li><strong>Input:</strong> "Could you kindly explain machine learning? Thank you!"</li>
          <li><strong>Refined input:</strong> "explain machine learning"</li>
        </ul>
        <h3>2. Short-Form AI Responses</h3>
        <p>Limits responses to concise, actionable outputs using optimized <code>max_tokens</code> settings.</p>
        <p>Example Output:</p>
        <ul>
          <li><strong>Refined input:</strong> "explain machine learning"</li>
          <li><strong>Output:</strong> "Machine learning is a field of AI that trains computers to learn patterns from data."</li>
        </ul>
        <h3>3. Environmentally-Aware Feedback</h3>
        <p>Track token savings and display eco-friendly metrics to users.</p>
        <p>Example savings:</p>
        <ul>
          <li>Token savings: 50%</li>
          <li>You have saved: 0.0023 kWh of power and 0.0009 metric tons of CO₂ emissions</li>
        </ul>
        <h3>4. Hosted on Microsoft Azure</h3>
        <ul>
          <li>Leverages Azure's infrastructure ensuring reliable, secure, and scalable performance.</li>
          <li>Seamless integration with other Azure services for extended functionality.</li>
          <li>Regular updates and maintenance provided by Azure's robust support system.</li>
        </ul>
        <h3>5. Cross-Platform</h3>
        <p>To be available on:</p>
        <ul>
          <li>Web</li>
          <li>Desktop</li>
          <li>iOS</li>
          <li>Android</li>
        </ul>
        <p>To meet your needs, where you need them!</p>
      </section>
      <section>
        <h2>Roadblocks</h2>
        <p>As with any project, we encountered several challenges along the way:</p>
        <ul>
          <li>Optimizing token usage without compromising AI quality.</li>
          <li>Ensuring compatibility across multiple platforms.</li>
          <li>Time constraints for development and testing.</li>
          <li>Balancing performance with environmental sustainability.</li>
          <li>Integrating Azure services for seamless operation.</li>
          <li>Memory of the AI model and its limitations.</li>
          <li>Ensuring user privacy and data security.</li>
          <li>Math behind token savings and energy consumption.</li>
        </ul>
      </section>
      <section>
        <h2>Links</h2>
        <ul>
          <li><a href="https://sustainai.ca">Try it out!</a></li>
          <li><a href="https://github.com/djleamen/SUSTAIN">GitHub (Desktop)</a></li>
          <li><a href="https://github.com/Tomasz0720/SUSTAINWebApp">GitHub (Web)</a></li>
          <li><a href="https://github.com/cafakleinn/SUSTAINForiOS">GitHub IOS</a></li>
          <li><a href="https://github.com/Tomasz0720/SUSTAINForAndroid">GitHub Android</a></li>
        </ul>
      </section>
      <section>
        <h2>Screenshots</h2>
        <div class="screenshots-container">
          <img src="../../assets/sustainweb.png" alt="Screenshot of Web App" class="screenshot">
          <img src="../../assets/sustainweb2.png" alt="Screenshot of Settings" class="screenshot">
        </div>
      </section>
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
      skills: [
        "Python", "Shell", "JavaScript", "Git", "APIs", "Generative AI (LLMs)", "CSS", "HTML", "React.js", 
        "Microsoft Azure", "NLP", "Cloud Computing", "Leadership", "Data Structures & Algorithms", 
        "Software Development", "Software Engineering", "AI Ethics", "Communication", "Problem Solving", 
        "Critical Thinking", "Creativity", "Time Management", "Decision Making", "Networking", 
        "Public Speaking", "Presentation", "Writing", "Research", "Collaboration", "Innovation", 
        "Resilience", "Advocacy", "Professional Development", "Entrepreneurship", "Teamwork", 
        "Adaptability", "Conflict Resolution", "Management", "Science", "Express.js", "Node.js", 
        "Visual Studio Code", "Microsoft 365", "npm", "pip", "Agile", "Web Development", 
        "Mobile Development"
      ]
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
  color: #4CAD75;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.back-btn {
  margin-top: 70px;
  font-size: 1.5rem;
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
  background-color: #4CAD75; 
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

.screenshots-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.screenshot {
  margin-bottom: 50px;
  max-width: 700px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>