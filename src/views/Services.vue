<template>
  <div class="services-container">
    <header class="services-hero">
      <p class="eyebrow">Services / 04</p>
      <h1>Here’s what I can help with.</h1>
      <p class="services-intro">
        I like starting with a conversation, getting clear on the problem, and then working
        with a team to research, design, and build the right thing.
      </p>
    </header>

    <section class="services-section" aria-labelledby="capabilities-title">
      <div class="section-heading">
        <p class="eyebrow">Capabilities</p>
        <h2 id="capabilities-title">Ways I can help</h2>
      </div>
      <ul class="services-list">
        <li v-for="(service, index) in services" :key="service">
          <button type="button" @click="showPopup(service)">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ service }}</strong>
            <span class="service-arrow">↗</span>
          </button>
        </li>
      </ul>
      <div v-if="popupVisible" class="popup-overlay" @click="closePopup">
        <div class="popup-content" role="dialog" aria-modal="true" :aria-labelledby="`service-title`" @click.stop>
          <button class="close-button" type="button" aria-label="Close service details" @click="closePopup">&times;</button>
          <h2 id="service-title">{{ popupTitle }}</h2>
          <p class="popup-copy">{{ popupContent }}</p>
          <div class="popup-buttons">
            <router-link to="/contact" class="btn">Contact</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="service-brief">
      <div>
        <p class="eyebrow">Availability</p>
        <p>Remote worldwide or in person around Whitby, Ontario.</p>
      </div>
      <div>
        <p class="eyebrow">Engagements</p>
        <p>Scoped by project, with pricing shaped around the problem and timeline.</p>
      </div>
      <router-link to="/contact" class="btn">Start a conversation →</router-link>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: false,
      popupTitle: '',
      popupContent: '',
      services: [
        'AI Development',
        'Cloud Application Development',
        'Custom Software Development',
        'Database Development',
        'Software Testing',
        'Web Design',
        'Web Development',
        'User Experience Design (UED)',
        'Data Entry',
        'Research',
      ],
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
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(6px, 1.5vw, 18px) 0 var(--gap);
  color: var(--body);
}

.services-hero {
  padding: clamp(28px, 4vw, 48px) 0 clamp(32px, 4.5vw, 54px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.72fr);
  gap: 18px clamp(48px, 9vw, 132px);
  align-items: end;
  border-bottom: 1px solid var(--hairline);
}

.services-hero > .eyebrow {
  grid-column: 1 / -1;
  margin: 0;
}

.services-container h1 {
  max-width: 12ch;
  margin: 0;
  font-size: clamp(2.6rem, 4.1vw, 4.4rem);
  line-height: 1;
  font-weight: 480;
  letter-spacing: 0;
}

.services-container h2 {
  margin: 16px 0 0;
  font-size: clamp(1.8rem, 3vw, 3rem);
  font-weight: 480;
  letter-spacing: 0;
}

.services-container p {
  margin: 0 0 16px;
  max-width: 66ch;
  font-size: clamp(1.02rem, 1.2vw, 1.14rem);
  line-height: 1.72;
  color: var(--body);
}

.services-intro {
  max-width: 46ch !important;
  margin: 0 0 2px !important;
  font-size: clamp(1.02rem, 1.25vw, 1.18rem) !important;
  line-height: 1.62 !important;
}

.services-section {
  padding: clamp(44px, 7vw, 84px) 0;
  display: grid;
  grid-template-columns: minmax(220px, 0.55fr) minmax(0, 1.45fr);
  gap: clamp(40px, 8vw, 120px);
}

.services-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--hairline);
}

.services-container ul li {
  margin: 0;
  border-bottom: 1px solid var(--hairline);
}

.services-container ul button {
  width: 100%;
  padding: 22px 4px;
  display: grid;
  grid-template-columns: 46px 1fr 24px;
  gap: 16px;
  align-items: center;
  border: 0;
  background: transparent;
  color: var(--body);
  text-align: left;
  cursor: pointer;
  transition: padding-left 0.22s var(--ease-out), background-color 0.22s ease;
}

.services-container ul button:hover {
  padding-left: 12px;
  background: var(--accent-faint);
}

.services-container ul button > span:first-child,
.service-arrow {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.72rem;
}

.services-container ul strong {
  color: var(--ink);
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  font-weight: 480;
}

.service-brief {
  padding: clamp(28px, 4.5vw, 54px) 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  gap: clamp(28px, 5vw, 70px);
  align-items: end;
  border-top: 1px solid var(--hairline);
}

.service-brief p { font-size: 1rem; }
.service-brief .eyebrow { margin-bottom: 10px; }

.service-brief .btn {
  white-space: nowrap;
}

.btn {
  margin-top: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 22px;
  border-radius: 4px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #06080d;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.btn:hover {
  background: var(--accent-bright);
  border-color: var(--accent-bright);
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(79, 157, 255, 0.28);
}

.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 5, 8, 0.78);
  backdrop-filter: blur(6px);
}

.popup-content {
  position: relative;
  width: min(720px, 100%);
  max-height: min(82vh, 720px);
  overflow-y: auto;
  border-radius: 8px;
  padding: 28px;
  text-align: left;
  border: 1px solid var(--hairline-strong);
  background: var(--surface);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
}

.popup-content h2 {
  margin: 0 0 10px;
  color: var(--ink);
  font-size: clamp(1.35rem, 2vw, 1.7rem);
  font-weight: 480;
}

.popup-copy {
  margin: 0;
  color: var(--body);
  line-height: 1.7;
}

.popup-buttons { margin-top: 18px; }

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  border: 1px solid var(--hairline);
  border-radius: 4px;
  background: var(--surface-2);
  color: var(--ink);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease;
}

.close-button:hover { border-color: var(--accent); color: var(--accent-bright); }

@media (max-width: 720px) {
  .services-hero {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 24px 0 34px;
  }

  .services-hero > .eyebrow {
    grid-column: 1;
    margin-bottom: 4px;
  }

  .services-container h1 {
    font-size: clamp(2.35rem, 12vw, 3rem);
  }

  .services-intro {
    max-width: 38ch !important;
    margin-top: 4px !important;
  }

  .services-section { grid-template-columns: 1fr; }
  .service-brief { grid-template-columns: 1fr; align-items: start; }
}
</style>

