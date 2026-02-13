<template>
  <div class="services-container">
    <h1>My Services</h1>
    <p>
      I develop efficient, user-focused software solutions with expertise in web and application development, 
      AI & cloud solutions, and database management. Using Agile methodologies, I ensure iterative progress, 
      continuous feedback, and adaptability. My approach blends technical excellence with UX design, 
      accessibility, and structured development sprints to deliver functional, business-aligned solutions. 
      Let's connect to bring your vision to life!
    </p>
    <h3>Services Provided</h3>
    <p class="p1">(Click on a service for more details)</p>
      <ul class="services-list">
        <li @click="showPopup('AI Development')"><i class="icon">✔</i> AI Development</li>
        <li @click="showPopup('Cloud Application Development')"><i class="icon">✔</i> Cloud Application Development</li>
        <li @click="showPopup('Custom Software Development')"><i class="icon">✔</i> Custom Software Development</li>
        <li @click="showPopup('Database Development')"><i class="icon">✔</i> Database Development</li>
        <li @click="showPopup('Software Testing')"><i class="icon">✔</i> Software Testing</li>
        <li @click="showPopup('Web Design')"><i class="icon">✔</i> Web Design</li>
        <li @click="showPopup('Web Development')"><i class="icon">✔</i> Web Development</li>
        <li @click="showPopup('User Experience Design (UED)')"><i class="icon">✔</i> User Experience Design (UED)</li>
        <li @click="showPopup('Data Entry')"><i class="icon">✔</i> Data Entry</li>
        <li @click="showPopup('Research')"><i class="icon">✔</i> Research</li>
      </ul>
      <div v-if="popupVisible" class="popup-overlay" @click="closePopup">
        <div class="popup-content" @click.stop>
          <button class="close-button" @click="closePopup">&times;</button>
          <h2>{{ popupTitle }}</h2>
          <p class="popup-copy">{{ popupContent }}</p>
          <div class="popup-buttons">
            <router-link to="/contact" class="btn">Contact</router-link>
          </div>
        </div>
      </div>
    <h3>Availability</h3>
    <p>Remote or in person (Whitby, ON)</p>
    <h3>Pricing</h3>
    <p>Contact for pricing</p>
    <router-link to="/contact" class="btn">Contact</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: false,
      popupTitle: '',
      popupContent: '',
    };
  },
  methods: {
    showPopup(title) {
      this.popupTitle = title;
      this.popupContent = this.getPopupContent(title);
      this.popupVisible = true;
      document.body.classList.add('no-scroll');
    },
    closePopup() {
      this.popupVisible = false;
      document.body.classList.remove('no-scroll');
    },
    getPopupContent(title) {
      const contentMap = {
        'AI Development': 'I leverage advanced machine learning techniques and frameworks (TensorFlow, PyTorch) to build intelligent applications. My experience includes natural language processing, computer vision, and predictive analytics, enabling me to create solutions that learn and adapt over time.',
        'Cloud Application Development': 'My hands-on work with Microsoft Azure, AWS, and GCP—combined with implementing security protocols for cloud-based systems—enables me to build robust, scalable, and secure cloud applications. I have a track record of optimizing deployments and driving innovation in fast-paced, cloud-centric environments.',
        'Custom Software Development': 'By leveraging a deep understanding of multiple programming paradigms, data structures, and system optimization, I tailor solutions that fit unique business needs. My expertise in ML/AI, cybersecurity, and integration ensures reliable, future-proof custom software for diverse projects.',
        'Database Development': 'Proficiency with SQL (MySQL, Microsoft SQL Server) and NoSQL databases (IBM Db2) allows me to design efficient, scalable, and secure data structures. I have experience in data preprocessing and cleaning for ML, ensuring databases are optimized for analytics and high performance.',
        'Software Testing': 'I am detail-oriented and skilled in creating systematic testing strategies—unit, integration, and end-to-end. Through rigorous debugging and iterative development practices, I help teams deliver stable releases, improve code quality, and maintain continuous delivery pipelines.',
        'Web Design': 'From HTML/CSS to SEO optimization, I focus on responsive design and user-centric interfaces. My work on small-business websites and personal projects demonstrates my ability to balance aesthetics with functionality, ensuring a polished and accessible online presence.',
        'Web Development': 'My full-stack expertise with React, Vue.js, Express.js, and Django lets me develop dynamic, scalable sites. I excel in integrating APIs, managing deployments, and optimizing performance to deliver robust, feature-rich web experiences that meet diverse requirements.',
        'User Experience Design (UED)': 'I prioritize end-user needs by combining data-driven insights with empathy-driven design principles. My collaborative background and strong communication skills help me gather feedback, run user tests, and iterate quickly, yielding intuitive and engaging user experiences.',
        'Data Entry': 'Leveraging my detail-oriented nature and data-driven mindset, I ensure accurate and organized data management. My familiarity with database systems and best practices for data validation results in reliable, high-quality data entry processes.',
        'Research': 'Through my experience as a Research Assistant and ML/AI intern, I have conducted in-depth analyses and implemented innovative solutions. My strong analytical skills, background in security, and passion for exploring new technologies enable me to excel in technical and market research projects.',
      };
      return contentMap[title] || 'Details about this service are not available.';
    },
  },
};
</script>

