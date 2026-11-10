<template>
  <div class="services-container">
    <header class="page-head">
      <div class="section-marker">
        <span class="title-plate bevel">04</span>
        <p class="eyebrow">Services</p>
      </div>
      <h1>Here’s what I can help with.</h1>
      <p class="page-intro">
        I like starting with a conversation, getting clear on the problem, and then working
        with a team to research, design, and build the right thing.
      </p>
    </header>

    <section class="services-section bevel panel" aria-labelledby="capabilities-title">
      <div class="section-marker">
        <span class="title-plate bevel" aria-hidden="true">{{ String(services.length).padStart(2, '0') }}</span>
        <h2 id="capabilities-title">Ways I can help</h2>
      </div>
      <ul class="services-list">
        <li v-for="(service, index) in services" :key="service">
          <button type="button" @click="showPopup(service)">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ service }}</strong>
            <span class="service-arrow" aria-hidden="true">↗</span>
          </button>
        </li>
      </ul>
      <div v-if="popupVisible" class="popup-overlay" @click="closePopup">
        <div class="popup-content bevel" role="dialog" aria-modal="true" :aria-labelledby="`service-title`" @click.stop>
          <button class="close-button bevel" type="button" aria-label="Close service details" @click="closePopup">&times;</button>
          <h2 id="service-title">{{ popupTitle }}</h2>
          <p class="popup-copy">{{ popupContent }}</p>
          <div class="popup-buttons">
            <router-link to="/contact" class="btn bevel">Contact</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="service-brief">
      <div class="bevel">
        <p class="eyebrow">Availability</p>
        <p>Remote worldwide or in person around Whitby, Ontario.</p>
      </div>
      <div class="bevel">
        <p class="eyebrow">Engagements</p>
        <p>Scoped by project, with pricing shaped around the problem and timeline.</p>
      </div>
      <router-link to="/contact" class="btn bevel">Start a conversation <span aria-hidden="true">→</span></router-link>
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
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 var(--gap);
}

.section-marker {
  display: flex;
  align-items: center;
  gap: 14px;
}

.page-head {
  padding: clamp(14px, 2.4vw, 28px) 0 clamp(26px, 3.6vw, 40px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.7fr);
  gap: 18px clamp(32px, 7vw, 96px);
  align-items: end;
}

.page-head .section-marker { grid-column: 1 / -1; }

h1 {
  max-width: 13ch;
  margin: 0;
  font-size: clamp(3.3rem, 6.4vw, 6.2rem);
  line-height: 0.9;
  text-wrap: balance;
}

.page-intro {
  max-width: 46ch;
  margin: 0 0 6px;
  font-size: clamp(1.04rem, 1.25vw, 1.18rem);
  line-height: 1.6;
  color: var(--body);
}

.services-section h2 {
  margin: 0;
  font-size: 1.9rem;
  line-height: 1;
}

.services-list {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(20px, 4vw, 48px);
}

.services-list li {
  border-bottom: 1px solid var(--hairline);
}

.services-list li:nth-last-child(-n + 2) { border-bottom: 0; }

.services-list button {
  width: 100%;
  min-height: 58px;
  padding: 10px 4px;
  display: grid;
  grid-template-columns: 34px 1fr 20px;
  gap: 12px;
  align-items: center;
  border: 0;
  background: transparent;
  color: var(--body);
  text-align: left;
  cursor: pointer;
}

.services-list button > span:first-child {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 500;
}

.services-list strong {
  color: var(--ink);
  font-size: 1.12rem;
  font-weight: 500;
  transition: color 0.15s ease;
}

.service-arrow {
  color: var(--muted);
  transition: transform 0.2s var(--ease-out), color 0.15s ease;
}

.services-list button:hover strong { color: var(--accent); }
.services-list button:hover .service-arrow { color: var(--accent); transform: translate(3px, -3px); }

.service-brief {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  gap: 12px;
  align-items: stretch;
}

.service-brief > div {
  --cut: 10px;
  padding: 18px 22px;
}

.service-brief p:not(.eyebrow) {
  margin: 8px 0 0;
  color: var(--ink);
  line-height: 1.5;
}

.service-brief .btn { align-self: center; margin-left: 12px; }

.popup-buttons { margin-top: 22px; }

@media (max-width: 860px) {
  .service-brief { grid-template-columns: 1fr 1fr; }
  .service-brief .btn { grid-column: 1 / -1; margin-left: 0; justify-self: start; }
}

@media (max-width: 720px) {
  .page-head { grid-template-columns: 1fr; }
  .services-list { grid-template-columns: 1fr; }
  .services-list li:nth-last-child(2) { border-bottom: 1px solid var(--hairline); }
  .service-brief { grid-template-columns: 1fr; }
}
</style>
