<template>
  <div class="contact-container">
    <h1>Contact Me</h1>
    <p>Let's connect! Reach out to me on:</p>
    <div class="socials">
      <a href="https://linkedin.com/in/djleamen" class="social-card" aria-label="LinkedIn Profile">
        <div class="social-icon">
          <img src="@/assets/linkedin-icon.png" alt="LinkedIn" />
        </div>
        <span class="social-text">LinkedIn</span>
      </a>
      <a href="https://github.com/djleamen" class="social-card" aria-label="GitHub Profile">
        <div class="social-icon">
          <img src="@/assets/github-icon.png" alt="GitHub" />
        </div>
        <span class="social-text">GitHub</span>
      </a>
      <a href="https://www.instagram.com/dejjos/" class="social-card" aria-label="Instagram Profile">
        <div class="social-icon">
          <img src="@/assets/instagram-icon.png" alt="Instagram" />
        </div>
        <span class="social-text">Instagram</span>
      </a>
      <a href="mailto:dilara_leamen@icloud.com" class="social-card" aria-label="Email">
        <div class="social-icon">
          <img src="@/assets/email-icon.png" alt="Email" />
        </div>
        <span class="social-text">Email</span>
      </a>
      <a href="https://sessionize.com/djleamen" class="social-card" aria-label="Sessionize Profile">
        <div class="social-icon">
          <img src="@/assets/sessionize-icon.png" alt="Sessionize" />
        </div>
        <span class="social-text">Sessionize</span>
      </a>
      <a href="https://bsky.app/profile/dejjo.bsky.social" class="social-card" aria-label="Bluesky Profile">
        <div class="social-icon">
          <img src="@/assets/bluesky-icon.png" alt="Bluesky" />
        </div>
        <span class="social-text">Bluesky</span>
      </a>
    </div>
    <div class="socials-bottom">
      <p>Or, find everything on my Linktree:</p>
      <a href="https://linktr.ee/djleamen" class="btn" aria-label="Linktree Profile">Linktree</a>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  text-align: center;
  padding: 20px 30px;
  color: white;
  max-width: 1100px;
  width: 100%; /* Add this to ensure full width */
  margin: 0 auto;
  border-radius: 20px;
  box-sizing: border-box; /* Add this to maintain proper sizing */
}

a {
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

h1 {
  font-size: 2.8rem;
  font-weight: bold;
  background: linear-gradient(to right, #4fa3d1, #2575fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
}

p {
  margin: 25px auto;
  font-size: 1.3rem;
  line-height: 1.7;
  max-width: 600px;
}

p1 {
  margin: 20px;
  font-size: 1.2rem;
}

.socials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
  padding: 30px;
  margin: 30px auto;
  max-width: 700px;
}

.social-card {
  background-color: rgba(255, 255, 255, 0.9);
  color: #1a1a2e;
  padding: 20px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.social-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background-color: white;
}

.social-icon {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.social-icon img {
  width: 40px;
  height: 40px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-card:hover .social-icon img {
  transform: scale(1.1);
}

.social-text {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2a3d66;
  margin-top: 5px;
}

.btn {
  background-color: #61dafb;
  color: #0d1b2a;
  padding: 14px 30px;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
}

.btn:hover {
  background-color: #4fa3d1;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  transform: translateY(-3px);
}

.socials-bottom {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
}

@media (max-width: 768px) {
  .contact-container {
    padding: 40px 20px;
    margin: 20px;
    width: calc(100% - 40px); /* Adjust width for margins */
  }
  
  h1 {
    font-size: 2.2rem;
  }
  
  .socials {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    padding: 20px 10px;
  }
  
  .social-icon {
    width: 50px;
    height: 50px;
  }
  
  .social-icon img {
    width: 30px;
    height: 30px;
  }
  
  .social-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .socials {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
