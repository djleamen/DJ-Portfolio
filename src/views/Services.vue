<template>
<div class="services-container">
    <h1>My Services</h1>
    <p>
      I develop efficient, user-focused software solutions with expertise in web and application development, 
      cloud solutions, and database management. Using Agile methodologies, I ensure iterative progress, 
      continuous feedback, and adaptability. My approach blends technical excellence with UX design, 
      accessibility, and structured development sprints to deliver functional, business-aligned solutions. 
      Let's connect to bring your vision to life!
    </p>
    <h3>Services provided</h3>
    <p1>(Click on a service for more details)</p1>
      <ul class="services-list">
        <li @click="showPopup('Application Development')"><i class="icon">✔</i> Application Development</li>
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
          <p>{{ popupContent }}</p>
          <div class="popup-buttons">
            <router-link to="/contact" class="btn">Contact Me</router-link>
          </div>
        </div>
      </div>
      <div>
        <h1></h1>
      </div>
      <h3>Availability:</h3>
        <p>Remote or in person (Whitby, ON)</p>
      <h3>Pricing:</h3>
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
        'Application Development': 'I bring a broad background in multiple programming languages (Python, Java, C++, C#) and frameworks (React.js, Django, FastAPI) along with a methodical, agile-oriented approach. My experience delivering impactful, user-focused solutions and collaborating across teams ensures efficient development cycles and high-quality applications.',
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
    text-align: center;
    padding: 20px 30px;
    color: white;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
  }

  .services-list {
    list-style: none;
    padding-left: 0;
    background-color: transparent; /* explicitly remove background */
    border-color: transparent; /* explicitly remove border */
}

  .services-container h1 {
    font-size: 2.8rem;
    font-weight: bold;
    background: linear-gradient(to right, #4fa3d1, #2575fc);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
  }

    .services-container h3 {
        font-size: 1.5rem;
        color: white;
        margin-top: 10px;
        margin-bottom: 0px;
    }

    .services-container h4 {
        font-size: 1.2rem;
        color: white;
        margin-top: 30px;
        margin-bottom: 0px;
    }

  .services-container p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .services-container ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Increased min-width */
    gap: 20px; /* Adjusted gap for better spacing */
    padding: 0;
  }

  .services-container ul li {
    border-radius: 20px;
    background-color: rgba(26, 26, 46, 0.6);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 500px; 
    margin-bottom: 0px;
    margin-top: 16px;
    cursor: pointer;
    padding: 16px 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .services-container ul li:hover {
    transform: translateY(-4px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
  }

  .services-container ul li .icon {
    color: #2575fc;
    margin-right: 12px;
    font-size: 1.3rem;
  }

/*style contact button*/

.btn {
  /* Create space around button */
  cursor: pointer;
  display: inline-block;
  background-color: #61dafb;
  color: black;
  padding: 10px 24px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
  background-color: #4fa3d1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  position: relative; /* Added for positioning the close button */
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.popup-content h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #2a2a72;
}

.popup-content p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #333;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.popup-buttons .btn {
  flex: 1;
  max-width: 150px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-button:hover {
  color: #2575fc;
  font-size: 1.8rem;
  margin-left: -10px;
  margin-top: -5px;
  transition: all 0.2s ease;
}

p1 {
  margin-top: 5px;
  color:rgb(177, 177, 178);
  font-style: italic;
  text-align: center;
}

@media (max-width: 768px) {
  .services-container {
    padding: 40px 20px;
    margin: 20px;
  }
  
  .services-container h1 {
    font-size: 2.2rem;
  }
  
  .services-container h3 {
    font-size: 1.3rem;
  }
  
  .services-container ul li {
    min-width: auto;
    width: 100%;
  }

  .popup-content {
    padding: 30px 20px;
    width: 95%;
  }
}
</style>
