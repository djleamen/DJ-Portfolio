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
      <a href="https://bsky.app/profile/djleamen.substack.com" class="social-card" aria-label="Bluesky Profile">
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
  --stack-gap: clamp(28px, 4vw, 42px);
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(34px, 4.8vw, 62px) 16px clamp(58px, 7vw, 100px);
  text-align: center;
  color: #eef4ff;
  box-sizing: border-box;
}

h1 {
  margin: 0 0 clamp(16px, 2.2vw, 24px);
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.08;
  font-weight: 800;
  background: linear-gradient(90deg, #70e2ff, #44bff5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

p {
  margin: 0 auto;
  max-width: 720px;
  font-size: 1.1rem;
  line-height: 1.68;
  color: rgba(230, 240, 255, 0.9);
}

a {
  text-decoration: none;
}

.socials {
  width: 100%;
  max-width: 760px;
  margin: var(--stack-gap) auto calc(var(--stack-gap) * 0.8);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.social-card {
  border-radius: 16px;
  border: 1px solid rgba(130, 168, 255, 0.22);
  background:
    radial-gradient(circle at 12% 12%, rgba(98, 213, 255, 0.1), transparent 38%),
    linear-gradient(150deg, rgba(27, 33, 70, 0.86), rgba(17, 22, 52, 0.88));
  box-shadow: 0 16px 34px rgba(7, 12, 36, 0.3);
  color: #eef4ff;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.social-card:hover {
  transform: translateY(-3px);
  border-color: rgba(126, 232, 255, 0.48);
}

.social-icon {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(126, 232, 255, 0.16);
  border: 1px solid rgba(126, 232, 255, 0.38);
}

.social-icon img {
  width: 30px;
  height: 30px;
}

.social-text {
  margin-top: 10px;
  font-size: 1.05rem;
  font-weight: 700;
  color: #e6f4ff;
}

.socials-bottom {
  margin-top: var(--stack-gap);
  padding-bottom: 10px;
}

.btn {
  margin-top: 18px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 11px 20px;
  border-radius: 11px;
  border: 1px solid rgba(126, 232, 255, 0.5);
  background: rgba(98, 213, 255, 0.18);
  color: #a5f3ff;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  background: rgba(98, 213, 255, 0.24);
}

@media (max-width: 860px) {
  .socials {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .contact-container {
    padding: 24px 10px 36px;
  }

  p {
    font-size: 0.98rem;
  }

  .socials {
    grid-template-columns: 1fr;
  }

  .social-card {
    padding: 14px;
  }
}
</style>