<style scoped>
.services-container {
  --stack-gap: clamp(30px, 4.2vw, 46px);
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(34px, 4.8vw, 62px) 16px clamp(64px, 8vw, 110px);
  text-align: center;
  color: #eef4ff;
}

.services-container h1 {
  margin: 0 0 clamp(18px, 2.4vw, 26px);
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.08;
  font-weight: 800;
  background: linear-gradient(90deg, #70e2ff, #44bff5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.services-container h3 {
  margin: var(--stack-gap) 0 8px;
  font-size: 2rem;
  color: #f5f9ff;
}

.services-container p {
  margin: 0 auto var(--stack-gap);
  max-width: 920px;
  font-size: 1.05rem;
  line-height: 1.72;
  color: rgba(230, 240, 255, 0.92);
}

.p1 {
  margin-bottom: calc(var(--stack-gap) * 0.72);
  color: rgba(219, 230, 255, 0.74);
  font-style: italic;
}

.services-list {
  list-style: none;
  margin: 0 auto calc(var(--stack-gap) + 4px);
  padding: 0;
  width: 100%;
  max-width: 940px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.services-container ul li {
  margin: 0;
  border-radius: 16px;
  border: 1px solid rgba(130, 168, 255, 0.22);
  background:
    radial-gradient(circle at 12% 12%, rgba(98, 213, 255, 0.1), transparent 38%),
    linear-gradient(150deg, rgba(27, 33, 70, 0.86), rgba(17, 22, 52, 0.88));
  box-shadow: 0 16px 34px rgba(7, 12, 36, 0.3);
  cursor: pointer;
  padding: 16px 18px;
  text-align: left;
  font-size: 1.03rem;
  color: rgba(230, 240, 255, 0.95);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.services-container ul li:hover {
  transform: translateY(-2px);
  border-color: rgba(126, 232, 255, 0.5);
}

.services-container ul li .icon {
  color: #7ee8ff;
  margin-right: 8px;
  font-size: 1rem;
}

.btn {
  margin-top: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 11px 18px;
  border-radius: 11px;
  border: 1px solid rgba(126, 232, 255, 0.5);
  background: rgba(98, 213, 255, 0.18);
  color: #a5f3ff;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  background: rgba(98, 213, 255, 0.24);
}

.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 8, 22, 0.74);
  backdrop-filter: blur(8px);
}

.popup-content {
  position: relative;
  width: min(760px, 100%);
  max-height: min(82vh, 760px);
  overflow-y: auto;
  border-radius: 18px;
  padding: 24px;
  text-align: left;
  border: 1px solid rgba(130, 168, 255, 0.24);
  background: linear-gradient(150deg, rgba(27, 33, 70, 0.98), rgba(17, 22, 52, 0.98));
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.45);
}

.popup-content h2 {
  margin: 0 0 8px;
  color: #7ee8ff;
  font-size: clamp(1.4rem, 2.4vw, 1.9rem);
}

.popup-copy {
  margin: 0;
  color: rgba(230, 240, 255, 0.92);
  line-height: 1.68;
}

.popup-buttons {
  margin-top: 16px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: rgba(126, 232, 255, 0.16);
  color: #d7f9ff;
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
}

@media (max-width: 860px) {
  .services-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .services-container {
    padding: 26px 10px 44px;
  }

  .services-container h3 {
    font-size: 1.65rem;
  }

  .services-container p {
    font-size: 0.98rem;
  }

  .services-container ul li {
    padding: 14px;
  }
}
</style>
